'use client'

import { useState } from 'react'
import PropTypes from 'prop-types'
import { Radio, RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { Link } from '@/components/base/Link'
import { Container } from '@/components/base/Container'
import { AcademicCapIcon, QuestionMarkCircleIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { PresentationChartBarIcon, NewspaperIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline'


const userCards = [
  {
    name: 'Start Here',
    featured: false,
    icon: PresentationChartBarIcon,
    description:
      'Start here if you are a bench or computational biologist new to Cytoscape, and want to learn how to use it for your research.',
    links: [
      { label: 'Quick tour', href: 'https://cytoscape.github.io/cytoscape-tutorials/protocols/tour-of-cytoscape/' },
      { label: 'Introduction to Cytoscape', href: 'http://www.slideshare.net/keiono/introduction-to-biological-network-analysis-and-visualization-with-cytoscape-part1' },
      { label: 'Basic tutorial', href: 'http://www.slideshare.net/keiono/cytoscape-tutorial-session-1-at-utkbrin-bioinformatics-summit-2014-4112014' },
      { label: 'YouTube channel', href: 'https://www.youtube.com/channel/UCv6auk9FK4NgXiXiqrDLccw' },
    ],
  },
  {
    name: 'Master Cytoscape',
    featured: false,
    icon: AcademicCapIcon,
    description:
      'Learn how to extract the most out of Cytoscape by mastering its features and capabilities.',
    links: [
      { label: 'Advanced Topics', href: 'http://www.slideshare.net/keiono/cytoscape-tutorial-session-2-at-utkbrin-bioinformatics-summit-2014-4112014' },
      { label: 'Tutorials & Protocols', href: 'http://tutorials.cytoscape.org' },
      { label: 'User manual', href: 'https://manual.cytoscape.org/en/stable/' },
      { label: 'Automation & Scripting', href: 'http://automation.cytoscape.org' },
    ],
  },
  {
    name: 'Scientific Papers',
    featured: false,
    icon: NewspaperIcon,
    description:
      'Read scientific papers that use Cytoscape to understand how it can be used to analyze and visualize your data.',
    links: [
      { label: 'Nature Protocols sample workflow', href: 'https://genomebiology.biomedcentral.com/articles/10.1186/s13059-019-1758-4' },
      { label: 'Cytoscape Automation ', href: 'https://genomebiology.biomedcentral.com/articles/10.1186/s13059-019-1758-4' },
      { label: 'Nature Methods', href: 'http://www.ncbi.nlm.nih.gov/pubmed/23132118' },
      { label: 'Original Cytoscape paper', href: 'http://www.genome.org/cgi/content/full/13/11/2498' },
    ],
  },
]

const developerCards = [
  {
    name: 'Get Involved',
    featured: false,
    icon: UserGroupIcon,
    description:
      'If you want to write a Cytoscape App or contribute to Cytoscape Desktop development, start here.',
    links: [
      { label: 'Cytoscape App Developer Ladder', href: 'http://wiki.cytoscape.org/Cytoscape-App-Ladder' },
      { label: 'Developer Wiki', href: 'https://github.com/cytoscape/cytoscape/wiki/' },
      { label: 'Publish your apps', href: 'http://apps.cytoscape.org/' },
      { label: 'Google Summer of Code', href: 'http://nrnb.org/gsoc.html' },
      { label: 'Jira Issue Tracker', href: 'https://cytoscape.atlassian.net/' },
    ],
  },
  {
    name: 'Developer Resources',
    featured: false,
    icon: Square3Stack3DIcon,
    description:
      'These resources provide everything you need to develop a Cytoscape App or contribute to Cytoscape Desktop.',
    links: [
      { label: 'Code Repository on GitHub', href: 'https://github.com/cytoscape/cytoscape' },
      { label: 'Latest Javadoc', href: 'https://cytoscape.org/javadoc/current_release/' },
      { label: 'Latest Builds', href: 'https://cytoscape-builds.ucsd.edu/cytoscape-builds/' },
      { label: 'Nexus Repository', href: 'https://nrnb-nexus.ucsd.edu/' },
      { label: 'Travis CI', href: 'https://app.travis-ci.com/github/cytoscape' },
    ],
  },
]

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="12"
        r="8.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const LinkOut = ({ href, ariaLabel = 'external link', darkBackground = false, children }) => (
  <Link href={href} aria-label={ariaLabel} darkBackground={darkBackground} linkOut>
    {children}
  </Link>
)
LinkOut.propTypes = {
  href: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  darkBackground: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

function Card({
  name,
  icon: Icon,
  description,
  links,
  featured = false,
}) {
  return (
    <section
      className={clsx(
        'flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5',
        featured ? 'order-first bg-gray-900 lg:order-none' : 'bg-white',
      )}
    >
      <h3
        className={clsx(
          'flex items-center text-sm font-semibold',
          featured ? 'text-white' : 'text-gray-900',
        )}
      >
        <Icon className={clsx('h-6 w-6 flex-none', featured ? 'text-white' : 'text-gray-500')} />
        <span className="ml-4">{name}</span>
      </h3>
      <p
        className={clsx(
          'mt-12 lg:min-h-20 text-sm',
          featured ? 'text-gray-300' : 'text-gray-700',
        )}
      >
        {description}
      </p>
      <div className="order-last mt-6">
        <ul
          role="list"
          className={clsx(
            '-my-2 divide-y text-sm',
            featured
              ? 'divide-gray-800 text-gray-300'
              : 'divide-gray-200 text-gray-700',
          )}
        >
          {links?.map((link) => (
            <li key={link.label} className="flex py-2">
              <CheckIcon
                className={clsx(
                  'h-6 w-6 flex-none',
                  featured ? 'text-white' : 'text-cyan-500',
                )}
              />
              <Link href={link.href} linkOut darkBackground={featured} className="ml-4">{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Documentation() {
  let [selectedPersona, setSelectedPersona] = useState('user')
  const selectedCards = selectedPersona === 'user' ? userCards : developerCards

  return (
    <section
      id="documentation"
      aria-labelledby="documentation-title"
      className="border-t border-gray-200 bg-gray-100 py-20 sm:py-32"
    >
      <Container className="flex flex-col items-center">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="documentation-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Documentation.
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Whether you are new to Cytoscape or want to get involved by developing a Cytoscape App, our documentation has you covered.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative">
            <RadioGroup
              value={selectedPersona}
              onChange={setSelectedPersona}
              className="grid grid-cols-2"
            >
            {['user', 'developer'].map((persona) => (
              <Radio
                key={persona}
                value={persona}
                className={clsx(
                  'cursor-pointer border border-gray-300 px-[calc(theme(spacing.3)-1px)] py-[calc(theme(spacing.2)-1px)] text-sm text-center text-gray-700 outline-2 outline-offset-2 transition-colors hover:border-gray-400',
                  persona === 'user'
                    ? 'rounded-l-lg'
                    : '-ml-px rounded-r-lg',
                )}
              >
                I'm a {persona[0]?.toUpperCase()}{persona.slice(1)}
              </Radio>
            ))}
            </RadioGroup>
            <div
              aria-hidden="true"
              className={clsx(
                'pointer-events-none absolute inset-0 z-10 grid grid-cols-2 overflow-hidden rounded-lg bg-cyan-500 transition-all duration-300',
                selectedPersona === 'user'
                  ? '[clip-path:inset(0_50%_0_0)]'
                  : '[clip-path:inset(0_0_0_calc(50%-1px))]',
              )}
            >
            {['user', 'developer'].map((persona) => (
              <div
                key={persona}
                className={clsx(
                  'py-2 text-center text-sm font-semibold text-white',
                  persona === 'developer' && '-ml-px',
                )}
              >
                I'm a {persona[0]?.toUpperCase()}{persona.slice(1)}
              </div>
            ))}
            </div>
          </div>
        </div>

        <div className={clsx(
          'mx-auto mt-16 grid max-w-2xl items-start gap-x-8 gap-y-10 sm:mt-20 lg:max-w-none grid-cols-1',
          `lg:grid-cols-${selectedCards.length}`,
        )}>
        {selectedCards.map((group) => (
          <Card key={group.name} {...group} />
        ))}
        </div>

        <div className="mx-auto mt-10 sm:max-w-2xl">
          <Card
            name="Need More Help?"
            icon={QuestionMarkCircleIcon}
            description={
              <>
                Go to <LinkOut href="https://bioinformatics.stackexchange.com/questions/tagged/cytoscape?sort=newest" darkBackground>Bioinformatics StackExchange</LinkOut> to search 
                and ask questions about software installation, operation and troubleshooting.<br />
                On this forum, you can also ask questions about data anaysis and visualization, including recommended apps, databases and workflows.<br />
                Be sure to tag your question with "cytoscape" so we can find it!
              </>
            }
            featured
          />
        </div>
      </Container>
    </section>
  )
}