'use client';

import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useInView } from 'framer-motion';
// Link import removed — display-only mode
import Image from 'next/image';
import { Lobster, Poppins, Cormorant_Garamond, Lora } from 'next/font/google';
import GallerySection from './components/GallerySection';
import FAQAccordion from './components/FAQAccordion';
import { GlowingEffect } from './components/GlowingEffect';
import { ButtonColorful } from '@/components/ui/button-colorful';

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

    useLayoutEffect(() => {
        measure();
        const id = requestAnimationFrame(() => measure());
        window.addEventListener('resize', measure);
        return () => {
            cancelAnimationFrame(id);
            window.removeEventListener('resize', measure);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const t = window.setTimeout(measure, 250);
        return () => window.clearTimeout(t);
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
        <main className={`relative z-0 ${cormorant.variable} ${poppins.variable} ${lobster.variable} ${cormorant.className} text-[var(--text-primary)]`}>

            {/* Above gallery rail: keep z-index above sticky parallax (z-index 2) inside outerRef. */}
            <div className="relative z-40">
            {/* ── Hero — natural scroll, no sticky, no transforms ── */}
            <section className="noise-overlay relative overflow-hidden min-h-screen flex items-center pt-[72px] sm:pt-[80px]"
                style={{
                    background: `
                        radial-gradient(ellipse 55% 45% at 82% 45%, rgba(212,175,55,0.10) 0%, transparent 60%),
                        radial-gradient(ellipse 40% 35% at 15% 20%, rgba(232,234,238,0.04) 0%, transparent 55%),
                        linear-gradient(180deg, #050507 0%, #08080B 60%, #0B0B0F 100%)
                    `,
                }}>
                <div className="absolute top-[8%] right-[5%] w-[180px] sm:w-[240px] lg:w-[300px] h-auto opacity-[0.08] rotate-12 pointer-events-none">
                    <svg viewBox="0 0 300 220" fill="none" stroke="var(--platinum-lo)" strokeWidth="1">
                        <rect x="10" y="10" width="280" height="200" rx="8" />
                        <path d="M10 10 L150 120 L290 10" />
                        <path d="M10 210 L120 120" />
                        <path d="M290 210 L180 120" />
                    </svg>
                </div>
                <div className="absolute top-[75%] left-[5%] w-[180px] sm:w-[240px] lg:w-[300px] h-auto opacity-[0.08] -rotate-30 pointer-events-none hidden sm:block">
                    <svg viewBox="0 0 300 220" fill="none" stroke="var(--platinum-lo)" strokeWidth="1">
                        <rect x="10" y="10" width="280" height="200" rx="8" />
                        <path d="M10 10 L150 120 L290 10" />
                        <path d="M10 210 L120 120" />
                        <path d="M290 210 L180 120" />
                    </svg>
                </div>
                <div className="absolute top-[-10%] left-[60%] w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[450px] lg:h-[600px] rounded-full opacity-[0.08]"
                    style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 65%)' }} />

                <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-16 py-12 sm:py-16 md:py-0 md:pb-20">
                    <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-6 lg:gap-10">
                        <div className="flex-[1.4] text-center md:text-left md:pt-16">
                            <h1 className={`${lobster.className} reveal-up delay-2 text-[clamp(2.5rem,4.5vw,6rem)] leading-[1.05] tracking-[-0.03em] text-[var(--platinum-hi)]`}>
                                <span className={`${cormorant.className} italic text-metallic-silver`}>A card</span> <span className={`${cormorant.className} italic text-[var(--gold-hi)]`} style={{ textShadow: '0 0 20px rgba(241,208,116,0.42), 0 0 40px rgba(212,175,55,0.2)' }}>worth</span> <span className={`${cormorant.className} italic text-metallic-silver`}>keeping</span>
                            </h1>
                            <div className="reveal-up delay-3 mt-1 sm:mt-2 flex flex-col sm:flex-row items-center md:items-start gap-4">
                                <ButtonColorful
                                    label="Start for Free"
                                    className={`${poppins.className} rounded-3xl px-8 sm:px-12 py-3.5 sm:py-4.5 h-auto text-[13px] sm:text-[14px] tracking-[0.06em] uppercase shadow-lg`}
                                />
                                <span
                                    className={`${poppins.className} font-semibold inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-3xl text-[12px] sm:text-[13px] text-[var(--platinum-mid)] transition-all duration-400 cursor-pointer`}
                                    style={{
                                        border: '1px solid var(--platinum-lo)',
                                        background: 'rgba(232,234,238,0.02)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--platinum-hi)';
                                        e.currentTarget.style.color = 'var(--platinum-hi)';
                                        e.currentTarget.style.background = 'rgba(232,234,238,0.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--platinum-lo)';
                                        e.currentTarget.style.color = 'var(--platinum-mid)';
                                        e.currentTarget.style.background = 'rgba(232,234,238,0.02)';
                                    }}
                                >
                                    Log In
                                </span>
                            </div>
                            <p className={`${poppins.className} font-extralight reveal-up delay-4 text-[clamp(0.875rem,1.8vw,1.05rem)] text-[var(--platinum-mid)] mt-20 max-w-[500px] mx-auto md:mx-0 leading-relaxed tracking-[0.03em]`}>
                                Generate personalized cards and custom songs. Because the card you send should be as unique as they are.
                            </p>
                            <p className={`${poppins.className} font-extralight reveal-up delay-5 text-[10px] text-[var(--platinum-mid)] mt-4 md:ml-4 tracking-[0.25em] uppercase`}>
                                Includes 1 free image generation and 1 free song
                            </p>
                        </div>

                        <div className="card-stack reveal-scale delay-4 hidden md:flex flex-1 flex-shrink-0 relative w-full max-w-[380px] lg:max-w-[460px] h-[470px] lg:h-[560px] items-center justify-center ml-8 lg:ml-12">

                            {/* ── Back card ── */}
                            <div className="gentle-bob absolute w-[275px] lg:w-[320px] h-[395px] lg:h-[460px] rotate-[-7deg] -translate-x-1 translate-y-1" style={{ animationDelay: '0.6s' }}>
                                <div className="back-card-inner w-full h-full rounded-2xl relative overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(160deg, #9EAAB6 0%, #C8D4DC 12%, #E8EEF2 22%, #F4F7F9 28%, #D0D8DF 38%, #A8B4BC 50%, #C4CDD4 60%, #EFF2F5 68%, #F8FAFB 72%, #D4DCE3 82%, #9EAAB6 100%)',
                                        boxShadow: '0 24px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,212,220,0.4)',
                                    }}>
                                    {/* Sharp specular highlight band */}
                                    <div className="absolute inset-0 pointer-events-none"
                                        style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 44%, rgba(255,255,255,0.7) 48%, rgba(255,255,255,0.55) 52%, transparent 66%)' }} />
                                    {/* Edge darkening for depth */}
                                    <div className="absolute inset-0 pointer-events-none"
                                        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(60,75,90,0.22) 100%)' }} />
                                    {/* Inset border */}
                                    <div className="absolute inset-[7px] rounded-xl" style={{ border: '1px solid rgba(180,195,210,0.45)' }} />
                                    <div className="stamp-corner stamp-corner-tl" style={{ borderColor: 'rgba(160,175,190,0.65)', opacity: 0.8 }} />
                                    <div className="stamp-corner stamp-corner-br" style={{ borderColor: 'rgba(160,175,190,0.65)', opacity: 0.8 }} />
                                    {/* Occasion label */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(120,140,160,0.55))' }} />
                                            <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(120,140,160,0.65)' }} />
                                            <div className="w-8 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(120,140,160,0.55))' }} />
                                        </div>
                                        <div className={`${poppins.className} text-[9px] tracking-[0.35em] uppercase`} style={{ color: 'rgba(80,100,120,0.75)' }}>Anniversary</div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(120,140,160,0.55))' }} />
                                            <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(120,140,160,0.65)' }} />
                                            <div className="w-8 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(120,140,160,0.55))' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── Front card ── */}
                            <div className="gentle-bob absolute w-[275px] lg:w-[320px] h-[395px] lg:h-[460px] rotate-[3deg] -translate-x-3">
                                <div className="hover-3d front-3d w-full h-full">
                                    <div className="w-full h-full rounded-2xl relative overflow-hidden"
                                        style={{
                                            background: 'linear-gradient(160deg, #A07828 0%, #C8A840 14%, #EDD870 24%, #FBF0A8 30%, #D4BC58 42%, #A88030 54%, #C8A844 64%, #ECD870 72%, #FEF8B8 76%, #D0B44C 86%, #A07828 100%)',
                                            boxShadow: '0 36px 90px rgba(0,0,0,0.65), 0 0 0 1px rgba(212,175,55,0.45), inset 0 1px 0 rgba(255,248,180,0.9)',
                                        }}>
                                        {/* Sharp specular highlight */}
                                        <div className="absolute inset-0 pointer-events-none"
                                            style={{ background: 'linear-gradient(110deg, transparent 28%, rgba(255,248,180,0.6) 42%, rgba(255,252,200,0.75) 48%, rgba(255,248,180,0.6) 54%, transparent 68%)' }} />
                                        {/* Edge vignette for depth */}
                                        <div className="absolute inset-0 pointer-events-none"
                                            style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(80,55,10,0.25) 100%)' }} />
                                        {/* Diamond tile texture */}
                                        <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 1L21 11L11 21L1 11Z' stroke='rgba(80%2C50%2C5%2C0.09)' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
                                            backgroundSize: '22px 22px',
                                        }} />

                                        {/* Outer frame */}
                                        <div className="absolute inset-[8px] rounded-xl pointer-events-none" style={{ border: '1px solid rgba(180,130,20,0.5)' }} />
                                        {/* Inner frame */}
                                        <div className="absolute inset-[13px] rounded-lg pointer-events-none" style={{ border: '1px solid rgba(180,130,20,0.25)' }} />

                                        {/* Corner flourish — top-left */}
                                        <svg className="absolute top-[8px] left-[8px] w-10 h-10 pointer-events-none" viewBox="0 0 40 40">
                                            <path d="M2,38 L2,10 Q2,2 10,2 L38,2" stroke="rgba(160,110,15,0.7)" strokeWidth="0.8" fill="none"/>
                                            <path d="M7,34 Q7,7 34,7" stroke="rgba(160,110,15,0.28)" strokeWidth="0.6" fill="none"/>
                                            <circle cx="10" cy="10" r="1.8" fill="rgba(185,135,20,0.75)"/>
                                            <circle cx="2" cy="38" r="1.1" fill="rgba(160,110,15,0.5)"/>
                                            <circle cx="38" cy="2" r="1.1" fill="rgba(160,110,15,0.5)"/>
                                        </svg>
                                        {/* Corner flourish — top-right */}
                                        <svg className="absolute top-[8px] right-[8px] w-10 h-10 pointer-events-none" viewBox="0 0 40 40" style={{ transform: 'scaleX(-1)' }}>
                                            <path d="M2,38 L2,10 Q2,2 10,2 L38,2" stroke="rgba(160,110,15,0.7)" strokeWidth="0.8" fill="none"/>
                                            <path d="M7,34 Q7,7 34,7" stroke="rgba(160,110,15,0.28)" strokeWidth="0.6" fill="none"/>
                                            <circle cx="10" cy="10" r="1.8" fill="rgba(185,135,20,0.75)"/>
                                            <circle cx="2" cy="38" r="1.1" fill="rgba(160,110,15,0.5)"/>
                                            <circle cx="38" cy="2" r="1.1" fill="rgba(160,110,15,0.5)"/>
                                        </svg>
                                        {/* Corner flourish — bottom-left */}
                                        <svg className="absolute bottom-[8px] left-[8px] w-10 h-10 pointer-events-none" viewBox="0 0 40 40" style={{ transform: 'scaleY(-1)' }}>
                                            <path d="M2,38 L2,10 Q2,2 10,2 L38,2" stroke="rgba(160,110,15,0.7)" strokeWidth="0.8" fill="none"/>
                                            <path d="M7,34 Q7,7 34,7" stroke="rgba(160,110,15,0.28)" strokeWidth="0.6" fill="none"/>
                                            <circle cx="10" cy="10" r="1.8" fill="rgba(185,135,20,0.75)"/>
                                            <circle cx="2" cy="38" r="1.1" fill="rgba(160,110,15,0.5)"/>
                                            <circle cx="38" cy="2" r="1.1" fill="rgba(160,110,15,0.5)"/>
                                        </svg>
                                        {/* Corner flourish — bottom-right */}
                                        <svg className="absolute bottom-[8px] right-[8px] w-10 h-10 pointer-events-none" viewBox="0 0 40 40" style={{ transform: 'scale(-1)' }}>
                                            <path d="M2,38 L2,10 Q2,2 10,2 L38,2" stroke="rgba(160,110,15,0.7)" strokeWidth="0.8" fill="none"/>
                                            <path d="M7,34 Q7,7 34,7" stroke="rgba(160,110,15,0.28)" strokeWidth="0.6" fill="none"/>
                                            <circle cx="10" cy="10" r="1.8" fill="rgba(185,135,20,0.75)"/>
                                            <circle cx="2" cy="38" r="1.1" fill="rgba(160,110,15,0.5)"/>
                                            <circle cx="38" cy="2" r="1.1" fill="rgba(160,110,15,0.5)"/>
                                        </svg>

                                        {/* Center medallion watermark */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.07 }}>
                                            <svg viewBox="0 0 120 120" className="w-36 h-36">
                                                <path d="M60,8 L112,60 L60,112 L8,60Z" stroke="rgba(80,50,5,1)" strokeWidth="1" fill="none"/>
                                                <path d="M60,22 L98,60 L60,98 L22,60Z" stroke="rgba(80,50,5,1)" strokeWidth="0.8" fill="none"/>
                                                <path d="M60,38 L82,60 L60,82 L38,60Z" stroke="rgba(80,50,5,1)" strokeWidth="0.8" fill="none"/>
                                                <path d="M60,50 L70,60 L60,70 L50,60Z" fill="rgba(80,50,5,0.9)"/>
                                                <line x1="60" y1="8" x2="60" y2="0" stroke="rgba(80,50,5,1)" strokeWidth="0.8"/>
                                                <line x1="60" y1="112" x2="60" y2="120" stroke="rgba(80,50,5,1)" strokeWidth="0.8"/>
                                                <line x1="8" y1="60" x2="0" y2="60" stroke="rgba(80,50,5,1)" strokeWidth="0.8"/>
                                                <line x1="112" y1="60" x2="120" y2="60" stroke="rgba(80,50,5,1)" strokeWidth="0.8"/>
                                                <circle cx="60" cy="0" r="2" fill="rgba(80,50,5,0.9)"/>
                                                <circle cx="60" cy="120" r="2" fill="rgba(80,50,5,0.9)"/>
                                                <circle cx="0" cy="60" r="2" fill="rgba(80,50,5,0.9)"/>
                                                <circle cx="120" cy="60" r="2" fill="rgba(80,50,5,0.9)"/>
                                            </svg>
                                        </div>

                                        {/* Content matte overlay */}
                                        <div className="absolute inset-0 pointer-events-none rounded-2xl"
                                            style={{ background: 'rgba(60,35,5,0.10)' }} />

                                        {/* Card content */}
                                        <div className="absolute inset-0 flex flex-col px-8 py-10">

                                            {/* Top — To section */}
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(80,50,5,0.6))' }} />
                                                    <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(80,50,5,0.75)' }} />
                                                    <div className="w-8 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(80,50,5,0.6))' }} />
                                                </div>
                                                <div className={`${poppins.className} text-[7.5px] tracking-[0.4em] uppercase`} style={{ color: 'rgba(60,35,5,0.7)' }}>To</div>
                                                <div className={`${lobster.className} text-[28px] lg:text-[32px] leading-none`} style={{ color: '#1A0E02', textShadow: '0 1px 2px rgba(255,220,100,0.3)' }}>Sarah</div>
                                            </div>

                                            {/* Middle — Quote */}
                                            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-6">
                                                <div className="flex items-center gap-1.5 w-full">
                                                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(120,80,10,0.6))' }} />
                                                    <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(150,100,15,0.6)' }} />
                                                    <div className="w-2 h-2 rotate-45 flex-shrink-0" style={{ background: 'rgba(180,130,20,0.85)' }} />
                                                    <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(150,100,15,0.6)' }} />
                                                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(120,80,10,0.6))' }} />
                                                </div>
                                                <div className={`${cormorant.className} italic text-center text-[14px] lg:text-[15px] leading-[1.75] font-semibold`} style={{ color: '#1E1005' }}>
                                                    &ldquo;Wishing you every joy the world has to give&rdquo;
                                                </div>
                                                <div className="flex items-center gap-1.5 w-full">
                                                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(120,80,10,0.6))' }} />
                                                    <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(150,100,15,0.6)' }} />
                                                    <div className="w-2 h-2 rotate-45 flex-shrink-0" style={{ background: 'rgba(180,130,20,0.85)' }} />
                                                    <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(150,100,15,0.6)' }} />
                                                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(120,80,10,0.6))' }} />
                                                </div>
                                            </div>

                                            {/* Bottom — From section */}
                                            <div className="flex flex-col items-center gap-1">
                                                <div className={`${poppins.className} text-[7.5px] tracking-[0.4em] uppercase`} style={{ color: 'rgba(60,35,5,0.7)' }}>From</div>
                                                <div className={`${cormorant.className} italic text-[18px] font-bold`} style={{ color: '#3D2005' }}>James</div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="w-8 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(80,50,5,0.6))' }} />
                                                    <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(80,50,5,0.75)' }} />
                                                    <div className="w-8 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(80,50,5,0.6))' }} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div /><div /><div /><div /><div /><div /><div /><div />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* ── Social proof: occasion pills ── */}
            <section
                className="relative overflow-hidden py-14 sm:py-18 px-5 sm:px-10"
                style={{ backgroundColor: 'var(--bg-deep)' }}
            >
                {/* Ambient glows */}
                <div className="section-ambiance" aria-hidden style={{
                    background: `
                        radial-gradient(ellipse 120% 85% at 50% -25%, rgba(232,234,238,0.07) 0%, transparent 54%),
                        radial-gradient(ellipse 55% 45% at 88% 80%, rgba(212,175,55,0.09) 0%, transparent 58%)
                    `,
                }} />
                {/* Rose gold pill glow */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
                    background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(200,120,110,0.07) 0%, transparent 70%)',
                }} />

                {/* Top ornamental rule */}
                <div className="relative z-10 max-w-[600px] mx-auto flex items-center gap-3 mb-8">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(180,195,210,0.35))' }} />
                    <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(180,195,210,0.5)' }} />
                    <div className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: 'rgba(200,212,224,0.65)' }} />
                    <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(180,195,210,0.5)' }} />
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(180,195,210,0.35))' }} />
                </div>

                <div className="relative z-10 max-w-[1100px] mx-auto flex flex-col items-center gap-6">
                    {/* Header with flanking lines */}
                    <div className="flex items-center gap-4 w-full max-w-[500px]">
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(180,195,210,0.4))' }} />
                        <p className={`${poppins.className} text-[10px] tracking-[0.35em] uppercase font-semibold flex-shrink-0`}
                            style={{ color: 'rgba(200,140,130,0.7)' }}>
                            For every occasion
                        </p>
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(180,195,210,0.4))' }} />
                    </div>

                    {/* Carousel */}
                    <div className="w-full overflow-x-hidden py-3" style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}>
                        <div className="marquee-track flex items-center gap-3 w-max">
                            {[...['Birthday', 'Anniversary', 'Thank You', 'Wedding', 'Sympathy', 'Congrats', 'Graduation', 'Get Well', 'New Baby', 'Retirement'], ...['Birthday', 'Anniversary', 'Thank You', 'Wedding', 'Sympathy', 'Congrats', 'Graduation', 'Get Well', 'New Baby', 'Retirement']].map((label, i) => (
                                <span
                                    key={i}
                                    className={`${poppins.className} inline-flex items-center px-4 sm:px-5 py-2 rounded-sm text-[11px] sm:text-[11.5px] font-medium tracking-[0.12em] uppercase flex-shrink-0`}
                                    style={{
                                        background: 'rgba(232,234,238,0.03)',
                                        border: '1px solid rgba(180,195,210,0.3)',
                                        boxShadow: '0 0 8px rgba(180,195,210,0.08), 0 0 18px rgba(180,195,210,0.04)',
                                    }}
                                >
                                    <span style={{
                                        backgroundImage: 'linear-gradient(135deg, #C97A70 0%, #E8A898 30%, #F5C4B8 50%, #E8A898 70%, #C97A70 100%)',
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        color: 'transparent',
                                    }}>
                                        {label}
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom ornamental rule */}
                <div className="relative z-10 max-w-[600px] mx-auto flex items-center gap-3 mt-8">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(180,195,210,0.35))' }} />
                    <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(180,195,210,0.5)' }} />
                    <div className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background: 'rgba(200,212,224,0.65)' }} />
                    <div className="w-1 h-1 rotate-45 flex-shrink-0" style={{ background: 'rgba(180,195,210,0.5)' }} />
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(180,195,210,0.35))' }} />
                </div>
            </section>

            </div>

            {/* ── Sticky zone: Gallery freezes, Page 2 slides up over it ── */}
            <div
                ref={outerRef}
                className="relative z-0 isolate"
                style={{ height: outerHeight, backgroundColor: 'var(--bg-cream)' }}
            >
                <div
                    className="section-ambiance"
                    aria-hidden
                    style={{
                        background: `
                            radial-gradient(ellipse 75% 58% at 50% 42%, rgba(232,234,238,0.06) 0%, transparent 66%),
                            radial-gradient(ellipse 50% 42% at 14% 28%, rgba(212,175,55,0.10) 0%, transparent 58%),
                            radial-gradient(ellipse 48% 40% at 90% 72%, rgba(200,139,134,0.07) 0%, transparent 56%)
                        `,
                    }}
                />

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
                        <section
                            className="noise-overlay relative py-16 sm:py-20 lg:py-28 overflow-hidden rounded-t-[2rem] sm:rounded-t-[3rem]"
                            style={{
                                background: 'linear-gradient(180deg, #050507 0%, #0B0B0F 100%)',
                                boxShadow: '0 -8px 20px rgba(0,0,0,0.4)',
                            }}
                        >
                            <div
                                className="section-ambiance"
                                aria-hidden
                                style={{
                                    background: `
                                        radial-gradient(ellipse 85% 55% at 50% 18%, rgba(212,175,55,0.11) 0%, transparent 62%),
                                        radial-gradient(ellipse 45% 38% at 6% 95%, rgba(232,234,238,0.05) 0%, transparent 55%)
                                    `,
                                }}
                            />
                            <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] opacity-[0.08] z-[1]"
                                style={{ background: 'radial-gradient(ellipse, var(--gold), transparent 70%)' }} />
                            <div className="relative z-10 px-5 sm:px-10">
                                <div className="text-center mb-12">
                                    <p className={`${poppins.className} section-label text-[var(--gold)]/80 mb-3 border border-[var(--gold)]/50 rounded px-4 py-0.5 inline-block`}>Watch</p>
                                    <h2 className={`${cormorant.className} italic text-[clamp(2.2rem,5vw,3.8rem)] leading-tight`}>
                                        <span className="text-metallic-silver">See how it works</span>
                                    </h2>
                                    <p className={`${poppins.className} font-extralight text-[var(--platinum-mid)] mt-3 text-[15px] tracking-wide`}>
                                        Under 90 seconds. Auto-captions included.
                                    </p>
                                </div>
                                <div className="relative w-full max-w-[765px] aspect-video mx-auto rounded-2xl overflow-hidden"
                                    style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,234,238,0.08)' }}>
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0B0B0F, #08080B 40%, #050507)' }} />
                                    <div className="stamp-corner stamp-corner-tl" style={{ borderColor: 'var(--gold)', opacity: 0.3 }} />
                                    <div className="stamp-corner stamp-corner-tr" style={{ borderColor: 'var(--gold)', opacity: 0.3 }} />
                                    <div className="stamp-corner stamp-corner-bl" style={{ borderColor: 'var(--gold)', opacity: 0.3 }} />
                                    <div className="stamp-corner stamp-corner-br" style={{ borderColor: 'var(--gold)', opacity: 0.3 }} />
                                    <div className="absolute inset-0 opacity-25" style={{ background: 'radial-gradient(circle at 50% 50%, var(--gold) 0%, transparent 31.5%)' }} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="play-btn w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center cursor-pointer border border-[var(--gold)]/40"
                                            style={{ background: 'rgba(8, 8, 11, 0.55)', backdropFilter: 'blur(8px)' }}>
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 ml-1" fill="var(--platinum-hi)" viewBox="0 0 24 24">
                                                <polygon points="5,3 19,12 5,21" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={`${poppins.className} absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-[10px] tracking-wider text-[var(--platinum-mid)] border border-[rgba(232,234,238,0.1)]`}
                                        style={{ background: 'rgba(8, 8, 11, 0.6)', backdropFilter: 'blur(4px)' }}>
                                        CC &nbsp; Auto-captions enabled
                                    </div>
                                    <span className={`${poppins.className} absolute top-4 right-4 px-5 py-2 rounded-full border border-[rgba(232,234,238,0.12)] text-[var(--platinum-mid)] text-[10px] font-semibold tracking-wider uppercase cursor-pointer`}
                                        style={{ background: 'rgba(8, 8, 11, 0.55)', backdropFilter: 'blur(4px)' }}>
                                        Skip for now
                                    </span>
                                    <div className={`${poppins.className} absolute bottom-4 right-4 text-[10px] text-[var(--platinum-mid)]/60 tracking-wider`}>
                                        0:00 / 1:28
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ── How It Works ── */}
                        <section
                            className="relative overflow-hidden py-12 sm:py-16 px-5 sm:px-10"
                            style={{ backgroundColor: 'var(--bg-deep)' }}
                        >
                            <div
                                className="section-ambiance"
                                aria-hidden
                                style={{
                                    background: `
                                        radial-gradient(ellipse 68% 52% at 6% 8%, rgba(212,175,55,0.22) 0%, transparent 56%),
                                        radial-gradient(ellipse 68% 52% at 94% 8%, rgba(192,202,215,0.20) 0%, transparent 56%)
                                    `,
                                }}
                            />
                            <div className="relative z-10 max-w-[1100px] mx-auto">
                                <div className="text-center mb-12 sm:mb-20 lg:mb-24">
                                    <p className={`${poppins.className} section-label text-[var(--gold)] mb-3`}>How It Works</p>
                                    <h2 ref={stepsHeadingRef} className={`${cormorant.className} italic text-[clamp(2.2rem,5vw,3.8rem)] leading-tight`}>
                                        <span className="text-metallic-silver">Three</span><span style={{ color: '#FFFFFF' }}>.</span>{' '}
                                        <span className="text-metallic-rose-gold">Simple</span><span style={{ color: '#FFFFFF' }}>.</span>{' '}
                                        <span className="text-metallic-gold" style={{ textShadow: '0 0 20px rgba(241,208,116,0.42), 0 0 40px rgba(212,175,55,0.2)' }}>Steps</span><span style={{ color: '#FFFFFF' }}>.</span>
                                    </h2>
                                    <p className={`${poppins.className} font-extralight text-[var(--platinum-mid)] mt-3 text-[15px] tracking-wide`}>
                                        From idea to mailbox &mdash; we handle the rest.
                                    </p>
                                </div>
                                <div ref={stepsRef} className="relative" style={{ perspective: '1000px' }}>
                                    <motion.div className="relative flex flex-col md:flex-row gap-5 md:gap-4 lg:gap-5 items-stretch" style={{ rotateX: stepsRotateX, transformOrigin: 'top center' }}>
                                        {[
                                            {
                                                n: '1', title: 'Choose or describe',
                                                body: 'Pick from a template or answer a few questions about who the card is for.',
                                                bg: 'linear-gradient(135deg, var(--platinum-hi), var(--platinum-mid))',
                                                icon: <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></>,
                                                stroke: '#0B0B0F', mt: '',
                                                ghostColor: 'rgba(210,215,220,0.07)',
                                            },
                                            {
                                                n: '2', title: 'We create it',
                                                body: 'AI generates your card design and a personalized song just for them.',
                                                bg: 'linear-gradient(135deg, var(--rose-gold-hi), var(--rose-gold))',
                                                icon: <><path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" /><path d="m18 15 4-4" /><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.243-1.765L9 3l.927.927A6.17 6.17 0 0 1 12 8.456V10" /></>,
                                                stroke: '#0B0B0F', mt: 'md:-mt-8',
                                                ghostColor: 'rgba(200,139,134,0.08)',
                                            },
                                            {
                                                n: '3', title: 'We print & send',
                                                body: 'We print the card and mail it directly — no envelopes, no stamps, no hassle.',
                                                bg: 'linear-gradient(135deg, var(--gold-hi), var(--gold))',
                                                icon: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
                                                stroke: '#0B0B0F', mt: '',
                                                ghostColor: 'rgba(244,208,116,0.07)',
                                            },
                                        ].map(({ n, title, body, bg, icon, stroke, mt, ghostColor }) => (
                                            <div key={n} className={`flex-1 relative z-10 group ${mt}`}>
                                                <div className="glass-card rounded-t-3xl rounded-b-none p-8 sm:p-10 h-full relative" style={{ background: 'linear-gradient(to bottom, rgba(17,18,26,0.78), rgba(17,18,26,0.78) 70%, #050507)', border: 'none' }}>
                                                    <GlowingEffect spread={28} proximity={48} inactiveZone={0.01} borderWidth={1.5} />
                                                    <div className={`${poppins.className} absolute top-[-10px] right-4 text-[80px] sm:text-[120px] md:text-[100px] lg:text-[160px] font-black leading-none select-none pointer-events-none`} style={{ color: ghostColor }}>{n}</div>
                                                    <div className="relative z-10">
                                                        <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center" style={{ background: bg }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                                {icon}
                                                            </svg>
                                                        </div>
                                                        <h3 className={`${lora.className} font-semibold text-[19px] text-[var(--platinum-hi)] mb-2`}>{title}</h3>
                                                        <p className={`${poppins.className} font-normal text-[14px] text-[var(--platinum-mid)] leading-[1.7]`}>{body}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </section>

                        {/* ── FAQ ── */}
                        <section
                            className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-16 pb-20 sm:pb-28 lg:pb-40 px-5 sm:px-10"
                            style={{ backgroundColor: 'var(--bg-primary)' }}
                        >
                            <div
                                className="section-ambiance"
                                aria-hidden
                                style={{
                                    background: `
                                        radial-gradient(ellipse 85% 60% at 50% 0%, rgba(232,234,238,0.065) 0%, transparent 52%),
                                        radial-gradient(ellipse 52% 55% at 100% 100%, rgba(212,175,55,0.09) 0%, transparent 58%),
                                        radial-gradient(ellipse 42% 45% at 0% 55%, rgba(200,139,134,0.06) 0%, transparent 54%)
                                    `,
                                }}
                            />
                            <div className="relative z-10 max-w-[1100px] mx-auto">
                                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                                    <div ref={faqRef} className="lg:w-[300px] lg:flex-shrink-0 text-center lg:text-left lg:pt-4">
                                        <motion.p
                                            className={`${poppins.className} section-label text-[var(--gold)] mb-3`}
                                            initial={false}
                                            animate={{ opacity: faqVisible ? 1 : 0 }}
                                            transition={{ duration: 0.5, delay: faqVisible ? 0.5 : 0 }}
                                        >FAQ</motion.p>
                                        <motion.h2
                                            className={`${lora.className} text-[clamp(2.2rem,5vw,3.5rem)] text-[var(--platinum-hi)] leading-[1.05]`}
                                            initial={false}
                                            animate={{ opacity: faqVisible ? 1 : 0 }}
                                            transition={{ duration: 0.9, delay: faqVisible ? 0.25 : 0 }}
                                        >
                                            Frequently asked questions
                                        </motion.h2>
                                        <motion.p
                                            className={`${poppins.className} font-extralight text-[var(--platinum-mid)] mt-3 text-[15px] tracking-wide leading-relaxed`}
                                            initial={false}
                                            animate={{ opacity: faqVisible ? 1 : 0 }}
                                            transition={{ duration: 0.5, delay: faqVisible ? 0.5 : 0 }}
                                        >
                                            Quick answers to the most common questions.
                                        </motion.p>
                                        <span className={`${poppins.className} font-semibold inline-flex items-center gap-2 text-[12px] text-[var(--gold)] mt-6 tracking-[0.1em] uppercase cursor-pointer`}>
                                            <span>View all FAQs</span>
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="flex-1"><FAQAccordion /></div>
                                </div>
                            </div>
                        </section>

                    </motion.div>
                </div>

            </div>

            {/* ── FAQ background spacer — extends FAQ bg, one-way animation ── */}
            <motion.div
                className="relative z-10"
                style={{ height: footerSpacerHeight, overflow: 'hidden', backgroundColor: 'var(--bg-primary)' }}
            >
                <div className="h-[215px] flex items-center justify-center pt-6">
                    <Image src="/MainLogo.png" alt="Souvenote" width={800} height={280} className="w-full max-w-[800px] px-4 scale-[0.9]" style={{ opacity: 0.25 }} />
                </div>
            </motion.div>

            {/* ── Chatbot Widget ── */}
            <div className="relative z-20 max-w-[1440px] mx-auto">
                <div className="chat-widget absolute -top-8 right-6 sm:right-10 flex items-center gap-2.5 px-5 py-3 pl-3 rounded-full shadow-lg cursor-pointer z-50 border border-[rgba(232,234,238,0.1)]"
                    style={{ background: 'linear-gradient(135deg, rgba(11,11,15,0.95), rgba(16,16,20,0.95))', backdropFilter: 'blur(12px)' }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--rose-gold), var(--gold))' }}>
                        <svg className="w-4 h-4" fill="none" stroke="#0B0B0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <span className={`${poppins.className} text-[11px] font-semibold text-[var(--platinum-hi)] whitespace-nowrap tracking-wide`}>Need help? Chat with us</span>
                </div>
            </div>

            {/* ── Footer ── */}
            <footer className="relative z-10 overflow-hidden pt-14 sm:pt-20 pb-8 sm:pb-10 px-5 sm:px-10"
                style={{ background: 'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-deep-end) 100%)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: 'linear-gradient(to right, transparent, var(--platinum-mid), var(--gold), var(--platinum-mid), transparent)' }} />
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
                        <div>
                            <h4 className={`${poppins.className} font-black text-[13px] uppercase tracking-[0.25em] text-[var(--gold)] mb-5`}>Company</h4>
                            <div className="flex flex-col gap-3">
                                <span className={`${poppins.className} footer-link text-[15px] text-[var(--platinum-mid)] hover:text-[var(--platinum-hi)] cursor-pointer`}>Home</span>
                                <span className={`${poppins.className} footer-link text-[15px] text-[var(--platinum-mid)] hover:text-[var(--platinum-hi)] cursor-pointer`}>Privacy Policy</span>
                                <span className={`${poppins.className} footer-link text-[15px] text-[var(--platinum-mid)] hover:text-[var(--platinum-hi)] cursor-pointer`}>Terms of Service</span>
                                <span className={`${poppins.className} footer-link text-[15px] text-[var(--platinum-mid)] hover:text-[var(--platinum-hi)] cursor-pointer`}>Contact Us</span>
                            </div>
                        </div>
                        <div>
                            <h4 className={`${poppins.className} font-black text-[13px] uppercase tracking-[0.25em] text-[var(--gold)] mb-5`}>Resources</h4>
                            <div className="flex flex-col gap-3">
                                <span className={`${poppins.className} footer-link text-[15px] text-[var(--platinum-mid)] hover:text-[var(--platinum-hi)] cursor-pointer`}>About Us</span>
                                <span className={`${poppins.className} footer-link text-[15px] text-[var(--platinum-mid)] hover:text-[var(--platinum-hi)] cursor-pointer`}>Pricing</span>
                                <span className={`${poppins.className} footer-link text-[15px] text-[var(--platinum-mid)] hover:text-[var(--platinum-hi)] cursor-pointer`}>FAQ</span>
                                <span className={`${poppins.className} footer-link text-[15px] text-[var(--platinum-mid)] hover:text-[var(--platinum-hi)] cursor-pointer`}>Resources</span>
                            </div>
                        </div>
                        <div>
                            <h4 className={`${poppins.className} font-black text-[13px] uppercase tracking-[0.25em] text-[var(--gold)] mb-5`}>Connect</h4>
                            <div className="flex gap-2.5 mb-6">
                                {SOCIAL_ICONS.map(({ label, icon }) => (
                                    <div key={label} title={label}
                                        className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-[rgba(232,234,238,0.1)] hover:border-[var(--gold)]/50 hover:scale-110 [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:fill-[var(--platinum-mid)] hover:[&_svg]:fill-[var(--gold-hi)]"
                                        style={{ background: 'rgba(232,234,238,0.04)' }}>
                                        {icon}
                                    </div>
                                ))}
                            </div>
                            <span className={`${poppins.className} font-semibold text-[13px] text-[var(--platinum-mid)] tracking-[0.15em] uppercase block mb-3`}>Stay updated</span>
                            <div className="flex gap-2">
                                <input type="email" placeholder="you@email.com"
                                    className={`${poppins.className} px-4 py-2.5 border border-[rgba(232,234,238,0.1)] rounded-full bg-white/[0.04] text-[var(--platinum-hi)] text-[14px] outline-none flex-1 min-w-0 focus:border-[var(--gold)]/40 transition-colors placeholder:text-[var(--platinum-lo)] tracking-wide`}
                                />
                                <span className={`${poppins.className} font-bold btn-matte px-4 py-2.5 rounded-full text-[13px] tracking-[0.1em] uppercase flex-shrink-0 cursor-pointer`}>
                                    Subscribe
                                </span>
                            </div>
                        </div>
                    </div>
                    <div ref={footerDividerRef} className="my-10 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--platinum-mid), var(--gold), var(--platinum-mid), transparent)', opacity: 0.25 }} />
                    <div className={`${poppins.className} text-center text-[13px] text-[var(--platinum-lo)] tracking-[0.2em] uppercase`}>
                        &copy; 2026 SouveNote. All rights reserved.
                    </div>
                </div>
            </footer>

        </main>
    );
}
