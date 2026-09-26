import React from 'react'
import Hero from '../../components/communityPageComponent/Hero'
import FooterComponent from '../../components/FooterComponent'
import ForumDiscussions from '../../components/communityPageComponent/ForumDiscussions'
import ConversationsSection from '../../components/communityPageComponent/Conversations'

import CommFAQ from '../../components/communityPageComponent/CommFAQ'
import BadgesLeaderBoard from '../../components/communityPageComponent/BadgesLeaderBoard'
import CommunityMembers from '../../components/communityPageComponent/CommunityMembers'
import BuiltOnRespectSection from '../../components/communityPageComponent/BuiltOnRespectSection'


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