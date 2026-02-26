import React, { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";

// Lazy load sections below the fold
const PhilosophySection = lazy(() => import("@/components/PhilosophySection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ProfessionalBanner = lazy(() => import("@/components/ProfessionalBanner"));
const WhyChooseSection = lazy(() => import("@/components/WhyChooseSection"));
const LifeAtVitalHealthSection = lazy(() => import("@/components/LifeAtVitalHealthSection"));
const LivingSection = lazy(() => import("@/components/LivingSection"));
const FacilityGallery = lazy(() => import("@/components/FacilityGallery"));
const LocationSection = lazy(() => import("@/components/LocationSection"));
const PartnersSection = lazy(() => import("@/components/PartnersSection"));
const CallToActionBanner = lazy(() => import("@/components/CallToActionBanner"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <Suspense fallback={<div className="h-20" />}>
        <PhilosophySection />
        <ServicesSection />
        <ProfessionalBanner />
        <WhyChooseSection />
        <LifeAtVitalHealthSection />
        <LivingSection />
        <FacilityGallery />
        <LocationSection />
        <PartnersSection />
        <CallToActionBanner />
        <ContactSection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
