import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/layout/Layout";
import ReduxProvider from "./reduxProvider";
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "New Dashboard",
  description: "Dashboard using Next JS, Shadcn",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          poppins.variable
        )}
      >
        <NextTopLoader height={2} />
        <ReduxProvider>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
             enableSystem
            disableTransitionOnChange
          >  
            <Layout>{children}</Layout>
            <Toaster richColors position="top-center" expand={true} />
          </ThemeProvider>
        </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
