'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lora } from 'next/font/google';

const lora = Lora({ weight: ['400', '600'], subsets: ['latin'], display: 'swap' });

const FAQ_ITEMS = [
    {
        q: 'How does the free trial work?',
        a: 'You get 1 free image generation and 1 free song when you sign up. No credit card required. If you love your card, you can purchase it and we\u2019ll print and mail it.',
    },
    {
        q: 'What does a personalized song sound like?',
        a: 'Each song is uniquely generated based on details you provide. Previews are available in the carousel above \u2014 hit play to hear examples.',
    },
    {
        q: 'How long does shipping take?',
        a: 'Cards typically arrive within 5\u20137 business days within Canada. International shipping times vary by destination.',
    },
    {
        q: 'Can I save my card and finish later?',
        a: 'Yes \u2014 all designs are automatically saved in My Cards & Songs for 30 days. Return anytime to finish and purchase.',
    },
    {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards, Apple Pay, and Google Pay. All prices are in CAD.',
    },
];

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: true, amount: 0.2 });

    return (
        <div ref={containerRef} className="space-y-3">
            {FAQ_ITEMS.map(({ q, a }, i) => {
                const isOpen = openIndex === i;
                return (
                    <motion.div
                        key={q}
                        initial={false}
                        animate={{ opacity: inView ? 1 : 0 }}
                        transition={{ duration: 0.9, delay: inView ? 0.25 + i * 0.12 : 0 }}
                        className={`faq-item rounded-2xl border border-[rgba(232,234,238,0.06)] transition-all duration-400 ${
                            isOpen ? 'faq-item-open' : 'bg-[#0C0C10]/60 hover:bg-[#101014]/80'
                        }`}
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            className="w-full flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 text-left group"
                        >
                            <span
                                className={`${lora.className} text-[0.9375rem] sm:text-[1.0625rem] leading-snug font-light tracking-[-0.01em] transition-colors duration-300 pr-6 ${
                                    isOpen
                                        ? 'text-[var(--gold-hi)]'
                                        : 'text-[var(--platinum-hi)] group-hover:text-[var(--platinum-hi)]'
                                }`}
                                >
                                {q}
                            </span>
                            <div className="flex-shrink-0 relative w-6 h-6 flex items-center justify-center">
                                {/* Horizontal line */}
                                <span className="absolute w-4 h-[0.0938rem] bg-[var(--gold)] rounded-full transition-all duration-300" />
                                {/* Vertical line — rotates to 0 when open */}
                                <span
                                    className={`absolute w-4 h-[0.0938rem] bg-[var(--gold)] rounded-full transition-all duration-400 ${
                                        isOpen ? 'rotate-0 opacity-0' : 'rotate-90 opacity-100'
                                    }`}
                                />
                            </div>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-500 ease-out ${
                                isOpen ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <p className="px-6 sm:px-8 pb-6 text-[0.875rem] sm:text-[0.9375rem] text-[var(--text-secondary)] leading-[1.75] tracking-wide"
                               style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}>
                                {a}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
