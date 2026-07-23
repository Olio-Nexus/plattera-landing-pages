"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Download, FileText, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitLead } from "@/lib/leads";

type Values = { fullName: string; phone: string; email: string };

export function BrochureModal({
  open,
  onClose,
  brochureUrl,
}: {
  open: boolean;
  onClose: () => void;
  brochureUrl: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>();
  const [ready, setReady] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Reset state whenever the modal closes.
  useEffect(() => {
    if (!open) {
      setReady(false);
      setSubmitError(false);
      reset();
    }
  }, [open, reset]);

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const onSubmit = async (data: Values) => {
    setSubmitError(false);
    try {
      await submitLead({ type: "brochure", fields: data });
    } catch {
      // Lead capture failed, but still let the user open the brochure.
      setSubmitError(true);
    }
    setReady(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-foreground/60 transition-colors hover:text-foreground"
        >
          <X className="size-5" />
        </button>

        <h2 className="font-heading text-[22px] font-semibold text-foreground">
          Download Brochure
        </h2>

        {ready ? (
          <div className="mt-6 flex flex-col items-center text-center">
            <span className="grid size-14 place-items-center rounded-full bg-brand/10 text-brand">
              <FileText className="size-6" />
            </span>
            <p className="description mt-4">
              Thanks! Your brochure is ready — open it below.
            </p>
            <a
              href={brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "mt-5 h-12 w-full gap-2")}
            >
              <Download className="size-4" />
              Open Brochure (PDF)
            </a>
            {submitError && (
              <p className="mt-3 text-xs text-foreground/50">
                We couldn&apos;t save your details, but you can still view the
                brochure.
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Full Name */}
              <div className="flex flex-col">
                <Label htmlFor="brochure-name" className="mb-1.5">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="brochure-name"
                  placeholder="Jane Doe"
                  aria-invalid={!!errors.fullName}
                  {...register("fullName", { required: "Full name is required" })}
                />
                {errors.fullName && (
                  <span className="mt-1 text-xs text-destructive">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <Label htmlFor="brochure-phone" className="mb-1.5">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="brochure-phone"
                  type="tel"
                  placeholder="+91 916788356"
                  aria-invalid={!!errors.phone}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+\d][\d\s-]{7,}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="mt-1 text-xs text-destructive">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Email (full width) */}
              <div className="flex flex-col sm:col-span-2">
                <Label htmlFor="brochure-email" className="mb-1.5">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="brochure-email"
                  type="email"
                  placeholder="janedoe23@gmail.com"
                  aria-invalid={!!errors.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <span className="mt-1 text-xs text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 h-12 w-full"
            >
              {isSubmitting ? "Please wait..." : "Download Brochure"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
