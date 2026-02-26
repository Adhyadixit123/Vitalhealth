import { motion } from "framer-motion";
import { Zap, Eye, PhoneCall, FileText, UserCheck, BarChart3 } from "lucide-react";

const differentiators = [
  { icon: Zap, title: "Quick Response Time", desc: "We respond to placement inquiries within 24 hours and can arrange facility tours within 48 hours." },
  { icon: Eye, title: "Full Transparency", desc: "Clear documentation, regular reporting, and open communication — you always know how your client is doing." },
  { icon: PhoneCall, title: "Crisis Support", desc: "24/7 emergency line. Our experienced staff handle behavioral challenges and coordinate with medical professionals." },
  { icon: FileText, title: "Streamlined Intake", desc: "Simplified admission process with all required documentation handled efficiently." },
  { icon: UserCheck, title: "Direct Communication", desc: "Dedicated point of contact for each professional partner — no phone trees or bureaucracy." },
  { icon: BarChart3, title: "Progress Documentation", desc: "Detailed progress notes, incident reports, and care plan updates on your preferred schedule." },
];

const PartnersSection = () => (
  <section id="partners" className="py-20 bg-primary scroll-mt-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
          Built for Professionals Who Need Reliability
        </h2>
        <p className="text-lg text-primary-foreground/80 font-body max-w-3xl mx-auto">
          When you need a residential placement you can count on, Guardian Health delivers the professionalism, stability, and communication that makes your job easier.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {differentiators.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20"
          >
            <d.icon className="h-8 w-8 text-primary-foreground mb-3" />
            <h3 className="font-heading text-base font-bold text-primary-foreground mb-2">{d.title}</h3>
            <p className="text-sm text-primary-foreground/80 font-body">{d.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersSection;
