import React from 'react'
import Hero from './communityPageComponent/Hero'
import FooterComponent from '../FooterComponent'
import ForumDiscussions from './communityPageComponent/ForumDiscussions'
import ConversationsSection from './communityPageComponent/Conversations'

import CommFAQ from './communityPageComponent/CommFAQ'
import BadgesLeaderBoard from './communityPageComponent/BadgesLeaderBoard'
import CommunityMembers from './communityPageComponent/CommunityMembers'
import BuiltOnRespectSection from './communityPageComponent/BuiltOnRespectSection'


function page() {
  return (
    <>
    <Hero />

    <ForumDiscussions />
    <ConversationsSection/>
    <div style={{ padding: "80px 24px" }}>
      <CommFAQ />
    </div>
    <BadgesLeaderBoard />
    <CommunityMembers />
    <BuiltOnRespectSection />
    <div 
    style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "72px 24px",
        }}>
      <FooterComponent/>
    </div>
    

  </>
    
  )
}

export default page