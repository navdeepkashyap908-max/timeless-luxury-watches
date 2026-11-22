import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CatalogHeader from "../components/catalog/CatalogHeader";
import CatalogFilterBar from "../components/catalog/CatalogFilterBar";
import MetricBar from "../components/catalog/MetricBar";
import CatalogGrid from "../components/catalog/CatalogGrid";
import { WATCHES } from "../data/watchesData";

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || searchParams.get("filter") || "all";

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-desc");
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category") || searchParams.get("filter");
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  // Active filters list for display
  const activeFilters = [];
  if (searchTerm) {
    activeFilters.push({ key: "search", label: `Search: "${searchTerm}"` });
  }
  if (activeCategory !== "all") {
    activeFilters.push({ key: "category", label: `Category: ${activeCategory}` });
  }

  const removeFilter = (key) => {
    if (key === "search") setSearchTerm("");
    if (key === "category") {
      setActiveCategory("all");
      setSearchParams({});
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setActiveCategory("all");
    setSearchParams({});
  };

  // Filter and sort logic
  let filtered = WATCHES.filter((watch) => {
    // Search match
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const match =
        watch.name.toLowerCase().includes(term) ||
        watch.reference.toLowerCase().includes(term) ||
        watch.brand.toLowerCase().includes(term) ||
        watch.category.toLowerCase().includes(term) ||
        (watch.specs?.metallurgy && watch.specs.metallurgy.toLowerCase().includes(term)) ||
        (watch.specs?.calibre && watch.specs.calibre.toLowerCase().includes(term));
      if (!match) return false;
    }

    // Category chip match
    if (activeCategory !== "all") {
      const cat = activeCategory.toLowerCase();
      const matchCategory =
        watch.category.toLowerCase() === cat ||
        (watch.categories && watch.categories.map((c) => c.toLowerCase()).includes(cat)) ||
        (watch.id && watch.id.includes(cat));
      if (!matchCategory) return false;
    }

    return true;
  });

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "popularity") return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "newest") return b.id.localeCompare(a.id);
    return 0;
  });

  return (
    <div className="flex flex-col w-full pb-12">
      <CatalogHeader totalCount={filtered.length} />
      <CatalogFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeFilters={activeFilters}
        removeFilter={removeFilter}
        clearAllFilters={clearAllFilters}
      />
      <MetricBar />
      <CatalogGrid watches={filtered} />
    </div>
  );
}
