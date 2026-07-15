import './globals.css';
import { Encode_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import AppShell from '@/components/layouts/AppShell';
import LayoutBackground from '@/components/LayoutBackground';
import ThemeRegistry from '@/components/ThemeRegistry';
import MobileBottomNav from '@/components/navbar/MobileNavBar';
import Box from '@mui/material/Box';

const encodeSans = Encode_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const productSans = localFont({
  src: [
    {
      path: '../../public/fonts/ProductSans-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ProductSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ProductSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ProductSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ProductSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ProductSans-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ProductSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/ProductSans-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-product-sans',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={productSans.variable}>
      <body
        style={{
          overflowX: 'hidden',
          background: '#ffffff',
        }}
      >
        <ThemeRegistry>
          <LayoutBackground>
            <AppShell>
              {children}
            </AppShell>
            
            <Box
              sx={{
                display: {
                  xs: 'block',
                  sm: 'none',
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