import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import PhilosophySection from "@/components/PhilosophySection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import LifeAtGuardianSection from "@/components/LifeAtGuardianSection";
import LivingSection from "@/components/LivingSection";
import FacilityGallery from "@/components/FacilityGallery";
import LocationSection from "@/components/LocationSection";
import PartnersSection from "@/components/PartnersSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <PhilosophySection />
      <ServicesSection />
      <WhyChooseSection />
      <LifeAtGuardianSection />
      <LivingSection />
      <FacilityGallery />
      <LocationSection />
      <PartnersSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
