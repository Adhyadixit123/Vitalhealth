import { motion } from "framer-motion";

const values = [
  { name: "Dignity & Respect", desc: "We treat every individual as a whole person, not a diagnosis." },
  { name: "Person-Centered Practice", desc: "Individual goals guide our care, not institutional convenience." },
  { name: "Transparency", desc: "Families and placement professionals always know what's happening." },
  { name: "Stability", desc: "We are committed to long-term placements and consistent care relationships." },
  { name: "Community", desc: "We support residents to be active, connected members of their community." },
];

const AboutSection = () => (
  <section id="about" className="py-20 bg-background scroll-mt-20">
    <div className="container mx-auto px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          Serving Virginia Families Since 2020
        </h2>
        <blockquote className="text-lg italic text-primary font-heading mb-8 max-w-3xl mx-auto">
          "To provide compassionate, personalized residential support to adults with developmental disabilities — empowering each individual to live with dignity, independence, and purpose in a true home environment."
        </blockquote>
        <p className="text-muted-foreground font-body leading-relaxed mb-6">
          Guardian Health was founded in 2020 with a clear purpose: to fill a gap in quality residential care for adults with significant support needs in Virginia. From day one, our approach has been guided by Person-Centered practices — the belief that every individual's unique goals, preferences, and dreams should be at the center of everything we do.
        </p>
        <p className="text-muted-foreground font-body leading-relaxed">
          Since opening our Midlothian home, we have built a track record of stable, long-term placements and positive outcomes. Our team is trained specifically in developmental disabilities care, and we hold full compliance with all Virginia DBHDS licensing requirements.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        {values.map((v, i) => (
          <motion.div
            key={v.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-card border border-border rounded-lg p-5"
          >
            <h3 className="font-heading text-sm font-bold text-primary mb-1">{v.name}</h3>
            <p className="text-sm text-muted-foreground font-body">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
