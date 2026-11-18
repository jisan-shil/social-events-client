import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: 'Seva Circle | Community Service Events',
  description:
    'Create, join and track social service events like clothes distribution, plantation and clean-up drives in your area.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className="bg-base-100 text-base-content">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
