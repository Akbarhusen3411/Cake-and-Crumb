import { useState } from 'react'
import { Sparkles, ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How far in advance should I order?',
    answer: 'All orders require at least 1 day advance notice. Please place your order at least 24 hours before your desired delivery date.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept GPay, PhonePe, Paytm, and Cash on Delivery.',
  },
  {
    question: 'Where do you deliver?',
    answer: 'We deliver across Gujarat from our bakery in Vaso, Kheda (387380). Delivery fee is calculated based on distance — within 5 km is free, beyond that is \u20B95/km.',
  },
  {
    question: 'Can I cancel my order?',
    answer: 'Yes, you can cancel within 30 minutes of placing your order. After that, cancellation is not possible.',
  },
  {
    question: 'Do you offer custom cakes?',
    answer: 'Yes! DM us on Instagram @cake_and_crumb_1 or WhatsApp us at +91 90816 68490 with your requirements.',
  },
  {
    question: 'What is a Banto Cake?',
    answer: 'A Banto Cake is our 4-inch cheesecake (300\u2013350 gm) that comes with 3 slices. Perfect for 2-3 people or a personal treat!',
  },
  {
    question: 'Can I do self-pickup?',
    answer: 'Yes, self-pickup is available from our doorstep. Just select pickup during checkout.',
  },
  {
    question: 'What flavours of cookie boxes are available?',
    answer: 'We offer 7 cookie flavours: Triple Choc, White Choc, Classic, Red Velvet, Almond, Coconut, and Pistachio & Rose. Boxes can be mixed or single flavour.',
  },
]

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fade-up border border-chocolate/8 rounded-2xl bg-white/50 overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-chocolate/5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
      >
        <span className="font-heading text-sm sm:text-base font-semibold text-chocolate leading-snug">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-chocolate-light/40 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm text-chocolate-light/60 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FaqPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-cream-light relative overflow-hidden">
        {/* Background */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-soft-pink/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/8 rounded-full blur-[100px]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="fade-up inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gold/10 border border-gold/15 rounded-full">
              <Sparkles size={14} className="text-gold" />
              <span className="text-xs font-medium text-chocolate-light/60 tracking-widest uppercase">
                FAQ
              </span>
            </div>
            <h2 className="fade-up font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-chocolate mt-2 mb-4">
              Frequently Asked{' '}
              <span className="font-script text-3xl sm:text-4xl lg:text-5xl">Questions</span>
            </h2>
            <p className="fade-up text-chocolate-light/60 max-w-xl mx-auto leading-relaxed">
              Everything you need to know about ordering from Cake & Crumb.
            </p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
