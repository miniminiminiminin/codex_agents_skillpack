import "../styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppFrame } from "@langue/ui";

export const metadata: Metadata = {
  title: "Langue",
  description: "AI-native language learning platform scaffold"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
