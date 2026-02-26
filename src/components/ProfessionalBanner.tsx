import { motion } from "framer-motion";
import { CheckCircle2, Award, Calendar } from "lucide-react";
import { Button } from "./ui/button";

const ProfessionalBanner = () => {
    return (
        <section className="py-24 bg-primary text-primary-foreground relative">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-heading font-extrabold mb-8">
                            Why Professionals Choose Us
                        </h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <CheckCircle2 className="h-6 w-6 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-lg">Licensed & Compliant</h3>
                                    <p className="opacity-90">Fully licensed by Virginia DBHDS with all required certifications</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Award className="h-6 w-6 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-lg">Experienced Team</h3>
                                    <p className="opacity-90">Specialized training in DD care and behavioral support</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Calendar className="h-6 w-6 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-lg">Proven Track Record</h3>
                                    <p className="opacity-90">Successful placements with long-term stability and positive outcomes</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white text-foreground rounded-2xl p-8 lg:p-10 shadow-xl"
                    >
                        <h3 className="text-2xl font-bold font-heading mb-4">Ready to Discuss a Placement?</h3>
                        <p className="text-[#555] mb-8">
                            Contact us today for a consultation, facility tour, or to discuss current availability. We respond to all inquiries within 24 hours.
                        </p>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 px-8 rounded-xl text-lg mb-6">
                            Schedule a Consultation
                        </Button>
                        <p className="text-center text-[#555]">
                            Call us directly: <strong className="text-primary font-bold">(804) 728-4466</strong>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProfessionalBanner;
