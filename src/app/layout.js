import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import ReduxProvider from '@/store/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Commutatus Assignment',
  description: 'Commutatus Hierarchy UI - Assignment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        <div className="flex h-full">
          <div className="w-72 bg-black text-white min-h-full fixed left-0">
            <Sidebar />
          </div>
          <div className="w-[calc(100vw_-_288px)]  relative left-72">
            <ReduxProvider>
              {children}
            </ReduxProvider>
          </div>
        </div>
      </body>
    </html>
  );
}