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
    <div className="grid md:grid-cols-2 gap-0">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden aspect-[4/3]"
      >
        <img src={communityImg} alt="Community life at Guardian Health" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent p-8">
          <h3 className="text-2xl font-heading font-bold text-primary-foreground">Community & Connection</h3>
          <p className="text-primary-foreground/80 font-body text-sm mt-1">Meaningful relationships in a supportive environment</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden aspect-[4/3]"
      >
        <img src={walkingImg} alt="Supportive care at Guardian Health" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent p-8">
          <h3 className="text-2xl font-heading font-bold text-primary-foreground">Compassionate Support</h3>
          <p className="text-primary-foreground/80 font-body text-sm mt-1">Dignity-first care from trained professionals</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default LifeAtGuardianSection;
