import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/gallery-exterior.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/40" />

      <div className="relative z-10 container mx-auto px-4 py-32 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto lg:mx-0"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
            Residential Care in Virginia — Where Every Individual Thrives
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 font-body mb-10 max-w-2xl">
            Guardian Health provides compassionate, person-centered residential support for adults with developmental disabilities in a safe, home-like setting in Midlothian, Virginia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent font-body font-semibold text-base px-8 py-6 gap-2">
                <Phone className="h-5 w-5" />
                Get Started Today
              </Button>
            </a>
            <a href="#services">
              <Button size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-body font-semibold text-base px-8 py-6 gap-2">
                Learn More
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
