import { motion } from "framer-motion";
import { Bed, UtensilsCrossed, Sofa, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Bed,
    title: "Private & Semi-Private Rooms",
    desc: "Each resident has their own comfortable, personalized space — clean, accessible, and designed for independence with room to add personal touches.",
  },
  {
    icon: UtensilsCrossed,
    title: "Nutritious Home-Cooked Meals",
    desc: "Meals served daily accommodating dietary needs and preferences. Mealtimes are opportunities for community and conversation.",
  },
  {
    icon: Sofa,
    title: "Common Living Areas",
    desc: "Comfortable spaces for socializing, watching TV, playing games, and enjoying time with housemates and staff.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Support",
    desc: "Trained staff provide individualized assistance with daily living, medication management, and personal care with dignity and respect.",
  },
];

const LivingSection = () => (
  <section className="py-20 bg-secondary">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          Comfortable Residential Living
        </h2>
        <p className="text-lg text-muted-foreground font-body max-w-3xl mx-auto">
          Our Midlothian home is more than a care facility — it is a real home. Residents enjoy private rooms, daily home-cooked meals, shared living spaces, and individualized support every single day.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex gap-4 bg-card rounded-lg p-6 border border-border"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LivingSection;
