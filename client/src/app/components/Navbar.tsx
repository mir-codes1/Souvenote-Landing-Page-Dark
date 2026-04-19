'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Poppins, Cormorant_Garamond } from 'next/font/google';
import { ButtonColorful } from '@/components/ui/button-colorful';
// Link and usePathname removed — display-only mode

const poppins = Poppins({ weight: ['400', '500', '600'], subsets: ['latin'], display: 'swap' });
const cormorant = Cormorant_Garamond({ weight: ['400', '600'], subsets: ['latin'], display: 'swap' });

const NAV_LINKS = [
    {
        label: 'Create',
        subtext: 'Answer a few questions and let AI craft a card tailored to your moment.',
    },
    {
        label: 'Templates',
        subtext: 'Browse curated designs and make them uniquely yours.',
    },
    {
        label: 'Shop',
        subtext: 'Handpicked cards ready to personalize and send.',
    },
    {
        label: 'Library',
        subtext: 'Your saved cards and songs, kept for 30 days.',
    },
];

const HAMBURGER_GROUPS = [
    {
        items: ['Home', 'Pricing'],
    },
    {
        items: ['Currency / Language', 'FAQ'],
    },
    {
        items: ['Terms of Service', 'Privacy Policy'],
    },
    {
        items: ['Profile', 'Contact Us'],
    },
];

