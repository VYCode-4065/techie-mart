import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Techie-Mart",
  description: "A place to buy someting for happiness !",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
          className={cn("antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}>
      <body>
      {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
