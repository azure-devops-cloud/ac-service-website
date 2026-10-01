import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AC CARE | AC Service, Repair & Installation',
  description: 'Fast, transparent AC service, repair, installation and maintenance. Book a trusted technician today.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}