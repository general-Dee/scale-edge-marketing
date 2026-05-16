"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Phone, Target, Eye, Lightbulb, Heart, Shield } from "lucide-react";
import { CONTACT, OFFICES } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const teamMembers = [
  { name: "Ahmad Bello", role: "CEO & Founder", office: "Abuja", initials: "AB" },
  { name: "Fatima Umar", role: "Head of Strategy", office: "Abuja", initials: "FU" },
  { name: "Ibrahim Musa", role: "Lead Meta Ads Specialist", office: "Kano", initials: "IM" },
  { name: "Aisha Abdullahi", role: "Creative Director", office: "Kaduna", initials: "AA" },
  { name: "Usman Danladi", role: "Sales Funnel Expert", office: "Kano", initials: "UD" },
  { name: "Zainab Mohammed", role: "Client Success Manager", office: "Abuja", initials: "ZM" },
];

const values = [
  { icon: Eye, title: "Transparency", desc: "Honest reporting and clear communication" },
  { icon: Target, title: "Results-Driven", desc: "We only succeed when you succeed" },
  { icon: Lightbulb, title: "Innovation", desc: "Cutting-edge strategies for Nigerian markets" },
  { icon: MapPin, title: "Local Expertise", desc: "Deep understanding of Nigeria's diverse regions" },
  { icon: Heart, title: "Integrity", desc: "Ethical practices, always" },
  { icon: Shield, title: "Reliability", desc: "We deliver what we promise" },
];

export default function AboutPage() {
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
            Built in Nigeria. Built for Nigeria.
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            We understand Nigeria's diverse markets — from Lagos to Kano, Abuja to Port Harcourt. We build campaigns that speak your market's language.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              Scale-Edge Marketing LTD was founded in Abuja with one mission: to give Nigerian businesses access to world-class digital marketing. We understand Abuja's corporate market, Kano's trading power, Kaduna's industrial strength, and Lagos's fast-paced consumer economy. We build campaigns that speak your market's language.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 p-8 border-2 border-gold rounded-xl bg-gold/5"
          >
            <p className="text-center text-2xl font-bold text-navy font-syne">
              "To be the most trusted digital growth partner for Nigerian businesses across the nation and beyond."
            </p>
            <p className="text-center text-gold mt-3">— Our Mission</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Our Values
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl p-6 shadow-md text-center"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="text-gold" size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-navy text-center mb-12"
          >
            Our Offices
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OFFICES.map((office, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-navy mb-3">{office.name}</h3>
                <address className="not-italic text-gray-600 mb-3">
                  {office.address}<br />
                  {office.city}
                </address>
                <a href={CONTACT.telLink} className="text-gold font-medium hover:underline flex items-center gap-2">
                  <Phone size={16} /> {office.phone}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Meet Our Team
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600">
              Dedicated experts across our three offices
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl p-6 text-center shadow-md"
              >
                <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-gold">
                  {member.initials}
                </div>
                <h3 className="text-xl font-bold text-navy">{member.name}</h3>
                <p className="text-gold font-medium">{member.role}</p>
                <p className="text-gray-500 text-sm mt-1">{member.office} Office</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16">
        <div className="container-custom text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to grow your business?</h2>
            <p className="text-gold text-xl mb-6">Call us: {CONTACT.phone}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={CONTACT.telLink} className="bg-gold text-navy font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform">
                Call Now
              </a>
              <Link href="/book" className="border-2 border-gold text-gold px-8 py-3 rounded-full hover:bg-gold hover:text-navy transition-all">
                Book a Free Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}