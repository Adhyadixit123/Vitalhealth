import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import galleryExterior from "@/assets/gallery-exterior.jpg";
import galleryBedroom from "@/assets/gallery-bedroom.jpg";
import galleryLiving from "@/assets/gallery-living.jpg";
import galleryKitchen from "@/assets/gallery-kitchen.jpg";
import galleryBathroom from "@/assets/gallery-bathroom.jpg";
import galleryBackyard from "@/assets/gallery-backyard.jpg";
import galleryCommon from "@/assets/gallery-common.jpg";

const slides = [
  { src: galleryExterior, title: "Our Home", desc: "A welcoming residential care home in Midlothian, VA" },
  { src: galleryBedroom, title: "Private Bedrooms", desc: "Comfortable sleeping quarters for our residents" },
  { src: galleryLiving, title: "Dining & Living Area", desc: "Comfortable spaces for relaxation and socializing" },
  { src: galleryKitchen, title: "Full Kitchen", desc: "Nutritious home-cooked meals prepared daily" },
  { src: galleryCommon, title: "Common Area", desc: "Shared spaces for games, reading, and community time" },
  { src: galleryBathroom, title: "Accessible Bathroom", desc: "Clean, safe, and accessible facilities" },
  { src: galleryBackyard, title: "Outdoor Spaces", desc: "Beautiful backyard for relaxation and fresh air" },
];

const FacilityGallery = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  return (
    <section id="our-home" className="py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Explore Our Facility
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Take a virtual tour of our comfortable and welcoming residential care home
          </p>
        </div>

        {/* Main slideshow */}
        <div className="relative max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg bg-foreground/5 aspect-video">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={slides[current].src}
              alt={slides[current].title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover absolute inset-0"
            />
          </AnimatePresence>

          {/* Overlay text */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-1">
              {slides[current].title}
            </h3>
            <p className="text-primary-foreground/80 font-body">
              {slides[current].desc}
            </p>
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 hover:bg-card flex items-center justify-center shadow-md transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 hover:bg-card flex items-center justify-center shadow-md transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-6 bg-primary-foreground" : "w-2 bg-primary-foreground/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail grid */}
        <div className="max-w-5xl mx-auto mt-6 grid grid-cols-4 sm:grid-cols-7 gap-2 md:gap-3">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                i === current
                  ? "border-primary shadow-md scale-105"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Tour CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground font-body mb-3">
            Want to see more? Schedule an in-person tour today
          </p>
          <a
            href="tel:8047284466"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-body font-semibold hover:bg-deep-green transition-colors"
          >
            Schedule a Visit
          </a>
        </div>
      </div>
    </section>
  );
};

export default FacilityGallery;
