import { motion } from "framer-motion";
import { Heart, Home, Users, MessageSquare, Shield } from "lucide-react";

const items = [
  { icon: Heart, title: "Person-Centered Care", desc: "Individualized support plans tailored to each resident's unique needs and goals" },
  { icon: Home, title: "Home-Like Environment", desc: "Calm, respectful, and family-style atmosphere that feels like home" },
  { icon: Users, title: "Trained, Caring Staff", desc: "Experienced professionals dedicated to supporting adults with developmental disabilities" },
  { icon: MessageSquare, title: "Strong Communication", desc: "We keep families and support teams informed with regular updates" },
  { icon: Shield, title: "Focus on Safety & Stability", desc: "Clear routines, proactive support, and consistent care environment that promotes well-being" },
];

const WhyChooseSection = () => {
  const listVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const listItemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-[#111] leading-tight mb-6">
              Why Choose Our Care <br className="hidden md:block" />
              Home?
            </h2>
            <p className="text-[#555] font-body text-lg leading-relaxed mb-10 max-w-xl">
              We understand that choosing the right residential care is one of the most important decisions you'll make. Our commitment to excellence, compassion, and dignity sets us apart.
            </p>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                "Licensed and fully compliant with Virginia regulations",
                "Experienced team with specialized DD care training",
                "Small, intimate residential setting for personalized attention",
                "Emphasis on daily living skills and independence",
                "Nutritious meal planning accommodating dietary needs",
                "Transportation assistance for medical and recreational activities",
                "Family involvement encouraged and valued",
                "Beautiful, accessible facilities in a safe neighborhood",
              ].map((text, i) => (
                <motion.li
                  key={i}
                  variants={listItemVariants}
                  className="flex gap-3 text-base text-[#444] font-medium items-start"
                >
                  <div className="mt-[2px] w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 lg:mt-16"
          >
            <div className="bg-primary rounded-3xl p-6 lg:p-8 shadow-xl">
              <div className="bg-white rounded-xl p-8 lg:p-12 h-full flex flex-col justify-center shadow-sm">
                <h3 className="text-2xl font-bold font-heading text-[#111] mb-6">Our Commitment</h3>
                <p className="text-[#555] text-lg leading-relaxed mb-12">
                  Every individual deserves to live with dignity, respect, and the opportunity to thrive. We're dedicated to creating a residential environment where residents feel valued, supported, and empowered to reach their full potential.
                </p>
                <p className="text-[#666] italic border-t border-gray-100 pt-8 text-base">
                  *Our mission is to provide not just care, but a true residential home where every resident can flourish and live their best life.*
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
