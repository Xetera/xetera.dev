export default function ExternalLink({ children, ...rest }) {
  return (
    <a rel="external noopener noreferrer" target="_blank" {...rest}>
      {children}
    </a>
  );
}
