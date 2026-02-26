import { motion } from "framer-motion";
import { Clock, Sparkles, BookOpen, MapPin, Users, ClipboardList } from "lucide-react";

const services = [
  {
    icon: Clock,
    title: "24/7 Staffing & Supervision",
    offerings: [
      "Round-the-clock care and support",
      "On-site staff at all times",
      "Emergency response available",
      "Consistent, reliable supervision",
    ],
  },
  {
    icon: Sparkles,
    title: "Personal Care & Daily Support",
    offerings: [
      "Personal care and hygiene assistance",
      "Meal preparation and nutrition",
      "Housekeeping and laundry services",
      "Medication reminders/assistance per care plan",
    ],
  },
  {
    icon: BookOpen,
    title: "Skill-Building & Independence",
    offerings: [
      "Daily living skills training",
      "Basic money-management support",
      "Social and communication skills",
      "Goal-setting and achievement tracking",
    ],
  },
  {
    icon: MapPin,
    title: "Community Involvement",
    offerings: [
      "Assistance to attend appointments and day programs",
      "Support for work or volunteering activities",
      "Community outings and activities",
      "Social engagement opportunities",
    ],
  },
  {
    icon: Users,
    title: "Team-Based Care Coordination",
    offerings: [
      "Coordination with Support Coordinators/Case Managers",
      "Regular communication with families and guardians",
      "Collaboration with medical providers",
      "Partnership with mental health professionals",
    ],
  },
  {
    icon: ClipboardList,
    title: "Person-Centered Planning",
    offerings: [
      "Individualized support plans for each resident",
      "Regular care plan reviews and updates",
      "Resident input and goal development",
      "Flexible support based on changing needs",
    ],
  },
];

const ServicesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="services" className="py-20 bg-card scroll-mt-20">
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
            At Vital Health, every service we offer is built around one question: what does this individual need to live a meaningful, fulfilling life?
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((svc) => (
            <motion.div
              key={svc.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-background rounded-xl p-7 shadow-sm hover:shadow-md transition-all border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <svc.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">{svc.title}</h3>
              <ul className="space-y-2.5">
                {svc.offerings.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground font-body">
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
