import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "DT Assignment Archive",
    description:
        "This is a archive of assignments of my time in Digitale Talenter",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} h-screen overflow-hidden`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="[--header-height:calc(theme(spacing.14))] h-full flex flex-col">
                        <SidebarProvider className="flex flex-col flex-1 overflow-hidden">
                            <SiteHeader />
                            <div className="flex flex-1 min-h-0 overflow-hidden">
                                <AppSidebar />
                                <SidebarInset className="min-h-0 flex-1 overflow-hidden">
                                    {children}
                                </SidebarInset>
                            </div>
                        </SidebarProvider>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
