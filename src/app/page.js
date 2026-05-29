'use client'

import Home from '@/components/Home'
import Dashboard from '@/components/dashboardv2/dashboard'
import { useMediaQuery } from '@mui/material'

const Page = () => {

    const isMobile = useMediaQuery('(max-width:900px)')

    return isMobile ? <Dashboard /> : <Home />
}

export default Page