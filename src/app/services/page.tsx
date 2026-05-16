"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Filter, Palette, MessageCircle, Check } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const servicesData = [
  {
    icon: TrendingUp,
    title: "Meta Ads",
    price: "From ₦150,000/month",
    description: "Facebook & Instagram advertising that delivers measurable ROI for Nigerian businesses.",
    features: ["Campaign strategy", "Ad creative", "A/B testing", "Weekly reporting", "Pixel setup & optimisation"],
  },
  {
    icon: Users,
    title: "Lead Generation",
    price: "From ₦200,000/month",
    description: "Done-for-you lead systems that fill your pipeline with qualified prospects ready to buy.",
    features: ["Landing page build", "Lead magnet creation", "CRM integration", "Daily lead delivery", "Follow-up sequences"],
  },
  {
    icon: Target,
    title: "Brand Strategy & Identity",
    price: "From ₦250,000 (one-time)",
    description: "Professional brand identity built for Nigerian audiences that stands out in crowded markets.",
    features: ["Logo & visual identity", "Brand guidelines", "Tone of voice", "Competitor analysis", "Brand positioning"],
  },
  {
    icon: Filter,
    title: "Sales Funnel Building",
    price: "From ₦300,000 (one-time)",
    description: "High-converting sales funnels that turn visitors into customers automatically.",
    features: ["Funnel strategy", "Page design & build", "Email sequences", "Payment integration", "Analytics setup"],
  },
  {
    icon: Palette,
    title: "Content Marketing & Creatives",
    price: "From ₦100,000/month",
    description: "Scroll-stopping ad content designed for local audiences to maximise engagement.",
    features: ["Ad graphics & videos", "Caption writing", "Content calendar", "Platform-optimised formats"],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Marketing Automation",
    price: "From ₦120,000/month",
    description: "Nigeria's #1 sales channel — automated for maximum conversions and lead nurturing.",
    features: ["Broadcast campaigns", "Chatbot setup", "Lead nurturing sequences", "Order & booking automation"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy py-24">
        <div className="container-custom text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold text-white font-syne mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Comprehensive digital marketing solutions tailored for Nigerian businesses
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="space-y-16">
            {servicesData.map((service, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="p-8 md:p-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <service.icon className="text-gold" size={32} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-navy">{service.title}</h2>
                      <p className="text-gold font-bold text-xl mt-2">{service.price}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg mb-6">{service.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="text-gold" size={18} />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/book"
                    className="inline-block bg-gold text-navy font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
                  >
                    Get Started →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gold py-16">
        <div className="container-custom text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
              Not sure which service fits your business?
            </h2>
            <p className="text-navy text-lg mb-6">Call us on {CONTACT.phone} and we'll guide you — for free.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={CONTACT.telLink} className="bg-navy text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform">
                Call {CONTACT.phone}
              </a>
              <Link href="/book" className="bg-white text-navy font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform">
                Book a Free Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}