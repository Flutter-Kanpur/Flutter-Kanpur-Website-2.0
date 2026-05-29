import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from './style.module.css'
import Link from 'next/link'
import EastIcon from '@mui/icons-material/East';

const PRODUCT_SANS = "'Product Sans', system-ui, -apple-system, sans-serif"

const ProductText = ({ children, sx, ...props }) => (
    <Typography sx={{ fontFamily: PRODUCT_SANS, ...sx }} {...props}>
        {children}
    </Typography>
)

const FigmaIcon = () => {
    const parts = ['red', 'orange', 'purple', 'blue', 'green']
    return (
        <Box className={styles.figmaIcon}>
            {parts.map(part => (
                <Box key={part} className={`${styles.figmaPart} ${styles[part]}`} />
            ))}
        </Box>
    )
}

const ExploreCategoriesCard = ({ exploreData }) => {
    const {
        title = "Blogs/Articles",
        linkText = "Open full story",
        linkHref = "#"
    } = exploreData || {};
    return (
        <Box className={styles.cardContainer}>
            <Box className={styles.contentWrapper}>
                <ProductText className={styles.title} sx={{ fontSize: 24, fontWeight: 600, color: '#000' }}>
                    {title}
                </ProductText>
                <Link href={linkHref} className={styles.linkWrapper}>
                    <ProductText sx={{ fontSize: 20, fontWeight: 400, color: '#4167F2' }}>
                        {linkText}
                    </ProductText>
                    <EastIcon sx={{ fontSize: 20 }} />
                </Link>
            </Box>
            <Box className={styles.iconWrapper}>
                <FigmaIcon />
            </Box>
        </Box>
    )
}

export default ExploreCategoriesCard