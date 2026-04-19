'use client';

import { useRef, useState, useEffect } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
    useReducedMotion,
    type MotionValue,
} from 'framer-motion';
import CardCarousel from './CardCarousel';

interface GallerySectionProps {
    lobsterClassName: string;
    poppinsClassName: string;
    cormorantClassName: string;
}

const HEADING_WORDS = ['Explore', "what\u2019s", 'possible'];

export default function GallerySection({
    lobsterClassName,
    poppinsClassName,
    cormorantClassName,
}: GallerySectionProps) {
    const prefersReducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);

    // One-shot state — once true, never reverts
    const [phaseAComplete, setPhaseAComplete] = useState(!!prefersReducedMotion);
    const [carouselActive, setCarouselActive] = useState(!!prefersReducedMotion);

    // ── Phase A: scroll-linked progress ──────────────────
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'center center'],
    });

    // Middle card blur: 1.25rem → 0 → CSS filter string
    const middleCardBlurPx = useTransform(scrollYProgress, [0, 0.85], [20, 0], {
        clamp: true,
    });
    const middleCardFilter = useTransform(middleCardBlurPx, (v) => `blur(${v}px)`);
    // Middle card opacity: 0 → 1
    const middleCardOpacity = useTransform(scrollYProgress, [0, 0.85], [0, 1], {
        clamp: true,
    });
    // Gold line height: 0% → 100%
    const goldLineHeight = useTransform(scrollYProgress, [0, 0.85], ['0%', '100%']);

    // Detect Phase A completion (one-shot)
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if (latest >= 0.84 && !phaseAComplete) {
            setPhaseAComplete(true);
        }
    });

    // Activate carousel 1.5s after Phase B begins
    useEffect(() => {
        if (phaseAComplete && !carouselActive) {
            const timer = setTimeout(() => setCarouselActive(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [phaseAComplete, carouselActive]);

    return (
        <section
            ref={sectionRef}
            className="pt-16 sm:pt-24 lg:pt-36 pb-16 sm:pb-24 lg:pb-36 px-4 sm:px-8 lg:px-18 max-w-[81.25rem] mx-auto"
        >
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-25 items-start">
                {/* ── Left — section header with animated gold line ── */}
                <div className="relative pl-6 lg:w-[17.5rem] lg:flex-shrink-0 lg:pt-4 text-center lg:text-left">
                    {/* Gold line — real DOM element (replaces ::before) */}
                    <motion.div
                        className="absolute left-0 top-0 w-[0.125rem]"
                        style={{
                            height: phaseAComplete ? '100%' : goldLineHeight,
                            background:
                                'linear-gradient(to bottom, var(--gold), var(--platinum-hi), transparent)',
                        }}
                    />

                    {/* "Gallery" label — fades in during Phase B */}
                    <motion.p
                        className={`${poppinsClassName} section-label text-[var(--gold)] mb-3`}
                        initial={false}
                        animate={{ opacity: phaseAComplete ? 1 : 0 }}
                        transition={{ duration: 0.5, delay: phaseAComplete ? 1.1 : 0 }}
                    >
                        Gallery
                    </motion.p>

                    {/* Heading — staggered word entrance from behind the line */}
                    <h2
                        className={`${lobsterClassName} text-[clamp(2.4rem,5vw,4.9rem)] text-[var(--platinum-hi)] leading-[1.07] overflow-hidden`}
                    >
                        {HEADING_WORDS.map((word, i) => {
                            const isGold = word === "what\u2019s";
                            const accentClass = isGold
                                ? `${cormorantClassName} italic text-[var(--gold-hi)]`
                                : `${cormorantClassName} italic text-metallic-silver`;
                            return (
                                <motion.span
                                    key={word}
                                    className={accentClass}
                                    style={{
                                        display: 'inline-block',
                                        marginRight:
                                            i < HEADING_WORDS.length - 1 ? '0.3em' : 0,
                                        ...(isGold && { textShadow: '0 0 20px rgba(241,208,116,0.42), 0 0 40px rgba(212,175,55,0.2)' }),
                                    }}
                                    initial={false}
                                    animate={
                                        phaseAComplete
                                            ? { x: 0, opacity: 1 }
                                            : { x: -50, opacity: 0 }
                                    }
                                    transition={{
                                        duration: 0.7,
                                        ease: [0.22, 1, 0.36, 1],
                                        delay: phaseAComplete ? 0.5 + i * 0.12 : 0,
                                    }}
                                >
                                    {word}
                                </motion.span>
                            );
                        })}
                    </h2>

                    {/* Subtitle — fades in during Phase B */}
                    <motion.p
                        className={`${poppinsClassName} font-extralight text-[var(--text-muted)] mt-3 text-[0.9375rem] tracking-wide leading-relaxed`}
                        initial={false}
                        animate={{ opacity: phaseAComplete ? 1 : 0 }}
                        transition={{ duration: 0.5, delay: phaseAComplete ? 1.2 : 0 }}
                    >
                        Swipe through example cards &mdash; each one comes with a
                        personalized song.
                    </motion.p>
                </div>

                {/* ── Right — carousel ── */}
                <div className="flex-1 min-w-0 max-w-[48.1875rem]">
                    <CardCarousel
                        phaseAComplete={phaseAComplete}
                        carouselActive={carouselActive}
                        middleCardFilter={phaseAComplete ? undefined : middleCardFilter}
                        middleCardOpacity={phaseAComplete ? undefined : middleCardOpacity}
                    />
                </div>
            </div>
        </section>
    );
}
