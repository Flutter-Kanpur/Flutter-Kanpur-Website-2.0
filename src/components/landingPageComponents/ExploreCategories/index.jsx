import { Box, Typography } from '@mui/material'
import React from 'react'
import ExploreCategoriesCard from './Card'
import styles from '../ExploreCategories/Card/style.module.css'


const ExploreCategoriesSection = () => {

    const CategoriesData = [
        {
            title: "Blogs/Articles",
            linkText: "Open full story",
            linkHref: "#"
        },
        {
            title: "Top Projects",
            linkText: "Open full story",
            linkHref: "#"
        },
        {
            title: "Meet Team",
            linkText: "Open full story",
            linkHref: "#"
        }
    ]

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'space-between', }}>
            <Typography sx={{
                fontSize: { xs: 28, sm: 36, md: 42, lg: 48 },
                fontWeight: 600,
                color: '#000',
            }}>
                Explore top categories
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center", alignItems: 'center', gap: '12px' }}>
                {[...CategoriesData].map((data, index) => (
                    <ExploreCategoriesCard key={index} exploreData={data} />
                ))}
            </Box>
        </Box>
    )
}
export default ExploreCategoriesSection