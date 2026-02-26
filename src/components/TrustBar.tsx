import { motion } from "framer-motion";
import { Heart, Shield, Users, Clock, Home, Award } from "lucide-react";

const items = [
  { icon: Heart, label: "Person-Centered", desc: "Individual dreams and goals guide everything we do" },
  { icon: Shield, label: "Licensed & Trusted", desc: "Fully compliant with Virginia DBHDS standards" },
  { icon: Users, label: "Experienced Team", desc: "Trained professionals dedicated to quality care" },
  { icon: Clock, label: "24/7 Support", desc: "Round-the-clock care and emergency response" },
  { icon: Home, label: "True Home Environment", desc: "Safe, comfortable residential living" },
  { icon: Award, label: "Proven Track Record", desc: "Long-term placements with positive outcomes" },
];

const TrustBar = () => (
  <section className="py-16 bg-card">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center text-center p-4"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <item.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-heading text-sm font-bold text-foreground mb-1">{item.label}</h3>
            <p className="text-xs text-muted-foreground font-body leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
