import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Idea",
  description: "Make your idea in action with our AI Idea Magic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
        {/* You can also use .png if preferred */}
        <link rel="icon" type="image/png" href="/ai_idea_logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
