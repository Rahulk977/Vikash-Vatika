import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface CartItem {
  eventId: string;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { eventId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload };
    case 'ADD_ITEM': {
      const exists = state.items.find(item => item.eventId === action.payload.eventId);
      if (exists) {
        return {
          ...state,
          items: state.items.map(item =>
            item.eventId === action.payload.eventId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.eventId !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.eventId === action.payload.eventId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeItem: (eventId: string) => Promise<void>;
  updateQuantity: (eventId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

const LOCAL_STORAGE_KEY = 'cart';

function saveCartToLocalStorage(items: CartItem[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
}

function loadCartFromLocalStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading from localStorage', error);
    return [];
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // Save cart to localStorage on every change
  useEffect(() => {
    saveCartToLocalStorage(state.items);
  }, [state.items]);

  const fetchCart = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5001/api/cart/${user.id}`);
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data = await res.json();
      dispatch({ type: 'SET_CART', payload: data.items || [] });
    } catch (err) {
      console.error('Error fetching cart:', err);
      const fallback = loadCartFromLocalStorage();
      dispatch({ type: 'SET_CART', payload: fallback });
    }
  };

  useEffect(() => {
    const local = loadCartFromLocalStorage();
    if (local.length > 0) {
      dispatch({ type: 'SET_CART', payload: local });
    }
    if (user) {
      fetchCart();
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      dispatch({ type: 'CLEAR_CART' });
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [user]);

  // const addItem = async (item: Omit<CartItem, 'quantity'>) => {
  //   if (!user) return;
  //   dispatch({ type: 'ADD_ITEM', payload: item });
  //   try {
  //     await fetch(`http://localhost:5001/api/cart/add`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ userId: user.id, item }),
  //     });
  //     toast({
  //       title: 'Item added',
  //       description: `${item.name} added to cart.`,
  //     });
  //   } catch (err) {
  //     console.error('Add item error:', err);
  //   }
  // };

  const addItem = async (item: Omit<CartItem, 'quantity'>) => {
    if (!user) return;
  
    console.log('[addItem] Adding item to cart:', item); // ✅ Step 1: Before dispatch
  
    dispatch({ type: 'ADD_ITEM', payload: item });
  
    console.log('[addItem] State after dispatch (may not reflect immediately due to async render):', state); // ❗ Might not show updated state instantly
  
    try {
      const response = await fetch(`http://localhost:5001/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, item }),
      });
  
      console.log('[addItem] API response status:', response.status); // ✅ Step 2: Check API response
  
      toast({
        title: 'Item added',
        description: `${item.name} added to cart.`,
      });
    } catch (err) {
      console.error('[addItem] Error adding item to backend:', err);
    }
  };
  

  const removeItem = async (eventId: string) => {
    if (!user) return;
    dispatch({ type: 'REMOVE_ITEM', payload: eventId });
    try {
      await fetch(`http://localhost:5001/api/cart/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, eventId }),
      });
      toast({
        title: 'Item removed',
        description: 'Removed from cart',
      });
    } catch (err) {
      console.error('Remove item error:', err);
    }
  };

  const updateQuantity = async (eventId: string, quantity: number) => {
    if (!user) return;
    if (quantity < 1) {
      return await removeItem(eventId);
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { eventId, quantity } });
    try {
      await fetch(`http://localhost:5001/api/cart/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, eventId, quantity }),
      });
      toast({
        title: 'Quantity updated',
        description: 'Updated cart item quantity',
      });
    } catch (err) {
      console.error('Update quantity error:', err);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    dispatch({ type: 'CLEAR_CART' });
    try {
      await fetch(`http://localhost:5001/api/cart/clear`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
      toast({
        title: 'Cart cleared',
        description: 'All items removed',
      });
    } catch (err) {
      console.error('Clear cart error:', err);
    }
  };

  const contextValue = useMemo(
    () => ({
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      refreshCart: fetchCart,
      totalItems,
    }),
    [state]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
