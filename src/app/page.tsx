"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Users,
  Target,
  Filter,
  Palette,
  MessageCircle as MessageIcon,
  ChevronLeft,
  ChevronRight,
  Star,
  Plus,
  Minus,
} from "lucide-react";
import { CONTACT } from "@/lib/constants";

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

function StatCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-gold">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, description, delay }: any) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all"
    >
      <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-gold" size={24} />
      </div>
      <h3 className="text-xl font-bold text-navy mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link href="/services" className="text-gold font-semibold hover:underline">
        Learn More →
      </Link>
    </motion.div>
  );
}

function CaseStudyCard({ industry, result, method, index }: any) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
    >
      <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-sm rounded-full mb-4">
        {industry}
      </span>
      <h3 className="text-xl font-bold text-gold mb-3">{result}</h3>
      <p className="text-gray-600 mb-4">{method}</p>
      <Link
        href="/book"
        className="inline-block bg-navy text-white px-4 py-2 rounded-full text-sm hover:bg-gold hover:text-navy transition-colors"
      >
        Get Similar Results →
      </Link>
    </motion.div>
  );
}

const testimonials = [
  {
    name: "Amina Bello",
    location: "Abuja",
    role: "Real Estate Developer",
    text: "Scale-Edge transformed our property business. Within 4 months, we sold over ₦180,000,000 worth of properties through their Meta Ads campaigns.",
    rating: 5,
  },
  {
    name: "Musa Ibrahim",
    location: "Kano",
    role: "Trading Entrepreneur",
    text: "They understand the Kano market like no other agency. Our lead volume went from 200 to 12,000 monthly in just 60 days.",
    rating: 5,
  },
  {
    name: "Fatima Aliyu",
    location: "Abuja",
    role: "Fashion Brand Founder",
    text: "Professional, results-driven and always available. Their team truly cares about our growth.",
    rating: 5,
  },
  {
    name: "Kabir Salisu",
    location: "Kano",
    role: "Logistics Company Owner",
    text: "₦500,000 in ad spend returned over ₦2,000,000 in revenue. The ROI speaks for itself.",
    rating: 5,
  },
  {
    name: "Ibrahim Tanko",
    location: "Kaduna",
    role: "Manufacturing Owner",
    text: "Consistent B2B leads every week since we started working with Scale-Edge.",
    rating: 5,
  },
];

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto"
        >
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-gold text-gold" size={20} />
            ))}
          </div>
          <p className="text-gray-700 text-lg mb-6 italic">"{testimonials[current].text}"</p>
          <h4 className="font-bold text-navy">{testimonials[current].name}</h4>
          <p className="text-sm text-gray-500">
            {testimonials[current].role}, {testimonials[current].location}
          </p>
        </motion.div>
      </div>
      <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gold transition-colors">
        <ChevronLeft size={24} />
      </button>
      <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gold transition-colors">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

const faqs = [
  { q: "Do you work with small Nigerian businesses?", a: "Yes. We work with businesses of all sizes across Nigeria. Our packages start from ₦100,000/month." },
  { q: "What is the minimum ad budget to get started?", a: "We recommend a minimum of ₦100,000/month for ad spend to see meaningful results." },
  { q: "Do you manage Facebook and Instagram ads?", a: "Yes. We manage Meta Ads across both Facebook and Instagram, including creative, targeting and optimisation." },
  { q: "Do you accept bank transfer?", a: "Yes. We accept bank transfers to our Nigerian business account." },
  { q: "How soon can I see results?", a: "Most clients see measurable results within 30–60 days." },
  { q: "Which cities do you operate in?", a: "We have offices in Abuja, Kano and Kaduna. We also serve clients virtually nationwide." },
  { q: "Can I visit your Kano or Kaduna office?", a: "Absolutely. Call 08165510842 to schedule a visit." },
  { q: "How do I reach you quickly?", a: "Call or WhatsApp 08165510842 — we respond within the hour during business hours (Mon–Fri 8am–6pm WAT)." },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-100">
          <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex justify-between items-center p-5 text-left">
            <span className="font-semibold text-navy">{faq.q}</span>
            {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 pb-5 text-gray-600">
                {faq.a}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const services = [
    { icon: TrendingUp, title: "Meta Ads", description: "Facebook & Instagram advertising that delivers measurable ROI for Nigerian businesses." },
    { icon: Users, title: "Lead Generation", description: "Done-for-you lead systems that fill your pipeline with qualified prospects." },
    { icon: Target, title: "Brand Strategy", description: "Identity built for Nigerian audiences that stands out in crowded markets." },
    { icon: Filter, title: "Sales Funnels", description: "Convert traffic to customers with high-converting sales funnels." },
    { icon: Palette, title: "Content & Creatives", description: "Scroll-stopping ad content designed for local audiences." },
    { icon: MessageIcon, title: "WhatsApp Automation", description: "Nigeria's #1 sales channel — automated for maximum conversions." },
  ];

  const caseStudies = [
    { industry: "Abuja Real Estate Firm", result: "₦180,000,000 in property sales in 4 months", method: "Targeted Meta Ads + lead generation funnel" },
    { industry: "Kano Trading & Commerce", result: "200 to 12,000 monthly leads in 60 days", method: "₦150,000/month Meta Ads campaign" },
    { industry: "Kaduna Manufacturing SME", result: "3x ROAS in first 90 days", method: "₦300,000/month optimised ad spend" },
  ];

  const stats = [
    { value: 200, suffix: "+", prefix: "", label: "Nigerian Businesses Scaled" },
    { value: 2.4, suffix: "B+", prefix: "₦", label: "Revenue Generated" },
    { value: 98, suffix: "%", prefix: "", label: "Client Retention Rate" },
    { value: 3, suffix: "", prefix: "", label: "Offices Across Nigeria" },
  ];

  return (
    <>
      <section className="min-h-screen bg-navy flex items-center relative overflow-hidden">
        <div className="container-custom py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeUp} className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 border border-gold rounded-full text-gold text-sm">
                📍 Offices in Abuja • Kano • Kaduna
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold text-white font-syne mb-6"
            >
              Nigeria's #1 Growth Marketing Agency
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              We help businesses across Nigeria scale faster with precision Meta Ads, proven lead generation systems, and digital marketing strategies built for the Nigerian market.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/book" className="bg-gold text-navy font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform">
                Book a Free Strategy Call
              </Link>
              <Link href="#case-studies" className="border-2 border-gold text-gold px-8 py-3 rounded-full hover:bg-gold hover:text-navy transition-all">
                See Our Work
              </Link>
              <a href={CONTACT.telLink} className="text-gold underline hover:no-underline">
                📞 {CONTACT.phone}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="bg-white border-y border-gray-100 py-3">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm">
            <a href={CONTACT.telLink} className="hover:text-gold">📞 {CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-gold">✉ {CONTACT.email}</a>
            <span>🕐 {CONTACT.hours}</span>
          </div>
        </div>
      </div>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy mb-4">
              What We Do
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 max-w-2xl mx-auto">
              Proven digital marketing services for Nigerian businesses
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy" id="stats">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <StatCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                <p className="text-white mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" id="case-studies">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Results We've Delivered
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600">
              Real results for real Nigerian businesses
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} {...study} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy mb-4">
              What Our Clients Say
            </motion.h2>
          </motion.div>
          <TestimonialsCarousel />
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Frequently Asked Questions
            </motion.h2>
          </motion.div>
          <FAQAccordion />
        </div>
      </section>
    </>
  );
}