import React, { useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedTimepieces from "../components/home/FeaturedTimepieces";
import PreOwnedAcquisition from "../components/home/PreOwnedAcquisition";
import BrandStory from "../components/home/BrandStory";
import Testimonials from "../components/home/Testimonials";
import NewsletterBox from "../components/home/NewsletterBox";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full pb-12">
      <HeroSection />
      <CategoriesSection />
      <FeaturedTimepieces />
      <PreOwnedAcquisition />
      <BrandStory />
      <Testimonials />
      <NewsletterBox />
    </div>
  );
}
