import PropTypes from 'prop-types'


export function Link({
  href,
  ariaLabel='link',
  darkBackground = false,
  linkOut = false,
  onClick,
  children
}) {
  const className = `cursor-pointer underline underline-offset-2
    ${darkBackground ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-complement-500'}`

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={linkOut ? "_blank" : "_self"}
      rel={linkOut ? "noreferrer" : undefined}
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  )
}
Link.propTypes = {
  href: PropTypes.string,
  ariaLabel: PropTypes.string,
  darkBackground: PropTypes.bool,
  linkOut: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}

export function LinkOut({
  href,
  ariaLabel='external link',
  darkBackground = false,
  children
}) {
  return (
    <Link href={href} aria-label={ariaLabel} darkBackground={darkBackground} linkOut>
      {children}
    </Link>
  )
}
LinkOut.propTypes = {
  href: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  darkBackground: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default Link