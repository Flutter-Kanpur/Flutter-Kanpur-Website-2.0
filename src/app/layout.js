import './globals.css';
import { Encode_Sans } from 'next/font/google';
import localFont from "next/font/local";
// import ThemeRegistry from '@/components/ThemeRegistry';
// import { NavbarProvider } from '@/contexts/NavbarContext';
// import NavbarComponent from '@/components/navbar/navbar';
import AppShell from '@/components/layouts/AppShell';
import LayoutBackground from '@/components/LayoutBackground';
// import MobileBottomNav from '@/components/navbar/MobileNavBar';
import TopNavbar from '@/components/TopNavbar';

const encodeSans = Encode_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const productSans = localFont({
  src: [
    {
      path: "../../public/assets/fonts/ProductSans-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/ProductSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/ProductSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/ProductSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/ProductSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/ProductSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/ProductSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/ProductSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-product-sans",
});

export default function RootLayout({ children }) {
  return (
    <html >
      <body
        className={productSans.className}
        style={{
          // overflowX: 'hidden',
          background: "#fafafa"
        }}

      >
      
          <LayoutBackground>
            {/* <NavbarComponent /> */}
            <AppShell>
              {children}
            </AppShell>
          </LayoutBackground>
          {/* <MobileBottomNav /> */}
            {/* <TopNavbar />
            {children}
            
          </LayoutBackground> */}
          {/* </NavbarProvider> */}
        
      </body>
    </html>
  );
}
