import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Our Home", href: "#our-home" },
    { label: "About Us", href: "#about" },
    { label: "Placement Partners", href: "#different" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/85 backdrop-blur-md shadow-sm border-b border-gray-100 py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2">
          <span className="font-heading text-2xl md:text-3xl font-black text-primary tracking-tight">
            Guardian Health
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-[#111111] hover:text-primary font-body text-sm font-semibold transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a href="tel:8047284466">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold gap-2 rounded-xl h-12 px-6">
              <Phone className="h-4 w-4" />
              Get Started
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 pb-6 shadow-2xl absolute w-full left-0 mt-3">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left py-4 text-[#111111] hover:text-primary font-body text-lg font-semibold border-b border-gray-50 last:border-0"
            >
              {link.label}
            </button>
          ))}
          <a href="tel:8047284466" className="mt-6 block">
            <Button className="w-full bg-primary text-white hover:bg-primary/90 font-body font-bold gap-2 py-6 text-lg rounded-xl">
              <Phone className="h-5 w-5" />
              (804) 728-4466
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
