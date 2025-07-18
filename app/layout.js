import "./globals.css";
import { Providers } from "./providers";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-cairo",
});

export const metadata = {
  title: "موقع السباكة",
  description: "أفضل خدمات سباكة في الجزائر.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <Providers> {children} </Providers>{" "}
      </body>{" "}
    </html>
  );
}
