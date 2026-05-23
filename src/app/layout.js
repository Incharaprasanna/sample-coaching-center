import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://skillhorizontechnologies.in"),
  title: "Skill Horizon Technologies Academy | Internships, Projects & Upskilling in Andhra Pradesh",
  description: "Skill Horizon Technologies Academy — AP's leading student training hub. Expert guidance for academic projects, internships, upskilling workshops, summer coaching & regular coaching across all AP districts. Enrol today.",
  keywords: "student training Andhra Pradesh, internship academy AP, academic projects help, upskilling courses students, summer coaching AP, Skill Horizon Academy",
  alternates: {
    canonical: "/academy/",
  },
  openGraph: {
    title: "Skill Horizon Academy — Powering AP Student Careers",
    description: "From final year projects to paid internships and weekend workshops — Skill Horizon Academy equips AP students with real industry skills.",
    url: "https://skillhorizontechnologies.in/academy/",
    siteName: "Skill Horizon Technologies Academy",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/skill-horizon.jpeg", type: "image/jpeg" },
    ],
    shortcut: "/skill-horizon.jpeg",
    apple: "/skill-horizon.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="layout-wrapper">
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
