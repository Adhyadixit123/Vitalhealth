import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 text-primary-foreground/80 font-body text-sm">
        <div>
          <h3 className="font-heading font-bold text-primary-foreground text-lg mb-3">Guardian Health</h3>
          <p className="leading-relaxed">
            Licensed Adult DD Residential Home serving Virginia families since 2020. Virginia DBHDS Licensed.
          </p>
        </div>
        <div>
          <h3 className="font-heading font-bold text-primary-foreground text-base mb-3">Quick Links</h3>
          <div className="space-y-2">
            {["Services", "Our Home", "About Us", "Partners", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="block hover:text-primary-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-primary-foreground text-base mb-3">Contact</h3>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <a href="tel:8047284466" className="hover:text-primary-foreground">(804) 728-4466</a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a href="mailto:info@guardianhealthva.com" className="hover:text-primary-foreground">info@guardianhealthva.com</a>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5" />
            <span>11907 Chislet CT, Midlothian, VA 23112</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-primary-foreground/60 font-body text-xs">
        © 2026 Guardian Health. Licensed Adult DD Residential Home. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
