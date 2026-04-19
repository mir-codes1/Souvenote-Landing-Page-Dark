'use client';

import { useState, useRef, useEffect } from 'react';
// Link removed — display-only mode
import { motion, type MotionValue } from 'framer-motion';

// ── Props from GallerySection ────────────────────────────
interface CardCarouselProps {
    phaseAComplete: boolean;
    carouselActive: boolean;
    /** Scroll-driven CSS filter string (e.g. "blur(0.75rem)") — undefined once Phase A locks */
    middleCardFilter?: MotionValue<string>;
    /** Scroll-driven opacity 0→1 — undefined once Phase A locks */
    middleCardOpacity?: MotionValue<number>;
}

const CARDS = [
    { id: 1, occasion: 'Birthday', songTitle: 'Happy Birthday Song' },
    { id: 2, occasion: 'Anniversary', songTitle: 'Our Special Day' },
    { id: 3, occasion: 'Thank You', songTitle: 'Gratitude Melody' },
    { id: 4, occasion: 'Get Well Soon', songTitle: 'Wishing You Well' },
    { id: 5, occasion: 'Congratulations', songTitle: 'Celebration Time' },
    { id: 6, occasion: 'Just Because', songTitle: 'Thinking of You' },
];

// Softened metallic gradients — silver / gold / rose gold cycling
const CARD_IMAGE_GRAD = [
    'linear-gradient(155deg, #22262E 0%, #464A54 18%, #707880 32%, #909499 44%, #A8ABB2 52%, #8E9298 60%, #686C74 72%, #383D46 84%, #1E2228 100%)',
    'linear-gradient(155deg, #1E1C10 0%, #3C3218 18%, #6E561E 32%, #9A7828 44%, #B89038 52%, #9A7825 60%, #6E5618 72%, #38300E 84%, #1A1808 100%)',
    'linear-gradient(155deg, #221820 0%, #3A2430 18%, #724858 32%, #9E7080 44%, #B88890 52%, #9A7078 60%, #704858 72%, #342030 84%, #1C1018 100%)',
    'linear-gradient(155deg, #22262E 0%, #464A54 18%, #707880 32%, #909499 44%, #A8ABB2 52%, #8E9298 60%, #686C74 72%, #383D46 84%, #1E2228 100%)',
    'linear-gradient(155deg, #1E1C10 0%, #3C3218 18%, #6E561E 32%, #9A7828 44%, #B89038 52%, #9A7825 60%, #6E5618 72%, #38300E 84%, #1A1808 100%)',
    'linear-gradient(155deg, #221820 0%, #3A2430 18%, #724858 32%, #9E7080 44%, #B88890 52%, #9A7078 60%, #704858 72%, #342030 84%, #1C1018 100%)',
];

const CARD_ICONS = [
    <svg key="birthday" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M2 18h20v4H2zM4 14h16v4H4z" /><path d="M6 10h12v4H6z" /><path d="M12 2v4M8 4v2M16 4v2" /><circle cx="12" cy="2" r="1" fill="currentColor" />
    </svg>,
    <svg key="anniversary" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <circle cx="9" cy="12" r="5" /><circle cx="15" cy="12" r="5" />
    </svg>,
    <svg key="thankyou" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>,
    <svg key="getwell" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>,
    <svg key="congrats" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>,
    <svg key="justbecause" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8v13M3 13h18" /><path d="M12 8c-2-3-6-3-6 0s4 0 6 0c2-3 6-3 6 0s-4 0-6 0" />
    </svg>,
];

// Silver / gold / rose gold cycling
const CARD_THEMES = [
    { accent: '#B4B8C4', faint: 'rgba(180,184,196,0.15)' },
    { accent: '#C8A030', faint: 'rgba(200,160,48,0.15)'  },
    { accent: '#C89890', faint: 'rgba(200,152,144,0.15)' },
    { accent: '#B4B8C4', faint: 'rgba(180,184,196,0.15)' },
    { accent: '#C8A030', faint: 'rgba(200,160,48,0.15)'  },
    { accent: '#C89890', faint: 'rgba(200,152,144,0.15)' },
];

const getCardStyle = (idx: number) => ({
    background: 'linear-gradient(180deg, #0E0F14 0%, #080809 100%)',
    boxShadow: `0 0.5rem 2rem rgba(0,0,0,0.55), 0 0 0 1px ${CARD_THEMES[idx].faint}`,
    borderTop: `0.125rem solid ${CARD_THEMES[idx].accent}`,
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'none',
});

const ARROW_STYLE = {
    background: 'linear-gradient(135deg, rgba(11,11,15,0.95), rgba(16,16,20,0.95))',
    backdropFilter: 'blur(0.5rem)',
    boxShadow: '0 0.25rem 1.25rem rgba(0,0,0,0.4)',
};

