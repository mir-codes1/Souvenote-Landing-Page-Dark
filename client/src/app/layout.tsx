import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Souvenote',
    description: 'A card worth keeping',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#0B0B0F] text-[#D9DDE3]`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
