import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export default function BottomNav() {
  const { wishlist, bagCount } = useStore();
  const location = useLocation();

  const navItems = [
    {
      to: "/",
      label: "Explore",
      icon: "auto_awesome",
      exact: true
    },
    {
      to: "/catalog",
      label: "Catalog",
      icon: "watch",
      exact: false
    },
    {
      to: "/sell",
      label: "Sell Watch",
      icon: "sell",
      exact: false
    },
    {
      to: "/wishlist",
      label: "Wishlist",
      icon: "bookmark",
      badge: wishlist.length > 0 ? wishlist.length : null,
      exact: false
    },
    {
      to: "/bag",
      label: "Bag",
      icon: "local_mall",
      badge: bagCount > 0 ? bagCount : null,
      exact: false
    }
  ];

  return (
    <nav
      className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_10px_rgba(0,0,0,0.03)] border-t border-outline-variant/30 md:hidden"
      data-active-classes="text-primary"
    >
      <div className="flex justify-around items-center h-20 px-gutter-mobile max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`relative flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] transition-colors ${
                isActive ? "text-primary font-semibold" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <div className="relative">
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                {item.badge !== null && item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] px-0.5 bg-primary-container text-on-primary-container font-label-sm text-[8px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="font-label-sm text-label-sm tracking-wider uppercase">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
