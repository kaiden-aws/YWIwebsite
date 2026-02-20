'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { services } from '@/lib/data/services'

interface ContactFormState {
  name: string
  email: string
  phone: string
  serviceInterest: string
  message: string
}

interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    serviceInterest: '',
    message: '',
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(): ContactFormErrors {
    const newErrors: ContactFormErrors = {}

    if (!form.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required'
    }

    return newErrors
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true)
    }
  }

  function handleReset() {
    setForm({
      name: '',
      email: '',
      phone: '',
      serviceInterest: '',
      message: '',
    })
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="text-center min-h-[400px] flex flex-col items-center justify-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/20 mb-6">
          <CheckCircle className="w-8 h-8 text-forest" />
        </div>
        <h3 className="font-display text-2xl text-forest mb-3">
          Message Sent!
        </h3>
        <p className="text-charcoal/70 max-w-md mx-auto mb-8">
          Thank you for reaching out. We&apos;ll get back to you within one
          business day.
        </p>
        <button
          onClick={handleReset}
          className="px-6 py-3 border border-forest text-forest font-medium rounded-lg hover:bg-forest hover:text-cream transition-colors"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  const inputClasses =
    'w-full px-4 py-3 rounded-lg border transition-colors focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-2 focus-visible:outline-forest'

  return (
    <div>
      <h2 className="font-display text-2xl text-forest mb-8">
        Send Us a Message
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="mb-6">
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-charcoal mb-1"
          >
            Name <span className="text-red-700">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            aria-invalid={!!errors.name}
            className={cn(
              inputClasses,
              errors.name
                ? 'border-red-700'
                : 'border-charcoal/20 focus:border-forest'
            )}
          />
          {errors.name && (
            <p
              id="contact-name-error"
              role="alert"
              className="text-sm text-red-700 mt-1"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-charcoal mb-1"
          >
            Email <span className="text-red-700">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            aria-invalid={!!errors.email}
            className={cn(
              inputClasses,
              errors.email
                ? 'border-red-700'
                : 'border-charcoal/20 focus:border-forest'
            )}
          />
          {errors.email && (
            <p
              id="contact-email-error"
              role="alert"
              className="text-sm text-red-700 mt-1"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label
            htmlFor="contact-phone"
            className="block text-sm font-medium text-charcoal mb-1"
          >
            Phone
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, phone: e.target.value }))
            }
            className={cn(
              inputClasses,
              'border-charcoal/20 focus:border-forest'
            )}
          />
        </div>

        {/* Service Interest */}
        <div className="mb-6">
          <label
            htmlFor="contact-service"
            className="block text-sm font-medium text-charcoal mb-1"
          >
            Service Interest
          </label>
          <select
            id="contact-service"
            value={form.serviceInterest}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                serviceInterest: e.target.value,
              }))
            }
            className={cn(
              inputClasses,
              'border-charcoal/20 focus:border-forest bg-white'
            )}
          >
            <option value="" disabled>
              Select a service...
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
            <option value="products-materials">Products / Materials</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div className="mb-8">
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-charcoal mb-1"
          >
            Message <span className="text-red-700">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, message: e.target.value }))
            }
            aria-describedby={
              errors.message ? 'contact-message-error' : undefined
            }
            aria-invalid={!!errors.message}
            className={cn(
              inputClasses,
              'resize-y',
              errors.message
                ? 'border-red-700'
                : 'border-charcoal/20 focus:border-forest'
            )}
          />
          {errors.message && (
            <p
              id="contact-message-error"
              role="alert"
              className="text-sm text-red-700 mt-1"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-terracotta hover:bg-terracotta-light text-cream font-medium rounded-lg transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}
