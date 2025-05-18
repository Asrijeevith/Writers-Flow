import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ClientToaster from "./components/ClientToaster";
import Navbar from './components/Navbar';
import { ThemeProvider } from 'next-themes';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata = {
  title: "Writers-Flow",
  description: "This is my first project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`} suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <ClientToaster />
            <footer className="bg-gray-800 text-white py-4 text-center">
              <p>&copy; 2025 Writers-Flow</p>
            </footer>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
