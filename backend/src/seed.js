import dotenv from "dotenv";
dotenv.config();

import { connectDB, disconnectDB } from "./config/db.js";
import { Watch } from "./models/Watch.js";
import { User } from "./models/User.js";
import { Task } from "./models/Task.js";

export const initialWatches = [
  {
    id: "royal-chronometer",
    name: "Royal Chronometer 41mm",
    brand: "TIMELESS Masterworks",
    maison: "Manufacture Le Locle",
    category: "tourbillon",
    categories: ["tourbillon", "rose-gold", "complication"],
    subtitle: "In Stock • Calibre 3120 • 18k Rose Gold",
    fullDescription: "Crafted in 18k 4N Warm Rose Gold • Flying Tourbillon Escapement. A harmonious synthesis of high complication mechanics and royal wrist poise.",
    reference: "Ref. TL-904L-RG",
    price: 1485000,
    originalPrice: 1650000,
    discountBadge: "10% OFF",
    privilegeBadge: "10% PRIVILEGE",
    statusBadge: "Boutique Exclusive",
    tag: "Geneva Seal Certified",
    rating: 4.9,
    reviewsCount: 48,
    stockCount: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCc0zSN7fRivwnCyvxBqhxMNvGkbN848goHRxv2qxEEKxY8mJiCB8OC8Keiij1ytmL8TBHsje98AdC_G8cLsOf8YzbUbFwZcSUtk1uFyaBdnYfTJ3BQgrozGP2cVaAWypIV3EjbsIkXkYoitTQD5giln0yA1u5bLNsp-shgpaBecjCYhRsQBVOJ6fRL7fp6iGZDUIPIStb3yVgPX-tIz0DEqHZTI-TmuwkySoJcAQ",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZNa3KSrTim6uoyHiRGkIIXDOb5UHprhw_c_kIOUOZVxv_j5lJ1ilYF7CmtNMtsmYVeGncMBHwJB0LnUyH59Ry7r47saHbYWlde2M1JkpzzeRCN3mQg4p2QyvSTn5GRboj2HjPF2B67nX35nnQM56EEp2Va4i_QoAclpm13B-sP70-VEtMQsu6VWCMT0ml8neH0UvV7HVNzVCFDKtAuMOdHFX8HleUR32-LH0ytw",
    gallery: [
      {
        title: "Front Dial",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPNtctiYZTk_Fqdf3aHDdS7me-mpRbWosBGTWfq1NLyGnRzbWIT75TEXO2BUuENI-lHY6OsxsxaQfYzJguLyx8yTBT-c9F67sR0vRczNHp-ZSqAieJC1takwZvpfRGiZVoIB6KWGV91BoR8ySLymVGvtE7Q0xIzcoU6z-QE8PTERjQ9sJkkmMcTj35R3qFFm47BDQpa4umH9-R6_N_2R1c9aRUI6UUTmGvlvcZ_w",
        alt: "Close up front view of Haute Horlogerie 41mm rose gold tourbillon dial"
      },
      {
        title: "Caseback",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAF51XLBY67WOAQia5pLSYXIjXmCRPOpx93SkZ39jmldxJD4szfzDaIGXCcfT1Ze4lZivWwC32-bDx6HqhCkuVEh_d2NSHDLJaFpkrZj1-Cu6tWC0P1vqyXB4Qgn7Q0ygymG-Ojy9F-kKbAov0XgFPPOaWwZNvqjUCqkb50YJM7fBfKcYEVCW-p-Ka7GmhORfyjayGZqUMEp5pdj8VkkMUTwGHJZWqiQBRoNMqJA",
        alt: "Exhibition sapphire skeleton caseback view of caliber TL-8800"
      },
      {
        title: "Crown & Bezel",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgMefeg6wRyg_9_AEXrmkHKKyDRKwFObHlqR9_oz3KUJ6sY5vQIIXk5wbc9LZu004oqXATVDIGMCDv3vKLQoOLc8ANr3qPUI40yH71qQrmXkIAgQn4OLlSM-tyuJ2u3eKqMyathBLQ6ZY2AmjsoJiUMtBUppIkT1UYGrE6ViQB2lT3jQpzEkm0nN1DuALA1gO1_5Jmhm5CLykFxVJsfGutef9ypBm4MkNy2zgoqw",
        alt: "Macro detail of fluted 18k rose gold winding crown with sapphire cabochon"
      },
      {
        title: "On-Wrist",
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx-3e8nanQjKieCLXaxC2kOTN_WLzGeSR6QqtC4fPLaL46KHim2XGDKLCFIb2U6zdYBWBAypa4KQYgO1_xW6Wu5H_9L1xiPCV1r2RXiYZAyHWPK_yObsCjJLCHVCpHDeda4vAleo8gJaL5kGaHJN2okYb5ygMewqsqCDggvTLwqFleRFB9ek8hzxpFdFow82dBE47UxWDApis7RmD0wGxOJCLRBuXRxDJl4RL30g",
        alt: "Tasteful bespoke lifestyle shot of a collector wearing the 41mm rose gold timepiece"
      }
    ],
    specs: {
      metallurgy: "18k 4N Solid Rose Gold",
      dimensions: "41.0 mm × 10.8 mm",
      crystal: "Cambered Sapphire (Double AR coating)",
      dial: "Clous de Paris Guilloché + Rose Gold Appliques",
      escapement: "1-Minute Flying Tourbillon (Titanium Cage)",
      powerReserve: "72 Hours Twin-Barrel Reserve",
      waterTightness: "10 ATM (100 Metres / 330 Feet)",
      chronometry: "COSC & Poinçon de Genève",
      calibre: "Calibre TL-8800",
      frequency: "28,800 VPH",
      diameter: "41.0mm"
    }
  },
  {
    id: "sovereign-celestial",
    name: "Sovereign Celestial Skeleton",
    brand: "Tourbillon Masters",
    maison: "Geneva Vault",
    category: "tourbillon",
    categories: ["tourbillon", "rose-gold", "complication"],
    subtitle: "Exposed Escapement • Ru-Bridges • 18K Rose Gold",
    fullDescription: "Bespoke openwork skeleton tourbillon with hand-chamfered ruthenium bridges and exposed twin barrels.",
    reference: "Ref. 5712/1R",
    price: 4250000,
    originalPrice: 4600000,
    discountBadge: null,
    privilegeBadge: "ALLOCATION",
    statusBadge: "Boutique Exclusive",
    tag: "Swiss Certified",
    rating: 5.0,
    reviewsCount: 32,
    stockCount: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5ggQCqN9C_5iz3xcqa4ACHm-HB7nKFBOjD2WugyrIq755cGjxgunnnbA_NG7rsJHLTG-t5s4rNq-3UkuvMRWWVJbV3WjVODqGfHlpjfhwKGOA5i1KqDSbPGJkcCBcOXs583shTaOZCON1-t9gCDlwp2DGuOv7i9KjzYacaaom9c3qHTiKv4Tjw0JyDSGEQHTe9rsDo5C_XNq-oD24jJl3GNdeq0Q8ma4TAg1piw",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5ggQCqN9C_5iz3xcqa4ACHm-HB7nKFBOjD2WugyrIq755cGjxgunnnbA_NG7rsJHLTG-t5s4rNq-3UkuvMRWWVJbV3WjVODqGfHlpjfhwKGOA5i1KqDSbPGJkcCBcOXs583shTaOZCON1-t9gCDlwp2DGuOv7i9KjzYacaaom9c3qHTiKv4Tjw0JyDSGEQHTe9rsDo5C_XNq-oD24jJl3GNdeq0Q8ma4TAg1piw",
    gallery: [],
    specs: {
      metallurgy: "18k Rose Gold",
      dimensions: "41.5 mm × 10.2 mm",
      crystal: "Sapphire Crystal Glareproofed",
      dial: "Skeletonized Architectural Openwork",
      escapement: "60-Second Flying Tourbillon",
      powerReserve: "72 Hours",
      waterTightness: "5 ATM (50m)",
      chronometry: "Poinçon de Genève",
      calibre: "TL-8902",
      frequency: "28,800 VPH",
      diameter: "41.5mm"
    }
  },
  {
    id: "aethelgard-tourbillon",
    name: "Aethelgard Tourbillon Skeleton",
    brand: "Haute Complication",
    maison: "Vallee de Joux",
    category: "tourbillon",
    categories: ["tourbillon", "complication"],
    subtitle: "In Stock • 72h Reserve • Geneva Seal",
    fullDescription: "Ruthenium bridges, exposed mechanical gear trains, rose gold hands and Geneva Seal pedigree.",
    reference: "Ref. AT-882",
    price: 2850000,
    originalPrice: 3100000,
    discountBadge: null,
    privilegeBadge: "VAULT PIECE",
    statusBadge: "Vault Piece",
    tag: "Geneva Seal",
    rating: 5.0,
    reviewsCount: 19,
    stockCount: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4GnCFbtPVPtqrL1c7KbOk5OAPgwgxmstfmPU-gp-aWKDKCjTBYexpTf4oYOGt5WmRJDTsvBaAQWjzd0qqIfpKMFjSlqRQF5aMSYC5-Zmu8LJuw6xX3S4-JlCFAby3wu7SuJNvF9hFu0bMDJcXVQ2zJs0Ejmp70TIUA5fbXx3ANN9ZU2PsiSwRyUEwbOsQBHL1NQ5bScsXdVc4DhA4JT0YvaLTB2eF62Vd86ujlA",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4GnCFbtPVPtqrL1c7KbOk5OAPgwgxmstfmPU-gp-aWKDKCjTBYexpTf4oYOGt5WmRJDTsvBaAQWjzd0qqIfpKMFjSlqRQF5aMSYC5-Zmu8LJuw6xX3S4-JlCFAby3wu7SuJNvF9hFu0bMDJcXVQ2zJs0Ejmp70TIUA5fbXx3ANN9ZU2PsiSwRyUEwbOsQBHL1NQ5bScsXdVc4DhA4JT0YvaLTB2eF62Vd86ujlA",
    gallery: [],
    specs: {
      metallurgy: "Anthracite Ruthenium & Platinum",
      dimensions: "42.0 mm × 11.2 mm",
      crystal: "Anti-Reflective Sapphire",
      dial: "Exposed Tourbillon Escapement",
      escapement: "Flying Tourbillon",
      powerReserve: "72 Hours",
      waterTightness: "3 ATM (30m)",
      chronometry: "Geneva Seal",
      calibre: "Calibre AG-99",
      frequency: "21,600 VPH",
      diameter: "42.0mm"
    }
  },
  {
    id: "submariner-deep-emerald",
    name: "Submariner Deep Emerald",
    brand: "Marine Horology",
    maison: "Geneva Marine",
    category: "oystersteel",
    categories: ["oystersteel"],
    subtitle: "In Stock • COSC Cert • 300m Diver",
    fullDescription: "Ceramic sunburst green bezel with brushed oyster link bracelet and 300-meter hydrostatic pressure tolerance.",
    reference: "Ref. SE-1166",
    price: 975000,
    originalPrice: 1050000,
    discountBadge: "Sale",
    privilegeBadge: "SALE",
    statusBadge: "In Stock",
    tag: "300m Diver",
    rating: 4.8,
    reviewsCount: 64,
    stockCount: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbaFw2XKRPEY3xcQ2lAo98dyFKQEkIEp0bHDkeedvYDPP3Vf9L-K5qZuHvx9jpFX9XI9Lzcfg8FosGQcU5WVBWxCtKVkumGnQOKAB1e-SBGbhArnxcIX881WVZmseNr02P8vcuEauBwmBaVwSMAlzLPqE0Hdm2MAdc23MgL-YvQQrFIZw-h3NZVhl972e5enVzAc8_Htsb8_1CEgYObNn5t1ClCQQNb4BBByumZw",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbaFw2XKRPEY3xcQ2lAo98dyFKQEkIEp0bHDkeedvYDPP3Vf9L-K5qZuHvx9jpFX9XI9Lzcfg8FosGQcU5WVBWxCtKVkumGnQOKAB1e-SBGbhArnxcIX881WVZmseNr02P8vcuEauBwmBaVwSMAlzLPqE0Hdm2MAdc23MgL-YvQQrFIZw-h3NZVhl972e5enVzAc8_Htsb8_1CEgYObNn5t1ClCQQNb4BBByumZw",
    gallery: [],
    specs: {
      metallurgy: "Corrosion-Proof Oystersteel",
      dimensions: "40.5 mm × 12.0 mm",
      crystal: "Cyclops Sapphire Crystal",
      dial: "Emerald Sunray Dial with Chromalight",
      escapement: "Paramagnetic Blue Parachrom",
      powerReserve: "70 Hours",
      waterTightness: "30 ATM (300 Metres)",
      chronometry: "Superlative Chronometer (COSC)",
      calibre: "Calibre 3235",
      frequency: "28,800 VPH",
      diameter: "40.5mm"
    }
  },
  {
    id: "constellation-diamond",
    name: "Constellation Diamond 34mm",
    brand: "Celestial Métiers",
    maison: "Bienne Atelier",
    category: "dress",
    categories: ["dress", "rose-gold"],
    subtitle: "In Stock • Diamond Bezel • Aventurine Dial",
    fullDescription: "Brilliant-cut diamond paved bezel encasing natural starry aventurine glass dial and Sedna gold accents.",
    reference: "Ref. CD-340",
    price: 1220000,
    originalPrice: 1350000,
    discountBadge: "Rare",
    privilegeBadge: "RARE",
    statusBadge: "Rare",
    tag: "Master Chrono",
    rating: 4.9,
    reviewsCount: 27,
    stockCount: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCccWg_GON4phSSkqykX4r20GfL3xhi63UZeGG8UVPwHQbfOhjkVACr_uGVkJjOsNZA8Ysn8GZmCCYvNglWDY9IBnEWbDFZa5lMdFY4ydmXK53IdfVLV7rLP-Z1G_aXgEk3ZfvawkRBTuSfsH96N5A9Kh_rXeRdlQ8MRPVF6cuJ3JqagzYiOwStUl_v3ptndvDTn3wWUKSsRs-xqfrsBmH2ftvSPx4QScCJAiL8kQ",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCccWg_GON4phSSkqykX4r20GfL3xhi63UZeGG8UVPwHQbfOhjkVACr_uGVkJjOsNZA8Ysn8GZmCCYvNglWDY9IBnEWbDFZa5lMdFY4ydmXK53IdfVLV7rLP-Z1G_aXgEk3ZfvawkRBTuSfsH96N5A9Kh_rXeRdlQ8MRPVF6cuJ3JqagzYiOwStUl_v3ptndvDTn3wWUKSsRs-xqfrsBmH2ftvSPx4QScCJAiL8kQ",
    gallery: [],
    specs: {
      metallurgy: "18k Sedna Rose Gold & Diamonds",
      dimensions: "34.0 mm × 9.8 mm",
      crystal: "Domed Scratch-Resistant Sapphire",
      dial: "Natural Starry Aventurine Glass",
      escapement: "Co-Axial Master Chronometer",
      powerReserve: "55 Hours",
      waterTightness: "5 ATM (50 Metres)",
      chronometry: "METAS Certified Master Chronometer",
      calibre: "Calibre 8800",
      frequency: "25,200 VPH",
      diameter: "34.0mm"
    }
  },
  {
    id: "monaco-vintage-calibre",
    name: "Monaco Vintage Calibre 11",
    brand: "Racing Icon",
    maison: "La Chaux-de-Fonds",
    category: "chronograph",
    categories: ["chronograph", "oystersteel"],
    subtitle: "In Stock • Left Crown • Racing Heritage",
    fullDescription: "Iconic square-cased racing chronograph featuring petrol blue dial, contrasting white counters, and perforated rally calfskin.",
    reference: "Ref. MC-110",
    price: 640000,
    originalPrice: 700000,
    discountBadge: "Heritage",
    privilegeBadge: "HERITAGE",
    statusBadge: "Heritage",
    tag: "Racing Icon",
    rating: 4.7,
    reviewsCount: 38,
    stockCount: 3,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzBNtql4Gb9n6gzkn315wnRCCQk2-Jpfw5hx7_GNrSp5Ci0YQuKhcc01O-vakV6sFMa5i8w_wwuxVGvmOEneYNxbAdd1sYcboU0t8kiWOvmkm-FSjPd2ckH69QVxADZQ9XJ1ruSSCBuJdopDwLYobqapYfCNlXwsuvrY2oJBc0C_aCiEPNQ8bigHJM51bgLSP6iroAG4_CgXz2r94904kDpQAhNKgZRw7VdJP21w",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzBNtql4Gb9n6gzkn315wnRCCQk2-Jpfw5hx7_GNrSp5Ci0YQuKhcc01O-vakV6sFMa5i8w_wwuxVGvmOEneYNxbAdd1sYcboU0t8kiWOvmkm-FSjPd2ckH69QVxADZQ9XJ1ruSSCBuJdopDwLYobqapYfCNlXwsuvrY2oJBc0C_aCiEPNQ8bigHJM51bgLSP6iroAG4_CgXz2r94904kDpQAhNKgZRw7VdJP21w",
    gallery: [],
    specs: {
      metallurgy: "Fine-Brushed 316L Stainless Steel",
      dimensions: "39.0 mm × 39.0 mm × 14.3 mm",
      crystal: "Beveled Domed Sapphire Crystal",
      dial: "Matte Petrol Blue with Red Accents",
      escapement: "Automatic Chronograph Calibre",
      powerReserve: "40 Hours",
      waterTightness: "10 ATM (100 Metres)",
      chronometry: "Swiss Automatic Certification",
      calibre: "Calibre 11 (Left Crown)",
      frequency: "28,800 VPH",
      diameter: "39.0mm"
    }
  },
  {
    id: "santos-imperial-rose",
    name: "Santos Imperial Rose Gold",
    brand: "18K Solid Gold",
    maison: "Paris-Geneva",
    category: "dress",
    categories: ["dress", "rose-gold"],
    subtitle: "In Stock • QuickSwitch • Silvered Dial",
    fullDescription: "Geometric square bezel with exposed screws, blued sword hands, 18k solid gold construction, and QuickSwitch interchangeability.",
    reference: "Ref. SI-18K",
    price: 1890000,
    originalPrice: 2050000,
    discountBadge: "Prestige",
    privilegeBadge: "PRESTIGE",
    statusBadge: "Prestige",
    tag: "18K Solid Gold",
    rating: 5.0,
    reviewsCount: 41,
    stockCount: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0oyJKXijxMROPzgH58aT-A2S8mXEf0iEiHK_56Rt_1N_pMmOGQYgDfC9yWlaQdGB7cqAgwBxN1E6CgFsr2FqyD11PFNGoCvRb0lI4dDJa0WYfeLSTFapgihhXGghJhI6y0VM_CoAopksLX7Eyq78OuMnHILBhTFlqxrmg_T2ZTtSxejysLDJGxkucfB7Yu8KQzZJ52NmjageC8YXUcSOMF_ZO8_ABX4SxnzCqbg",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0oyJKXijxMROPzgH58aT-A2S8mXEf0iEiHK_56Rt_1N_pMmOGQYgDfC9yWlaQdGB7cqAgwBxN1E6CgFsr2FqyD11PFNGoCvRb0lI4dDJa0WYfeLSTFapgihhXGghJhI6y0VM_CoAopksLX7Eyq78OuMnHILBhTFlqxrmg_T2ZTtSxejysLDJGxkucfB7Yu8KQzZJ52NmjageC8YXUcSOMF_ZO8_ABX4SxnzCqbg",
    gallery: [],
    specs: {
      metallurgy: "18k 4N Solid Rose Gold",
      dimensions: "39.8 mm × 9.38 mm",
      crystal: "Sapphire Crystal",
      dial: "Silvered Opaline with Roman Numerals",
      escapement: "Automatic Mechanical",
      powerReserve: "42 Hours",
      waterTightness: "10 ATM (100 Metres)",
      chronometry: "Manufacture Mechanical Cert",
      calibre: "Calibre 1847 MC",
      frequency: "28,800 VPH",
      diameter: "39.8mm"
    }
  },
  {
    id: "oyster-perpetual-platinum",
    name: "Oyster Perpetual Platinum",
    brand: "Platinum 950",
    maison: "Geneva Vault",
    category: "platinum",
    categories: ["platinum", "dress"],
    subtitle: "In Stock • Ice Blue Dial • Fluted Bezel",
    fullDescription: "Solid 950 Platinum housing with exclusive Ice Blue sunburst dial, fluted bezel, and President link bracelet.",
    reference: "Ref. OP-950",
    price: 2210000,
    originalPrice: 2400000,
    discountBadge: "Rare Pt950",
    privilegeBadge: "PLATINUM 950",
    statusBadge: "Rare Pt950",
    tag: "Platinum 950",
    rating: 4.9,
    reviewsCount: 52,
    stockCount: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgu1h7iqVvQHrQaig_3WYkGjvfDhsAqunZZXo5_-xVPwzyVMDyo97DsgGQN8i0V0baTCcwvyyiBjQ1GlanL1Mg95yr8tnkqw_5JlSialZkm28gLbb1yWEXnnmbCn5Qi0j2oeeFpa8dp-dNjUeXQcAm5KnHCuGYI2hLzitWzTfyJ7GONIUoCWMTPUuFD39xooVkwr-xgO6avoTDHw9E-OiKdZ4_kluLkCBbbz5G3g",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgu1h7iqVvQHrQaig_3WYkGjvfDhsAqunZZXo5_-xVPwzyVMDyo97DsgGQN8i0V0baTCcwvyyiBjQ1GlanL1Mg95yr8tnkqw_5JlSialZkm28gLbb1yWEXnnmbCn5Qi0j2oeeFpa8dp-dNjUeXQcAm5KnHCuGYI2hLzitWzTfyJ7GONIUoCWMTPUuFD39xooVkwr-xgO6avoTDHw9E-OiKdZ4_kluLkCBbbz5G3g",
    gallery: [],
    specs: {
      metallurgy: "Solid 950 Platinum",
      dimensions: "40.0 mm × 11.5 mm",
      crystal: "Sapphire Crystal with Cyclops",
      dial: "Sunray Ice Blue Dial",
      escapement: "Syloxi Hairspring Escapement",
      powerReserve: "70 Hours",
      waterTightness: "10 ATM (100 Metres)",
      chronometry: "COSC & Superlative Certification",
      calibre: "Calibre 3255",
      frequency: "28,800 VPH",
      diameter: "40.0mm"
    }
  },
  {
    id: "luminor-regatta-titanium",
    name: "Luminor Regatta Titanium",
    brand: "Titanium Grade 5",
    maison: "Neuchatel Manufacture",
    category: "chronograph",
    categories: ["chronograph", "oystersteel"],
    subtitle: "In Stock • Regatta Countdown • Marine Band",
    fullDescription: "Grade 5 titanium cushion case with patented lever crown protector, yachting countdown complication, and flyback chronograph.",
    reference: "Ref. LR-04",
    price: 830000,
    originalPrice: 910000,
    discountBadge: "Chrono",
    privilegeBadge: "TITANIUM",
    statusBadge: "Chrono",
    tag: "Titanium Grade 5",
    rating: 4.8,
    reviewsCount: 23,
    stockCount: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1FRL5hWQmUnY-IaCA5INq1pHwiCGzI9TAFC4idENwcmzenuKRHoxwLfXJqD5KKzebHJxOTEA3peukcrtDrelmaeoKkLw8KfDwmvdDIk5BIPh_bXkMimXlvYKuV-l7sTFxpoyGvceeU9oAsMyYnBA1TsDYwDsqilwBSh6ZQDemtiCq_qtsY0m4MPlRwsfgnSopY_gycsKP2OOoKoz49GK4scaAfsrpBFqZXB5QCA",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1FRL5hWQmUnY-IaCA5INq1pHwiCGzI9TAFC4idENwcmzenuKRHoxwLfXJqD5KKzebHJxOTEA3peukcrtDrelmaeoKkLw8KfDwmvdDIk5BIPh_bXkMimXlvYKuV-l7sTFxpoyGvceeU9oAsMyYnBA1TsDYwDsqilwBSh6ZQDemtiCq_qtsY0m4MPlRwsfgnSopY_gycsKP2OOoKoz49GK4scaAfsrpBFqZXB5QCA",
    gallery: [],
    specs: {
      metallurgy: "Brushed Grade 5 Titanium",
      dimensions: "47.0 mm × 16.0 mm",
      crystal: "Corundum Sapphire Crystal (2.6mm thick)",
      dial: "Matte Anthracite with Orange/Blue Accents",
      escapement: "Flyback Chronograph with Regatta Countdown",
      powerReserve: "72 Hours (3 Days Twin Barrel)",
      waterTightness: "10 ATM (100 Metres)",
      chronometry: "Swiss Official Chronometer",
      calibre: "Calibre P.9100/R",
      frequency: "28,800 VPH",
      diameter: "47.0mm"
    }
  },
  {
    id: "perpetual-calendar-platinum",
    name: "Perpetual Calendar 40mm",
    brand: "Grand Complication",
    maison: "Geneva Vault",
    category: "complication",
    categories: ["complication", "platinum"],
    subtitle: "950 Platinum • Cal. 9200 • Moonphase",
    fullDescription: "Perpetual calendar requiring no correction until year 2100. Midnight blue grand feu enamel dial with astronomical moonphase.",
    reference: "Ref. PC-920",
    price: 2150000,
    originalPrice: 2350000,
    discountBadge: null,
    privilegeBadge: "GRAND COMPLICATION",
    statusBadge: "Grand Complication",
    tag: "950 Platinum",
    rating: 5.0,
    reviewsCount: 15,
    stockCount: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-QaRJ3rFZqpMymRb0DnxK7viDwCmPguNc5X-H17sfnyJy-UYJdypUaVfa6mZQwlzh72JU09nuAKCpibzmsugIOPb-JodRGbtUv0JgB7J8VQ3tM2NaHJTdymN-fjpvAgk9P65cYB7OsEtY2iUwH12R3WPETephNnueixqZx4Z1Z1rT6qxw0XqoY2ZAB5Xbz_y7KZmlNduiQZ2hwShSw3eZI2RHXTUL8DHqnueW_g",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-QaRJ3rFZqpMymRb0DnxK7viDwCmPguNc5X-H17sfnyJy-UYJdypUaVfa6mZQwlzh72JU09nuAKCpibzmsugIOPb-JodRGbtUv0JgB7J8VQ3tM2NaHJTdymN-fjpvAgk9P65cYB7OsEtY2iUwH12R3WPETephNnueixqZx4Z1Z1rT6qxw0XqoY2ZAB5Xbz_y7KZmlNduiQZ2hwShSw3eZI2RHXTUL8DHqnueW_g",
    gallery: [],
    specs: {
      metallurgy: "950 Solid Platinum",
      dimensions: "40.0 mm × 11.1 mm",
      crystal: "Sapphire Exhibition Caseback",
      dial: "Midnight Blue Grand Feu Enamel",
      escapement: "Perpetual Calendar Complication",
      powerReserve: "68 Hours",
      waterTightness: "3 ATM (30 Metres)",
      chronometry: "Poinçon de Genève",
      calibre: "Calibre 9200 QP",
      frequency: "28,800 VPH",
      diameter: "40.0mm"
    }
  },
  {
    id: "sonnerie-minute-repeater",
    name: "Sonnerie Minute Repeater",
    brand: "Acoustic Art",
    maison: "Vallee de Joux",
    category: "complication",
    categories: ["complication"],
    subtitle: "18k White Gold • Cal. 7700 • Chiming",
    fullDescription: "Cathedral gongs hand-tuned to E and C-sharp. Chimes hours, quarters, and minutes on demand with exceptional acoustic resonance.",
    reference: "Ref. SMR-77",
    price: 3400000,
    originalPrice: 3750000,
    discountBadge: null,
    privilegeBadge: "ACOUSTIC ART",
    statusBadge: "Acoustic Art",
    tag: "18k White Gold",
    rating: 5.0,
    reviewsCount: 11,
    stockCount: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0NPJeMQo8bOVtJkljBTSiPL2Q0LHPsQ3aWn6Qb1Clf0zI2VTn7t81KGb1s1ShFMdLD_7I3M_YZ222FbRrmRYW0kzuKpW72zm-a8Mrz6fwlDXDur__BuJgfrsCxX5AawIr8sgHbFX7xOgCdm_NaJYHWkWPoZK3iAbUa8bwyXhwag3ZMI-hTE1LVn48U35mbDeHRkWo986okHY_-G_t7FHbBr-Flyv3tBZ7zYeTZA",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0NPJeMQo8bOVtJkljBTSiPL2Q0LHPsQ3aWn6Qb1Clf0zI2VTn7t81KGb1s1ShFMdLD_7I3M_YZ222FbRrmRYW0kzuKpW72zm-a8Mrz6fwlDXDur__BuJgfrsCxX5AawIr8sgHbFX7xOgCdm_NaJYHWkWPoZK3iAbUa8bwyXhwag3ZMI-hTE1LVn48U35mbDeHRkWo986okHY_-G_t7FHbBr-Flyv3tBZ7zYeTZA",
    gallery: [],
    specs: {
      metallurgy: "18k Acoustic White Gold",
      dimensions: "42.0 mm × 13.0 mm",
      crystal: "Acoustic Sapphire Resonance Chamber",
      dial: "Openwork Dial Exposing Hammers & Gongs",
      escapement: "Minute Repeater with Centrifugal Governor",
      powerReserve: "60 Hours",
      waterTightness: "Moisture & Dust Sealed",
      chronometry: "Geneva Seal Audited",
      calibre: "Calibre 7700 MR",
      frequency: "21,600 VPH",
      diameter: "42.0mm"
    }
  }
];

