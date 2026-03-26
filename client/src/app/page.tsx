'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Lobster, Poppins, Cormorant_Garamond, Lora } from 'next/font/google';
import GallerySection from './components/GallerySection';
import FAQAccordion from './components/FAQAccordion';
import { GlowingEffect } from './components/GlowingEffect';

const lobster = Lobster({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-lobster' });
const poppins = Poppins({ weight: ['200', '400', '600', '800', '900'], subsets: ['latin'], display: 'swap', variable: '--font-poppins' });
const cormorant = Cormorant_Garamond({ weight: ['300', '400', '600', '700'], subsets: ['latin'], display: 'swap', variable: '--font-cormorant' });
const lora = Lora({ weight: ['400', '600'], subsets: ['latin'], display: 'swap' });

const SOCIAL_ICONS = [
    {
        label: 'Instagram',
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.75-.88a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z" />
            </svg>
        ),
    },
    {
        label: 'TikTok',
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M16.6 5.82A4.28 4.28 0 0 1 13.8 3h-3v12.4a2.6 2.6 0 0 1-2.6 2.6 2.6 2.6 0 0 1-2.6-2.6A2.6 2.6 0 0 1 8.2 12.8c.28 0 .56.04.82.12V9.84A5.59 5.59 0 0 0 8.2 9.6 5.6 5.6 0 0 0 2.6 15.2a5.6 5.6 0 0 0 5.6 5.6 5.6 5.6 0 0 0 5.6-5.6V9.74a7.28 7.28 0 0 0 4.2 1.34V8.08a4.28 4.28 0 0 1-1.4-2.26z" />
            </svg>
        ),
    },
    {
        label: 'Facebook',
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z" />
            </svg>
        ),
    },
    {
        label: 'YouTube',
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
        ),
    },
    {
        label: 'X',
        icon: (
            <svg viewBox="0 0 24 24">
                <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41z" />
            </svg>
        ),
    },
];

