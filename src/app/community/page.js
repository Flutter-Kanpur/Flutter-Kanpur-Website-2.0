'use client';

import Community from '@/components/Community';
import CommunityScreen from '@/components/communityScreen';
import { useMediaQuery } from '@mui/material';

const Page = () => {
  const isMobile = useMediaQuery('(max-width:480px)');

  return isMobile ? <CommunityScreen /> : <Community />;
};

export default Page;
