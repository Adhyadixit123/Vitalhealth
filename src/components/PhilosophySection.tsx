import { motion } from "framer-motion";

import { Quote } from "lucide-react";

const PhilosophySection = () => (
  <section className="py-20 bg-background flex flex-col items-center">
    <div className="container mx-auto px-4 max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <span className="inline-block bg-primary/10 text-primary font-body font-semibold text-sm px-5 py-2 rounded-full mb-6">
          Our Philosophy
        </span>
        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-[#111] leading-tight mb-12">
          Person-Centered Support & <br className="hidden md:block" />
          Individualized Care
        </h2>

        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-lg border border-gray-100/50 max-w-4xl w-full text-center relative mt-6">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-8">
            <Quote className="h-8 w-8 text-primary" />
          </div>

          <p className="text-[#555] font-body text-lg leading-relaxed mb-8">
            Guardian Health was founded with the purpose of providing <strong>personalized residential support</strong> to people who have significant support needs.
          </p>
          <p className="text-[#555] font-body text-base leading-relaxed mb-8">
            We provide residential care to individuals who experience developmental disabilities, helping them live a meaningful life in a home setting. We do this through a focus on <strong>Person-Centered</strong> practices.
          </p>
          <p className="text-[#555] font-body text-base leading-relaxed mb-10 pb-10 border-b border-gray-200">
            Treating everyone with <strong>respect and dignity</strong> is fundamental to our approach. This enables each individual to strengthen their current talents and encourages them to develop new ones, finding balance between desires, staying healthy and safe, while building meaningful relationships.
          </p>

          <p className="text-2xl font-heading italic text-primary font-bold">
            "We help those we support reach for the stars to make their own dreams come true."
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default PhilosophySection;
