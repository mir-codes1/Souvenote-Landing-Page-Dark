'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Poppins, Cormorant_Garamond } from 'next/font/google';

const poppins = Poppins({ weight: ['200', '400', '600', '700', '800'], subsets: ['latin'], display: 'swap' });
const cormorant = Cormorant_Garamond({ weight: ['300', '400', '600', '700'], subsets: ['latin'], display: 'swap' });

const CARD_PACKS = [
    {
        label: 'Single Card',
        price: '$7.99 CAD',
        savings: null,
        badge: null,
        mailedCards: 1,
        images: 8,
        songs: 3,
    },
    {
        label: '2 Card Pack',
        price: '$13.99 CAD',
        savings: '12% savings',
        badge: null,
        mailedCards: 2,
        images: 16,
        songs: 6,
    },
    {
        label: '3 Card Pack',
        price: '$19.99 CAD',
        savings: '17% savings',
        badge: null,
        mailedCards: 3,
        images: 24,
        songs: 9,
    },
    {
        label: '4 Card Pack',
        price: '$24.99 CAD',
        savings: '22% savings',
        badge: 'Most Popular',
        mailedCards: 4,
        images: 32,
        songs: 12,
    },
    {
        label: '5 Card Pack',
        price: '$29.99 CAD',
        savings: '25% savings',
        badge: 'Best Value',
        mailedCards: 5,
        images: 40,
        songs: 15,
    },
];

const CREDIT_PACKS = [
    {
        label: 'Starter',
        price: '$1.69 CAD',
        savings: null,
        badge: null,
        images: 8,
        songs: 3,
    },
    {
        label: 'Creator',
        price: '$2.98 CAD',
        savings: '12% savings',
        badge: 'Most Popular',
        images: 16,
        songs: 6,
    },
    {
        label: 'Studio',
        price: '$3.87 CAD',
        savings: '24% savings',
        badge: null,
        images: 24,
        songs: 9,
    },
];

