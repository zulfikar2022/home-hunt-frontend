"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function StayConnected() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) return;

    // verify the email syntax using zod
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address! Please try again.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you for staying with us!!");
      setSubmitting(false);
      setEmail("");
    }, 2000);
  };

  return (
    <div className="p-6 border rounded-2xl shadow-md max-w-max mx-auto text-center space-y-4 mb-10 hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out">
      <h2 className="text-xl font-semibold">Stay Connected</h2>
      <p className="text-sm text-muted-foreground">
        Subscribe with your email to stay updated.
      </p>

      <div className="flex items-center space-x-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
        <Button
          className="hover:cursor-pointer"
          onClick={handleSubscribe}
          disabled={submitting}
        >
          <Mail className="w-4 h-4 mr-2" />
          {submitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>

      <div className="text-xs text-muted-foreground italic pt-2">
        We won’t actually send you anything. This is just for demo purposes!
      </div>
    </div>
  );
}
