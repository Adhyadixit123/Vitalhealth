import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/gallery-exterior.jpg";

const HeroSection = () => {
  const containerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative min-h-[100dvh] sm:min-h-[92vh] flex overflow-hidden pt-24 pb-6 sm:py-32">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="absolute inset-0 bg-white/90 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:via-white/80 sm:to-white/20" />

      <div className="relative z-10 container mx-auto px-4 text-center lg:text-left h-full flex flex-col justify-end sm:justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start"
        >
          <motion.div variants={itemVariants} className="inline-block bg-primary text-primary-foreground font-body font-semibold text-xs sm:text-sm px-4 py-1.5 sm:px-5 sm:py-2 rounded-full mb-4 sm:mb-6">
            Serving Virginia Families Since 2020
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-[#111111] leading-tight mb-4 sm:mb-6">
            Residential Care in <br className="hidden sm:block" />
            <span className="text-primary">Virginia</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-[#333] font-body mb-6 sm:mb-8 max-w-2xl text-center lg:text-left font-medium">
            We support people to live the lives they find meaningful and fulfilling through quality residential care for adults with developmental disabilities.
          </motion.p>

          <motion.div variants={itemVariants} className="bg-white/95 backdrop-blur border-l-4 border-l-primary rounded-r-xl rounded-l-sm p-5 sm:p-6 mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0 text-left shadow-sm hover:shadow-md transition-shadow duration-300">
            <p className="text-[#444] font-body text-sm sm:text-base leading-relaxed">
              <strong className="text-primary font-bold">Trusted Placement Partner:</strong> Our person-centered approach and proven stability make transitions smooth for professionals, families, and the individuals we serve. Quick response, transparent communication, 24/7 support.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-row gap-2 sm:gap-4 justify-center lg:justify-start w-full sm:w-auto mt-2 sm:mt-0">
            <a href="#contact" className="flex-1 sm:flex-none">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold text-xs sm:text-base px-2 sm:px-8 py-6 gap-1 sm:gap-2 rounded-xl h-auto">
                Get Started
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-0 sm:ml-1" />
              </Button>
            </a>
            <a href="#services" className="flex-1 sm:flex-none">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white border-gray-200 text-[#111111] hover:bg-gray-50 hover:text-primary font-body font-semibold text-xs sm:text-base px-2 sm:px-8 py-6 gap-1 sm:gap-2 rounded-xl shadow-sm h-auto text-wrap text-center leading-tight">
                Learn More
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
