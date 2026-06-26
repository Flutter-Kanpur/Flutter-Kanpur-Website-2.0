import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import LayoutBackground from "@/components/LayoutBackground";
import MobileBottomNav from "@/components/navbar/MobileNavBar";
import TopNavbar from "@/components/TopNavbar";
import Box from "@mui/material/Box";

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
            {/* Desktop Navbar */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <TopNavbar />
            </Box>

            {children}

            {/* Mobile Navbar */}
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
          </LayoutBackground>
        </ThemeRegistry>
      </body>
    </html>
  );
}
