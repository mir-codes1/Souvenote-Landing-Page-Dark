'use client';

import Link from 'next/link';
import { Poppins, Cormorant_Garamond } from 'next/font/google';

const poppins = Poppins({ weight: ['200', '400', '600'], subsets: ['latin'], display: 'swap' });
const cormorant = Cormorant_Garamond({ weight: ['300', '400'], subsets: ['latin'], display: 'swap' });

export default function CreatePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className={`${poppins.className} flex justify-end px-6 py-4`}>
        <Link href="/cards" className="transition-colors text-sm text-[var(--text-muted)] hover:text-[var(--accent-bronze)]">
          ← Browse cards
        </Link>
      </div>

      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'var(--bg-cream)', border: '1px solid rgba(183,110,121,0.2)' }}>
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
              style={{ color: 'var(--accent-bronze)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <h1 className={`${cormorant.className} italic text-2xl font-light mb-3`} style={{ color: 'var(--text-primary)' }}>
            Card Creator
          </h1>
          <p className={`${poppins.className} font-extralight text-sm leading-relaxed mb-8`} style={{ color: 'var(--text-secondary)' }}>
            The full card creation workspace is coming soon. In the meantime, browse our pre-made cards and personalize one to get started.
          </p>
          <Link
            href="/cards"
            className="btn-dark-primary inline-block px-6 py-3 rounded-md text-sm font-medium"
          >
            Browse cards
          </Link>
        </div>
      </main>
    </div>
  );
}
