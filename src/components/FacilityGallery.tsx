import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gallery0893 from "@/assets/New folder/IMG_0893.jpg";
import gallery0894 from "@/assets/New folder/IMG_0894.jpg";
import gallery0898 from "@/assets/New folder/IMG_0898.jpg";
import gallery0900 from "@/assets/New folder/IMG_0900.jpg";
import gallery0902 from "@/assets/New folder/IMG_0902.jpg";
import gallery0905 from "@/assets/New folder/IMG_0905.jpg";
import gallery0910 from "@/assets/New folder/IMG_0910.jpg";
import { useMedia } from "@/hooks/useMedia";

const fallbackSlides = [
  { src: gallery0893, title: "Front Exterior", desc: "Welcoming entrance along a quiet Richmond street" },
  { src: gallery0894, title: "Living Lounge", desc: "Bright communal lounge for daily activities" },
  { src: gallery0898, title: "Private Bedroom", desc: "Comfortable resident room with natural light" },
  { src: gallery0900, title: "Dining Area", desc: "Family-style dining table for meals and conversation" },
  { src: gallery0902, title: "Kitchen", desc: "Fully-equipped kitchen for home-cooked meals" },
  { src: gallery0905, title: "Accessible Bathroom", desc: "Clean, well-maintained bath with safety features" },
  { src: gallery0910, title: "Outdoor Patio", desc: "Backyard space for fresh air and relaxation" },
];

const FacilityGallery = () => {
  const { data: galleryMedia, isLoading } = useMedia("gallery", 12);
  const slides = useMemo(() => {
    if (!galleryMedia?.length) {
      return fallbackSlides;
    }

    return galleryMedia
      .filter((item) => Boolean(item.image_url))
      .map((item, index) => ({
        src: item.image_url!,
        title: item.heading || `Gallery ${index + 1}`,
        desc: item.description || item.section || "Life at Vital Health",
      }));
  }, [galleryMedia]);

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
            {slides[current]?.src ? (
              <motion.img
                key={slides[current].src}
                src={slides[current].src}
                alt={slides[current].title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <motion.div
                key={`placeholder-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-sm"
              >
                Image coming soon
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <h3 className="text-2xl font-heading font-semibold">{slides[current].title}</h3>
            <p className="text-sm text-white/80">{slides[current].desc}</p>
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
                className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-primary-foreground" : "w-2 bg-primary-foreground/50"
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
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${i === current
                  ? "border-primary shadow-md scale-105"
                  : "border-transparent opacity-70 hover:opacity-100"
                }`}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading="lazy"
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
            href="tel:9526889026"
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
