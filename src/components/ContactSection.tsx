import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll respond within 24 hours." });
    setForm({ name: "", email: "", phone: "", role: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Whether you're a family exploring options or a placement professional seeking a reliable partner — we'd love to hear from you. We respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-sm">Address</h3>
                <p className="text-muted-foreground font-body text-sm">11907 Chislet CT, Midlothian, VA 23112</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-sm">Phone</h3>
                <a href="tel:8047284466" className="text-primary font-body text-sm hover:underline">(804) 728-4466</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-sm">Email</h3>
                <a href="mailto:info@guardianhealthva.com" className="text-primary font-body text-sm hover:underline">info@guardianhealthva.com</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-sm">Office Hours</h3>
                <p className="text-muted-foreground font-body text-sm">Monday – Friday: 9:00 AM – 5:00 PM</p>
                <p className="text-muted-foreground font-body text-sm">Emergency Support: 24/7</p>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-lg overflow-hidden shadow-sm border border-border mt-4">
              <iframe
                title="Guardian Health Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.5!2d-77.65!3d37.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI3JzAwLjAiTiA3N8KwMzknMDAuMCJX!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-lg p-8 shadow-sm border border-border space-y-5">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">Full Name *</label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
                className="font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">Email Address *</label>
              <Input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">Phone Number</label>
              <Input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(xxx) xxx-xxxx"
                className="font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">I am a:</label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                <SelectTrigger className="font-body">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Family / Guardian</SelectItem>
                  <SelectItem value="coordinator">Support Coordinator</SelectItem>
                  <SelectItem value="case-manager">Case Manager</SelectItem>
                  <SelectItem value="agency">State Agency</SelectItem>
                  <SelectItem value="medical">Medical Facility</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1">How can we help? *</label>
              <Textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your needs..."
                className="font-body"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-deep-red font-body font-semibold py-6 text-base">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