export default function Navbar() {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className="fixed top-2 inset-x-4 sm:inset-x-5 lg:inset-x-8 z-50 flex items-center justify-between px-5 sm:px-6 py-3 rounded-2xl text-sm font-sans transition-all duration-500"
            style={{
                background: scrolled
                    ? 'rgba(10, 10, 14, 0.88)'
                    : 'rgba(10, 10, 14, 0.75)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(232, 234, 238, 0.08)',
                boxShadow: scrolled
                    ? '0 12px 40px rgba(0, 0, 0, 0.45), 0 2px 10px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.04)'
                    : '0 6px 24px rgba(0, 0, 0, 0.35), 0 1px 4px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.04)',
                color: 'var(--platinum-mid)',
            }}
        >
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer -my-5">
                <Image
                    src="/MainLogo.png"
                    alt="Souvenote"
                    width={320}
                    height={110}
                    className="h-[3.25rem] sm:h-[3.6rem] w-auto object-contain"
                    style={{ filter: 'none' }}
                />
            </div>

            {/* Nav links — center */}
            <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
                {NAV_LINKS.map((link, i) => (
                    <React.Fragment key={link.label}>
                        {i > 0 && (
                            <span className="text-[var(--gold)] opacity-40 text-[10px] select-none mx-0.5">·</span>
                        )}
                        <div
                            className="relative"
                            onMouseEnter={() => setHoveredLink(link.label)}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            <span
                                className={`${poppins.className} whitespace-nowrap cursor-pointer px-3.5 py-2 block text-[10.5px] tracking-[0.10em] uppercase font-medium transition-colors duration-200`}
                                style={{
                                    color: hoveredLink === link.label ? 'var(--platinum-hi)' : 'var(--platinum-mid)',
                                }}
                            >
                                {link.label}
                                <span
                                    className="block h-px mt-0.5 rounded-full transition-all duration-300 origin-left"
                                    style={{
                                        background: 'linear-gradient(to right, var(--platinum-mid), var(--gold))',
                                        transform: hoveredLink === link.label ? 'scaleX(1)' : 'scaleX(0)',
                                        opacity: hoveredLink === link.label ? 1 : 0,
                                    }}
                                />
                            </span>
                            {hoveredLink === link.label && (
                                <div
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-56 rounded-2xl z-50 overflow-hidden pointer-events-none"
                                    style={{
                                        background: 'rgba(8, 8, 11, 0.92)',
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(232, 234, 238, 0.08)',
                                        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55), 0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                                    }}
                                >
                                    {/* Arrow */}
                                    <div
                                        className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                                        style={{
                                            background: 'rgba(8, 8, 11, 0.92)',
                                            border: '1px solid rgba(232, 234, 238, 0.08)',
                                            borderBottom: 'none',
                                            borderRight: 'none',
                                        }}
                                    />
                                    {/* Top gold bar */}
                                    <div className="h-[2px] w-full" style={{ background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }} />
                                    <div className="px-4 pt-3 pb-3.5">
                                        {/* Label heading */}
                                        <p className={`${cormorant.className} text-[15px] font-semibold italic text-[var(--rose-gold-hi)] mb-1.5 tracking-[0.01em]`}>
                                            {link.label}
                                        </p>
                                        {/* Thin divider */}
                                        <div className="w-8 h-px mb-2" style={{ background: 'linear-gradient(to right, var(--gold), transparent)' }} />
                                        {/* Description */}
                                        <p className={`${poppins.className} text-[10.5px] text-[var(--platinum-mid)] leading-[1.65] font-normal`}>
                                            {link.subtext}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </nav>

            {/* Actions — right */}
            <div className="flex items-center gap-3 flex-shrink-0">
                {/* Credit balances */}
                <div
                    className="hidden sm:flex items-center gap-0 rounded-lg overflow-hidden"
                    style={{
                        background: 'rgba(232, 234, 238, 0.05)',
                        border: '1px solid rgba(232, 234, 238, 0.08)',
                    }}
                >
                    <span className="flex items-center gap-1.5 px-2.5 py-1.5 cursor-pointer hover:bg-[rgba(212,175,55,0.10)] transition-colors group">
                        <svg className="w-3 h-3 text-[var(--platinum-mid)] group-hover:text-[var(--gold)] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
                        </svg>
                        <span className={`${poppins.className} text-[10px] font-medium tracking-[0.06em] text-[var(--platinum-mid)] group-hover:text-[var(--platinum-hi)] transition-colors`}>
                            0 <span className="text-[9px] opacity-70 tracking-[0.08em] uppercase">Images</span>
                        </span>
                    </span>
                    <span className="w-px self-stretch" style={{ background: 'rgba(232, 234, 238, 0.10)' }} />
                    <span className="flex items-center gap-1.5 px-2.5 py-1.5 cursor-pointer hover:bg-[rgba(212,175,55,0.10)] transition-colors group">
                        <svg className="w-3 h-3 text-[var(--platinum-mid)] group-hover:text-[var(--gold)] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                        <span className={`${poppins.className} text-[10px] font-medium tracking-[0.06em] text-[var(--platinum-mid)] group-hover:text-[var(--platinum-hi)] transition-colors`}>
                            0 <span className="text-[9px] opacity-70 tracking-[0.08em] uppercase">Songs</span>
                        </span>
                    </span>
                </div>

                {/* Get Started CTA */}
                <ButtonColorful
                    label="Get Started"
                    hideArrow
                    className={`${poppins.className} hidden sm:inline-flex rounded-full px-4 py-1.5 h-auto text-[10.5px] tracking-[0.10em] uppercase`}
                />

                {/* Divider */}
                <div className="hidden sm:block w-px h-4" style={{ background: 'rgba(232, 234, 238, 0.10)' }} />

                {/* Profile icon */}
                <div className="relative hidden sm:block">
                    <button
                        aria-label="Profile"
                        onClick={() => setProfileOpen((o) => !o)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                        style={{
                            background: profileOpen ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                            color: profileOpen ? 'var(--gold)' : 'var(--platinum-mid)',
                        }}
                        onMouseEnter={(e) => { if (!profileOpen) (e.currentTarget.style.color = 'var(--gold)'); }}
                        onMouseLeave={(e) => { if (!profileOpen) (e.currentTarget.style.color = 'var(--platinum-mid)'); }}
                    >
                        <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </button>
                    {profileOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                            <div
                                className="absolute right-0 top-full mt-2.5 w-48 rounded-xl z-50 overflow-hidden"
                                style={{
                                    background: 'rgba(8, 8, 11, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(232, 234, 238, 0.08)',
                                    boxShadow: '0 10px 32px rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }} />
                                <span className={`${poppins.className} block px-4 py-2.5 text-[12.5px] font-medium cursor-pointer text-[var(--platinum-mid)] hover:text-[var(--platinum-hi)] tracking-[0.01em] transition-colors hover:bg-[rgba(212,175,55,0.08)]`}>
                                    Account Settings
                                </span>
                                <div className="h-px mx-3" style={{ background: 'rgba(232, 234, 238, 0.08)' }} />
                                <div className="px-4 py-2.5">
                                    <span className={`${poppins.className} text-[11px] tracking-[0.08em] uppercase font-semibold text-red-400/70 cursor-pointer hover:text-red-400/95 transition-colors`}>
                                        Log Out
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Cart */}
                <button
                    aria-label="Cart"
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{ color: 'var(--platinum-mid)' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--gold)';
                        e.currentTarget.style.background = 'rgba(212, 175, 55, 0.10)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--platinum-mid)';
                        e.currentTarget.style.background = 'transparent';
                    }}
                >
                    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0L5.4 19h13.2M7 13l-1.6 6m10.6 0a2 2 0 100-4 2 2 0 000 4zM7 21a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                </button>

                {/* Hamburger */}
                <div className="relative">
                    <button
                        aria-label="Menu"
                        onClick={() => setMenuOpen((o) => !o)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                        style={{
                            background: menuOpen ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                            color: menuOpen ? 'var(--gold)' : 'var(--platinum-mid)',
                        }}
                        onMouseEnter={(e) => { if (!menuOpen) (e.currentTarget.style.color = 'var(--gold)'); }}
                        onMouseLeave={(e) => { if (!menuOpen) (e.currentTarget.style.color = 'var(--platinum-mid)'); }}
                    >
                        <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            {menuOpen
                                ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>

                    {menuOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                            <div
                                className="absolute right-0 top-full mt-2.5 w-52 rounded-xl z-50 overflow-hidden"
                                style={{
                                    background: 'rgba(8, 8, 11, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(232, 234, 238, 0.08)',
                                    boxShadow: '0 10px 32px rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                <div className="h-[2px] w-full" style={{ background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }} />
                                {HAMBURGER_GROUPS.map((group, gi) => (
                                    <React.Fragment key={gi}>
                                        {gi > 0 && (
                                            <div className="mx-3 my-0.5" style={{ height: '1px', background: 'rgba(232, 234, 238, 0.08)' }} />
                                        )}
                                        {group.items.map((label) => (
                                            <span
                                                key={label}
                                                className={`${poppins.className} block px-4 py-2.5 text-[12.5px] font-medium cursor-pointer tracking-[0.01em]`}
                                                style={{
                                                    color: hoveredMenuItem === label ? 'var(--platinum-hi)' : 'var(--platinum-mid)',
                                                    background: hoveredMenuItem === label ? 'rgba(212,175,55,0.08)' : 'transparent',
                                                    transition: 'background 150ms, color 150ms',
                                                }}
                                                onMouseEnter={() => setHoveredMenuItem(label)}
                                                onMouseLeave={() => setHoveredMenuItem(null)}
                                            >
                                                {label}
                                            </span>
                                        ))}
                                    </React.Fragment>
                                ))}
                                <div className="h-px mx-3 mt-0.5" style={{ background: 'rgba(232, 234, 238, 0.08)' }} />
                                <div className="px-4 py-2.5">
                                    <span
                                        className={`${poppins.className} text-[11px] tracking-[0.08em] uppercase font-semibold text-red-400/70 cursor-pointer hover:text-red-400/95 transition-colors`}
                                    >
                                        Log Out
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
