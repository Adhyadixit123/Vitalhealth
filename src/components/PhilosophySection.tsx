import { motion } from "framer-motion";

const PhilosophySection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4 max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
          Person-Centered Support & Individualized Care
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed mb-8">
          Guardian Health was founded with the purpose of providing personalized residential support to people who have significant support needs. We provide residential care to individuals who experience developmental disabilities, helping them live a meaningful life in a home setting through a dedicated focus on Person-Centered practices.
        </p>
        <p className="text-lg text-muted-foreground font-body leading-relaxed mb-10">
          Treating everyone with respect and dignity is fundamental to our approach. This enables each individual to strengthen their current talents, encourages them to develop new ones, and finds balance between desires, health, safety, and building meaningful relationships.
        </p>
        <blockquote className="border-l-4 border-primary pl-6 py-2 text-left">
          <p className="text-xl font-heading italic text-foreground">
            "We help those we support reach for the stars to make their own dreams come true."
          </p>
        </blockquote>
      </motion.div>
    </div>
  </section>
);

export default PhilosophySection;
