"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitLead } from "@/lib/leads";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await submitLead({ type: "subscribe", fields: { email } });
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mt-6 w-full">
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Enter Email"
          aria-label="Email address"
          className="h-12 flex-1 border-transparent bg-white px-5 text-[16px] text-[#1A1A1A] sm:text-[14px]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(buttonVariants(), "h-12 w-full px-6 sm:w-auto")}
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {status === "done" && (
        <p className="mt-2 text-[13px] text-white/70">Thanks for subscribing!</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-[13px] text-red-300">
          Please enter a valid email and try again.
        </p>
      )}
    </div>
  );
}
