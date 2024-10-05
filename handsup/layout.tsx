import localFont from "next/font/local";
import "./globals.css";
import Web3ModalProvider from "./wagmiProvider";
import { headers } from "next/headers";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get("cookie");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
		<Navbar />
        <Web3ModalProvider cookies={cookies}>{children}</Web3ModalProvider>
        <Toaster />
      </body>
    </html>
  );
}
