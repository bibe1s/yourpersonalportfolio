import type { Metadata } from "next";
import "./globals.css";
import { ProfileProvider } from "@/contexts/ProfileContext";

export const metadata: Metadata = {
  title: "Portfolio Builder",
  description: "Build your Web2 and Web3 portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}