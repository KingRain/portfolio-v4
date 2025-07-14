"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { X, Calendar } from "lucide-react";
import { bricolage_grotesque } from "@/utils/fonts";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/project";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [, setIsEmailSending] = useState(false);

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

    setIsEmailSending(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-email", {
        name,
        email,
        message,
      });
      if (response.data.success) {
        toast.success(response.data.message || "Email sent successfully!");
        // Clear form fields on success
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(response.data.message || "Failed to send email");
      }
        } catch (err) {
      const error = err as AxiosError<ApiResponse>;
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
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

      <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 md:p-8 w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <Label htmlFor="name" className="text-black dark:text-white">
              Your Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full bg-white dark:bg-black border-black dark:border-white text-black dark:text-white"
            />
          </div>

          <div className="text-left">
            <Label htmlFor="email" className="text-black dark:text-white">
              Your Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="mt-1 w-full bg-white dark:bg-black border-black dark:border-white text-black dark:text-white"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div className="text-left">
            <Label htmlFor="message" className="text-black dark:text-white">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 w-full bg-white dark:bg-black border-black dark:border-white text-black dark:text-white"
              rows={5}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
