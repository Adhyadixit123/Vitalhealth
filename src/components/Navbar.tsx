import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Our Home", href: "#our-home" },
    { label: "About Us", href: "#about" },
    { label: "Placement Partners", href: "#partners" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#" className="font-heading text-xl font-bold text-primary-foreground tracking-tight">
          Guardian Health
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-primary-foreground/90 hover:text-primary-foreground font-body text-sm font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a href="tel:8047284466">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-body font-semibold gap-2">
              <Phone className="h-4 w-4" />
              Get Started
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/10 px-4 pb-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left py-3 text-primary-foreground/90 hover:text-primary-foreground font-body text-base border-b border-primary-foreground/10 last:border-0"
            >
              {link.label}
            </button>
          ))}
          <a href="tel:8047284466" className="mt-3 block">
            <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-body font-semibold gap-2">
              <Phone className="h-4 w-4" />
              (804) 728-4466
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
