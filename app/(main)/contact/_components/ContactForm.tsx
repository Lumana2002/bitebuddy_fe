"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, User, Mail, MessageSquare, Loader2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after success
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-green-700 mb-2">Message Sent Successfully!</h3>
        <p className="text-green-600 text-lg">Thank you for contacting us. We'll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-amber-800 font-semibold flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name
          </Label>
          <div className="relative">
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={cn(
                "pl-12 pr-4 py-6 text-lg bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:ring-amber-400 transition-all duration-200 shadow-sm",
                {
                  "border-red-400 focus:border-red-400 focus:ring-red-400": errors.name,
                },
              )}
            />
            <User className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-amber-500" />
          </div>
          {errors.name && (
            <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
              {errors.name}
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-amber-800 font-semibold flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={cn(
                "pl-12 pr-4 py-6 text-lg bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:ring-amber-400 transition-all duration-200 shadow-sm",
                {
                  "border-red-400 focus:border-red-400 focus:ring-red-400": errors.email,
                },
              )}
            />
            <Mail className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-amber-500" />
          </div>
          {errors.email && (
            <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
              {errors.email}
            </div>
          )}
        </div>
      </div>

      {/* Subject Field */}
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-amber-800 font-semibold flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Subject
        </Label>
        <div className="relative">
          <Input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleInputChange}
            className={cn(
              "pl-12 pr-4 py-6 text-lg bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:ring-amber-400 transition-all duration-200 shadow-sm",
              {
                "border-red-400 focus:border-red-400 focus:ring-red-400": errors.subject,
              },
            )}
          />
          <MessageSquare className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-amber-500" />
        </div>
        {errors.subject && (
          <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
            <div className="w-1 h-1 bg-red-600 rounded-full"></div>
            {errors.subject}
          </div>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-amber-800 font-semibold flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Message
        </Label>
        <div className="relative">
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className={cn(
              "pl-4 pr-4 py-4 text-lg bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-amber-400 focus:ring-amber-400 transition-all duration-200 shadow-sm resize-none",
              {
                "border-red-400 focus:border-red-400 focus:ring-red-400": errors.message,
              },
            )}
            placeholder="Send us message"
          />
        </div>
        {errors.message && (
          <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
            <div className="w-1 h-1 bg-red-600 rounded-full"></div>
            {errors.message}
          </div>
        )}
        
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-6 text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              Sending Message...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Send Message
            </span>
          )}
        </Button>
      </div>

      {/* Help Text */}
      <div className="text-center pt-4">
        <p className="text-amber-600 text-sm">
          We typically respond within 24 hours. For urgent matters, please call us directly.
        </p>
      </div>
    </form>
  )
}

export default ContactForm
