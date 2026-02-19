export interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'Yard Weasels completely transformed our backyard into an outdoor oasis. The stone patio and garden design exceeded every expectation — our neighbours keep asking who did the work.',
    author: 'Sarah Mitchell',
    role: 'Homeowner, Fergus',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'We hired them for our commercial property and the difference is night and day. Professional, punctual, and the grounds have never looked better. Our tenants love it.',
    author: 'James Crawford',
    role: 'Property Manager, Elora',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'From the initial consultation to the final walkthrough, the entire experience was seamless. Their attention to detail on our front entrance redesign was truly impressive.',
    author: 'Karen & Doug Thompson',
    role: 'Homeowners, Centre Wellington',
    rating: 5,
  },
]
