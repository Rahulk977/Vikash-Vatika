


// import React, { createContext, useState, useContext, useEffect } from "react";
// import { toast } from "@/components/ui/use-toast";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: "user" | "admin";
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isAdmin: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       fetch("http://localhost:5001/api/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.id) {
//             setUser(data);
//             setIsAuthenticated(true);
//           }
//         })
//         .catch(() => localStorage.removeItem("token"));
//     }
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       const res = await fetch("http://localhost:5001/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Login failed");
//       }

//       const data = await res.json();
//       localStorage.setItem("token", data.token);
//       setUser(data.user);
//       setIsAuthenticated(true);
//       toast({ title: "Login successful", description: "Welcome back!" });
//     } catch (error: any) {
//       toast({ title: "Login failed", description: error.message, variant: "destructive" });
//       throw error;
//     }
//   };

//   const register = async (name: string, email: string, password: string) => {
//     try {
//       const res = await fetch("http://localhost:5001/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Registration failed");
//       }

//       const data = await res.json();
//       localStorage.setItem("token", data.token);
//       setUser(data.user);
//       setIsAuthenticated(true);
//       toast({ title: "Registration successful", description: "Welcome to Vikash Vatika!" });
//     } catch (error: any) {
//       toast({ title: "Registration failed", description: error.message, variant: "destructive" });
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     setIsAuthenticated(false);
//     toast({ title: "Logged out", description: "You have been successfully logged out" });
//   };

//   const isAdmin = user?.role === "admin";

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user"); // Clear corrupted data
    }
  }, []);

  // const login = async (email: string, password: string) => {
  //   try {
  //     const res = await fetch("http://localhost:5001/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       throw new Error(errorData.error || "Login failed");
  //     }

  //     const data = await res.json();
  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("user", JSON.stringify({ id: data.id, name: data.name, email: data.email, role: data.isAdmin ? "admin" : "user" }));

  //     setUser({ id: data.id, name: data.name, email: data.email, role: data.isAdmin ? "admin" : "user" });
  //     setIsAuthenticated(true);

  //     toast({ title: "Login successful", description: "Welcome back!" });
  //   } catch (error: any) {
  //     toast({ title: "Login failed", description: error.message, variant: "destructive" });
  //     throw error;
  //   }
  // };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Login failed");
      }
  
      const data = await res.json();
      console.log("this is data:", data);
  
      // ✅ Correct userId reference
      const userData: User = { 
        id: data.userId, // ✅ Use 'userId' instead of 'id'
        name: data.name || "User", // Ensure name is available (modify backend if missing)
        email: email, // Email is known from input
        role: data.isAdmin ? "admin" : "user" 
      };
  
      // ✅ Store correct values in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId); // ✅ Use 'userId'
      localStorage.setItem("role", userData.role);
      localStorage.setItem("user", JSON.stringify(userData));
  
      setUser(userData);
      setIsAuthenticated(true);
  
      toast({ title: "Login successful", description: "Welcome back!" });
    } catch (error: any) {
      toast({ title: "Login failed", description: error.message });
      throw error;
    }
  };
  


  // const register = async (name: string, email: string, password: string) => {
  //   try {
  //     const res = await fetch("http://localhost:5001/api/auth/register", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name, email, password }),
  //     });

  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       throw new Error(errorData.error || "Registration failed");
  //     }

  //     const data = await res.json();
  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("user", JSON.stringify({ id: data.id, name: data.name, email: data.email, role: "user" }));

  //     setUser({ id: data.id, name: data.name, email: data.email, role: "user" });
  //     setIsAuthenticated(true);

  //     toast({ title: "Registration successful", description: "Welcome to Vikash Vatika!" });
  //   } catch (error: any) {
  //     toast({ title: "Registration failed", description: error.message, variant: "destructive" });
  //     throw error;
  //   }
  // };


  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Registration failed");
      }
  
      const data = await res.json();
      console.log("this is data:",data);
      const userData: User = { 
        id: data.id, 
        name: data.name, 
        email: data.email, 
        role: "user" 
      };
  
      // Store user data in localStorage, including userId and role
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id); // Store userId separately
      localStorage.setItem("role", "user"); // Store role separately
      localStorage.setItem("user", JSON.stringify(userData));
  
      setUser(userData);
      setIsAuthenticated(true);
  
      toast({ title: "Registration successful", description: "Welcome to Vikash Vatika!" });
    } catch (error: any) {
      toast({ title: "Registration failed", description: error.message });
      throw error;
    }
  };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   setUser(null);
  //   setIsAuthenticated(false);
  //   toast({ title: "Logged out", description: "You have been successfully logged out" });
  // };

  const logout = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      localStorage.removeItem(`cart_${user.id}`); // Remove cart specific to this user
    }
  
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  
    setUser(null);
    setIsAuthenticated(false);
    toast({ title: "Logged out", description: "You have been successfully logged out" });
  };
  

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
