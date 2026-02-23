import { useId } from 'react'
import { Button } from '@/components/base/Button'
import { Container } from '@/components/base/Container'
import { Link } from '@/components/base/Link'
import { colors } from '@/styles/tailwind'
import { ArrowDownTrayIcon } from '@heroicons/react/16/solid'


function BackgroundIllustration(props) {
  let id = useId()

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={colors.primary[500]} />
            <stop offset="1" stopColor={colors.primary[500]} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={colors.primary[500]} />
            <stop offset="1" stopColor={colors.primary[500]} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

const PlayIcon = (props) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" className="stroke-gray-300 group-hover:stroke-complement-400 " />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        className="fill-gray-400 group-hover:fill-complement-500"
      />
    </svg>
  )
}


export function Hero() {
  return (
    <div className="overflow-hidden pt-5 lg:pt-20 border-b border-gray-200">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-y-20 lg:gap-y-2">
          <div className="relative mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="sm:text-3xl text-2xl font-semibold tracking-tight text-gray-900">
              Network Data Integration, Analysis, and Visualization in a Box
            </h1>
            <p className="mt-6 sm:text-lg xs:text-md text-gray-600">
              Cytoscape Desktop is an open source software platform for visualizing complex networks 
              and integrating these with any type of attribute data.
              A lot of <Link href="https://apps.cytoscape.org/" linkOut>Apps</Link> are available 
              for various kinds of problem domains, including bioinformatics, social network analysis, and semantic web.
            </p>
              
            <div className="mt-8 mb-16 flex flex-wrap gap-x-6 gap-y-4">
              <Button
                color="primary"
                href="#download"
                className="pl-4 pr-6"
            >
                <ArrowDownTrayIcon className="h-6 w-6 flex-none" />
                <span className="ml-2.5">Download</span>
              </Button>
              <Button
                href="https://youtu.be/P1IT7GsEp4c?list=PLFQS98nmv__zUUAIfU_dGXFi-qZP90VVQ"
                target="_blank"
                rel="noreferrer"
                variant="outline"
                className="border-none group"
              >
                <PlayIcon className="h-6 w-6 flex-none" />
                <span className="ml-2.5 group-hover:text-complement-500">Watch the videos</span>
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="h-auto -mx-4 px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:pt-10 xl:-bottom-32">
              <img
                src="/images/hero-figure.png"
                alt="Cytoscape Screenshot"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}