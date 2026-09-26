import React from 'react'
import styles from './CommFAQ.module.css'
import AccordionComponent from '../../landingPageComponents/FAQSection/AccordionComponent'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { accordianData } from '../../landingPageComponents/FAQSection'

const CommFAQ = () => {
    return (
        <Box sx={{
            padding: '0px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography className={styles.title}>
                Everything you need to know about the Flutter <br/>  Kanpur community
            </Typography>

            <Box sx={{ width: '100%', maxWidth: '1000px', marginTop:'67px' }}>
                {accordianData.map((data, index) => (
                    <AccordionComponent key={index} accordianData={data} />
                ))}
            </Box>
        </Box>
        
    )

}

export default CommFAQ