export const seedDatabase = async () => {
  try {
    console.log("[Seed] Checking Watch catalog database...");
    const existingWatches = await Watch.countDocuments();
    if (existingWatches === 0) {
      console.log(`[Seed] Populating ${initialWatches.length} timepieces into Curated Vault...`);
      await Watch.insertMany(initialWatches);
      console.log("[Seed] Timepieces seeded successfully.");
    } else {
      console.log(`[Seed] Database already contains ${existingWatches} timepieces.`);
    }

    // Seed default demo collector user
    const existingUser = await User.findOne({ email: "collector@timeless.ch" });
    let collectorUser = existingUser;
    if (!existingUser) {
      console.log("[Seed] Creating default demonstration collector account (collector@timeless.ch)...");
      collectorUser = await User.create({
        name: "Vikramaditya Singhania",
        email: "collector@timeless.ch",
        password: "Password123!",
        role: "connoisseur",
        tier: "Tier-1 Geneva Priority",
        phone: "+91 98200 98200",
        city: "Mumbai",
        wishlist: ["royal-chronometer", "sovereign-celestial", "constellation-diamond"],
        bag: [
          {
            watchId: "royal-chronometer",
            quantity: 1,
            selectedStrap: "alligator-cognac",
            selectedDial: "champagne",
            bespokePrice: 1485000,
          },
        ],
      });
      console.log("[Seed] Default collector account created: collector@timeless.ch / Password123!");
    }

    // Seed default tasks for demonstration
    const existingTasks = await Task.countDocuments();
    if (existingTasks === 0 && collectorUser) {
      console.log("[Seed] Creating initial horological concierge tasks...");
      await Task.create([
        {
          title: "Private Viewing Suite at The Oberoi, Mumbai",
          description: "Private champagne presentation for Royal Chronometer 41mm and Perpetual Calendar 40mm.",
          status: "in_progress",
          priority: "high",
          category: "viewing_request",
          watchId: "royal-chronometer",
          watchName: "Royal Chronometer 41mm",
          location: "Mumbai BKC Flagship Suite",
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          user: collectorUser._id,
        },
        {
          title: "Source Patek Philippe Ref. 5711/1R Allocation",
          description: "Inquire with Geneva Salon Director for single-owner mint condition allocation.",
          status: "pending",
          priority: "urgent",
          category: "watch_sourcing",
          watchId: "sovereign-celestial",
          watchName: "Sovereign Celestial Skeleton",
          location: "Geneva Vault",
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          user: collectorUser._id,
        },
        {
          title: "Calibre TL-8800 3-Year Manufacture Recalibration",
          description: "Complimentary chronometric rate inspection and Poinçon de Genève servicing.",
          status: "completed",
          priority: "medium",
          category: "maintenance",
          watchId: "royal-chronometer",
          watchName: "Royal Chronometer 41mm",
          location: "Le Locle Atelier",
          dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          user: collectorUser._id,
        },
      ]);
      console.log("[Seed] Demonstration concierge tasks seeded.");
    }
  } catch (err) {
    console.error("[Seed] Error seeding database:", err);
  }
};

// If run directly from CLI
if (process.argv[1].endsWith("seed.js")) {
  (async () => {
    await connectDB();
    await seedDatabase();
    await disconnectDB();
    process.exit(0);
  })();
}
