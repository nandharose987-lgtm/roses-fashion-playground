/* Renders one of the hand-drawn SVG illustrations from content.js. */
export default function Raw({ html, className }) {
  return <span className={className} style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />;
}
