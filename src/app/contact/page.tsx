"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { CONTACT, OFFICES } from "@/lib/constants";
import { Phone, MessageCircle, Mail, Clock, MapPin, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contacts").insert([data]);
      if (error) throw error;
      toast.success("Message received! We'll reply within 24 hours.");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send. Call us on 08165510842.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-navy py-20">
        <div className="container-custom text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold text-white font-syne"
          >
            Get in Touch
          </motion.h1>
        </div>
      </section>

      {/* Top CTA */}
      <section className="py-12 bg-gold/10">
        <div className="container-custom text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white rounded-xl p-8 shadow-md"
          >
            <p className="text-2xl font-bold text-navy mb-6">📞 Call or WhatsApp: {CONTACT.phone}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={CONTACT.telLink} className="bg-navy text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                Call Now
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-whatsapp text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-xl shadow-md p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-navy mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Name *</label>
                  <input {...register("name")} className="w-full px-4 py-2 border rounded-lg" />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Email *</label>
                  <input type="email" {...register("email")} className="w-full px-4 py-2 border rounded-lg" />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Phone (optional)</label>
                  <input {...register("phone")} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Message *</label>
                  <textarea {...register("message")} rows={5} className="w-full px-4 py-2 border rounded-lg"></textarea>
                  {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-gold text-navy font-bold py-3 rounded-full hover:scale-105 transition-transform disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : null}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>

            {/* Office Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-6"
            >
              {OFFICES.map((office, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold text-navy mb-2">{office.name}</h3>
                  <address className="not-italic text-gray-600 mb-3">{office.address}<br />{office.city}</address>
                  <a href={CONTACT.telLink} className="text-gold font-medium hover:underline">📞 {office.phone}</a>
                  {idx === 0 && <p className="mt-2"><Mail size={16} className="inline mr-2" /> <a href={`mailto:${CONTACT.email}`} className="text-gold">{CONTACT.email}</a></p>}
                </div>
              ))}
              <div className="bg-gold/10 rounded-xl p-6 text-center">
                <Clock size={24} className="inline text-gold mb-2" />
                <p className="font-semibold">Monday – Friday | 8:00am – 6:00pm WAT</p>
              </div>
              <div className="bg-whatsapp/10 rounded-xl p-6 text-center">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-whatsapp font-bold text-lg">
                  <MessageCircle size={24} /> Chat Us on WhatsApp: {CONTACT.phone}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Google Maps placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {OFFICES.map((office, idx) => (
              <div key={idx} className="bg-gray-200 rounded-xl h-48 flex items-center justify-center text-gray-500">
                <MapPin className="mr-2" /> {office.name} Map
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}