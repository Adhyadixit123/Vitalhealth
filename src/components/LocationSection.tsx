import { motion } from "framer-motion";
import aerialImg from "@/assets/magazine-aerial.jpg";
import exteriorImg from "@/assets/gallery-exterior.jpg";
import mealsImg from "@/assets/magazine-meals.jpg";
import backyardImg from "@/assets/gallery-backyard.jpg";
import { useMedia, useMediaImage } from "@/hooks/useMedia";

const features = [
  { title: "Comfortable Living Spaces", desc: "Well-maintained residential home with indoor and outdoor areas" },
  { title: "Safe, Quiet Neighborhood", desc: "Peaceful residential area with nearby amenities and medical facilities" },
  { title: "Experienced Care Staff", desc: "Trained professionals dedicated to resident well-being and support" },
  { title: "On-Site Staff 24/7", desc: "Round-the-clock care and supervision for safety and support" },
];

const fallbackGrid = [
  { src: aerialImg, alt: "Aerial view of Vital Health home" },
  { src: mealsImg, alt: "Home-cooked meals" },
  { src: backyardImg, alt: "Beautiful backyard" },
];

const LocationSection = () => {
  const { url: heroImageUrl } = useMediaImage("location-hero", exteriorImg);
  const { data: gridMedia } = useMedia("location-grid", 3);

  const gridImages = fallbackGrid.map((fallback, index) => {
    const item = gridMedia?.[index];
    return {
      src: item?.image_url || fallback.src,
      alt: item?.heading || fallback.alt,
      placeholder: !item?.image_url,
    };
  });

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-16">
          <span className="inline-block bg-primary/10 text-primary font-body font-semibold text-sm px-5 py-2 rounded-full mb-6">
            Our Location & Team
          </span>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                A Safe, Welcoming Home in Richmond
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                Our residential facility is located in a quiet, safe neighborhood in Richmond, Virginia. The home features comfortable living spaces and all the amenities needed for quality residential care.
              </p>
              <div className="space-y-6">
                {features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-3 h-3 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-heading font-bold text-foreground">{f.title}</h3>
                      <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Visit CTA */}
              <div className="mt-8 bg-primary rounded-lg p-6">
                <h3 className="font-heading font-bold text-primary-foreground text-lg mb-1">Visit Us:</h3>
                <p className="text-primary-foreground font-body text-lg">2201 National St, Richmond, VA 23231</p>
                <p className="text-primary-foreground/80 font-body text-sm mt-1">Schedule a tour to see our facility and meet our staff in person</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              {heroImageUrl ? (
                <img src={heroImageUrl} alt="Vital Health residential home exterior" className="w-full h-auto" loading="lazy" />
              ) : (
                <div className="w-full h-64 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                  Image coming soon
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Magazine photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {gridImages.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={idx === 0 ? "col-span-2 row-span-2 rounded-xl overflow-hidden" : "rounded-xl overflow-hidden"}
            >
              {image.src ? (
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">Image coming soon</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
