import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientProvider";
import { Providers } from "./providers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const sourcesans = Source_Sans_3({
  variable: "--font-sourcesans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Church Blog",
  description: "church blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${sourcesans.variable} antialiased`}
      >
        {/* <Providers> */}
        <ClientProvider>{children}</ClientProvider>
        {/* </Providers> */}
      </body>
    </html>
  );
}
