'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cormorant_Garamond, Poppins } from 'next/font/google';

const cormorant = Cormorant_Garamond({ weight: ['300', '400', '600'], subsets: ['latin'], display: 'swap' });
const poppins = Poppins({ weight: ['200', '400', '600'], subsets: ['latin'], display: 'swap' });

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}

export default function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    console.log('Frontend Validation Passed. Ready for AWS backend:', formData);
    // TODO: Connect to AWS Cognito/Backend
  };

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      <header className={`${poppins.className} flex items-center justify-between px-6 py-4 text-sm`}
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
          className="w-full max-w-[22.5rem] p-8 rounded-xl"
          style={{ background: 'var(--bg-warm)', border: '1px solid rgba(183,110,121,0.2)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
        >
          <div className="text-center mb-8">
            <h1 className={`${cormorant.className} italic text-[1.75rem] font-light mb-2`} style={{ color: 'var(--text-primary)' }}>
              Sign up
            </h1>
            <p className={`${poppins.className} font-extralight text-sm`} style={{ color: 'var(--text-secondary)' }}>
              Create your account and start designing
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`${poppins.className} block text-xs font-medium mb-1.5`} style={{ color: 'var(--text-secondary)' }} htmlFor="fullName">
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className={`${poppins.className} input-dark w-full px-3 py-2.5 rounded-md text-sm`}
                required
              />
            </div>

            <div>
              <label className={`${poppins.className} block text-xs font-medium mb-1.5`} style={{ color: 'var(--text-secondary)' }} htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`${poppins.className} input-dark w-full px-3 py-2.5 rounded-md text-sm`}
                required
              />
            </div>

            <div>
              <label className={`${poppins.className} block text-xs font-medium mb-1.5`} style={{ color: 'var(--text-secondary)' }} htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`${poppins.className} input-dark w-full px-3 py-2.5 pr-10 rounded-md text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            <div>
              <label className={`${poppins.className} block text-xs font-medium mb-1.5`} style={{ color: 'var(--text-secondary)' }} htmlFor="confirmPassword">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`${poppins.className} input-dark w-full px-3 py-2.5 pr-10 rounded-md text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </div>

            {error && (
              <p className={`${poppins.className} text-red-400 text-xs font-medium`}>{error}</p>
            )}

            <button type="submit" className="btn-matte w-full py-3 rounded-md text-sm font-medium mt-2">
              Sign up
            </button>
          </form>

          <div className={`${poppins.className} text-center mt-6 text-sm`} style={{ color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-[var(--accent-bronze)] hover:underline">
              Log in
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
