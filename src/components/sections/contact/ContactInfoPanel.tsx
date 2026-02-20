import { MapPin, Phone, Clock } from 'lucide-react'
import { companyInfo } from '@/lib/data/navigation'

export default function ContactInfoPanel() {
  return (
    <div>
      <h2 className="font-display text-2xl text-forest mb-8">
        Contact Information
      </h2>

      <div className="space-y-6">
        {/* Office Address */}
        <div className="flex gap-4">
          <MapPin className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-charcoal">
              {companyInfo.officeAddress.label}
            </p>
            <p className="text-charcoal/70">
              {companyInfo.officeAddress.street}
            </p>
            <p className="text-charcoal/70">
              {companyInfo.officeAddress.city}
            </p>
          </div>
        </div>

        {/* Retail Yard Address */}
        <div className="flex gap-4">
          <MapPin className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-charcoal">
              {companyInfo.retailYardAddress.label}
            </p>
            <p className="text-charcoal/70">
              {companyInfo.retailYardAddress.street}
            </p>
            <p className="text-charcoal/70">
              {companyInfo.retailYardAddress.city}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex gap-4">
          <Phone className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-charcoal">Phone</p>
            <a
              href={companyInfo.phoneHref}
              className="text-forest hover:text-forest-light transition-colors"
            >
              {companyInfo.phone}
            </a>
          </div>
        </div>

        {/* Hours */}
        <div className="flex gap-4">
          <Clock className="w-5 h-5 text-terracotta mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-charcoal">Hours</p>
            <p className="text-charcoal/70">{companyInfo.hours}</p>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-10 rounded-lg overflow-hidden aspect-[4/3]">
        <iframe
          src="https://maps.google.com/maps?q=6470+Beatty+Line+N,+Fergus,+Ontario,+Canada&t=&z=14&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="Yard Weasels Inc. Retail Yard Location"
        />
      </div>
    </div>
  )
}
