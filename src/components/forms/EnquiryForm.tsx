"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { budgetOptions, occasionOptions, quantityOptions } from "@/lib/site";
import { cn } from "@/lib/utils";
import { submitLead } from "@/lib/leads";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EnquiryValues = {
  fullName: string;
  phone: string;
  email: string;
  quantity: string;
  occasion: string;
  budget: string;
  address: string;
  message?: string;
};

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span className="mt-1 text-xs text-destructive">{msg}</span>;
}

export function EnquiryForm({ className }: { className?: string }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<EnquiryValues>({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      quantity: "",
      occasion: "",
      budget: "",
      address: "",
      message: "",
    },
  });

  const [submitError, setSubmitError] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: EnquiryValues) => {
    setSubmitError(false);
    try {
      await submitLead({ type: "enquiry", fields: data });
      reset();
      // Success — send the user to the conversion page.
      router.push("/thank-you");
    } catch {
      setSubmitError(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "w-full rounded-2xl border border-black/5 bg-white p-4 shadow-xl shadow-black/5 sm:p-6 lg:p-7",
        className
      )}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div className="flex flex-col">
          <Label htmlFor="fullName" className="mb-1.5">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="Jane Doe"
            aria-invalid={!!errors.fullName}
            {...register("fullName", { required: "Full name is required" })}
          />
          <FieldError msg={errors.fullName?.message} />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <Label htmlFor="phone" className="mb-1.5">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
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
          <FieldError msg={errors.phone?.message} />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <Label htmlFor="email" className="mb-1.5">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
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
          <FieldError msg={errors.email?.message} />
        </div>

        {/* Quantity */}
        <SelectField
          name="quantity"
          label="Quantity"
          placeholder="Select Range"
          options={quantityOptions}
          control={control}
          error={errors.quantity?.message}
        />

        {/* Occasion */}
        <SelectField
          name="occasion"
          label="Occasion"
          placeholder="Select Occasion"
          options={occasionOptions}
          control={control}
          error={errors.occasion?.message}
        />

        {/* Budget */}
        <SelectField
          name="budget"
          label="Budget"
          placeholder="Select Range"
          options={budgetOptions}
          control={control}
          error={errors.budget?.message}
        />

        {/* Delivery Address (full width) */}
        <div className="flex flex-col sm:col-span-2">
          <Label htmlFor="address" className="mb-1.5">
            Delivery Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            placeholder="Street, city, state, pincode"
            aria-invalid={!!errors.address}
            {...register("address", { required: "Delivery address is required" })}
          />
          <FieldError msg={errors.address?.message} />
        </div>

        {/* Message (full width) */}
        <div className="flex flex-col sm:col-span-2">
          <Label htmlFor="message" className="mb-1.5">
            Message (Optional)
          </Label>
          <Textarea
            id="message"
            rows={4}
            placeholder="Any specific requirements, themes, or branding details"
            {...register("message")}
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="mt-5 h-11 w-full text-sm">
        {isSubmitting ? "Sending..." : "SEND"}
      </Button>

      {isSubmitSuccessful && !submitError && (
        <p className="mt-3 text-center text-sm text-brand">
          Thanks! We&apos;ll be in touch shortly.
        </p>
      )}
      {submitError && (
        <p className="mt-3 text-center text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

/* Reusable Controller-wrapped select for the form. */
function SelectField({
  name,
  label,
  placeholder,
  options,
  control,
  error,
}: {
  name: keyof EnquiryValues;
  label: string;
  placeholder: string;
  options: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  error?: string;
}) {
  return (
    <div className="flex flex-col">
      <Label htmlFor={name} className="mb-1.5">
        {label} <span className="text-destructive">*</span>
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id={name} className="w-full" aria-invalid={!!error}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <FieldError msg={error} />
    </div>
  );
}
