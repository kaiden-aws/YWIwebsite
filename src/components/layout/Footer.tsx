import Link from 'next/link'
import { navLinks, companyInfo } from '@/lib/data/navigation'
import { services } from '@/lib/data/services'

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Company Info */}
          <div>
            <p className="font-display text-2xl mb-4">YARD WEASELS</p>
            <p className="text-cream/70 leading-relaxed">
              Professional landscaping services in Fergus, Ontario. Design,
              build, and maintain outdoor spaces that inspire.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="font-display text-lg mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Services */}
          <nav aria-label="Services">
            <h3 className="font-display text-lg mb-4">Services</h3>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href="/services"
                    className="text-cream/70 hover:text-cream transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-display text-lg mb-4">Contact Us</h3>
            <address className="not-italic space-y-4">
              {/* Phone */}
              <div>
                <a
                  href={companyInfo.phoneHref}
                  className="text-cream hover:text-cream/80 transition-colors font-medium"
                >
                  {'\u260E'} {companyInfo.phone}
                </a>
              </div>

              {/* Hours */}
              <div>
                <p className="text-cream font-medium">Hours</p>
                <p className="text-cream/70">{companyInfo.hours}</p>
              </div>

              {/* Office Address */}
              <div>
                <p className="text-cream font-medium">
                  {'\u{1F4CD}'} {companyInfo.officeAddress.label}
                </p>
                <p className="text-cream/70">
                  {companyInfo.officeAddress.street}
                </p>
                <p className="text-cream/70">
                  {companyInfo.officeAddress.city}
                </p>
              </div>

              {/* Retail Yard Address */}
              <div>
                <p className="text-cream font-medium">
                  {'\u{1F4CD}'} {companyInfo.retailYardAddress.label}
                </p>
                <p className="text-cream/70">
                  {companyInfo.retailYardAddress.street}
                </p>
                <p className="text-cream/70">
                  {companyInfo.retailYardAddress.city}
                </p>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar: copyright + social icons */}
      <div className="border-t border-cream/20">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright */}
          <p className="text-sm text-cream/60">
            &copy; {companyInfo.copyright} {companyInfo.name}. All rights
            reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href={companyInfo.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-cream/60 hover:text-cream transition-colors"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href={companyInfo.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-cream/60 hover:text-cream transition-colors"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
