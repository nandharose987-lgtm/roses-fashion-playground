import photo from '../assets/rose-window.jpg';

const Tag = ({ label, children, r }) => (
  <div className="hangtag-border">
    <div className="hangtag" style={{ '--r': r }}><span className="mono">{label}</span><b>{children}</b></div>
  </div>
);

export default function ShopWindow() {
  return (
    <section className="facade" aria-label="Shop window">
      <div className="wrap facade-grid">
        <div className="side left">
          <Tag label="Based in" r="-4deg">Melbourne, Australia</Tag>
          <Tag label="Hours" r="3deg">Sunrise till late. Huge morning person.</Tag>
        </div>
        <figure className="window">
          <img src={photo} alt="Rose at a green front door in Melbourne, wearing a polka-dot top and a brown satin skirt" style={{ objectPosition: '50% 30%' }} />
        </figure>
        <div className="side right">
          <Tag label="Now studying" r="4deg">Master's in Fashion Entrepreneurship</Tag>
          <Tag label="Department" r="-3deg">All of them, one at a time</Tag>
        </div>
      </div>
    </section>
  );
}
