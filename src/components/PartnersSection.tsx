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
  <section id="different" className="py-20 bg-gray-50/50">
    <div className="container mx-auto px-4 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#111] mb-6">
          What Makes Us Different
        </h2>
        <p className="text-lg text-[#555] font-body max-w-2xl mx-auto">
          When you're looking for reliable, stable placement, we deliver the professionalism and quality care that sets your mind at ease.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {differentiators.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow"
          >
            <d.icon className="h-8 w-8 text-primary mb-5" />
            <h3 className="font-heading text-xl font-bold text-[#111] mb-3">{d.title}</h3>
            <p className="text-[#666] font-body text-sm leading-relaxed">{d.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersSection;