export default function CardCarousel({
    phaseAComplete,
    carouselActive,
    middleCardFilter,
    middleCardOpacity,
}: CardCarouselProps) {
    const [playingId, setPlayingId] = useState<number | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const middleCardRef = useRef<HTMLDivElement>(null);
    const [slideOffset, setSlideOffset] = useState(263);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = () => {
        const el = trackRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 1);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    // Measure actual card width + gap for accurate slide offset
    useEffect(() => {
        if (middleCardRef.current) {
            const w = middleCardRef.current.offsetWidth;
            setSlideOffset(w + 20);
        }
    }, []);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        el.addEventListener('scroll', updateScrollState, { passive: true });
        updateScrollState();
        return () => el.removeEventListener('scroll', updateScrollState);
    }, [carouselActive]);

    const scroll = (direction: 'left' | 'right') => {
        if (!trackRef.current) return;
        if (direction === 'left' && !canScrollLeft) return;
        if (direction === 'right' && !canScrollRight) return;
        trackRef.current.scrollBy({
            left: direction === 'left' ? -288 : 288,
            behavior: 'smooth',
        });
    };

    // ── Card inner content (shared across all cards) ─────
    const renderCardContent = (card: (typeof CARDS)[number], idx: number) => (
        <>
            <div
                className="w-full aspect-[5/7] flex flex-col items-center justify-center relative overflow-hidden"
                style={{ background: CARD_IMAGE_GRAD[idx] }}
            >
                {/* Specular highlight band — same technique as the hero card mocks */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(110deg, transparent 28%, rgba(255,255,255,0.18) 42%, rgba(255,255,255,0.28) 48%, rgba(255,255,255,0.18) 54%, transparent 68%)',
                    }}
                />
                {/* Edge vignette */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)',
                    }}
                />
                <div className="relative z-10 flex flex-col items-center gap-3">
                    <div
                        className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
                        style={{
                            background: 'rgba(0,0,0,0.35)',
                            border: `1px solid ${CARD_THEMES[idx].accent}`,
                            boxShadow: `0 0 12px ${CARD_THEMES[idx].faint}`,
                            color: CARD_THEMES[idx].accent,
                        }}
                    >
                        {CARD_ICONS[idx]}
                    </div>
                    <div className="w-12 h-px rounded-full" style={{ background: `linear-gradient(to right, transparent, ${CARD_THEMES[idx].accent}, transparent)` }} />
                </div>
            </div>

            <div className="px-5 pt-4 pb-5">
                <div
                    className="text-[0.5625rem] font-black uppercase tracking-[0.25em] mb-2.5"
                    style={{ color: CARD_THEMES[idx].accent, fontFamily: 'var(--font-poppins, sans-serif)' }}
                >
                    {card.occasion}
                </div>
                <div className="flex items-center gap-2.5 mb-4">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setPlayingId(playingId === card.id ? null : card.id);
                        }}
                        aria-label={playingId === card.id ? 'Pause' : 'Play song preview'}
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110"
                        style={{
                            background:
                                playingId === card.id
                                    ? 'linear-gradient(135deg, var(--gold-hi), var(--gold))'
                                    : 'linear-gradient(135deg, var(--platinum-hi), var(--platinum-mid))',
                        }}
                    >
                        {playingId === card.id ? (
                            <svg className="w-2.5 h-2.5" fill="#0B0B0F" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        ) : (
                            <svg className="w-2.5 h-2.5 ml-[0.0625rem]" fill="#0B0B0F" viewBox="0 0 24 24">
                                <polygon points="5,3 19,12 5,21" />
                            </svg>
                        )}
                    </button>
                    <div className="flex-1 flex items-center gap-[0.125rem] h-4">
                        {[...Array(20)].map((_, j) => {
                            const heights = [3, 6, 4, 8, 5, 10, 7, 12, 6, 9, 4, 11, 7, 5, 8, 6, 10, 4, 7, 3];
                            const isActive = playingId === card.id && j < 13;
                            return (
                                <div
                                    key={j}
                                    className="flex-1 rounded-full transition-[background-color,opacity] duration-300"
                                    style={{
                                        height: `${heights[j]}px`,
                                        background: isActive
                                            ? CARD_THEMES[idx].accent
                                            : 'var(--platinum-lo)',
                                        opacity: isActive ? 1 : 0.6,
                                    }}
                                />
                            );
                        })}
                    </div>
                    <span
                        className="text-[0.5625rem] text-[var(--platinum-mid)] tabular-nums tracking-wide"
                        style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
                    >
                        {playingId === card.id ? '0:12' : '0:00'}
                    </span>
                </div>
                <span
                    className="btn-platinum block w-full text-center py-2.5 rounded-full text-[0.6875rem] font-semibold tracking-[0.08em] uppercase cursor-pointer"
                    style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
                >
                    Make one like this
                </span>
            </div>
        </>
    );

    const cardClass =
        'card-shimmer card-lift flex-shrink-0 w-[14.0625rem] sm:w-[15.1875rem] rounded-2xl overflow-hidden snap-start cursor-pointer group';
    const trioCardClass =
        'card-shimmer card-lift rounded-2xl overflow-hidden cursor-pointer group';
    const cardWidth = slideOffset - 20;

    return (
        <div className="relative">
            {/* ── Left arrow ── */}
            <motion.button
                onClick={() => scroll('left')}
                aria-label="Previous cards"
                className="absolute left-[-0.75rem] sm:left-[-1.5rem] top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-[var(--accent-gold)]/20 hover:border-[var(--accent-gold)]/50 group"
                style={{ ...ARROW_STYLE, pointerEvents: canScrollLeft ? 'auto' : 'none' }}
                initial={false}
                animate={{ opacity: phaseAComplete ? (canScrollLeft ? 1 : 0.2) : 0 }}
                transition={{ duration: 0.3, delay: phaseAComplete ? 1.3 : 0 }}
            >
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-[transform,stroke] duration-300 stroke-[var(--platinum-mid)] group-hover:stroke-[var(--gold)]" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </motion.button>

            {/* ── Carousel track ── */}
            <div className="overflow-hidden">
                <div
                    ref={trackRef}
                    className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory hide-scrollbar px-2"
                    style={{
                        pointerEvents: carouselActive ? 'auto' : 'none',
                        overflowX: carouselActive ? undefined : 'hidden',
                    }}
                >
                    {/*
                     * ── Hero trio wrapper ──────────────────────────────────
                     * Anniversary is in normal flow (position:relative) and always
                     * stays at the center of this wrapper. Birthday and Thank You
                     * are absolutely positioned and slide out from behind Anniversary.
                     */}
                    <div
                        className="flex-shrink-0 snap-start"
                        style={{
                            position: 'relative',
                            width: slideOffset * 2 + cardWidth,
                        }}
                    >
                        {/* Card 0 (Birthday) — absolute left, slides out left from center */}
                        <motion.div
                            key={CARDS[0].id}
                            className={trioCardClass}
                            style={{
                                ...getCardStyle(0),
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: cardWidth,
                                zIndex: 5,
                            }}
                            initial={false}
                            animate={
                                phaseAComplete
                                    ? { x: 0, opacity: 1 }
                                    : { x: slideOffset, opacity: 0 }
                            }
                            whileHover={{ y: -10, scale: 1.015 }}
                            transition={{
                                x: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                                opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                                y: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                                scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                            }}
                        >
                            {renderCardContent(CARDS[0], 0)}
                        </motion.div>

                        {/* Card 1 (Anniversary) — in flow, always centered, hidden until Thank You slides away */}
                        <motion.div
                            key={CARDS[1].id}
                            ref={middleCardRef}
                            className={trioCardClass}
                            style={{
                                ...getCardStyle(1),
                                position: 'relative',
                                marginLeft: slideOffset,
                                width: cardWidth,
                                zIndex: 0,
                            }}
                            initial={false}
                            animate={{ opacity: phaseAComplete ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: 'easeIn' }}
                        >
                            {renderCardContent(CARDS[1], 1)}
                        </motion.div>

                        {/* Card 2 (Thank You) — FOCUS CARD: scroll-driven blur in at center, then slides right */}
                        <motion.div
                            key={CARDS[2].id}
                            className={trioCardClass}
                            style={{
                                ...getCardStyle(2),
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                width: cardWidth,
                                zIndex: 10,
                                filter: phaseAComplete ? 'blur(0)' : middleCardFilter,
                                opacity: phaseAComplete ? 1 : middleCardOpacity,
                            } as React.CSSProperties}
                            initial={false}
                            animate={phaseAComplete ? { x: 0 } : { x: -slideOffset }}
                            whileHover={{ y: -10, scale: 1.015 }}
                            transition={{
                                x: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                                y: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                                scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                            }}
                        >
                            {renderCardContent(CARDS[2], 2)}
                        </motion.div>
                    </div>

                    {/* ── Cards 3–5 — invisible until carousel activates ── */}
                    {CARDS.slice(3).map((card, i) => (
                        <motion.div
                            key={card.id}
                            className={cardClass}
                            style={getCardStyle(i + 3)}
                            initial={false}
                            animate={{ opacity: carouselActive ? 1 : 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {renderCardContent(card, i + 3)}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── Right arrow ── */}
            <motion.button
                onClick={() => scroll('right')}
                aria-label="Next cards"
                className="absolute right-[-0.75rem] sm:right-[-1.5rem] top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-[var(--accent-gold)]/20 hover:border-[var(--accent-gold)]/50 group"
                style={{ ...ARROW_STYLE, pointerEvents: canScrollRight ? 'auto' : 'none' }}
                initial={false}
                animate={{ opacity: phaseAComplete ? (canScrollRight ? 1 : 0.2) : 0 }}
                transition={{ duration: 0.3, delay: phaseAComplete ? 1.3 : 0 }}
            >
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-[transform,stroke] duration-300 stroke-[var(--platinum-mid)] group-hover:stroke-[var(--gold)]" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </motion.button>
        </div>
    );
}
