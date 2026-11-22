import React, { useState } from "react";

export default function CatalogFilterBar({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  activeCategory,
  setActiveCategory,
  activeFilters,
  removeFilter,
  clearAllFilters
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { key: "price-desc", label: "Price: High to Low" },
    { key: "price-asc", label: "Price: Low to High" },
    { key: "popularity", label: "Popularity & Heritage" },
    { key: "newest", label: "Newest Arrivals" },
    { key: "rating", label: "Client Rating" }
  ];

  const quickChips = [
    { id: "complication", label: "Grand Complications" },
    { id: "rose-gold", label: "18K Rose Gold" },
    { id: "platinum", label: "950 Platinum" },
    { id: "tourbillon", label: "Tourbillon Masters" },
    { id: "oystersteel", label: "Oystersteel" }
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.key === sortBy)?.label || "Price: High to Low";

  return (
    <section className="px-margin-mobile mt-3 flex flex-col gap-3 max-w-5xl mx-auto w-full">
      {/* Search Bar with Micro Ticking Visual Indicator */}
      <div className="relative w-full bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex items-center px-space-md py-1 border border-outline-variant/30 focus-within:border-primary-container">
        <span className="material-symbols-outlined text-outline text-[20px] mr-2">search</span>
        <input
          className="w-full bg-transparent text-on-surface placeholder:text-outline font-body-sm text-body-sm py-2.5 outline-none"
          placeholder="Search by Calibre, Reference, or Complication..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            aria-label="Clear search"
            onClick={() => setSearchTerm("")}
            className="text-outline hover:text-on-surface transition-colors p-1"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
        <div className="ml-2 pl-2 flex items-center border-l border-outline-variant/30">
          <span
            className="w-2 h-2 rounded-full bg-primary-container animate-pulse"
            title="Direct Geneva Vault Sync"
          ></span>
        </div>
      </div>

      {/* Filter Categories Carousel (Scrollable) */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar items-center -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
        {/* Active Sort Dropdown Toggle */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-1.5 px-3 py-2 bg-on-surface text-on-primary rounded-lg text-label-sm font-label-sm tracking-wider uppercase shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-primary-fixed">
              swap_vert
            </span>
            <span>{currentSortLabel}</span>
            <span className="material-symbols-outlined text-[14px]">
              {isSortOpen ? "expand_less" : "expand_more"}
            </span>
          </button>

          {/* Sort Drawer Dropdown */}
          {isSortOpen && (
            <div className="absolute left-0 top-full mt-2 w-56 bg-surface-container-lowest text-on-surface rounded-xl shadow-xl z-30 p-1 border border-outline-variant/30">
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setSortBy(opt.key);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-body-sm font-body-sm hover:bg-surface-container flex items-center justify-between ${
                    sortBy === opt.key ? "text-primary font-semibold" : "text-on-surface"
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.key && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Chips */}
        {quickChips.map((chip) => {
          const isActive = activeCategory === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setActiveCategory(isActive ? "all" : chip.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-label-sm font-label-sm uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all border cursor-pointer ${
                isActive
                  ? "bg-on-surface text-on-primary border-on-surface"
                  : "bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:bg-surface-container"
              }`}
            >
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Filter Badges Bar */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider mr-1">
            Active Criteria:
          </span>
          {activeFilters.map((f, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 bg-surface-container text-on-surface px-2.5 py-1 rounded-full text-body-sm font-body-sm border border-outline-variant/20"
            >
              {f.label}
              <button
                onClick={() => removeFilter(f.key)}
                className="text-outline hover:text-on-surface p-0.5"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </span>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-primary hover:underline font-label-sm text-label-sm tracking-wider uppercase ml-auto font-semibold cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}
    </section>
  );
}
