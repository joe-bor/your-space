export const dynamic = 'force-static'

import { Metadata } from "next"
export const metadata: Metadata = {
    title: 'About Us',
    description: 'We are a social media company'
}

function About() {
  return (
    
    <main>
        This is the About me page
    </main>
  )
}
export default About