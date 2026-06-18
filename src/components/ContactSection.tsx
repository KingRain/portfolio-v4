"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { X, Calendar } from "lucide-react";
import { bricolage_grotesque } from "@/utils/fonts";
import { toast } from "sonner";
import { ApiResponse } from "@/types/project";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailSending, setIsEmailSending] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", { name, email, message });

    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Client-side quick spam prevention (e.g., 60 seconds cooldown)
    const lastSent = localStorage.getItem("lastEmailSent");
    if (lastSent) {
      const timeSinceLast = Date.now() - parseInt(lastSent, 10);
      const cooldownMs = 60 * 1000; // 1 minute client cooldown
      if (timeSinceLast < cooldownMs) {
        const remainingSeconds = Math.ceil((cooldownMs - timeSinceLast) / 1000);
        toast.warning(`Please wait ${remainingSeconds} seconds before sending another message.`);
        return;
      }
    }

    setIsEmailSending(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data: ApiResponse = await res.json();
      if (data.success) {
        toast.success(data.message || "Email sent successfully!");
        localStorage.setItem("lastEmailSent", Date.now().toString());
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(data.message || "Failed to send email");
      }
    } catch (err) {
      const errorMessage = (err as Error).message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsEmailSending(false);
    }
  };

  return (
    <section
      className={`py-16 px-4 sm:px-6 max-w-5xl mx-auto ${bricolage_grotesque}`}
      id="contact"
    >
      <div className="text-left mb-10">
        <h2
          className={`text-2xl font-bold mb-2 sm:mb-4 ${bricolage_grotesque} text-primary dark:text-primary-dark text-center`}
        >
          Get in Touch
        </h2>
        <p className="text-lg dark:text-gray-300 text-gray-600 text-center">
          Have a question or want to work together? Feel free to reach out!
        </p>
      </div>
      <div className="flex flex-row justify-start gap-2 sm:gap-4 mb-6 sm:mb-8 w-full">
        <Button
          className="flex items-center justify-center gap-1 sm:gap-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white flex-1 px-2 sm:px-4 py-2"
          onClick={() =>
        window.open("https://twitter.com/httperr0r_", "_blank")
          }
        >
          <X size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="text-sm sm:text-base">Chat on Twitter</span>
        </Button>

        <Button
          className="flex items-center justify-center gap-1 sm:gap-2 bg-green-600 hover:bg-green-700 text-white flex-1 px-2 sm:px-4 py-2"
          onClick={() =>
        window.open("https://calendly.com/samjoe55555", "_blank")
          }
        >
          <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="text-sm sm:text-base">Book a Meeting</span>
        </Button>
      </div>

      <div className="bg-black rounded-lg shadow-md p-6 md:p-8 w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <Label htmlFor="name" className="text-white">
              Your Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full bg-black border-white text-white"
            />
          </div>

          <div className="text-left">
            <Label htmlFor="email" className="text-white">
              Your Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="mt-1 w-full bg-black border-white text-white"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div className="text-left">
            <Label htmlFor="message" className="text-white">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 w-full bg-black border-white text-white"
              rows={5}
            />
          </div>

          <Button
            type="submit"
            disabled={isEmailSending}
            className="w-full bg-white hover:bg-gray-200 text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEmailSending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
}
