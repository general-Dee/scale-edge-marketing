"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { CONTACT, OFFICES } from "@/lib/constants";
import { Loader2, Phone, MessageCircle, Mail, Clock, MapPin } from "lucide-react";

// Validation schema
const bookingSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  company: z.string().min(2, "Company name is required"),
  preferred_office: z.string().min(1, "Please select an office"),
  business_state: z.string().min(1, "Please select a state"),
  industry: z.string().min(1, "Please select an industry"),
  ad_budget: z.string().min(1, "Please select a budget range"),
  goal: z.string().min(1, "Please select a goal"),
  preferred_date: z.string().min(1, "Please select a date"),
  preferred_time: z.string().min(1, "Please select a time"),
  heard_from: z.string().optional(),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

// Nigerian states
const nigeriaStates = [
  "Abuja (FCT)", "Kano", "Kaduna", "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "Other",
];

const industries = [
  "Trading & Commerce", "Real Estate", "E-commerce", "Fashion & Lifestyle", "Food & Beverage",
  "Finance & Fintech", "Education", "Health & Wellness", "Logistics & Transport", "Manufacturing",
  "Agriculture", "Construction", "Entertainment", "Other",
];

const budgets = [
  "Under ₦100,000", "₦100,000–₦500,000", "₦500,000–₦2,000,000", "₦2,000,000+",
];

const goals = [
  "Generate More Leads", "Increase Sales & Revenue", "Grow Brand Awareness",
  "Launch a New Product", "Scale an Existing Campaign",
];

const timeSlots = [
  "Morning — 8am to 11am WAT",
  "Afternoon — 12pm to 3pm WAT",
  "Late Afternoon — 3pm to 6pm WAT",
];

const heardFromOptions = [
  "Facebook Ad", "Instagram Ad", "Referral", "Google Search", "WhatsApp", "Walked into our Office", "Other",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedOffice, setSubmittedOffice] = useState("");
  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    // Capture UTM params from URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setUtmParams({
        utm_source: params.get("utm_source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
        utm_content: params.get("utm_content") || "",
        utm_term: params.get("utm_term") || "",
      });
    }
  }, []);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        ...utmParams,
        status: "pending",
      };
      const { error } = await supabase.from("appointments").insert([payload]);
      if (error) throw error;

      // Track Meta Pixel lead event
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }

      setSubmittedName(data.full_name);
      setSubmittedOffice(data.preferred_office);
      setIsSuccess(true);
      reset();
      toast.success("Booking submitted! We'll contact you within 24 hours.");
    } catch (error) {
      console.error(error);
      toast.error("Submission failed. Call us on 08165510842 or WhatsApp us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container-custom max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
          >
            <div className="text-6xl mb-6">🎯</div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Thanks {submittedName}!
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              A strategist from our {submittedOffice} will contact you within 24 hours to confirm your session.
            </p>
            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="font-semibold text-navy mb-4">In the meantime:</p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <a href={CONTACT.telLink} className="inline-flex items-center gap-2 text-gold font-bold">
                  <Phone size={18} /> Call us: {CONTACT.phone}
                </a>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-whatsapp font-bold">
                  <MessageCircle size={18} /> WhatsApp: wa.me/{CONTACT.phoneIntl}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-navy py-16">
        <div className="container-custom text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold text-white font-syne"
          >
            Book Your Free Strategy Call
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-gray-300 mt-4 text-lg"
          >
            No pressure — just an honest conversation about growing your business.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Contact Sidebar */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-navy mb-6">Prefer to talk first?</h2>
                <div className="space-y-4">
                  <a href={CONTACT.telLink} className="flex items-center gap-3 text-2xl font-bold text-gold hover:underline">
                    <Phone size={28} /> {CONTACT.phone}
                  </a>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-whatsapp text-white px-4 py-2 rounded-lg hover:opacity-90">
                    <MessageCircle size={20} /> WhatsApp Us
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-gray-700 hover:text-gold">
                    <Mail size={20} /> {CONTACT.email}
                  </a>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock size={20} /> {CONTACT.hours}
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin size={20} /> Abuja | Kano | Kaduna
                  </div>
                    <p className="text-sm text-gray-500 mt-4">We typically respond within 1 hour during business hours. Serving clients nationwide.</p>                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Full Name *</label>
                      <input {...register("full_name")} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-gold" />
                      {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Email Address *</label>
                      <input type="email" {...register("email")} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-gold" />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Phone Number *</label>
                      <div className="flex gap-2">
                        <span className="px-3 py-2 bg-gray-100 border rounded-l-lg">+234</span>
                        <input {...register("phone")} className="flex-1 px-4 py-2 border rounded-r-lg focus:outline-none focus:border-gold" placeholder="8165510842" />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Company / Business Name *</label>
                      <input {...register("company")} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-gold" />
                      {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Preferred Office *</label>
                      <select {...register("preferred_office")} className="w-full px-4 py-2 border rounded-lg">
                        <option value="">Select an office</option>
                        {OFFICES.map(office => <option key={office.name} value={office.name}>{office.name}</option>)}
                        <option value="Virtual Call">Virtual Call</option>
                      </select>
                      {errors.preferred_office && <p className="text-red-500 text-sm mt-1">{errors.preferred_office.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Business State *</label>
                      <select {...register("business_state")} className="w-full px-4 py-2 border rounded-lg">
                        <option value="">Select a state</option>
                        {nigeriaStates.map(state => <option key={state} value={state}>{state}</option>)}
                      </select>
                      {errors.business_state && <p className="text-red-500 text-sm mt-1">{errors.business_state.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Industry *</label>
                      <select {...register("industry")} className="w-full px-4 py-2 border rounded-lg">
                        <option value="">Select industry</option>
                        {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                      </select>
                      {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Monthly Ad Budget *</label>
                      <select {...register("ad_budget")} className="w-full px-4 py-2 border rounded-lg">
                        <option value="">Select budget</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                      {errors.ad_budget && <p className="text-red-500 text-sm mt-1">{errors.ad_budget.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Primary Goal *</label>
                      <select {...register("goal")} className="w-full px-4 py-2 border rounded-lg">
                        <option value="">Select goal</option>
                        {goals.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                      {errors.goal && <p className="text-red-500 text-sm mt-1">{errors.goal.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Preferred Date *</label>
                      <input type="date" {...register("preferred_date")} min={new Date().toISOString().split("T")[0]} className="w-full px-4 py-2 border rounded-lg" />
                      {errors.preferred_date && <p className="text-red-500 text-sm mt-1">{errors.preferred_date.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Preferred Time *</label>
                      <select {...register("preferred_time")} className="w-full px-4 py-2 border rounded-lg">
                        <option value="">Select time slot</option>
                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.preferred_time && <p className="text-red-500 text-sm mt-1">{errors.preferred_time.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">How did you hear about us?</label>
                      <select {...register("heard_from")} className="w-full px-4 py-2 border rounded-lg">
                        <option value="">Select an option</option>
                        {heardFromOptions.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Additional Notes (optional)</label>
                    <textarea {...register("notes")} rows={4} className="w-full px-4 py-2 border rounded-lg" placeholder="Tell us about your business and goals..."></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold text-navy font-bold py-3 rounded-full hover:scale-105 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : null}
                    {isSubmitting ? "Submitting..." : "Book My Free Strategy Call →"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}