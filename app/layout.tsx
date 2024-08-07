import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { palettemosaic, recursive } from "@/lib/utils";
import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${palettemosaic.variable}`}>
      <body>
          <Header />
          {children}
          <Footer />
      </body>
    </html>
  );
}
