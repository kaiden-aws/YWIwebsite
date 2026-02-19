import type { LucideIcon } from 'lucide-react'
import { Award, Shield, Users, Hammer } from 'lucide-react'

export interface Value {
  icon: LucideIcon
  name: string
  description: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
}

export interface Differentiator {
  title: string
  description: string
}

export const values: Value[] = [
  {
    icon: Award,
    name: 'Quality',
    description:
      'We use premium materials and time-tested techniques to deliver results that stand the test of time.',
  },
  {
    icon: Shield,
    name: 'Integrity',
    description:
      'Honest pricing, clear communication, and doing what we say we will — every time.',
  },
  {
    icon: Users,
    name: 'Community',
    description:
      'Proudly rooted in Fergus and committed to the neighbourhoods we serve across Centre Wellington.',
  },
  {
    icon: Hammer,
    name: 'Craftsmanship',
    description:
      'Every project receives the same care and attention to detail, from design through final walkthrough.',
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Team Member',
    role: 'Owner / Lead Designer',
    image: 'Team — Owner headshot',
  },
  {
    id: 'member-2',
    name: 'Team Member',
    role: 'Project Manager',
    image: 'Team — Project manager headshot',
  },
  {
    id: 'member-3',
    name: 'Team Member',
    role: 'Lead Installer',
    image: 'Team — Lead installer headshot',
  },
  {
    id: 'member-4',
    name: 'Team Member',
    role: 'Irrigation Specialist',
    image: 'Team — Irrigation specialist headshot',
  },
]

export const differentiators: Differentiator[] = [
  {
    title: 'Knowledgeable Crew',
    description:
      'Our team brings years of hands-on experience across residential, commercial, and municipal projects.',
  },
  {
    title: 'Friendly, Approachable Team',
    description:
      'We believe great work starts with great communication. Our crew is easy to work with from day one.',
  },
  {
    title: 'Top Quality Products',
    description:
      'We source and stock premium landscape materials at our retail yard — the same products we use on our own projects.',
  },
  {
    title: 'Design-to-Build Service',
    description:
      'From initial consultation through final installation, one team handles your entire project seamlessly.',
  },
  {
    title: 'Licensed Backflow Preventor Testing',
    description:
      'We hold the required certification for backflow preventor testing on irrigation systems — a credential many landscapers lack. This keeps your irrigation project fully compliant with Ontario regulations.',
  },
]
