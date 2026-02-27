import { motion } from "framer-motion";
import { Button } from "./ui/button";

const CallToActionBanner = () => {
    return (
        <section className="py-20 bg-background text-center px-4">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-primary rounded-3xl p-10 md:p-16 shadow-2xl"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-primary-foreground mb-6">
                        We Make Your Job Easier
                    </h2>
                    <p className="text-lg md:text-xl text-primary-foreground/90 font-body mb-10 max-w-3xl mx-auto leading-relaxed">
                        Stop worrying about placement stability. Our track record speaks for itself - long-term
                        placements, satisfied families, and positive outcomes. When you place someone with us, you can
                        trust they're in good hands.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                        <Button className="bg-white text-primary hover:bg-gray-100 font-bold py-6 px-10 rounded-xl text-lg shadow-sm">
                            Schedule a Facility Tour
                        </Button>
                        <Button className="bg-white text-primary hover:bg-gray-100 font-bold py-6 px-10 rounded-xl text-lg shadow-sm">
                            Contact Admissions
                        </Button>
                    </div>

                    <p className="text-primary-foreground/90 text-sm md:text-base">
                        Call us directly: <strong className="font-bold text-white">(952) 688-9026</strong> | Available 24/7 for emergencies
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default CallToActionBanner;
