import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import BottomNav from "./components/common/BottomNav";
import MenuDrawer from "./components/common/MenuDrawer";
import SearchModal from "./components/common/SearchModal";
import QuickViewModal from "./components/common/QuickViewModal";
import EscrowModal from "./components/product/EscrowModal";
import SalonViewingModal from "./components/product/SalonViewingModal";
import BagDrawer from "./components/bag/BagDrawer";
import AuthModal from "./components/common/AuthModal";
import TasksModal from "./components/common/TasksModal";
import Toast from "./components/common/Toast";

import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SellWatchPage from "./pages/SellWatchPage";
import WishlistPage from "./pages/WishlistPage";
import BagPage from "./pages/BagPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface">
      {/* Fixed Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-surface pt-16 pb-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/collections" element={<CatalogPage />} />
          <Route path="/watch/:id" element={<ProductDetailPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/sell" element={<SellWatchPage />} />
          <Route path="/sell-your-watch" element={<SellWatchPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/bag" element={<BagPage />} />
          <Route path="/shopping-bag" element={<BagPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Maison Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Global Modals & Drawers */}
      <MenuDrawer />
      <SearchModal />
      <QuickViewModal />
      <EscrowModal />
      <SalonViewingModal />
      <BagDrawer />
      <AuthModal />
      <TasksModal />
      <Toast />
    </div>
  );
}
