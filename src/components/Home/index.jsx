import FooterComponent from '@/components/FooterComponent'
import ExploreCategoriesSection from '@/components/landingPageComponents/ExploreCategories'
import ExploreEventsSection from '@/components/landingPageComponents/ExploreEventsSection'
import FAQSection from '@/components/landingPageComponents/FAQSection'
import HeroSection from '@/components/landingPageComponents/HeroSection'
import PastSpeakerSection from '@/components/landingPageComponents/PastSpeakerSection'
import ReadyToGrowSection from '@/components/landingPageComponents/ReadyToGrowSection'
import PaddingContainer from '@/components/PaddingContainer'
import TopNavbar from '@/components/TopNavbar'
import { Box } from '@mui/material'
import React from 'react'

const Home = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '130px' }}>
            {/* Navbar overlays the hero so it floats on the gradient with just a
                small top margin (from TopNavbar's own mt) instead of sitting in a
                separate block that creates an ugly gap. The container is painted
                with the hero gradient's starting colour (#FAFAFA) so the top strip
                behind the navbar blends seamlessly into the hero instead of showing
                the white body background. Scoped to the "/" page. */}
            <Box sx={{ position: 'relative', background: '#FAFAFA' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 20,
                    }}
                >
                    <TopNavbar />
                </Box>
                <Box sx={{ pt: { xs: 7, md: 8 } }}>
                    <HeroSection />
                </Box>
            </Box>

            <PaddingContainer
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '130px'
                }}
            >
                <ExploreEventsSection />
                <PastSpeakerSection />
                <ExploreCategoriesSection />
                <FAQSection />
                <ReadyToGrowSection />
                <FooterComponent />
            </PaddingContainer>
        </Box>
    )
}

export default Home