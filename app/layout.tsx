import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import { event } from "@/lib/event";
import "./globals.css";

const sans = Noto_Sans_JP({
  variable: "--font-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const mincho = Shippori_Mincho({
  variable: "--font-mincho",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: `${event.schoolNameShort} ${event.reunionName}`,
  description: `${event.catchphrase} ${event.dateLabel} ${event.venueName}にて開催。`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${sans.variable} ${mincho.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
