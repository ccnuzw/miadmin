import '../styles/globals.css';
import { Inter } from 'next/font/google';
import AntdRegistry from '../lib/AntdRegistry';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MiAdmin - Next.js B-end Management System',
  description: 'A responsive B-end management system basic framework based on Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