export default function Home() {
    const outerRef = useRef<HTMLDivElement>(null);
    const page2Ref = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);
    const stepsHeadingRef = useRef<HTMLHeadingElement>(null);
    const faqRef = useRef<HTMLDivElement>(null);
    const faqVisible = useInView(faqRef, { once: true, amount: 0.5 });
    const footerDividerRef = useRef<HTMLDivElement>(null);
    const footerTriggerY = useRef<number | null>(null);
    const footerProgress = useMotionValue(0);
    const footerSpacerHeight = useTransform(footerProgress, [0, 1], [0, 200]);
    const [dims, setDims] = useState({ page2: 0, vh: 800 });

    const measure = () => {
        setDims({
            page2: page2Ref.current?.offsetHeight ?? 0,
            vh: window.innerHeight,
        });
    };

    useEffect(() => {
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    // How far into Page 2 content is scrollable after it's fully in view
    const P2 = Math.max(0, dims.page2 - dims.vh);
    // Dead zone: scroll distance where gallery is frozen and Page 2 hasn't started yet
    const D = Math.round(dims.vh * 0.1875);
    // Page 2 slides up over 1.5 viewports of scrolling — slower, more gradual
    const T = Math.round(dims.vh * 1.5);
    // Outer container height includes dead zone
    const outerHeight = D + T + P2 + dims.vh;

    const { scrollYProgress } = useScroll({ target: outerRef });

    // Fraction where dead zone ends and Page 2 starts sliding
    const fDead = D / (D + T + P2);
    // Fraction at which Page 2 is fully in (before Page 2 content scroll begins)
    const f1 = P2 === 0 ? 0.99 : (D + T) / (D + T + P2);
    const page2Y = useTransform(
        scrollYProgress,
        [0, fDead, f1, 1],
        [dims.vh, dims.vh, 0, -Math.max(P2, 1)]
    );

    // Steps 3D tilt — scroll-driven, starts when heading hits viewport midpoint, one-way
    const stepsMaxProgress = useMotionValue(0);
    const stepsRotateX = useTransform(stepsMaxProgress, [0, 1], [55, 8]);
    useEffect(() => {
        const onScroll = () => {
            if (!stepsHeadingRef.current) return;
            const rect = stepsHeadingRef.current.getBoundingClientRect();
            const vh = window.innerHeight;
            // Start when heading top hits viewport center, finish when near top third
            const progress = Math.min(1, Math.max(0, (vh * 0.4 - rect.top) / (vh * 0.18)));
            if (stepsMaxProgress.get() >= 1) return;
            stepsMaxProgress.set(progress);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [stepsMaxProgress]);

    // Footer reveal — scroll-driven, one-way
    useEffect(() => {
        const onScroll = () => {
            if (footerProgress.get() >= 1 || !footerDividerRef.current) return;
            // Record the scroll position the first time the divider hits the viewport bottom
            if (footerTriggerY.current === null) {
                const rect = footerDividerRef.current.getBoundingClientRect();
                if (rect.top > window.innerHeight) return;
                footerTriggerY.current = window.scrollY;
            }
            // If user scrolls back above trigger point, reset so it can re-arm
            if (window.scrollY < footerTriggerY.current && footerProgress.get() < 1) {
                footerTriggerY.current = null;
                footerProgress.set(0);
                return;
            }
            // Drive progress from that fixed scroll position — 200px of scroll = full reveal
            const progress = Math.min(1, Math.max(0, (window.scrollY - footerTriggerY.current) / 200));
            // Reversible until complete, then locked
            if (footerProgress.get() < 1) footerProgress.set(progress);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [footerProgress]);

    return (
        <main className={`${cormorant.variable} ${poppins.variable} ${lobster.variable} ${cormorant.className} text-[var(--text-primary)]`}>

            {/* ── Hero — natural scroll, no sticky, no transforms ── */}
            <section className="noise-overlay relative overflow-hidden min-h-[92vh] flex items-center"
                style={{
                    background: `
                        radial-gradient(ellipse 70% 50% at 25% 30%, rgba(244,226,216,0.8) 0%, transparent 60%),
                        radial-gradient(ellipse 50% 40% at 80% 60%, rgba(232,207,193,0.5) 0%, transparent 50%),
                        linear-gradient(175deg, #FDF8F4 0%, #F4E2D8 40%, #E8CFC1 100%)
                    `,
                }}>
                <div className="absolute top-[8%] right-[5%] w-[180px] sm:w-[240px] lg:w-[300px] h-auto opacity-[0.12] rotate-12 pointer-events-none">
                    <svg viewBox="0 0 300 220" fill="none" stroke="var(--accent-umber)" strokeWidth="1">
                        <rect x="10" y="10" width="280" height="200" rx="8" />
                        <path d="M10 10 L150 120 L290 10" />
                        <path d="M10 210 L120 120" />
                        <path d="M290 210 L180 120" />
                    </svg>
                </div>
                <div className="absolute top-[75%] left-[5%] w-[180px] sm:w-[240px] lg:w-[300px] h-auto opacity-[0.12] -rotate-30 pointer-events-none hidden sm:block">
                    <svg viewBox="0 0 300 220" fill="none" stroke="var(--accent-umber)" strokeWidth="1">
                        <rect x="10" y="10" width="280" height="200" rx="8" />
                        <path d="M10 10 L150 120 L290 10" />
                        <path d="M10 210 L120 120" />
                        <path d="M290 210 L180 120" />
                    </svg>
                </div>
                <div className="absolute top-[-10%] left-[60%] w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] rounded-full opacity-[0.08]"
                    style={{ background: 'radial-gradient(circle, var(--accent-champagne) 0%, transparent 65%)' }} />

                <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-16 py-12 sm:py-16 md:py-0">
                    <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-6 lg:gap-10">
                        <div className="flex-[1.4] text-center md:text-left md:pt-4">
                            <h1 className={`${lobster.className} reveal-up delay-2 text-[clamp(2.8rem,5vw,7rem)] leading-[0.9] tracking-[-0.03em] text-[var(--accent-umber)]`}>
                                <span className={`${cormorant.className} italic`}>A card</span> <span className="gold-underline" style={{ fontSize: '0.91em', fontWeight: 100 }}>worth</span><br /><span className={`${cormorant.className} italic`}>keeping</span>
                            </h1>
                            <p className={`${poppins.className} font-extralight reveal-up delay-3 text-[clamp(0.95rem,2vw,1.15rem)] text-[var(--text-secondary)] mt-7 max-w-[500px] mx-auto md:mx-0 leading-relaxed tracking-[0.03em]`}>
                                Generate personalized cards and custom songs. Because the card you send should be as unique as they are.
                            </p>
                            <div className="reveal-up delay-4 mt-8 sm:mt-12 flex flex-col sm:flex-row items-center md:items-start gap-4">
                                <Link href="/signup" className={`${poppins.className} font-bold btn-matte inline-flex items-center gap-0 px-8 sm:px-12 py-3.5 sm:py-4.5 rounded-full text-[13px] sm:text-[14px] tracking-[0.06em] uppercase shadow-lg`}>
                                    Start for Free
                                    <span className="btn-arrow translate-y-[0.5px]">→</span>
                                </Link>
                                <Link href="/login" className={`${poppins.className} font-semibold inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[12px] sm:text-[13px] text-[var(--text-secondary)] border-2 border-[var(--accent-gold)]/40 hover:border-[var(--accent-gold)] hover:bg-[var(--accent-champagne)]/10 transition-all duration-400`}>
                                    Log In
                                </Link>
                            </div>
                            <p className={`${poppins.className} font-extralight reveal-up delay-5 text-[10px] text-[var(--text-muted)] mt-4 md:ml-4 tracking-[0.25em] uppercase`}>
                                Includes 1 free image generation and 1 free song
                            </p>
                        </div>

                        <div className="card-stack reveal-scale delay-4 hidden md:flex flex-1 flex-shrink-0 relative w-full max-w-[320px] lg:max-w-[380px] h-[380px] lg:h-[440px] items-center justify-center">
                            <div className="gentle-bob absolute w-[220px] lg:w-[260px] h-[316px] lg:h-[373px] rotate-[-9deg] translate-x-0 translate-y-5" style={{ animationDelay: '0.5s' }}>
                                <div className="back-card-inner w-full h-full rounded-2xl"
                                    style={{ background: 'linear-gradient(150deg, #D4BB7E,rgb(46, 43, 37))', boxShadow: '0 24px 64px rgba(74,59,34,0.58)' }}>
                                    <div className="absolute inset-3 rounded-xl border border-white/25" />
                                    <div className="stamp-corner stamp-corner-tl" />
                                    <div className="stamp-corner stamp-corner-br" />
                                </div>
                            </div>
                            <div className="gentle-bob absolute w-[220px] lg:w-[260px] h-[316px] lg:h-[373px] rotate-[5deg] -translate-x-2">
                                <div className="hover-3d front-3d w-full h-full">
                                    <div className="w-full h-full rounded-2xl"
                                        style={{ background: 'linear-gradient(150deg, #FDF8F4, #F4E2D8)', boxShadow: '0 28px 64px rgba(74,59,34,0.22)' }}>
                                        <div className="card-front-content absolute inset-3 rounded-xl border border-[var(--accent-gold)]/15 flex flex-col items-center justify-center gap-4">
                                            <Image src="/SecondaryLogo.png" alt="SouveNote" width={260} height={260} className="w-[200px] lg:w-[260px] h-[200px] lg:h-[260px] object-contain" />
                                            <div className="flex flex-col items-center gap-4 relative -top-8">
                                                <div className={`${lobster.className} text-[22px] lg:text-[26px] text-[var(--accent-umber)]`}>For You</div>
                                                <div className="w-20 h-[2px] rounded-full" style={{ background: 'linear-gradient(to right, transparent, var(--accent-gold), transparent)' }} />
                                                <div className="flex gap-1.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <div key={i} className="w-5 h-[3px] rounded-full bg-[var(--accent-bronze)]/15" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stamp-corner stamp-corner-tl" />
                                        <div className="stamp-corner stamp-corner-tr" />
                                        <div className="stamp-corner stamp-corner-bl" />
                                        <div className="stamp-corner stamp-corner-br" />
                                    </div>
                                    <div /><div /><div /><div /><div /><div /><div /><div />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Ornamental Divider — natural scroll ── */}
            <div className="ornament-divider">
                <span className="diamond" />
            </div>

            {/* ── Sticky zone: Gallery freezes, Page 2 slides up over it ── */}
            <div ref={outerRef} style={{ height: outerHeight }}>

                {/* Layer 1 — Gallery, sticky, vertically centered, NO JS animation */}
                <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1, display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '100%' }}>
                        <GallerySection
                            lobsterClassName={lobster.className}
                            poppinsClassName={poppins.className}
                            cormorantClassName={cormorant.className}
                        />
                    </div>
                </div>

                {/* Layer 2 — Page 2, slides up over the frozen gallery */}
                <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'clip', zIndex: 2, marginTop: '-100vh', pointerEvents: 'none' }}>
                    <motion.div
                        ref={page2Ref}
                        style={{ y: page2Y, willChange: 'transform', pointerEvents: 'auto' }}
                    >

                        {/* ── Video Section ── */}
                        <section className="noise-overlay relative py-16 sm:py-20 lg:py-28 overflow-hidden rounded-t-[2rem] sm:rounded-t-[3rem]"
                            style={{ background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-deep-end) 100%)', boxShadow: '0 -8px 20px rgba(0,0,0,0.4)' }}>
                            <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] opacity-[0.06]"
                                style={{ background: 'radial-gradient(ellipse, var(--accent-gold), transparent 70%)' }} />
                            <div className="relative z-10 px-5 sm:px-10">
                                <div className="text-center mb-12">
                                    <p className={`${poppins.className} section-label text-[var(--accent-gold)]/70 mb-3 border border-[var(--accent-gold)]/65 rounded px-4 py-0.5 inline-block`}>Watch</p>
                                    <h2 className={`${lobster.className} text-[clamp(2.2rem,5vw,3.8rem)] text-[var(--accent-champagne)] leading-tight`}>
                                        See how it works
                                    </h2>
                                    <p className={`${poppins.className} font-extralight text-[#8B7E72] mt-3 text-[15px] tracking-wide`}>
                                        Under 90 seconds. Auto-captions included.
                                    </p>
                                </div>
                                <div className="relative w-full max-w-[765px] aspect-video mx-auto rounded-2xl overflow-hidden"
                                    style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,187,126,0.15)' }}>
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #3D3020, #2A2019 40%, #1F180F)' }} />
                                    <div className="stamp-corner stamp-corner-tl" style={{ borderColor: 'var(--accent-gold)', opacity: 0.25 }} />
                                    <div className="stamp-corner stamp-corner-tr" style={{ borderColor: 'var(--accent-gold)', opacity: 0.25 }} />
                                    <div className="stamp-corner stamp-corner-bl" style={{ borderColor: 'var(--accent-gold)', opacity: 0.25 }} />
                                    <div className="stamp-corner stamp-corner-br" style={{ borderColor: 'var(--accent-gold)', opacity: 0.25 }} />
                                    <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 50%, var(--accent-gold) 0%, transparent 31.5%)' }} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="play-btn w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center cursor-pointer border border-[var(--accent-gold)]/30"
                                            style={{ background: 'rgba(74, 59, 34, 0.5)', backdropFilter: 'blur(8px)' }}>
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 ml-1" fill="var(--accent-champagne)" viewBox="0 0 24 24">
                                                <polygon points="5,3 19,12 5,21" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={`${poppins.className} absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-[10px] tracking-wider text-[var(--accent-champagne)]/70 border border-[var(--accent-gold)]/10`}
                                        style={{ background: 'rgba(42, 32, 25, 0.6)', backdropFilter: 'blur(4px)' }}>
                                        CC &nbsp; Auto-captions enabled
                                    </div>
                                    <button className={`${poppins.className} absolute top-4 right-4 px-5 py-2 rounded-full border border-[var(--accent-gold)]/20 text-[var(--accent-champagne)]/60 text-[10px] font-semibold hover:border-[var(--accent-gold)]/40 hover:text-[var(--accent-champagne)] transition-all tracking-wider uppercase`}
                                        style={{ background: 'rgba(42, 32, 25, 0.5)', backdropFilter: 'blur(4px)' }}>
                                        Skip for now
                                    </button>
                                    <div className={`${poppins.className} absolute bottom-4 right-4 text-[10px] text-[var(--accent-champagne)]/40 tracking-wider`}>
                                        0:00 / 1:28
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ── How It Works ── */}
                        <section className="relative py-12 sm:py-16 px-5 sm:px-10 overflow-hidden"
                            style={{
                                background: `
                                    radial-gradient(ellipse 60% 50% at 50% 30%, rgba(238,221,170,0.15) 0%, transparent 60%),
                                    linear-gradient(180deg, var(--bg-warm) 0%, var(--bg-primary) 35%, var(--bg-cream) 100%)
                                `,
                            }}>
                            <div className="relative z-10 max-w-[1100px] mx-auto">
                                <div className="text-center mb-12 sm:mb-20 lg:mb-24">
                                    <p className={`${poppins.className} section-label text-[var(--accent-bronze)] mb-3`}>How It Works</p>
                                    <h2 ref={stepsHeadingRef} className={`${cormorant.className} italic text-[clamp(2.2rem,5vw,3.8rem)] text-[var(--accent-umber)] leading-tight`}>Three. Simple. Steps.</h2>
                                    <p className={`${poppins.className} font-extralight text-[var(--text-muted)] mt-3 text-[15px] tracking-wide`}>
                                        From idea to mailbox &mdash; we handle the rest.
                                    </p>
                                </div>
                                <div ref={stepsRef} className="relative" style={{ perspective: '1000px' }}>
                                    <motion.div className="relative flex flex-col md:flex-row gap-5 md:gap-4 lg:gap-5 items-stretch" style={{ rotateX: stepsRotateX, transformOrigin: 'top center' }}>
                                    <div className="timeline-line hidden md:block" />
                                        {[
                                            {
                                                n: '1', title: 'Choose or describe',
                                                body: 'Pick from a template or answer a few questions about who the card is for.',
                                                bg: 'linear-gradient(135deg, #D8DCE4, #B8BEC8)',
                                                icon: <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></>,
                                                stroke: 'rgba(255,255,255,0.8)', mt: ''
                                            },
                                            {
                                                n: '2', title: 'We create it',
                                                body: 'AI generates your card design and a personalized song just for them.',
                                                bg: 'linear-gradient(135deg, #E8C5BE, #C9897D)',
                                                icon: <><path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" /><path d="m18 15 4-4" /><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.243-1.765L9 3l.927.927A6.17 6.17 0 0 1 12 8.456V10" /></>,
                                                stroke: 'rgba(255,255,255,0.8)', mt: 'md:-mt-8'
                                            },
                                            {
                                                n: '3', title: 'We print & send',
                                                body: 'We print the card and mail it directly — no envelopes, no stamps, no hassle.',
                                                bg: 'linear-gradient(135deg, var(--accent-champagne), var(--accent-gold))',
                                                icon: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
                                                stroke: 'rgba(255,255,255,0.8)', mt: ''
                                            },
                                        ].map(({ n, title, body, bg, icon, stroke, mt }) => (
                                            <div key={n} className={`flex-1 relative z-10 group ${mt}`}>
                                                <div className="glass-card rounded-t-3xl rounded-b-none p-8 sm:p-10 h-full relative">
                                                    <GlowingEffect spread={28} proximity={48} inactiveZone={0.01} borderWidth={1.5} />
                                                    <div className={`${poppins.className} absolute top-[-10px] right-4 text-[80px] sm:text-[120px] md:text-[100px] lg:text-[160px] font-black leading-none text-[var(--accent-umber)]/[0.05] select-none pointer-events-none`}>{n}</div>
                                                    <div className="relative z-10">
                                                        <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center" style={{ background: bg }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                            {icon}
                                                        </svg>
                                                    </div>
                                                        <h3 className={`${lora.className} font-semibold text-[19px] text-[var(--accent-umber)] mb-2`}>{title}</h3>
                                                        <p className={`${poppins.className} font-normal text-[14px] text-[var(--text-secondary)]/75 leading-[1.7]`}>{body}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </section>

                        {/* ── FAQ ── */}
                        <section className="pt-10 sm:pt-14 lg:pt-16 pb-20 sm:pb-28 lg:pb-40 px-5 sm:px-10"
                            style={{ background: 'linear-gradient(180deg, var(--bg-cream) 0%, #fff 50%, var(--bg-cream) 100%)' }}>
                            <div className="max-w-[1100px] mx-auto">
                                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                                    <div ref={faqRef} className="lg:w-[300px] lg:flex-shrink-0 text-center lg:text-left lg:pt-4">
                                        <motion.p
                                            className={`${poppins.className} section-label text-[var(--accent-bronze)] mb-3`}
                                            initial={false}
                                            animate={{ opacity: faqVisible ? 1 : 0 }}
                                            transition={{ duration: 0.5, delay: faqVisible ? 0.5 : 0 }}
                                        >FAQ</motion.p>
                                        <motion.h2
                                            className={`${lora.className} text-[clamp(2.2rem,5vw,3.5rem)] text-[var(--accent-umber)] leading-[1.05]`}
                                            initial={false}
                                            animate={{ opacity: faqVisible ? 1 : 0 }}
                                            transition={{ duration: 0.9, delay: faqVisible ? 0.25 : 0 }}
                                        >
                                            Frequently asked questions
                                        </motion.h2>
                                        <motion.p
                                            className={`${poppins.className} font-extralight text-[var(--text-muted)] mt-3 text-[15px] tracking-wide leading-relaxed`}
                                            initial={false}
                                            animate={{ opacity: faqVisible ? 1 : 0 }}
                                            transition={{ duration: 0.5, delay: faqVisible ? 0.5 : 0 }}
                                        >
                                            Quick answers to the most common questions.
                                        </motion.p>
                                        <Link href="/faq" className={`${poppins.className} font-semibold inline-flex items-center gap-2 text-[12px] text-[var(--accent-bronze)] hover:text-[var(--accent-umber)] transition-colors group mt-6 tracking-[0.1em] uppercase`}>
                                            <span>View all FAQs</span>
                                            <svg className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="flex-1"><FAQAccordion /></div>
                                </div>
                            </div>
                        </section>

                    </motion.div>
                </div>

            </div>

            {/* ── FAQ background spacer — extends FAQ cream bg, one-way animation ── */}
            <motion.div
                style={{ height: footerSpacerHeight, background: 'var(--bg-cream)', overflow: 'hidden' }}
            >
                <div className="h-[200px] flex items-center justify-center pt-6">
                    <Image src="/MainLogo.png" alt="Souvenote" width={800} height={280} className="w-full max-w-[800px] px-4" />
                </div>
            </motion.div>

            {/* ── Chatbot Widget ── */}
            <div className="relative max-w-[1440px] mx-auto">
                <div className="chat-widget absolute -top-8 right-6 sm:right-10 flex items-center gap-2.5 px-5 py-3 pl-3 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 z-50 border border-[var(--accent-gold)]/20 hover:border-[var(--accent-gold)]/40"
                    style={{ background: 'linear-gradient(135deg, rgba(253,248,244,0.95), rgba(244,226,216,0.95))', backdropFilter: 'blur(12px)' }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-bronze))' }}>
                        <svg className="w-4 h-4" fill="none" stroke="#FDF8F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <span className={`${poppins.className} text-[11px] font-semibold text-[var(--accent-umber)] whitespace-nowrap tracking-wide`}>Need help? Chat with us</span>
                </div>
            </div>

            {/* ── Footer ── */}
            <footer className="relative overflow-hidden pt-14 sm:pt-20 pb-8 sm:pb-10 px-5 sm:px-10"
                style={{ background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-deep-end) 100%)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: 'linear-gradient(to right, transparent, var(--accent-gold), transparent)' }} />
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
                        <div>
                            <h4 className={`${poppins.className} font-black text-[13px] uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-5`}>Company</h4>
                            <div className="flex flex-col gap-3">
                                <Link href="/" className={`${poppins.className} footer-link text-[15px] text-[#8B7E72] hover:text-[var(--accent-champagne)]`}>Home</Link>
                                <Link href="/privacy" className={`${poppins.className} footer-link text-[15px] text-[#8B7E72] hover:text-[var(--accent-champagne)]`}>Privacy Policy</Link>
                                <Link href="/terms" className={`${poppins.className} footer-link text-[15px] text-[#8B7E72] hover:text-[var(--accent-champagne)]`}>Terms of Service</Link>
                                <Link href="/contact" className={`${poppins.className} footer-link text-[15px] text-[#8B7E72] hover:text-[var(--accent-champagne)]`}>Contact Us</Link>
                            </div>
                        </div>
                        <div>
                            <h4 className={`${poppins.className} font-black text-[13px] uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-5`}>Resources</h4>
                            <div className="flex flex-col gap-3">
                                <Link href="/" className={`${poppins.className} footer-link text-[15px] text-[#8B7E72] hover:text-[var(--accent-champagne)]`}>About Us</Link>
                                <Link href="/pricing" className={`${poppins.className} footer-link text-[15px] text-[#8B7E72] hover:text-[var(--accent-champagne)]`}>Pricing</Link>
                                <Link href="/faq" className={`${poppins.className} footer-link text-[15px] text-[#8B7E72] hover:text-[var(--accent-champagne)]`}>FAQ</Link>
                                <Link href="/" className={`${poppins.className} footer-link text-[15px] text-[#8B7E72] hover:text-[var(--accent-champagne)]`}>Resources</Link>
                            </div>
                        </div>
                        <div>
                            <h4 className={`${poppins.className} font-black text-[13px] uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-5`}>Connect</h4>
                            <div className="flex gap-2.5 mb-6">
                                {SOCIAL_ICONS.map(({ label, icon }) => (
                                    <div key={label} title={label}
                                        className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-[var(--accent-gold)]/15 hover:border-[var(--accent-gold)]/50 hover:scale-110 [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:fill-[#8B7E72] hover:[&_svg]:fill-[var(--accent-champagne)]"
                                        style={{ background: 'rgba(212,187,126,0.06)' }}>
                                        {icon}
                                    </div>
                                ))}
                            </div>
                            <span className={`${poppins.className} font-semibold text-[13px] text-[#6B5E54] tracking-[0.15em] uppercase block mb-3`}>Stay updated</span>
                            <div className="flex gap-2">
                                <input type="email" placeholder="you@email.com"
                                    className={`${poppins.className} px-4 py-2.5 border border-[var(--accent-gold)]/15 rounded-full bg-white/[0.04] text-[var(--accent-champagne)] text-[14px] outline-none flex-1 min-w-0 focus:border-[var(--accent-gold)]/40 transition-colors placeholder:text-[#6B5E54] tracking-wide`}
                                />
                                <button className={`${poppins.className} font-bold btn-matte px-4 py-2.5 rounded-full text-[13px] tracking-[0.1em] uppercase flex-shrink-0`}>
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <div ref={footerDividerRef} className="my-10 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,187,126,0.15), transparent)' }} />
                    <div className={`${poppins.className} text-center text-[13px] text-[#6B5E54] tracking-[0.2em] uppercase`}>
                        &copy; 2026 SouveNote. All rights reserved.
                    </div>
                </div>
            </footer>

        </main>
    );
}
