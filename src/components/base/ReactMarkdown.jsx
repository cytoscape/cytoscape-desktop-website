import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
/*
 * Other nice styles: coldarkCold, coy, coyWithoutShadows, ghcolors, oneLight, vs, vscDarkPlus
 * https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html
 */ 
import { oneLight as syntaxHighlightStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { colors } from '@/styles/tailwind'


const reactMarkdownComponents = {
  h2: ({node, ...props}) => <h2 style={{ fontSize: '1.25em', fontWeight: 'bold', marginBottom: '1rem' }} {...props} />,
  h3: ({node, ...props}) => <h3 style={{ fontSize: '1em', fontWeight: 'bold', marginBottom: '0.75rem' }} {...props} />,
  ol: ({node, ...props}) => <ol style={{ marginBottom: '1rem', listStyleType: 'decimal' }} {...props} />,
  ul: ({node, ...props}) => <ul style={{ marginBottom: '1rem', listStyleType: 'disc' }} {...props} />,
  li: ({node, ...props}) => <li style={{ marginLeft: '1.5rem' }} {...props} />,
  p: ({node, ...props}) => <p style={{ marginBottom: '1rem' }} {...props} />,
  a: ({node, ...props}) => <a style={{ color: colors.complement[500], textDecoration: 'underline' }} target="_blank" rel="noreferrer" {...props} />,
  hr: ({node, ...props}) => <hr style={{ border: `1px solid ${colors.gray[300]}`, margin: '2rem 0' }} {...props} />,
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        style={{ ...syntaxHighlightStyle }}
        customStyle={{ border: `1px solid ${colors.gray[200]}`, borderRadius: '0.5em', fontSize: '0.875em' }} 
        language={match[1]}
        PreTag="div"
        wrapLongLines={true}
        {...props}
      >
        {children}
      </SyntaxHighlighter>
    ) : (
      <code
        className={className}
        style={{
          backgroundColor: colors.gray[100],
          color: colors.gray[500],
          padding: '0.175rem 0.25rem',
          border: `1px solid ${colors.gray[200]}`,
          borderRadius: '0.25em'
        }}
        {...props}
      >
        {children}
      </code>
    )
  },
}

export default function CustomReactMarkdown({ children }) {
  return (
    <div>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={reactMarkdownComponents}
    >
      {children}
    </ReactMarkdown>
    </div>
  )
}
CustomReactMarkdown.propTypes = {
  children: PropTypes.node.isRequired,
}