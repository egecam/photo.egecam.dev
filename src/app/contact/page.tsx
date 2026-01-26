"use client";

import { useState, FormEvent } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="h-full flex flex-col max-w-md">
      <h1 className="text-[11px] tracking-[0.2em] uppercase mb-8">Contact</h1>

      {status === "sent" ? (
        <div className="photo-meta">
          <p>Thank you for your message. I&apos;ll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-[10px] tracking-[0.2em] uppercase text-muted"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="bg-transparent border-b border-foreground/20 py-2 text-[13px] 
                       focus:outline-none focus:border-foreground transition-colors
                       placeholder:text-muted/50"
              placeholder="Your name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[10px] tracking-[0.2em] uppercase text-muted"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="bg-transparent border-b border-foreground/20 py-2 text-[13px] 
                       focus:outline-none focus:border-foreground transition-colors
                       placeholder:text-muted/50"
              placeholder="your@email.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-[10px] tracking-[0.2em] uppercase text-muted"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              className="bg-transparent border-b border-foreground/20 py-2 text-[13px] 
                       focus:outline-none focus:border-foreground transition-colors
                       placeholder:text-muted/50 resize-none"
              placeholder="Your message..."
            />
          </div>

          <div className="mt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="text-[10px] tracking-[0.2em] uppercase text-foreground 
                       hover:text-muted transition-colors disabled:text-muted"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </div>

          {status === "error" && (
            <p className="text-[11px] text-accent">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
