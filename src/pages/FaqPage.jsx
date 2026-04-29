import { useState } from 'react'
import { Plus, MessageCircle, Sparkles } from 'lucide-react'
import { WHATSAPP_URL } from '../config/constants'
import SectionHeader from '../components/ui/SectionHeader'

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
    answer: 'We deliver across Gujarat from our bakery in Vaso, Kheda (387380). Delivery fee is calculated based on distance — within 5 km is free, beyond that is ₹5/km.',
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
    answer: 'A Banto Cake is our 4-inch cheesecake (300–350 gm) that comes with 3 slices. Perfect for 2-3 people or a personal treat!',
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

function FaqItem({ question, answer, idx, isOpen, onToggle }) {
  return (
    <div className={`group transition-colors duration-300 ${idx === 0 ? '' : 'border-t border-chocolate/8'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <span className="font-script text-lg text-gold/60 leading-none mt-1 shrink-0 select-none">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span className="font-heading text-sm sm:text-base font-semibold text-chocolate leading-snug">
            {question}
          </span>
        </div>
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? 'bg-chocolate text-cream rotate-45' : 'bg-cream-dark/30 text-chocolate group-hover:bg-cream-dark/60'
          }`}
        >
          <Plus size={14} />
        </div>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-400 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pl-12 pr-4 pb-5 text-sm text-chocolate-light/70 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <div className="pt-24 pb-20 bg-cream-light min-h-screen relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-soft-pink/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Frequently Asked"
          title="Your"
          scriptAccent="Questions"
          description="Everything you need to know about ordering from Cake & Crumb."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left — sticky help panel */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white border border-gold/20 rounded-3xl p-7 shadow-sm relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-soft-pink/40 blur-2xl pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full">
                  <Sparkles size={11} className="text-gold" />
                  <span className="text-[10px] font-semibold text-chocolate-light/70 tracking-widest uppercase">
                    Need Help?
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-chocolate mb-3 leading-tight">
                  Have a question we haven't answered?
                </h3>
                <p className="text-sm text-chocolate-light/60 leading-relaxed mb-6">
                  WhatsApp us — we usually reply within minutes during bakery hours.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer w-full inline-flex items-center justify-center gap-2 bg-chocolate text-cream px-5 py-3 rounded-full font-medium text-sm hover:bg-chocolate-light transition-colors"
                >
                  <MessageCircle size={16} />
                  Message Us
                </a>
                <div className="mt-6 pt-5 border-t border-cream-dark/40 space-y-2 text-xs text-chocolate-light/55">
                  <p>📞 +91 90816 68490</p>
                  <p>📞 +91 91731 83440</p>
                  <p>📍 Vaso, Kheda, Gujarat</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right — accordion */}
          <div className="lg:col-span-8 fade-up">
            <div className="bg-white rounded-3xl border border-chocolate/8 px-6 sm:px-8 shadow-sm">
              {faqs.map((faq, idx) => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  idx={idx}
                  isOpen={openIdx === idx}
                  onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
