import './globals.css';
import { Encode_Sans } from 'next/font/google';
import localFont from "next/font/local";
import AppShell from '@/components/layouts/AppShell';
import LayoutBackground from '@/components/LayoutBackground';
import ThemeRegistry from '@/components/ThemeRegistry';
import MobileBottomNav from '@/components/navbar/MobileNavBar';
import Box from "@mui/material/Box";

const encodeSans = Encode_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          overflowX: "hidden",
          background: "#ffffff",
        }}
      >
        <ThemeRegistry>
          <LayoutBackground>
            {/* <NavbarComponent /> */}
            <AppShell>
              {children}
            </AppShell>
          </LayoutBackground>
          {/* <MobileBottomNav /> */}
          {/* </NavbarProvider> */}

          <Box
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
            }}
          >
            <MobileBottomNav />
          </Box>
        </ThemeRegistry>

      </body>
    </html>
  );
}
