import clsx from 'clsx'
import { Container } from '@/components/base/Container'
import { Link } from '@/components/base/Link'


const LinkOut = ({ href, ariaLabel='external link', children }) => (
  <Link href={href} aria-label={ariaLabel} linkOut>
    {children}
  </Link>
)

const Citation = ({ href, className, children }) => {
  className = clsx('block whitespace-pre-wrap text-xs', className)

  return (
    <code className={className}>
      <a href={href} target="_blank" rel="noreferrer" className="no-underline hover:text-complement-500">
        {children}
      </a>
    </code>
  )
}

const faqs = [
  [
    {
      question: 'What are the main benefits of using Cytoscape Desktop?',
      answer: <>
        Cytoscape Desktop is a <strong>free</strong>, <strong>open-source</strong> comprehensive suite of software tools for network biology research, 
        encompassing data analysis, visualisation and sharing capabilities. 
        It is also <strong>extensible</strong>, enabling the user to customize their usage via <LinkOut href="https://apps.cytoscape.org/">apps</LinkOut> and services. 
        Cytoscape functionality is <strong>continuously improved</strong> and expanded as part of ongoing, active development.
      </>,
    },
    {
      question: 'How does Cytoscape Desktop support data sharing and collaboration?',
      answer: <>
        Cytoscape Desktop supports sharing of network data via the Network Data Exchange &#40;<LinkOut href="https://www.ndexbio.org/">NDEx</LinkOut>&#41; cloud storage, 
        enabling users to deposit their networks to NDEx as well as accessing and integrating other published networks. 
        Networks can also be shared directly using the portable <i>.cys</i> and <LinkOut href="https://cytoscape.org/cx/">CX2</LinkOut> &#40;JSON&#41; file formats, 
        or in the form of exported publication-quality figures.
      </>,
    },
  ],
  [
    {
      question: 'How is Cytoscape Desktop addressing the needs of bench biologists?',
      answer: <>
        Cytoscape Desktop serves bench biologists by streamlining <Link href="https://cytoscape-home.pages.dev/#genes">common analysis workflows</Link> in Cytoscape apps, 
        providing easy access to powerful analysis methods without the need for complex data processing or programmatic knowledge. 
        Cytoscape Desktop makes it easy to access and utilize pre-analysed data and networks via <LinkOut href="https://www.ndexbio.org/">NDEx</LinkOut>, 
        and provides comprehensive <LinkOut href="https://github.com/cytoscape/cytoscape-tutorials/wiki">training materials</LinkOut> tailored to bench biologists.
      </>,
    },
    {
      question: 'How is Cytoscape Desktop addressing the needs of computational biologists?',
      answer: <>
        Cytoscape Desktop provides programmatic access via the <LinkOut href="https://apps.cytoscape.org/apps/cyrest">cyREST API</LinkOut> and 
        the <LinkOut href="https://github.com/cytoscape/py4cytoscape">py4cytoscape</LinkOut> Python 
        and <LinkOut href="https://www.bioconductor.org/packages/release/bioc/html/RCy3.html">RCy3</LinkOut> R libraries, 
        making it easy to incorporate Cytoscape Desktop in programmatic workflows. 
        To support computational biologists, Cytoscape Desktop provides a comprehensive collection of 
        example <LinkOut href="https://github.com/cytoscape/cytoscape-automation/tree/master/for-scripters">scripts, notebooks and tutorials</LinkOut>.
      </>,
    },

    {
      question: 'How is Cytoscape Desktop addressing the needs of software developers?',
      answer: <>
        Cytoscape Desktop functionality can be expanded through the use of <LinkOut href="https://apps.cytoscape.org/">apps</LinkOut> to 
        accommodate specific data types, analysis, visualizations and connections to other tools. 
        Extensive <LinkOut href="https://github.com/cytoscape/cytoscape/wiki/Cytoscape-3.0-App-Development">documentation and guides</LinkOut> are 
        available to support software developers. 
        Most Cytoscape Desktop apps are open-source, and interested developers are encouraged 
        to <LinkOut href="https://cytoscape.org/documentation_developers.html">join our development community</LinkOut> as contributors. 
      </>,
    },
    {
      question: 'Should I use Cytoscape Desktop or Cytoscape Web?',
      answer: <>
        Choosing a Cytoscape tool depends on your individual analysis needs. 
        For example, If you are new to Cytoscape and want to use core Cytoscape functionality without having to install anything, 
        start with <LinkOut href="https://web.cytoscape.org/">Cytoscape Web</LinkOut>. 
        On the other hand, if you are working with large networks, or need access to specialized analysis methods, 
        or if you want to integrate Cytoscape in programmatic workflows, <LinkOut href="https://cytoscape.org/">Cytoscape Desktop</LinkOut> is the right choice. 
        The two applications also make it easy to switch between them seamlessly using built-in integration features 
        and the <LinkOut href="https://cytoscape.org/cx/">CX2</LinkOut> file format.
      </>,
    },
  ],
  [
    {
      question: 'How can I use the Cytoscape Desktop to create figures and support data for my paper?',
      answer: <>
        Starting with a network in <LinkOut href="https://cytoscape.org/">Cytoscape Desktop</LinkOut>, 
        you can customize its style and layout before exporting high-resolution, publication-ready images in multiple formats &#40;PNG, PDF etc&#41;. 
        You can also publish your network and analysis directly to the Network Data Exchange &#40;<LinkOut href="https://www.ndexbio.org/">NDEx</LinkOut>&#41;, 
        and request a DOI to include in your publications.
      </>,
    },
    {
      question: 'Can I save my work in the cloud?',
      answer: <>
        Yes. Cytoscape Desktop allows you to save your networks and analysis 
        directly to the Network Data Exchange &#40;<LinkOut href="https://www.ndexbio.org/">NDEx</LinkOut>&#41;, the primary cloud storage for Cytoscape.
      </>,
    },
    {
      question: 'How do I cite Cytoscape Desktop?',
      answer: <>
        Please cite the original Cytoscape paper when you use Cytoscape Desktop. This is critical to sustaining our federal funding.
        <Citation href="https://doi.org/10.1101/gr.1239303" className="my-2 pl-4">
          Shannon P, Markiel A, Ozier O, Baliga NS, Wang JT, Ramage D, Amin N, Schwikowski B, Ideker T. <i>Cytoscape: a software environment for integrated models of biomolecular interaction networks.</i> Genome Research. 2003 Nov; 13(11):2498-504.
        </Citation>
      </>,
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <a
              href="mailto:info@example.com"
              className="text-gray-900 underline"
            >
              reach out to us
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq) => (
                  <li key={faq.question}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <div className="mt-4 text-sm text-gray-600">{faq.answer}</div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
