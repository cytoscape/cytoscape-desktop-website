import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { CallToAction } from '@/components/CallToAction'
import { Documentation } from '@/components/Documentation'
import { Faqs } from '@/components/Faqs'


export default function Home() {
  return (
    <>
      <Hero />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <CallToAction />
      <Documentation />
      <Faqs />
    </>
  )
}