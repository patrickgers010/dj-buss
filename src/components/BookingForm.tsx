"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const eventTypes = [
  "Club Night",
  "Private Party / Birthday",
  "Wedding",
  "Festival / Outdoor",
  "Corporate Event",
  "FEEST Ticket Inquiry",
  "Swopster Partnership",
  "Other",
];

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    location: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // In production, wire this up to an email service (Resend, Formspree, etc.)
    console.log("Form submitted:", form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-12 text-center border h-full flex flex-col items-center justify-center gap-4"
        style={{ background: "#10101c", borderColor: "rgba(168,85,247,0.3)" }}
      >
        <div className="w-16 h-16 rounded-full gradient-purple-blue flex items-center justify-center text-2xl">
          ✓
        </div>
        <h3 className="text-2xl font-black text-white">Message sent!</h3>
        <p className="text-gray-400 max-w-sm">
          Thanks for reaching out. DJ GERS or the Swopster Gatherings team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              phone: "",
              eventType: "",
              date: "",
              location: "",
              message: "",
            });
          }}
          className="btn-neon text-sm mt-2"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-8 border space-y-5"
      style={{ background: "#10101c", borderColor: "rgba(168,85,247,0.2)" }}
    >
      <p className="text-purple-400 uppercase tracking-[0.3em] text-xs font-semibold mb-2">
        Booking Request
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
            Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full bg-[#080810] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full bg-[#080810] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+31 6 ..."
            className="w-full bg-[#080810] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
            Event Type *
          </label>
          <select
            name="eventType"
            required
            value={form.eventType}
            onChange={handleChange}
            className="w-full bg-[#080810] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors appearance-none"
          >
            <option value="">Select type...</option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
            Event Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full bg-[#080810] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <div>
          <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
            Location / Venue
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="City or venue name"
            className="w-full bg-[#080810] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-gray-400 text-xs uppercase tracking-wider mb-1.5 block">
          Message *
        </label>
        <textarea
          name="message"
          required
          value={form.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us about your event — vibe, expected crowd size, special requests..."
          className="w-full bg-[#080810] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors resize-none"
        />
      </div>

      <button type="submit" className="btn-neon-filled w-full text-sm py-3">
        Send Booking Request
      </button>

      <p className="text-gray-600 text-xs text-center">
        We&apos;ll respond within 24 hours. No commitment required.
      </p>
    </form>
  );
}
