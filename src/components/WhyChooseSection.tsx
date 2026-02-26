import { motion } from "framer-motion";
import { Heart, Home, Users, MessageSquare, Shield } from "lucide-react";

const items = [
  { icon: Heart, title: "Person-Centered Care", desc: "Individualized support plans tailored to each resident's unique needs and goals" },
  { icon: Home, title: "Home-Like Environment", desc: "Calm, respectful, and family-style atmosphere that feels like home" },
  { icon: Users, title: "Trained, Caring Staff", desc: "Experienced professionals dedicated to supporting adults with developmental disabilities" },
  { icon: MessageSquare, title: "Strong Communication", desc: "We keep families and support teams informed with regular updates" },
  { icon: Shield, title: "Focus on Safety & Stability", desc: "Clear routines, proactive support, and consistent care environment that promotes well-being" },
];

const WhyChooseSection = () => (
  <section className="py-20 bg-secondary">
    <div className="container mx-auto px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Why Choose Guardian Health?
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
