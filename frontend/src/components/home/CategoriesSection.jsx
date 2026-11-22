import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../data/watchesData";

export default function CategoriesSection() {
  const navigate = useNavigate();

  const handleCategoryClick = (catId) => {
    navigate(`/catalog?category=${catId}`);
  };

  return (
    <section className="w-full px-margin-mobile py-space-xl flex flex-col gap-space-md max-w-5xl mx-auto">
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
            Curated Salons
          </span>
          <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">
            Shop by Category
          </h2>
        </div>
        <Link
          to="/catalog"
          className="font-label-sm text-label-sm uppercase tracking-widest text-primary flex items-center gap-1 hover:underline font-semibold"
        >
          All Salons <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        </Link>
      </div>

      {/* Category Grid 2-column on mobile, 3-column on tablet/desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-space-sm md:gap-space-md">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className="group relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col border border-outline-variant/30 hover:border-primary-container hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="h-36 md:h-44 w-full overflow-hidden bg-surface-container relative">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={cat.title}
                src={cat.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-space-sm flex flex-col gap-0.5">
              <span className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors">
                {cat.title}
              </span>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider flex items-center">
                Explore{" "}
                <span className="material-symbols-outlined text-[12px] ml-0.5 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
