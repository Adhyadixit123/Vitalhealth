import { motion } from "framer-motion";
import { Clock, Sparkles, BookOpen, MapPin, Users, ClipboardList } from "lucide-react";

const services = [
  {
    icon: Clock,
    title: "24/7 Staffing & Supervision",
    offerings: "On-site staff at all times, emergency response, consistent supervision",
  },
  {
    icon: Sparkles,
    title: "Personal Care & Daily Support",
    offerings: "Hygiene assistance, meal prep, housekeeping, medication reminders per care plan",
  },
  {
    icon: BookOpen,
    title: "Skill-Building & Independence",
    offerings: "Daily living skills, money management, social/communication skills, goal tracking",
  },
  {
    icon: MapPin,
    title: "Community Involvement",
    offerings: "Appointment transport, day programs, work/volunteer support, community outings",
  },
  {
    icon: Users,
    title: "Team-Based Care Coordination",
    offerings: "Coordination with support coordinators, families, medical providers, mental health professionals",
  },
  {
    icon: ClipboardList,
    title: "Person-Centered Planning",
    offerings: "Individualized support plans, regular reviews, resident input, flexible support",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-20 bg-secondary scroll-mt-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          Comprehensive Supports & Services
        </h2>
        <p className="text-lg text-muted-foreground font-body max-w-3xl mx-auto">
          At Guardian Health, every service we offer is built around one question: what does this individual need to live a meaningful, fulfilling life?
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc, i) => (
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svc.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">{svc.title}</h3>
            <p className="text-sm text-muted-foreground font-body">{svc.offerings}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
