import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { ImageGallery } from '@/components/ImageGallery'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { CallToAction } from '@/components/CallToAction'
import { Documentation } from '@/components/Documentation'
import { Faqs } from '@/components/Faqs'


export default function Home() {
  return (
    <>
      <Hero />
      <PrimaryFeatures />
      <ImageGallery />
      <SecondaryFeatures />
      <CallToAction />
      <Documentation />
      <Faqs />
    </>
  )
}