export default function PricingPage() {
    const router = useRouter();
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [selectedCredit, setSelectedCredit] = useState<number | null>(null);

    return (
        <main className={`min-h-screen ${poppins.className}`} style={{ background: 'var(--bg-primary)' }}>
            <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">

                {/* Page heading */}
                <div className="text-center space-y-2">
                    <h1 className={`${cormorant.className} italic text-4xl font-light`} style={{ color: 'var(--text-primary)' }}>
                        Pricing
                    </h1>
                    <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Choose a plan that works for you — start free, upgrade anytime.
                    </p>
                </div>

                {/* ── Section 1: Card Packs ── */}
                <div className="space-y-5">
                    <div className="space-y-1">
                        <p className="section-label" style={{ color: 'var(--accent-bronze)' }}>Card Packs</p>
                        <p className="text-xs leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                            Try option 1 risk-free! Pay $7.99 only if you love your card. Otherwise, you&apos;re charged just $1.69 for AI credits.
                        </p>
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                        {CARD_PACKS.map((pack, i) => (
                            <motion.button
                                key={pack.label}
                                onClick={() => setSelectedCard(i)}
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 16 }}
                                transition={{ delay: i * 0.07, duration: 0.4 }}
                                viewport={{ once: true }}
                                className={`relative flex flex-col rounded-xl border-2 transition-all text-left overflow-hidden ${
                                    selectedCard === i
                                        ? 'shadow-[0_0_28px_rgba(183,110,121,0.2)]'
                                        : ''
                                }`}
                                style={{
                                    aspectRatio: '5/7',
                                    background: 'var(--bg-warm)',
                                    borderColor: selectedCard === i ? 'var(--accent-bronze)' : 'rgba(183,110,121,0.15)',
                                }}
                            >
                                {pack.badge && (
                                    <div className="absolute top-2 left-0 right-0 flex justify-center z-10">
                                        <span className="text-[0.5625rem] font-semibold px-2 py-0.5 rounded-full"
                                            style={{ background: 'linear-gradient(to right, var(--accent-bronze), var(--accent-gold))', color: '#0B0B0F' }}>
                                            {pack.badge}
                                        </span>
                                    </div>
                                )}

                                <div className="flex-1 flex items-center justify-center" style={{ background: 'var(--bg-cream)', borderBottom: '1px solid rgba(183,110,121,0.1)' }}>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
                                    </svg>
                                </div>

                                <div className="p-3 space-y-1.5" style={{ background: 'var(--bg-warm)' }}>
                                    <p className="text-[0.6875rem] font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>{pack.label}</p>
                                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{pack.price}</p>
                                    {pack.savings && (
                                        <p className="text-[0.625rem] font-medium" style={{ color: 'var(--accent-champagne)' }}>{pack.savings}</p>
                                    )}
                                    <div className="text-[0.625rem] space-y-0.5 pt-1" style={{ borderTop: '1px solid rgba(183,110,121,0.15)', color: 'var(--text-muted)' }}>
                                        <div className="flex justify-between">
                                            <span>Mailed cards</span>
                                            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{pack.mailedCards}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>AI images</span>
                                            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{pack.images}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>AI songs</span>
                                            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{pack.songs}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* ── Section 2: AI Credit Packs ── */}
                <div className="space-y-5">
                    <div className="space-y-1">
                        <p className="section-label" style={{ color: 'var(--accent-bronze)' }}>AI Credit Packs</p>
                        <p className="text-xs leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                            Design First, Decide Later — Start designing now. Your creations will be saved in My Cards for 30 days so you can add them to your cart anytime.
                        </p>
                    </div>

                    <div className="flex gap-4 max-w-md">
                        {CREDIT_PACKS.map((pack, i) => (
                            <motion.button
                                key={pack.label}
                                onClick={() => setSelectedCredit(i)}
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 16 }}
                                transition={{ delay: i * 0.07, duration: 0.4 }}
                                viewport={{ once: true }}
                                className={`relative flex flex-col rounded-xl border-2 transition-all text-left overflow-hidden flex-1 ${
                                    selectedCredit === i
                                        ? 'shadow-[0_0_28px_rgba(183,110,121,0.2)]'
                                        : ''
                                }`}
                                style={{
                                    aspectRatio: '5/7',
                                    background: 'var(--bg-warm)',
                                    borderColor: selectedCredit === i ? 'var(--accent-bronze)' : 'rgba(183,110,121,0.15)',
                                }}
                            >
                                {pack.badge && (
                                    <div className="absolute top-2 left-0 right-0 flex justify-center z-10">
                                        <span className="text-[0.5625rem] font-semibold px-2 py-0.5 rounded-full"
                                            style={{ background: 'linear-gradient(to right, var(--accent-bronze), var(--accent-gold))', color: '#0B0B0F' }}>
                                            {pack.badge}
                                        </span>
                                    </div>
                                )}

                                <div className="flex-1 flex items-center justify-center" style={{ background: 'var(--bg-cream)', borderBottom: '1px solid rgba(183,110,121,0.1)' }}>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                                    </svg>
                                </div>

                                <div className="p-3 space-y-1.5" style={{ background: 'var(--bg-warm)' }}>
                                    <p className="text-[0.6875rem] font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>{pack.label}</p>
                                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{pack.price}</p>
                                    {pack.savings && (
                                        <p className="text-[0.625rem] font-medium" style={{ color: 'var(--accent-champagne)' }}>{pack.savings}</p>
                                    )}
                                    <div className="text-[0.625rem] space-y-0.5 pt-1" style={{ borderTop: '1px solid rgba(183,110,121,0.15)', color: 'var(--text-muted)' }}>
                                        <div className="flex justify-between">
                                            <span>AI images</span>
                                            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{pack.images}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>AI songs</span>
                                            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{pack.songs}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* ── Ready to Send CTA ── */}
                <div className="rounded-xl p-6 flex items-center justify-between gap-4"
                    style={{ background: 'var(--bg-warm)', border: '1px solid rgba(183,110,121,0.2)' }}>
                    <div className="space-y-1">
                        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>Choose a &ldquo;Ready to Send&rdquo; card from our marketplace</p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Add your own message, no AI customization. Starting at $6.49.
                        </p>
                    </div>
                    <button
                        onClick={() => router.push('/cards?ready=true')}
                        className="flex-shrink-0 btn-dark-primary text-sm font-medium px-6 py-3 rounded-lg"
                    >
                        Sure, Let&apos;s go
                    </button>
                </div>

                {/* Continue CTA */}
                {(selectedCard !== null || selectedCredit !== null) && (
                    <div className="flex justify-end">
                        <button
                            onClick={() => router.push('/options')}
                            className="btn-matte text-sm font-medium px-8 py-3 rounded-lg"
                        >
                            Continue →
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
