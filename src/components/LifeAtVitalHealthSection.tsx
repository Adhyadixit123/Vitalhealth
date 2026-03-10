import { motion } from "framer-motion";
import communityImg from "@/assets/magazine-community.jpg";
import walkingImg from "@/assets/magazine-walking.jpg";
import { useMediaImage } from "@/hooks/useMedia";

const LifeAtVitalHealthSection = () => {
  const { url: communityImage } = useMediaImage("life-community", communityImg);
  const { url: activitiesImage } = useMediaImage("life-activities", walkingImg);

  const renderImage = (src: string, alt: string) => {
    if (!src) {
      return (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
          Image coming soon
        </div>
      );
    }

    return <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />;
  };

  return (
    <section className="py-0 bg-background">
      {/* Full-width editorial banner */}
      <div className="text-center py-16 px-4">
        <span className="inline-block bg-primary/10 text-primary font-body font-semibold text-sm px-5 py-2 rounded-full mb-6">
          Life at Vital Health
        </span>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
          Comfortable Residential Living
        </h2>
        <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
          A safe, home-like environment where residents receive personalized care and support
        </p>
      </div>

      {/* Magazine-style two-column photo spread */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid md:grid-cols-2 gap-6 md:gap-8 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden aspect-[4/3] rounded-3xl"
        >
          {renderImage(communityImage, "Community life at Vital Health")}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden aspect-[4/3] rounded-3xl"
        >
          {renderImage(activitiesImage, "Supportive care at Vital Health")}
        </motion.div>
      </div>
    </section>
  );
};

export default LifeAtVitalHealthSection;
