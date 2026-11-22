import React, { createContext, useState, useEffect, useCallback } from "react";
import { WATCHES } from "../data/watchesData";
import { api } from "../services/api";

export const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Authentication State
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);

  // Tasks State (CRUD Concierge Tasks)
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);

  // Watches Catalog (initialized with offline master catalogue, populated from API)
  const [watches, setWatches] = useState(WATCHES);

  // Wishlist: array of watch IDs
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("timeless_wishlist");
      return saved ? JSON.parse(saved) : ["royal-chronometer", "sovereign-celestial", "constellation-diamond"];
    } catch {
      return ["royal-chronometer", "sovereign-celestial", "constellation-diamond"];
    }
  });

  // Shopping Bag: array of { watchId, quantity, selectedStrap, selectedDial, bespokePrice }
  const [bag, setBag] = useState(() => {
    try {
      const saved = localStorage.getItem("timeless_bag");
      return saved
        ? JSON.parse(saved)
        : [
            {
              watchId: "royal-chronometer",
              quantity: 1,
              selectedStrap: "alligator-cognac",
              selectedDial: "champagne",
              bespokePrice: 1485000
            },
            {
              watchId: "submariner-deep-emerald",
              quantity: 1,
              selectedStrap: "default",
              selectedDial: "default",
              bespokePrice: 975000
            }
          ];
    } catch {
      return [
        {
          watchId: "royal-chronometer",
          quantity: 1,
          selectedStrap: "alligator-cognac",
          selectedDial: "champagne",
          bespokePrice: 1485000
        }
      ];
    }
  });

  // UI Modals & Drawers
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [quickViewWatch, setQuickViewWatch] = useState(null);
  const [escrowModalWatch, setEscrowModalWatch] = useState(null);
  const [salonViewingWatch, setSalonViewingWatch] = useState(null);

  // Toast
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: "" });
    }, 2800);
  }, []);

  // Fetch tasks for the authenticated collector
  const fetchTasks = useCallback(async () => {
    try {
      setTasksLoading(true);
      const res = await api.tasks.getTasks();
      if (res && res.success) {
        setTasks(res.data);
      }
    } catch (err) {
      console.warn("Failed to fetch collector tasks:", err.message);
    } finally {
      setTasksLoading(false);
    }
  }, []);

  // Fetch live watches from backend API
  const fetchWatches = useCallback(async () => {
    try {
      const res = await api.watches.getWatches();
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        setWatches(res.data);
      }
    } catch (err) {
      console.warn("Using offline master watch catalogue:", err.message);
    }
  }, []);

  // Restore session on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("timeless_token");
      if (token) {
        try {
          const res = await api.auth.getMe();
          if (res && res.success) {
            setUser(res.data);
            if (res.data.wishlist && res.data.wishlist.length > 0) {
              setWishlist(res.data.wishlist);
            }
          }
        } catch (err) {
          console.warn("Session expired or invalid token:", err.message);
          localStorage.removeItem("timeless_token");
          setUser(null);
        }
      }
      setAuthLoading(false);
    };

    initAuth();
    fetchWatches();
  }, [fetchWatches]);

  // When user signs in, load their tasks
  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user, fetchTasks]);

  // Persist wishlist & bag
  useEffect(() => {
    try {
      localStorage.setItem("timeless_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("timeless_bag", JSON.stringify(bag));
    } catch (e) {
      console.error(e);
    }
  }, [bag]);

  // Auth actions
  const login = async (email, password) => {
    const res = await api.auth.login(email, password);
    if (res && res.success) {
      localStorage.setItem("timeless_token", res.token);
      setUser(res.user);
      if (res.user.wishlist && res.user.wishlist.length > 0) {
        setWishlist(res.user.wishlist);
      }
      showToast(`Welcome back, ${res.user.name}`);
      return res.user;
    }
  };

  const register = async (name, email, password, phone, city) => {
    const res = await api.auth.register(name, email, password, phone, city);
    if (res && res.success) {
      localStorage.setItem("timeless_token", res.token);
      setUser(res.user);
      showToast(`Collector profile created. Welcome, ${res.user.name}!`);
      return res.user;
    }
  };

  const logout = () => {
    localStorage.removeItem("timeless_token");
    setUser(null);
    setTasks([]);
    showToast("Signed out of TIMELESS Salon.");
  };

  // Task actions (CRUD)
  const createTask = async (taskData) => {
    const res = await api.tasks.createTask(taskData);
    if (res && res.success) {
      setTasks((prev) => [res.data, ...prev]);
      showToast("Concierge Task Registered: " + res.data.title);
      return res.data;
    }
  };

  const updateTask = async (id, taskData) => {
    const res = await api.tasks.updateTask(id, taskData);
    if (res && res.success) {
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
      showToast("Task updated: " + res.data.title);
      return res.data;
    }
  };

  const deleteTask = async (id) => {
    const res = await api.tasks.deleteTask(id);
    if (res && res.success) {
      setTasks((prev) => prev.filter((t) => t._id !== id));
      showToast("Concierge task archived.");
      return res.data;
    }
  };

  // Wishlist toggle
  const toggleWishlist = (watchId) => {
    setWishlist((prev) => {
      const exists = prev.includes(watchId);
      let updated;
      if (exists) {
        showToast("Removed from Private Wishlist");
        updated = prev.filter((id) => id !== watchId);
      } else {
        showToast("Archived to Private Wishlist");
        updated = [...prev, watchId];
      }

      // If user is logged in, sync with backend
      if (user) {
        api.auth.toggleWishlist(watchId).catch((err) => {
          console.warn("Could not sync wishlist with server:", err.message);
        });
      }

      return updated;
    });
  };

  const isInWishlist = (watchId) => wishlist.includes(watchId);

  // Bag actions
  const addToBag = (watchId, quantity = 1, selectedStrap = "alligator-cognac", selectedDial = "champagne", bespokePrice = null) => {
    const watch = watches.find((w) => w.id === watchId) || WATCHES.find((w) => w.id === watchId);
    const finalPrice = bespokePrice || (watch ? watch.price : 0);

    setBag((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.watchId === watchId && item.selectedStrap === selectedStrap && item.selectedDial === selectedDial
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [...prev, { watchId, quantity, selectedStrap, selectedDial, bespokePrice: finalPrice }];
      }
    });

    showToast(`Allocated to Private Bag: ${watch ? watch.name : "Timepiece"}`);
  };

  const updateBagQuantity = (index, delta) => {
    setBag((prev) => {
      const copy = [...prev];
      const newQty = copy[index].quantity + delta;
      if (newQty <= 0) {
        copy.splice(index, 1);
        showToast("Timepiece removed from bag");
      } else {
        copy[index].quantity = newQty;
      }
      return copy;
    });
  };

  const removeFromBag = (index) => {
    setBag((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
    showToast("Timepiece removed from Bag");
  };

  const clearBag = () => {
    setBag([]);
  };

  const bagCount = bag.reduce((acc, item) => acc + item.quantity, 0);

  const bagSubtotal = bag.reduce((acc, item) => {
    const watch = watches.find((w) => w.id === item.watchId) || WATCHES.find((w) => w.id === item.watchId);
    const price = item.bespokePrice || (watch ? watch.price : 0);
    return acc + price * item.quantity;
  }, 0);

  return (
    <StoreContext.Provider
      value={{
        user,
        authLoading,
        login,
        register,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        tasks,
        tasksLoading,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        isTasksModalOpen,
        setIsTasksModalOpen,
        watches,
        fetchWatches,
        wishlist,
        toggleWishlist,
        isInWishlist,
        bag,
        addToBag,
        updateBagQuantity,
        removeFromBag,
        clearBag,
        bagCount,
        bagSubtotal,
        isMenuOpen,
        setIsMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        isBagOpen,
        setIsBagOpen,
        quickViewWatch,
        setQuickViewWatch,
        escrowModalWatch,
        setEscrowModalWatch,
        salonViewingWatch,
        setSalonViewingWatch,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export { useStore } from "./useStore";
