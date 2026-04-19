'use client';

import { useState } from 'react';
import { Poppins, Cormorant_Garamond } from 'next/font/google';
import type { CardFormat } from './FormatModal';

const poppins = Poppins({ weight: ['200', '400', '600', '700'], subsets: ['latin'], display: 'swap' });
const cormorant = Cormorant_Garamond({ weight: ['300', '400'], subsets: ['latin'], display: 'swap' });

const FONT_STYLES = ['Classic Serif', 'Elegant Script', 'Modern Sans', 'Handwritten', 'Playful'];

interface Props {
    open: boolean;
    format: CardFormat | null;
    onClose: () => void;
    onComplete: () => void;
}

export default function PersonalizationFlow({ open, format, onClose, onComplete }: Props) {
    const [step, setStep] = useState(1);
    const [photo, setPhoto] = useState<File | null>(null);
    const [attested, setAttested] = useState(false);
    const [name, setName] = useState('');
    const [caption, setCaption] = useState('');
    const [message, setMessage] = useState('');
    const [fontStyle, setFontStyle] = useState('Classic Serif');

    if (!open) return null;

    const reset = () => {
        setStep(1);
        setPhoto(null);
        setAttested(false);
        setName('');
        setCaption('');
        setMessage('');
        setFontStyle('Classic Serif');
        onClose();
    };

    const STEP_LABELS = ['Photo', 'Rights', 'Text', 'Confirm'];

    const inputClass = `${poppins.className} input-dark w-full rounded-lg px-3 py-2 text-sm`;
    const primaryBtnClass = 'btn-matte w-full py-2.5 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed';
    const secondaryBtnClass = 'btn-dark-secondary py-2.5 rounded-lg text-sm font-medium';

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ background: 'rgba(0,0,0,0.6)' }}>
            <div className="rounded-2xl p-8 max-w-md w-full space-y-6"
                style={{ background: 'var(--bg-warm)', border: '1px solid rgba(183,110,121,0.25)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>

                {/* Progress bar */}
                <div className="space-y-2">
                    <div className="flex gap-1.5">
                        {[1, 2, 3, 4].map((s) => (
                            <div
                                key={s}
                                className="flex-1 h-1 rounded-full transition-colors duration-300"
                                style={{ background: s <= step ? 'var(--accent-bronze)' : 'rgba(183,110,121,0.15)' }}
                            />
                        ))}
                    </div>
                    <p className={`${poppins.className} text-xs`} style={{ color: 'var(--text-muted)' }}>
                        Step {step} of 4 — {STEP_LABELS[step - 1]}
                        {format && (
                            <span className="ml-2 font-medium" style={{ color: 'var(--text-secondary)' }}>
                                · {format === 'physical' ? 'Physical CDN $9.99' : 'Digital CDN $2.99'}
                            </span>
                        )}
                    </p>
                </div>

                {/* ── Step 1: Photo Upload ── */}
                {step === 1 && (
                    <div className="space-y-5">
                        <div className="text-center space-y-1.5">
                            <h3 className={`${cormorant.className} italic text-lg font-light`} style={{ color: 'var(--text-primary)' }}>
                                Upload your photo
                            </h3>
                            <p className={`${poppins.className} font-extralight text-sm leading-relaxed`} style={{ color: 'var(--text-secondary)' }}>
                                Upload your photo to remix in this card style. We&apos;ll do the rest and send it off in 48 hours.
                            </p>
                        </div>

                        <label className="block w-full rounded-xl p-8 text-center cursor-pointer transition-colors"
                            style={{ border: '2px dashed rgba(183,110,121,0.25)', background: 'var(--bg-cream)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(183,110,121,0.5)')}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(183,110,121,0.25)')}>
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                className="hidden"
                                onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                            />
                            {photo ? (
                                <div className="space-y-1">
                                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        style={{ color: 'var(--accent-bronze)' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className={`${poppins.className} text-sm font-medium`} style={{ color: 'var(--text-primary)' }}>{photo.name}</p>
                                    <p className={`${poppins.className} text-xs`} style={{ color: 'var(--text-muted)' }}>Click to change</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        style={{ color: 'var(--text-muted)' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <p className={`${poppins.className} text-sm`} style={{ color: 'var(--text-muted)' }}>JPG, PNG · max 10MB</p>
                                </div>
                            )}
                        </label>

                        <button onClick={() => setStep(2)} disabled={!photo} className={primaryBtnClass}>
                            Upload Photo
                        </button>
                    </div>
                )}

                {/* ── Step 2: Attestation ── */}
                {step === 2 && (
                    <div className="space-y-5">
                        <div className="text-center space-y-1.5">
                            <h3 className={`${cormorant.className} italic text-lg font-light`} style={{ color: 'var(--text-primary)' }}>
                                Confirm Image Rights
                            </h3>
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl transition-colors"
                            style={{ border: '1px solid rgba(183,110,121,0.15)', background: 'var(--bg-cream)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(183,110,121,0.05)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-cream)')}>
                            <input
                                type="checkbox"
                                checked={attested}
                                onChange={(e) => setAttested(e.target.checked)}
                                className="mt-0.5 w-4 h-4 cursor-pointer accent-[var(--accent-bronze)]"
                            />
                            <span className={`${poppins.className} font-extralight text-sm leading-relaxed`} style={{ color: 'var(--text-secondary)' }}>
                                I confirm I have the legal right to upload and use this image and that it does not infringe on any third-party rights.
                            </span>
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setStep(3)} className={secondaryBtnClass}>
                                Skip — Customize Text
                            </button>
                            <button onClick={() => setStep(3)} disabled={!attested} className={primaryBtnClass}>
                                Confirm
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Step 3: Name & Caption ── */}
                {step === 3 && (
                    <div className="space-y-4">
                        <div className="text-center space-y-1.5">
                            <h3 className={`${cormorant.className} italic text-lg font-light`} style={{ color: 'var(--text-primary)' }}>
                                Customize Text
                            </h3>
                            <p className={`${poppins.className} font-extralight text-sm leading-relaxed`} style={{ color: 'var(--text-secondary)' }}>
                                Enter the name or caption for this card. We&apos;ll do the rest and send it off in 48 hours.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className={`${poppins.className} text-xs font-medium mb-1 block`} style={{ color: 'var(--text-muted)' }}>Name</label>
                                <input type="text" placeholder="e.g. Sarah" value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={inputClass} />
                            </div>
                            <div>
                                <label className={`${poppins.className} text-xs font-medium mb-1 block`} style={{ color: 'var(--text-muted)' }}>Caption</label>
                                <input type="text" placeholder="e.g. Happy Birthday!" value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    className={inputClass} />
                            </div>
                            <div>
                                <label className={`${poppins.className} text-xs font-medium mb-1 block`} style={{ color: 'var(--text-muted)' }}>Add Personal Message</label>
                                <textarea
                                    placeholder="Write a message for inside the card..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={3}
                                    className={`${inputClass} resize-none`}
                                />
                            </div>
                            <div>
                                <label className={`${poppins.className} text-xs font-medium mb-1 block`} style={{ color: 'var(--text-muted)' }}>Font Style</label>
                                <select
                                    value={fontStyle}
                                    onChange={(e) => setFontStyle(e.target.value)}
                                    className={`${inputClass}`}
                                    style={{ background: 'var(--bg-cream)' }}
                                >
                                    {FONT_STYLES.map((f) => (
                                        <option key={f} value={f} style={{ background: 'var(--bg-warm)' }}>{f}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button onClick={() => setStep(4)} disabled={!name && !caption} className={primaryBtnClass}>
                            Continue
                        </button>
                    </div>
                )}

                {/* ── Step 4: Confirmation ── */}
                {step === 4 && (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                                style={{ background: 'var(--bg-cream)', border: '1px solid rgba(183,110,121,0.2)' }}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    style={{ color: 'var(--accent-bronze)' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className={`${cormorant.className} italic text-lg font-light`} style={{ color: 'var(--text-primary)' }}>
                                Ready to proceed?
                            </h3>
                            <p className={`${poppins.className} font-extralight text-sm leading-relaxed`} style={{ color: 'var(--text-secondary)' }}>
                                Your personalized card will be created and sent off within 48 hours.
                                You&apos;ll now proceed to Music Generation.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setStep(3)} className={secondaryBtnClass}>
                                Go Back
                            </button>
                            <button onClick={() => { onComplete(); reset(); }} className={primaryBtnClass}>
                                Confirm &amp; Continue
                            </button>
                        </div>
                    </div>
                )}

                {/* Cancel link (steps 1–3 only) */}
                {step < 4 && (
                    <button
                        onClick={reset}
                        className={`${poppins.className} w-full text-xs transition-colors text-[var(--text-muted)] hover:text-[var(--text-secondary)]`}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
}
