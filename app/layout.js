import "./globals.css";
import LoadingScreen from "./LoadingScreen";
import FloatingChat from "./FloatingChat";

export const metadata = {
  title: "Francis Espiritu | Software Developer",
  description: "Full-stack & mobile software developer based in the Philippines. Building modern web and mobile experiences with React, Next.js, and React Native.",
  keywords: "Francis Espiritu, software developer, full-stack, React, Next.js, React Native, Philippines, portfolio",
  authors: [{ name: "Francis Espiritu" }],
  openGraph: {
    title: "Francis Espiritu | Software Developer",
    description: "Full-stack & mobile software developer based in the Philippines.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(() => {
          let saved;
          try { saved = localStorage.getItem("portfolio-theme"); } catch {}
          document.documentElement.dataset.theme = saved === "dark" || saved === "light"
            ? saved : "dark";
        })();` }} />
      </head>
      <body><LoadingScreen />{children}<FloatingChat /></body>
    </html>
  );
}
