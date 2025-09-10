




import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'

import EventsTwo from '@/components/events/EventsTwo'
import FooterFour from '@/components/layout/footers/FooterFour'
import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import React from 'react'
export const metadata = {
  title: 'Actualités & Événements — FST Marrakech',
  description:
    'Suivez les actualités, événements et annonces officielles de la Faculté des Sciences et Techniques de Marrakech : conférences, soutenances, recrutements, calendriers et plus.',
  
}
export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>

        <HeaderFour/>
        <div className="content-wrapper js-content-wrapper overflow-hidden">
    
            <EventsTwo/>
            <FooterFour/>
        </div>

    </div>
  )
}
