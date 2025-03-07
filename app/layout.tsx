import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "@/components/conditionalHeader";
import ProtectedRoute from "@/components/protectedroute";
import { Toaster } from 'sonner';

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "movo",
    description: "movies booking made easy",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${poppins.variable} antialiased`}>
        <Toaster />
        <ConditionalHeader />
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
        </body>
        </html>
    );
}