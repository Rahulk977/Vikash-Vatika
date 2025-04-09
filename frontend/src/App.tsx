
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/contexts/AuthContext";
// import { CartProvider } from "@/contexts/CartContext";

// // Pages
// import HomePage from "@/pages/HomePage";
// import EventCategoryPage from "@/pages/EventCategoryPage";
// import EventDetailsPage from "@/pages/EventDetailsPage";
// import CartPage from "@/pages/CartPage";
// import LoginPage from "@/pages/LoginPage";
// import RegisterPage from "@/pages/RegisterPage";
// import ContactPage from "@/pages/ContactPage";
// import AdminDashboard from "@/pages/AdminDashboard";
// import NotFound from "@/pages/NotFound";
// import WeddingServicesPage from "@/pages/WeddingServicesPage";
// import WeddingServiceCategoryPage from "@/pages/WeddingServiceCategoryPage";
// import WeddingServiceDetailsPage from "@/pages/WeddingServiceDetailsPage";

// // Specific Wedding Service Pages
// import StageDecorationPage from "@/pages/wedding/StageDecorationPage";
// import MandapDecorationPage from "@/pages/wedding/MandapDecorationPage";
// import GateDecorationPage from "@/pages/wedding/GateDecorationPage";
// import GalleryDecorationPage from "@/pages/wedding/GalleryDecorationPage";
// import ReceptionDecorationPage from "@/pages/wedding/ReceptionDecorationPage";
// import CompleteWeddingPackagePage from "@/pages/wedding/CompleteWeddingPackagePage";

// // Layout Components
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// const App = () => {
//   // Create a new QueryClient instance inside the component
//   const queryClient = new QueryClient();
  
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <CartProvider>
//           <TooltipProvider>
//             <Toaster />
//             <Sonner />
//             <BrowserRouter>
//               <div className="flex flex-col min-h-screen">
//                 <Navbar />
//                 <main className="flex-grow">
//                   <Routes>
//                     <Route path="/" element={<HomePage />} />
//                     <Route path="/events/:category" element={<EventCategoryPage />} />
//                     <Route path="/events/:category/details/:id" element={<EventDetailsPage />} />
//                     <Route path="/cart" element={<CartPage />} />
//                     <Route path="/login" element={<LoginPage />} />
//                     <Route path="/register" element={<RegisterPage />} />
//                     <Route path="/contact" element={<ContactPage />} />
//                     <Route path="/admin" element={<AdminDashboard />} />
                    
//                     {/* Wedding service routes */}
//                     <Route path="/wedding" element={<WeddingServicesPage />} />
//                     <Route path="/wedding/:serviceType" element={<WeddingServiceCategoryPage />} />
//                     <Route path="/wedding/:serviceType/:id" element={<WeddingServiceDetailsPage />} />
                    
//                     {/* Specific Wedding Service Pages */}
//                     <Route path="/wedding-decoration/stage" element={<StageDecorationPage />} />
//                     <Route path="/wedding-decoration/mandap" element={<MandapDecorationPage />} />
//                     <Route path="/wedding-decoration/gate" element={<GateDecorationPage />} />
//                     <Route path="/wedding-decoration/gallery" element={<GalleryDecorationPage />} />
//                     <Route path="/wedding-decoration/reception" element={<ReceptionDecorationPage />} />
//                     <Route path="/wedding-decoration/complete" element={<CompleteWeddingPackagePage />} />
                    
//                     <Route path="*" element={<NotFound />} />
//                   </Routes>
//                 </main>
//                 <Footer />
//               </div>
//             </BrowserRouter>
//           </TooltipProvider>
//         </CartProvider>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;


import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

// Pages
import HomePage from "@/pages/HomePage";
import EventCategoryPage from "@/pages/EventCategoryPage";
import EventDetailsPage from "@/pages/EventDetailsPage";
import CartPage from "@/pages/CartPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ContactPage from "@/pages/ContactPage";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/NotFound";
import WeddingServicesPage from "@/pages/WeddingServicesPage";
import WeddingServiceCategoryPage from "@/pages/WeddingServiceCategoryPage";
import WeddingServiceDetailsPage from "@/pages/WeddingServiceDetailsPage";

// Specific Wedding Service Pages
import StageDecorationPage from "@/pages/wedding/StageDecorationPage";
import MandapDecorationPage from "@/pages/wedding/MandapDecorationPage";
import GateDecorationPage from "@/pages/wedding/GateDecorationPage";
import GalleryDecorationPage from "@/pages/wedding/GalleryDecorationPage";
import ReceptionDecorationPage from "@/pages/wedding/ReceptionDecorationPage";
import CompleteWeddingPackagePage from "@/pages/wedding/CompleteWeddingPackagePage";

import CheckoutPage from "./pages/CheckoutPage";

// Layout Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return user ? element : null;
};

const App = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/events/:category" element={<EventCategoryPage />} />
                    <Route path="/events/:category/details/:id" element={<EventDetailsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
                    
                    {/* Wedding service routes */}
                    <Route path="/wedding" element={<WeddingServicesPage />} />
                    <Route path="/wedding/:serviceType" element={<WeddingServiceCategoryPage />} />
                    <Route path="/wedding/:serviceType/:id" element={<WeddingServiceDetailsPage />} />
                    
                    {/* Specific Wedding Service Pages */}
                    <Route path="/wedding-decoration/stage" element={<StageDecorationPage />} />
                    <Route path="/wedding-decoration/:subcategory" element={<MandapDecorationPage />} />

                    <Route path="/wedding-decoration/gate" element={<GateDecorationPage />} />
                    <Route path="/wedding-decoration/gallery" element={<GalleryDecorationPage />} />
                    <Route path="/wedding-decoration/reception" element={<ReceptionDecorationPage />} />
                    <Route path="/wedding-decoration/complete" element={<CompleteWeddingPackagePage />} />
                    <Route path="/checkoutpage" element={<CheckoutPage />} />

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

