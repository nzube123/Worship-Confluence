"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaHandsHelping, FaMicrophone, FaUsers, FaMapMarkerAlt, FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { speakerData } from "./data/speakers";
import { agenda } from "./data/agenda";
import { mediaVideos } from "./data/videos";
import { RegisterFormData } from "./types";
import Navbar from "../components/Navbar";
import SongCatalogue from "../components/sections/SongCatalogue";
import ProgrammeCatalogue from "../components/sections/ProgrammeCatalogue";
import VideoCard from "../components/VideoCard";
import { validateEmail, validateName, validatePhone } from "./lib/validation";

// Lazy load heavy components
const TestimonialCarousel = dynamic(() => import("../components/TestimonialCarousel"), {
  loading: () => <div className="h-64 bg-black/20 rounded-lg animate-pulse" />,
});

export default function HomePage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    phone: "",
    botField: "",
    captchaToken: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const executeCaptcha = async (): Promise<string> => {
    if (typeof window === "undefined" || !recaptchaSiteKey) {
      return "";
    }

    const grecaptcha = (window as any).grecaptcha;
    if (!grecaptcha?.ready || !grecaptcha.execute) {
      return "";
    }

    return new Promise((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(recaptchaSiteKey, { action: "submit" }).then((token: string) => {
          resolve(token);
        }).catch(() => {
          resolve("");
        });
      });
    });
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const nameValidation = validateName(formData.name);
    if (!nameValidation.valid) {
      setMessage({ type: "error", text: nameValidation.message ?? "Name is required." });
      setIsLoading(false);
      return;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
      setMessage({ type: "error", text: emailValidation.message ?? "Please provide a valid email address." });
      setIsLoading(false);
      return;
    }

    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.valid) {
      setMessage({ type: "error", text: phoneValidation.message ?? "Please provide a valid phone number." });
      setIsLoading(false);
      return;
    }

    if (formData.botField?.trim()) {
      setMessage({ type: "error", text: "Spam detected. Submission rejected." });
      setIsLoading(false);
      return;
    }

    try {
      const token = await executeCaptcha();
      const payload = { ...formData, captchaToken: token };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ name: "", email: "", phone: "", botField: "", captchaToken: "" });
        router.push("/select-song");
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      <Navbar />

      <section id="hero" aria-labelledby="hero-heading" className="relative h-screen min-h-[720px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Worship background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/85" />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center"
          >
            <p className="rounded-full bg-purple-900/40 px-4 py-1 text-xs uppercase tracking-widest text-purple-200">May 29th To June 7th, 2026 • Bride City Convention Center</p>
            <h1 id="hero-heading" className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">Worship Confluence 2026</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-200 sm:text-xl">A Gathering of True Worshippers in Spirit and Truth</p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#register" className="rounded-full bg-gradient-to-r from-purple-600 to-green-500 px-7 py-3 font-bold text-white shadow-lg transition hover:opacity-90">Register As An Individual Artiste</a>
              <a href="#register" className="rounded-full bg-gradient-to-r from-purple-600 to-green-500 px-7 py-3 font-bold text-white shadow-lg transition hover:opacity-90">Register As A Choir</a>
              <a href="#media" className="rounded-full border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/15">Watch Live</a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div className="grid gap-10 md:grid-cols-2" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 12 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div>
            <h2 className="text-3xl font-bold text-purple-100">About Worship Confluence</h2>
            <p className="mt-4 max-w-xl text-gray-300">Worship Confluence 2026 is an immersive spiritual gathering curated by Bride City i-Church. Our mission is to create a space where God’s presence meets powerful worship, and to bridge demoninational gaps within the Church and foster Church Unity by blending Gospel Music, keeping age-long Hymns, Classic Songs and Plain-Chants alive in the modern Church.</p>
            <p className="mt-4 max-w-xl text-gray-300">Join ministers, worship leaders, and believers from across the nation for a month of personal revival and commissioned impact.</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-purple-100">Purpose</h2>
            <ul className="mt-4 space-y-3 text-gray-300">
              <li>• Elevate authentic worship and prophetic encounter</li>
              <li>• Equip believers with transformative teaching and activation</li>
              <li>• Build kingdom community and shared spiritual momentum</li>
            </ul>
          </div>
        </motion.div>
      </section>

      <section id="expect" className="border-t border-white/10 bg-black/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-white">What to Expect</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: <FaHandsHelping size={28} />, title: "Spirit-Filled Worship", description: "Praise gatherings, spontaneous worship, and corporate encounters." },
              { icon: <FaMicrophone size={28} />, title: "Powerful Teaching", description: "Biblical depth, prophetic insight, and practical discipleship." },
              { icon: <FaUsers size={28} />, title: "Community Experience", description: "Prayer spaces, networking, and kingdom partnership." },
            ].map((item) => (
              <motion.article key={item.title} whileHover={{ y: -6 }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-950/20 to-black/50 p-6 shadow-lg backdrop-blur" >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-700/30 text-purple-100">{item.icon}</div>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-gray-300">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="speakers" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white">Speakers & Ministers</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-300">A powerful lineup of leaders in worship, teaching, and prophetic ministry.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {speakerData.map((speaker) => (
            <motion.article key={speaker.name} whileHover={{ y: -8 }} className="overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-lg">
              <Image
                src={speaker.image}
                alt={speaker.name}
                width={400}
                height={224}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-white">{speaker.name}</h4>
                <p className="mt-1 text-sm text-gray-300">{speaker.title}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <SongCatalogue />

      <ProgrammeCatalogue />

      <section id="schedule" className="border-t border-white/10 bg-black/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-white">Event Schedule</h2>
          <div className="mt-10 space-y-4">
            {agenda.map((item) => (
              <motion.div key={item.time} whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="flex items-start gap-4 rounded-xl border border-white/10 bg-purple-950/20 p-4">
                <div className="min-w-[100px] text-right text-sm font-bold text-purple-300">{item.time}</div>
                <div className="flex-1 text-sm text-gray-200">{item.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="register" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white">Register</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-gray-300">Reserve your place at Worship Confluence 2026. This is a free ticketing experience.</p>

        <motion.form
          onSubmit={handleSubmit}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 12 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 space-y-4 rounded-2xl border border-white/15 bg-black/40 p-6 backdrop-blur-md"
        >
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-gray-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full rounded-lg border border-white/20 bg-black/70 p-3 text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none disabled:opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email@domain.com"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full rounded-lg border border-white/20 bg-black/70 p-3 text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none disabled:opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm text-gray-300">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(123) 456-7890"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full rounded-lg border border-white/20 bg-black/70 p-3 text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none disabled:opacity-50"
              required
            />
          </div>

          <input
            type="text"
            name="botField"
            value={formData.botField}
            onChange={handleInputChange}
            autoComplete="off"
            aria-hidden="true"
            tabIndex={-1}
            className="hidden"
          />

          {message && (
            <div
              className={`rounded-lg p-3 text-sm ${
                message.type === "success"
                  ? "bg-green-900/20 border border-green-500/30 text-green-200"
                  : "bg-red-900/20 border border-red-500/30 text-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-gradient-to-r from-purple-600 to-yellow-400 px-5 py-3 font-bold text-black transition hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              "Submit Registration"
            )}
          </button>
        </motion.form>
      </section>

      <section id="media" aria-labelledby="media-heading" className="border-t border-white/10 bg-black/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 id="media-heading" className="text-center text-3xl font-bold text-white">Media Highlights</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-gray-300">Watch worship sessions and past event highlights from previous seasons.</p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {mediaVideos.map((video) => (
              <motion.div key={video.id} whileHover={{ scale: 1.02 }} className="transition-transform">
                <VideoCard
                  videoId={video.id}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  description={video.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <TestimonialCarousel />
      </section>

      <section id="contact" className="border-t border-white/10 bg-black/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white">Contact Bride City i-Church</h2>
              <p className="mt-3 text-gray-300">No 1-3 Kingdom Worship Avenue, Opposite Orange Plaza Kpeyegyi, Km 8 Nyanya-Karshi Exp. Way FCT Abuja</p>
              <p className="mt-1 text-gray-300">Email: info@bridecityichurch.org</p>
              <p className="mt-1 text-gray-300">Phone: +2348105751708, +2349121818741</p>
            </div>
            <div className="flex items-center gap-3 text-white">
              <a href="#" aria-label="Facebook" className="rounded-full border border-white/20 p-3 transition hover:bg-white/10"><FaFacebook size={18} /></a>
              <a href="#" aria-label="YouTube" className="rounded-full border border-white/20 p-3 transition hover:bg-white/10"><FaYoutube size={18} /></a>
              <a href="#" aria-label="Instagram" className="rounded-full border border-white/20 p-3 transition hover:bg-white/10"><FaInstagram size={18} /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-sm text-gray-400 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Bride City i-Church — Worship Confluence.</p>
          <div className="flex gap-4">
            <a href="#hero" className="hover:text-purple-200">Home</a>
            <a href="#about" className="hover:text-purple-200">About</a>
            <a href="#contact" className="hover:text-purple-200">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
