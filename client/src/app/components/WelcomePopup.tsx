'use client';

import { useEffect, useState } from 'react';
import { Poppins, Cormorant_Garamond } from 'next/font/google';

const poppins = Poppins({ weight: ['200', '400', '600'], subsets: ['latin'], display: 'swap' });
const cormorant = Cormorant_Garamond({ weight: ['300', '400'], subsets: ['latin'], display: 'swap' });

export default function WelcomePopup() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem('cards_welcome_seen');
        if (!seen) setVisible(true);
    }, []);

    const dismiss = () => {
        localStorage.setItem('cards_welcome_seen', 'true');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-4"
            style={{ background: 'rgba(0,0,0,0.6)' }}>
            <div className="rounded-2xl p-6 max-w-sm w-full space-y-4"
                style={{ background: 'var(--bg-warm)', border: '1px solid rgba(183,110,121,0.25)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
                <h3 className={`${cormorant.className} italic text-lg font-light`} style={{ color: 'var(--text-primary)' }}>
                    Welcome to Cards!
                </h3>
                <p className={`${poppins.className} font-extralight text-sm leading-relaxed`} style={{ color: 'var(--text-secondary)' }}>
                    Personalize your card for free by uploading a photo and caption. We&apos;ll handle the rest.
                </p>
                <button
                    onClick={dismiss}
                    className="btn-matte w-full py-2.5 rounded-lg text-sm font-medium"
                >
                    Got it
                </button>
            </div>
        </div>
    );
}
