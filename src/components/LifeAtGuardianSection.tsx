import { motion } from "framer-motion";
import communityImg from "@/assets/magazine-community.jpg";
import walkingImg from "@/assets/magazine-walking.jpg";

const LifeAtGuardianSection = () => (
  <section className="py-0 bg-background">
    {/* Full-width editorial banner */}
    <div className="text-center py-16 px-4">
      <span className="inline-block bg-primary/10 text-primary font-body font-semibold text-sm px-5 py-2 rounded-full mb-6">
        Life at Guardian Health
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
        <img src={communityImg} alt="Community life at Guardian Health" className="w-full h-full object-cover" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden aspect-[4/3] rounded-3xl"
      >
        <img src={walkingImg} alt="Supportive care at Guardian Health" className="w-full h-full object-cover" />
      </motion.div>
    </div>
  </section>
);

export default LifeAtGuardianSection;
