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

      {/* Map Placeholder */}
      <div className="mt-10 rounded-lg overflow-hidden bg-sage/20 aspect-[4/3] flex flex-col items-center justify-center gap-3">
        <MapPin className="w-8 h-8 text-forest/50" />
        <div className="text-center px-4">
          <p className="text-sm font-medium text-forest/70">
            {companyInfo.officeAddress.street},{' '}
            {companyInfo.officeAddress.city}
          </p>
          <p className="text-xs text-forest/40 mt-1">
            Interactive map coming soon
          </p>
        </div>
      </div>
    </div>
  )
}
