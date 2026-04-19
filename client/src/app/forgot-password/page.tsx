'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cormorant_Garamond, Poppins } from 'next/font/google';

const cormorant = Cormorant_Garamond({ weight: ['300', '400', '600'], subsets: ['latin'], display: 'swap' });
const poppins = Poppins({ weight: ['200', '400', '600'], subsets: ['latin'], display: 'swap' });

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Connect to backend password reset endpoint
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

            <header className={`${poppins.className} flex items-center px-6 py-4 text-sm`}
                style={{ background: 'var(--bg-warm)', borderBottom: '1px solid rgba(183,110,121,0.12)' }}>
                <div className="font-bold text-lg tracking-tight">
                    <Link href="/" className="transition-colors text-[var(--text-primary)] hover:text-[var(--accent-bronze)]">
                        Souvenote
                    </Link>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center px-4 py-12" style={{ background: 'var(--bg-primary)' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-[25rem] p-8 rounded-xl"
                    style={{ background: 'var(--bg-warm)', border: '1px solid rgba(183,110,121,0.2)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
                >
                    {submitted ? (
                        <div className="text-center space-y-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                                style={{ background: 'var(--bg-cream)' }}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                                    style={{ color: 'var(--accent-bronze)' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <h1 className={`${cormorant.className} italic text-2xl font-light`} style={{ color: 'var(--text-primary)' }}>
                                Check your email
                            </h1>
                            <p className={`${poppins.className} text-sm leading-relaxed`} style={{ color: 'var(--text-secondary)' }}>
                                We&apos;ve sent a password reset link to{' '}
                                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{email}</span>.
                                Check your inbox and follow the instructions.
                            </p>
                            <Link href="/login"
                                className={`${poppins.className} inline-block mt-2 text-sm font-medium underline underline-offset-4 transition-colors text-[var(--accent-bronze)] hover:text-[var(--accent-umber)]`}>
                                Return to login
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <h1 className={`${cormorant.className} italic text-[1.75rem] font-light mb-2`} style={{ color: 'var(--text-primary)' }}>
                                    Forgot password
                                </h1>
                                <p className={`${poppins.className} font-extralight text-sm leading-relaxed`} style={{ color: 'var(--text-secondary)' }}>
                                    Enter your email address and we&apos;ll send you a link to reset your password.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className={`${poppins.className} block text-xs font-medium mb-1.5`} style={{ color: 'var(--text-secondary)' }} htmlFor="email">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className={`${poppins.className} input-dark w-full px-3 py-2.5 rounded-lg text-sm`}
                                    />
                                </div>

                                <button type="submit" className="btn-matte w-full py-2.5 rounded-lg text-sm font-medium">
                                    Send reset link
                                </button>
                            </form>

                            <p className={`${poppins.className} text-center mt-6 text-sm`} style={{ color: 'var(--text-muted)' }}>
                                <Link href="/login" className="font-medium text-[var(--accent-bronze)] hover:underline">
                                    Return to login
                                </Link>
                            </p>
                        </>
                    )}
                </motion.div>
            </main>
        </div>
    );
}
