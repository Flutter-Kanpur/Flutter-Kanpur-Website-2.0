import FooterComponent from '@/components/FooterComponent'
import ExploreCategoriesSection from '@/components/landingPageComponents/ExploreCategories'
import ExploreEventsSection from '@/components/landingPageComponents/ExploreEventsSection'
import FAQSection from '@/components/landingPageComponents/FAQSection'
import HeroSection from '@/components/landingPageComponents/HeroSection'
import PastSpeakerSection from '@/components/landingPageComponents/PastSpeakerSection'
import ReadyToGrowSection from '@/components/landingPageComponents/ReadyToGrowSection'
import PaddingContainer from '@/components/PaddingContainer'
import TopNavbar from '@/components/TopNavbar'
import ScreenUtilScaler from '@/components/layouts/ScreenUtilScaler'
import { ULTRA_WIDE_MIN } from '@/theme/breakpoints'
import { Box } from '@mui/material'
import React from 'react'

const DESIGN_WIDTH = 1440

const page = () => {
    return (
        <ScreenUtilScaler
            designWidth={DESIGN_WIDTH}
            desktopMin={ULTRA_WIDE_MIN}
            allowUpscale
        >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '130px' }}>
            <Box sx={{ position: 'relative', mt: { xs: 0, md: 0 } }}>
                <Box sx={{ position: 'absolute', top: { xs: 0, md: 0 }, left: 0, right: 0, zIndex: 20, pt: { xs: 1, md: 1.5 } }}>
                    <TopNavbar />
                </Box>
                <Box sx={{ pt: { xs: 12, md: 14 } }}>
                    <HeroSection />
                </Box>
            </Box>
            <PaddingContainer style={{ display: 'flex', flexDirection: 'column', gap: '130px' }}>
                <ExploreEventsSection />
                <PastSpeakerSection />
                <ExploreCategoriesSection />
                <FAQSection />
                <ReadyToGrowSection />
                <FooterComponent />
            </PaddingContainer>
        </Box>
        </ScreenUtilScaler>
    )
}

export default page
