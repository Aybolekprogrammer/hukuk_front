import Script from "next/script";
import { Footer } from "../component/Footer/Footer";
import Navbar from "../component/Navbar/Navbar";
import "../styles/globals.css";
import { translations, fallbackLang } from "../translations";
import LayoutClient from "./layout-client";
import { getAbout } from "@/api/get";

export function generateMetadata() {
  const t = translations[fallbackLang];
  return {
    title: t.logo,
    description: t.aboutDesc,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let about = null;

  try {
    const aboutData = await getAbout();
    about = aboutData?.[0] || null;
  } catch (error) {
    about = null;
  }

  return (
    <html lang={fallbackLang}>
      <head>
        {/* Google Analytics Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FL5B4EHH9J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FL5B4EHH9J');
          `}
        </Script>
      </head>
      <body className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 
                       transition duration-300 dark:text-gray-200">
        <LayoutClient>
          <Navbar about={about} />
          <main className="flex-1">{children}</main>
          <Footer about={about} />
        </LayoutClient>
      </body>
    </html>
  );
}
