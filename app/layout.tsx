import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Kadwa, Poppins } from "next/font/google";
import { Menu } from "../src/components/Menu";
import "../src/styles/globals.scss";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const kadwa = Kadwa({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-kadwa",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reynoso Bienes Raíces",
  description:
    "Encontrá tu propiedad ideal en el norte argentino. Terrenos, casas y departamentos en venta y alquiler.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} ${inter.variable} ${kadwa.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface font-body text-on-surface">
        <Menu />
        {children}
      </body>
    </html>
  );
}
