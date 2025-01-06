import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "flex h-screen  bg-background w-full font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="w-full min-h-screen">
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <main className="w-full h-screen">{children}</main>
            <Toaster position="bottom-right" />
          </Providers>
        </div>
      </body>
    </html>
  );
}
