import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata = {
  title: "Traventure",
  description: "Travel bookings made effortless.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#050505] text-slate-100">
        {children}
      </body>
    </html>
  );
}
