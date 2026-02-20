'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, Phone } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { navLinks, companyInfo } from '@/lib/data/navigation'
import MobileDrawer from './MobileDrawer'

function useScrolled() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrolled
}

function NavLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'relative py-2 text-sm font-medium transition-colors',
        isActive
          ? "text-cream after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-terracotta after:content-['']"
          : 'text-cream/70 hover:text-cream',
        className
      )}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'block py-3 px-4 rounded-lg text-base transition-colors',
        isActive
          ? 'bg-forest/10 text-forest font-semibold'
          : 'text-charcoal hover:text-forest'
      )}
    >
      {children}
    </Link>
  )
}

export default function HeaderClient() {
  const scrolled = useScrolled()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Auto-close drawer on navigation
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled ? 'bg-forest/85 backdrop-blur-md shadow-sm' : 'bg-forest'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo -- left side */}
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-xl md:text-2xl text-cream">
                YARD WEASELS
              </span>
            </Link>

            {/* Desktop nav -- center, hidden on mobile */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right side: phone + CTA (desktop) + hamburger (mobile) */}
            <div className="flex items-center gap-3">
              {/* Phone -- desktop only */}
              <a
                href={companyInfo.phoneHref}
                className="hidden lg:flex items-center gap-1.5 text-sm text-cream/80 hover:text-cream transition-colors"
              >
                <Phone className="h-4 w-4" />
                {companyInfo.phone}
              </a>

              {/* CTA button -- visible at all breakpoints */}
              <Link
                href="/contact"
                className="bg-terracotta hover:bg-terracotta-light text-cream text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                Get a Quote
              </Link>

              {/* Hamburger -- mobile only */}
              <button
                onClick={() => setIsOpen(true)}
                className="md:hidden p-3 text-cream"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <MobileNavLink
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </MobileNavLink>
          ))}
        </div>
        {/* Phone number in drawer for mobile */}
        <a
          href={companyInfo.phoneHref}
          className="mt-6 flex items-center gap-2 text-charcoal py-3 px-4"
        >
          <Phone className="h-5 w-5 text-forest" />
          {companyInfo.phone}
        </a>
      </MobileDrawer>
    </>
  )
}
