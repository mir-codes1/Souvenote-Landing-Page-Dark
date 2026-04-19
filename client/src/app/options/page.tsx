'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Poppins, Cormorant_Garamond } from 'next/font/google';
import PricingModal from '../components/PricingModal';

const poppins = Poppins({ weight: ['200', '400', '600', '700'], subsets: ['latin'], display: 'swap' });
const cormorant = Cormorant_Garamond({ weight: ['300', '400'], subsets: ['latin'], display: 'swap' });

// Simulate credit balance — swap with real auth/credits context when backend is ready
const USER_CREDITS = { images: 0, songs: 0 };
const hasCredits = USER_CREDITS.images > 0 || USER_CREDITS.songs > 0;

const OPTIONS = [
    {
        label: 'Personalize a Card Template',
        description: 'Choose a design and customize it your way.',
        href: '/cards',
        thumbnails: ['Horoscope', 'On This Day', 'Birthday', 'Anniversary'],
    },
    {
        label: 'Build My Card',
        description: 'Answer a few questions and AI will generate your design.',
        href: '/create',
        thumbnails: null,
    },
];

export default function OptionsPage() {
    const router = useRouter();
    const [showPricing, setShowPricing] = useState(false);
    const [pendingHref, setPendingHref] = useState<string | null>(null);

    function handleOptionClick(href: string) {
        if (hasCredits) {
            router.push(href);
        } else {
            setPendingHref(href);
            setShowPricing(true);
        }
    }

    function handleModalClose() {
        setShowPricing(false);
        if (pendingHref) {
            router.push(pendingHref);
            setPendingHref(null);
        }
    }

    return (
        <>
            {showPricing && <PricingModal onClose={handleModalClose} />}

            <main className={`${poppins.className} min-h-[calc(100vh-3.5625rem)] flex flex-col items-center justify-center px-6 py-16`}
                style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                <div className="w-full max-w-3xl space-y-10">

                    <div className="text-center space-y-2">
                        <h1 className={`${cormorant.className} italic text-3xl font-light`} style={{ color: 'var(--text-primary)' }}>
                            What would you like to do?
                        </h1>
                        <p className="font-extralight text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Pick an option to get started.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {OPTIONS.map((opt) => (
                            <button
                                key={opt.label}
                                onClick={() => handleOptionClick(opt.href)}
                                className="group flex flex-col rounded-2xl border-2 transition-all text-left overflow-hidden"
                                style={{
                                    aspectRatio: '5/7',
                                    background: 'var(--bg-warm)',
                                    borderColor: 'rgba(183,110,121,0.2)',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-bronze)')}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(183,110,121,0.2)')}
                            >
                                <div className="flex-1 flex items-center justify-center p-4"
                                    style={{ background: 'var(--bg-cream)' }}>
                                    {opt.thumbnails ? (
                                        <div className="grid grid-cols-2 gap-2 w-full max-w-[11.25rem]">
                                            {opt.thumbnails.map((name) => (
                                                <div
                                                    key={name}
                                                    className="aspect-[5/7] rounded-lg flex items-end p-1.5"
                                                    style={{ background: 'var(--bg-warm)', border: '1px solid rgba(183,110,121,0.15)' }}
                                                >
                                                    <span className="text-[0.5rem] font-medium leading-tight" style={{ color: 'var(--text-muted)' }}>
                                                        {name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3" style={{ color: 'var(--text-muted)' }}>
                                            <div className="w-16 h-16 rounded-full flex items-center justify-center transition-colors"
                                                style={{ background: 'var(--bg-warm)', border: '1px solid rgba(183,110,121,0.15)' }}>
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                                </svg>
                                            </div>
                                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>AI-powered</span>
                                        </div>
                                    )}
                                </div>

                                <div className="px-5 py-4 space-y-1"
                                    style={{ background: 'var(--bg-warm)', borderTop: '1px solid rgba(183,110,121,0.1)' }}>
                                    <p className="font-semibold text-sm transition-colors group-hover:text-[var(--accent-bronze)]"
                                        style={{ color: 'var(--text-primary)' }}>
                                        {opt.label}
                                    </p>
                                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {opt.description}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            href="/my-cards"
                            className="text-sm transition-colors underline underline-offset-4 text-[var(--text-muted)] hover:text-[var(--accent-bronze)]"
                        >
                            My Cards &amp; Songs
                        </Link>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>View your saved designs and songs</p>
                    </div>
                </div>
            </main>
        </>
    );
}
