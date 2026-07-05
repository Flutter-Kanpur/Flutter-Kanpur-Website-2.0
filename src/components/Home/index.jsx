import FooterComponent from '@/components/FooterComponent'
import ExploreCategoriesSection from '@/components/landingPageComponents/ExploreCategories'
import ExploreEventsSection from '@/components/landingPageComponents/ExploreEventsSection'
import FAQSection from '@/components/landingPageComponents/FAQSection'
import HeroSection from '@/components/landingPageComponents/HeroSection'
import PastSpeakerSection from '@/components/landingPageComponents/PastSpeakerSection'
import ReadyToGrowSection from '@/components/landingPageComponents/ReadyToGrowSection'
import PaddingContainer from '@/components/PaddingContainer'
import { Box } from '@mui/material'
import React from 'react'

const Home = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '130px' }}>
            <HeroSection />

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