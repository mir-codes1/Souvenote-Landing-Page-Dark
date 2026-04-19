'use client';

import { Poppins, Cormorant_Garamond } from 'next/font/google';

const poppins = Poppins({ weight: ['200', '400', '600', '700'], subsets: ['latin'], display: 'swap' });
const cormorant = Cormorant_Garamond({ weight: ['300', '400'], subsets: ['latin'], display: 'swap' });

export type CardAction = 'select' | 'personalize' | 'build';
export type CardFormat = 'physical' | 'digital';

interface Props {
    open: boolean;
    onClose: () => void;
    onSelect: (format: CardFormat) => void;
}

export default function FormatModal({ open, onClose, onSelect }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ background: 'rgba(0,0,0,0.6)' }}>
            <div className="rounded-2xl p-8 max-w-md w-full space-y-6"
                style={{ background: 'var(--bg-warm)', border: '1px solid rgba(183,110,121,0.25)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
                <div className="text-center space-y-2">
                    <h3 className={`${cormorant.className} italic text-xl font-light`} style={{ color: 'var(--text-primary)' }}>
                        Choose your card format
                    </h3>
                    <p className={`${poppins.className} font-extralight text-sm`} style={{ color: 'var(--text-secondary)' }}>
                        Select whether you want a physical card or digital card
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => onSelect('physical')}
                        className="rounded-xl p-5 text-left transition-all space-y-1 group"
                        style={{ border: '2px solid rgba(183,110,121,0.2)', background: 'var(--bg-cream)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-bronze)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(183,110,121,0.2)')}
                    >
                        <div className={`${poppins.className} font-semibold text-sm group-hover:text-[var(--accent-bronze)] transition-colors`}
                            style={{ color: 'var(--text-primary)' }}>
                            Physical Card
                        </div>
                        <div className={`${poppins.className} text-xl font-bold`} style={{ color: 'var(--text-primary)' }}>CDN $9.99</div>
                        <div className={`${poppins.className} text-xs`} style={{ color: 'var(--text-muted)' }}>includes shipping</div>
                    </button>

                    <button
                        onClick={() => onSelect('digital')}
                        className="rounded-xl p-5 text-left transition-all space-y-1 group"
                        style={{ border: '2px solid rgba(183,110,121,0.2)', background: 'var(--bg-cream)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-bronze)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(183,110,121,0.2)')}
                    >
                        <div className={`${poppins.className} font-semibold text-sm group-hover:text-[var(--accent-bronze)] transition-colors`}
                            style={{ color: 'var(--text-primary)' }}>
                            Digital Card
                        </div>
                        <div className={`${poppins.className} text-xl font-bold`} style={{ color: 'var(--text-primary)' }}>CDN $2.99</div>
                        <div className={`${poppins.className} text-xs`} style={{ color: 'var(--text-muted)' }}>instant delivery</div>
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className={`${poppins.className} w-full text-sm transition-colors text-[var(--text-muted)] hover:text-[var(--text-secondary)]`}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
