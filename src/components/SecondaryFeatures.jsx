import PropTypes from 'prop-types'
import { colors } from '@/styles/tailwind'
import { Container } from '@/components/base/Container'
import { Link } from '@/components/base/Link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import {
  ArrowUpOnSquareStackIcon,
  GlobeAltIcon,
  ArrowDownOnSquareStackIcon,
  ShareIcon,
  SquaresPlusIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline'


const LinkOut = ({ href, ariaLabel = 'external link', children }) => (
  <Link href={href} aria-label={ariaLabel} linkOut>
    {children}
  </Link>
)
LinkOut.propTypes = {
  href: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
}

const features = [
  {
    name: 'Load Data in Multiple Formats',
    description: <>
      Load molecular and genetic interaction data sets in many formats, including:
      MS Excel&trade;, <LinkOut href="https://networkx.org/documentation/stable/reference/readwrite/gml.html">GML</LinkOut>, 
      &nbsp;<LinkOut href="http://graphml.graphdrawing.org/">XGMML</LinkOut>, 
      &nbsp;<LinkOut href="http://biopax.org/">BioPAX</LinkOut>, 
      &nbsp;<LinkOut href="https://psicquic.github.io/">PSI-MI</LinkOut>, 
      &nbsp;<LinkOut href="http://graphml.graphdrawing.org/">GraphML</LinkOut>, 
      &nbsp;<LinkOut href="https://www.kegg.jp/kegg/xml/">KGML</LinkOut>, 
      &nbsp;<LinkOut href="http://sbml.org/">SBML</LinkOut>, 
      &nbsp;<LinkOut href="https://obofoundry.org/">OBO</LinkOut>, and 
      &nbsp;<LinkOut href="http://geneontology.org/">Gene Association</LinkOut>.
    </>,
    href: 'https://manual.cytoscape.org/en/latest/Supported_Network_File_Formats.html',
    icon: ArrowUpOnSquareStackIcon,
  },
  {
    name: 'Connect to External Public Databases',
    description: <>
      Cytoscape can directly connect to external public databases to import networks and annotation data.
      That includes Pathway Commons, IntAct, BioMart, and NCBI Entrez Gene.
    </>,
    href: 'https://manual.cytoscape.org/en/latest/Creating_Networks.html#import-networks-from-public-databases',
    icon: GlobeAltIcon,
  },
  {
    name: 'Visualize your Data as Networks',
    description: <>
      Create interactive networks from your data, analyze, and customize it by using powerful visual styles.
      View a superposition of gene expression ratios and p-values on the network. 
      Expression data can be mapped to node color, label, border thickness, border color, etc., 
      according to user-configurable colors and visualization schemes.
    </>,
    href: 'https://manual.cytoscape.org/en/latest/Creating_Networks.html',
    icon: ShareIcon,
  },
  {
    name: 'Install Third-Party Apps',
    description: <>
      Apps are available for network and molecular profile analysis.
      Cytoscape is a software written in Java and you can write your own App for data analysis, import, and visualization.
      More Apps are available at the <LinkOut href="https://apps.cytoscape.org/">Cytoscape App Store</LinkOut>.
    </>,
    href: 'https://apps.cytoscape.org/',
    icon: SquaresPlusIcon,
  },
  {
    name: 'Export the Results',
    description: <>
      You can export networks as publishable-quality images.
      Supported formats are: PDF, PS, SVG, PNG, JPEG, and BMP files.
      Vector images (PDF and PS) can be modified by other application such as Adobe Illustrator for further enhancements.
    </>,
    href: 'https://manual.cytoscape.org/en/latest/Export_Your_Data.html',
    icon: ArrowDownOnSquareStackIcon,
  },
  {
    name: 'Automate your Workflows',
    description: <>
        Use Cytoscape's RESTful API to control it programmatically with your choice of programming languages.
        You can access its core features such as creating networks and exporting images,
        as well as functionality from Cytoscape apps.
      </>,
    href: 'https://manual.cytoscape.org/en/latest/Programmatic_Access_to_Cytoscape_Features_Scripting.html',
    icon: CodeBracketIcon,
  },
]

export function SecondaryFeatures() {
  return (
    <section
      id="ecosystem"
      aria-label="Tools available from the Cytoscape ecosystem"
      className="py-20 sm:py-32 border-b border-gray-200"
    >
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">
            What Can You Do With Cytoscape?
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Cytoscape supports many use cases in molecular and systems biology, genomics, and proteomics.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-2 text-sm sm:mt-20 sm:grid-cols-2 md:gap-4 md:gap-y-4 lg:max-w-none lg:grid-cols-3 lg:gap-6"
        >
          {features.map((feature) => (
            <li
              key={feature.name}
              className="rounded-2xl border border-gray-200 p-4 lg:p-8 min-h-36 md:min-h-48"
            >
              <div className="flex items-center">
                <feature.icon className="h-8 w-8 text-gray-500" />
                <svg viewBox="0 0 32 32" width={32} height={32} fill="none" aria-hidden="true" className="absolute -z-10 opacity-50">
                  <circle cx={16} cy={16} r={16} fill={colors.gray[200]} />
                </svg>
                <a href={feature.href} target="_blank" rel="noreferrer" className="flex items-start group">
                  <h3 className="ml-4 font-semibold text-gray-900 group-hover:text-complement-500">
                    {feature.name}
                  </h3>
                  <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-1 mt-1 fill-gray-400 group-hover:fill-complement-500" />
                </a>
              </div>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
