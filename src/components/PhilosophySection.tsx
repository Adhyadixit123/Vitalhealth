import { motion } from "framer-motion";

import { Quote } from "lucide-react";

const PhilosophySection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-background flex flex-col items-center">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block bg-primary/10 text-primary font-body font-semibold text-sm px-5 py-2 rounded-full mb-6"
          >
            Our Philosophy
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-heading font-extrabold text-[#111] leading-tight mb-12"
          >
            Person-Centered Support & <br className="hidden md:block" />
            Individualized Care
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 md:p-14 shadow-lg border border-gray-100/50 max-w-4xl w-full text-center relative mt-6"
          >
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-8">
              <Quote className="h-8 w-8 text-primary" />
            </div>

            <motion.p variants={itemVariants} className="text-[#555] font-body text-lg leading-relaxed mb-8">
              Vital Health was founded with the purpose of providing <strong>personalized residential support</strong> to people who have significant support needs.
            </motion.p>
            <motion.p variants={itemVariants} className="text-[#555] font-body text-base leading-relaxed mb-8">
              We provide residential care to individuals who experience developmental disabilities, helping them live a meaningful life in a home setting. We do this through a focus on <strong>Person-Centered</strong> practices.
            </motion.p>
            <motion.p variants={itemVariants} className="text-[#555] font-body text-base leading-relaxed mb-10 pb-10 border-b border-gray-200">
              Treating everyone with <strong>respect and dignity</strong> is fundamental to our approach. This enables each individual to strengthen their current talents and encourages them to develop new ones, finding balance between desires, staying healthy and safe, while building meaningful relationships.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-2xl font-heading italic text-primary font-bold"
            >
              "We help those we support reach for the stars to make their own dreams come true."
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophySection;
