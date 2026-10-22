/* All of the site's words, drawings and photos live here, so they're easy to edit. */
import business_1 from './assets/work/business-1.jpg';
import business_2 from './assets/work/business-2.jpg';
import business_3 from './assets/work/business-3.jpg';
import design_1 from './assets/work/design-1.jpg';
import design_2 from './assets/work/design-2.jpg';
import design_3 from './assets/work/design-3.jpg';
import makeup_1 from './assets/work/makeup-1.jpg';
import makeup_2 from './assets/work/makeup-2.jpg';
import makeup_3 from './assets/work/makeup-3.jpg';
import marketing_1 from './assets/work/marketing-1.jpg';
import marketing_2 from './assets/work/marketing-2.jpg';
import marketing_3 from './assets/work/marketing-3.jpg';
import photography_1 from './assets/work/photography-1.jpg';
import photography_2 from './assets/work/photography-2.jpg';
import photography_3 from './assets/work/photography-3.jpg';
import styling_1 from './assets/work/styling-1.jpg';
import styling_2 from './assets/work/styling-2.jpg';
import styling_3 from './assets/work/styling-3.jpg';

export const INK = '#3D2722', CHERRY = '#8E1825', BUTTER = '#FFEDAD', BLUE = '#C8D9EC', PAPER = '#FFFDF7';
const g = (inner) => `<svg viewBox="0 0 160 120" class="sketch" aria-hidden="true"><g fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;
export const ICONS = {
  camera: g(`<path d="M20 54 c-12 4 -12 30 0 36"/><rect x="26" y="38" width="110" height="66" rx="12" fill="${PAPER}"/><path d="M58 38 l8 -14 h30 l8 14" fill="${PAPER}"/><circle cx="81" cy="71" r="23" fill="${BLUE}"/><circle cx="81" cy="71" r="12" fill="${BUTTER}"/><rect x="112" y="46" width="14" height="8" rx="2" fill="${CHERRY}"/><path d="M36 30 h14"/>`),
  hanger: g(`<path d="M80 30 c0 -6 -10 -10 -10 -18 c0 -8 14 -10 16 -2"/><path d="M80 30 L26 56 h108 Z" fill="${PAPER}"/><path d="M64 56 c3 10 -8 18 -16 52 h64 c-8 -34 -19 -42 -16 -52" fill="${BLUE}"/><path d="M64 76 q16 7 32 0" stroke="${CHERRY}"/><path d="M118 66 l14 22 h-12 v10 h-6 v-10" fill="${BUTTER}"/>`),
  dressform: g(`<rect x="72" y="8" width="16" height="12" rx="4" fill="${BUTTER}"/><path d="M54 20 c17 8 35 8 52 0 c3 18 -6 28 -3 42 c2 12 10 20 10 30 H47 c0 -10 8 -18 10 -30 c3 -14 -6 -24 -3 -42 Z" fill="${BUTTER}"/><path d="M58 50 q22 9 44 0" stroke="${CHERRY}" stroke-dasharray="4 6"/><path d="M80 92 v18 M64 112 h32"/><path d="M124 104 l14 -62 l8 2 l-14 62 Z" fill="${CHERRY}"/><path d="M124 104 l1 8 l7 -6"/>`),
  chart: g(`<path d="M24 104 h116 M24 104 V18"/><rect x="38" y="78" width="16" height="26" fill="${BLUE}"/><rect x="64" y="64" width="16" height="40" fill="${BLUE}"/><rect x="90" y="52" width="16" height="52" fill="${BUTTER}"/><rect x="116" y="34" width="16" height="70" fill="${CHERRY}"/><path d="M36 64 L62 46 L86 52 L128 18 M114 18 h14 v14" stroke="${CHERRY}"/>`),
  megaphone: g(`<rect x="22" y="50" width="18" height="24" rx="4" fill="${BLUE}"/><path d="M40 52 L106 26 v72 L40 72 Z" fill="${BUTTER}"/><path d="M56 74 l6 24 h12 l-6 -20"/><path d="M118 46 q9 16 0 32 M130 36 q16 26 0 52" stroke="${CHERRY}"/>`),
  makeup: g(`<rect x="34" y="72" width="30" height="36" rx="3" fill="${PAPER}"/><rect x="38" y="54" width="22" height="18" fill="${BUTTER}"/><path d="M41 54 V30 l16 -10 V54 Z" fill="${CHERRY}"/><path d="M104 112 l3 -42 h8 l3 42 Z" fill="${BLUE}"/><rect x="104" y="56" width="14" height="14" fill="${BUTTER}"/><path d="M104 56 c-6 -14 0 -32 7 -40 c7 8 13 26 7 40 Z" fill="${PAPER}"/><path d="M78 30 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z M138 86 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" fill="${BUTTER}"/>`),
};

export const ROLES = [
  { t:'Photography', bg:'var(--cream)', fg:'var(--cherry)' },
  { t:'Styling', bg:'var(--cherry)', fg:'var(--butter)' },
  { t:'Fashion design', bg:'var(--butter)', fg:'var(--choc)' },
  { t:'Business', bg:'var(--choc)', fg:'var(--cream)' },
  { t:'Marketing', bg:'var(--cream)', fg:'var(--choc)' },
  { t:'Hair & makeup', bg:'var(--cherry)', fg:'var(--cream)' }
];

export const WORK = [
  { title:'Photography', icon:'camera', bg:'var(--cherry)', fg:'var(--butter)', tint:'var(--butter)', tags:['Shoots','Editorial','Concepts'],
    back:'Behind the camera: planning shoots, chasing good light and finding the frame that sells the look.', care:'Handle with a good eye',
    photos:[
      { src:photography_1, alt:'Two women in silk saris, one seated and one standing, against gold drapes' },
      { src:photography_2, alt:'A woman in a red tulle gown with a long rose-covered train on a misty hillside' },
      { src:photography_3, alt:'A dancer mid-leap in cobalt blue with a long blue fabric braid' }
    ] },
  { title:'Styling', icon:'hanger', bg:'var(--blue)', fg:'var(--choc)', tint:'var(--cream)', tags:['Looks','Wardrobe','Story'],
    back:'Pulling pieces, mixing textures and building a look that tells a story from head to toe.', care:'Mix freely, never match too hard',
    photos:[
      { src:styling_1, alt:'A model in a black blazer worn over a black saree, with lace gloves and a netted fascinator, seated at a chessboard' },
      { src:styling_2, alt:'Six models in sculpted black and white blazers, trousers and a satin skirt' },
      { src:styling_3, alt:'A model in a black pleated puff-sleeve top with long strands of pearls falling from her hair, holding a glass' }
    ] },
  { title:'Fashion design', icon:'dressform', bg:'var(--butter)', fg:'var(--choc)', tint:'var(--blue)', tags:['Sketching','Fabric','Silhouette'],
    back:'From a sketch to something you can wear: silhouettes, fabrics and the thrill of making a thing exist.', care:'Pin, sew, unpick, repeat',
    photos:[
      { src:design_1, alt:'A model in a sculpted lilac satin bodice and a white mermaid skirt with a beaded hem' },
      { src:design_2, alt:'A model in a navy dress with layered, beaded wave-shaped panels' },
      { src:design_3, alt:'Close-up of a cream corset with coral tie-dye and a beaded sweetheart neckline' }
    ] },
  { title:'Business', icon:'chart', bg:'var(--choc)', fg:'var(--cream)', tint:'var(--butter)', tags:['Planning','Costing','Strategy'],
    back:'I built my own label, Roz Dominic, back in India, and learned the business side by doing it.', care:'Raised on it at the dinner table',
    photos:[
      { src:business_1, alt:'A camera screen on a tripod showing a woman in white seated beside a laptop' },
      { src:business_2, alt:'A beaded, sculpted blush satin bodice on a dress form in a workroom, with pattern pieces hanging behind' },
      { src:business_3, alt:'A boutique wall with a Roz Dominic sign, arched displays and garments on hangers' }
    ] },
  { title:'Marketing', icon:'megaphone', bg:'var(--cherry)', fg:'var(--cream)', tint:'var(--blue)', tags:['Content','Campaigns','Brand'],
    back:'Building the Roz Dominic brand, from the logo and business cards to the packaging.', care:'Best served loud',
    photos:[
      { src:marketing_1, alt:'A deep burgundy business card with a gold moth logo and the Roz Dominic wordmark' },
      { src:marketing_2, alt:'A dark burgundy Roz Dominic shopping bag with black ribbon handles and gold lettering' },
      { src:marketing_3, alt:'A burgundy Roz Dominic gift box tied with a black ribbon printed with the logo' }
    ] },
  { title:'Hair & makeup', icon:'makeup', bg:'var(--blue)', fg:'var(--cherry)', tint:'var(--butter)', tags:['MUA','Hair','Finishing'],
    back:'I worked as a makeup artist: faces, hair and the finishing touches that pull a whole look together.', care:'Blend until it disappears',
    photos:[
      { src:makeup_1, alt:'A model in an embroidered ivory lehenga with soft glam makeup and loose waves, a sheer veil flying behind her' },
      { src:makeup_2, alt:'A model in a gold saree with a red lip and side-swept hair against red velvet drapes' },
      { src:makeup_3, alt:'A model in a cream and green silk saree with a curly updo and pink flowers in her hair, standing in a doorway' }
    ] }
];

export const STOPS = [
  { key:'walk', label:'sunrise walks', time:'Sunrise', title:'Morning walks', x:90, y:450, lx:90, ly:500, anchor:'middle',
    text:'I’m a huge morning person. A walk while the city is still quiet sets up my whole day.' },
  { key:'gym', label:'the gym', time:'Morning', title:'The gym', x:360, y:210, lx:360, ly:176, anchor:'middle',
    text:'Lifting, sweating, resetting. The gym keeps me strong and clears my head before the day gets busy.' },
  { key:'kitchen', label:'my kitchen', time:'Evening', title:'My kitchen', x:640, y:380, lx:614, ly:372, anchor:'end',
    text:'Cooking is my other creative outlet. I love testing new recipes, and not every experiment makes it to the table.' },
  { key:'travel', label:'somewhere new', time:'Every chance I get', title:'Somewhere new', x:910, y:150, lx:910, ly:116, anchor:'middle',
    text:'New places, new food, new people. Travelling is the biggest dose of “new” I know.' }
];

/* The big idea: possible drops (160x150 drawings) */
const TEE = 'M52 16 Q80 30 108 16 L140 32 L154 64 L128 74 L122 60 L122 140 Q80 146 38 140 L38 60 L32 74 L6 64 L20 32 Z';
const COLLAR = '<path d="M52 16 Q80 40 108 16"/>';
const dg = (inner) => `<svg viewBox="0 0 160 150" class="sketch" aria-hidden="true"><g fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;
export const DROPS = [
  { t:'Reversible', d:'Inside out is a whole new look. Two prints, one tee.', tint:'var(--blue)', r:'-1deg',
    art:dg(`<g transform="translate(-6 6) scale(.78)"><path d="${TEE}" fill="${BUTTER}"/>${COLLAR}</g><g transform="translate(40 14) scale(.78)"><path d="${TEE}" fill="${CHERRY}"/>${COLLAR}</g><path d="M60 8 q20 -10 40 2 M94 2 l6 8 l-10 2" stroke="${CHERRY}"/>`) },
  { t:'Swap the sleeves', d:'Short today, puffed or striped tomorrow.', tint:'var(--butter)', r:'.8deg',
    art:dg(`<path d="M52 16 Q80 30 108 16 L122 32 L122 140 Q80 146 38 140 L38 60 L32 74 L6 64 L20 32 Z" fill="${PAPER}"/>${COLLAR}<path d="M122 32 V62" stroke="${CHERRY}" stroke-dasharray="4 5"/><path d="M134 36 L152 44 L160 70 L140 78 Z" fill="${BLUE}"/><path d="M138 50 l14 6 M136 62 l18 6" stroke="${PAPER}" stroke-width="2.4"/>`) },
  { t:'Stitch it yourself', d:'An outline printed on, a guide in the box, and a needle to finish it.', tint:'var(--cream)', r:'-.6deg',
    art:dg(`<path d="${TEE}" fill="${PAPER}"/>${COLLAR}<g stroke="${CHERRY}" stroke-width="2.2" stroke-dasharray="3 4"><path d="M80 70 c-14 -18 -30 -4 -18 10 c-16 6 -6 24 8 16 c0 16 20 16 20 0 c14 8 24 -10 8 -16 c12 -14 -4 -28 -18 -10 Z"/></g><circle cx="80" cy="84" r="5" fill="${BUTTER}" stroke-width="2"/><path d="M118 112 l26 -40" /><path d="M118 112 c-10 10 -24 6 -30 -6" stroke="${CHERRY}" stroke-width="2"/>`) },
  { t:'Flip patch', d:'One patch, two sides. Flip it to match the mood.', tint:'var(--blue)', r:'.6deg',
    art:dg(`<path d="${TEE}" fill="${PAPER}"/>${COLLAR}<rect x="62" y="62" width="36" height="30" rx="4" fill="${BUTTER}"/><path d="M62 77 h36 v11 a4 4 0 0 1 -4 4 h-28 a4 4 0 0 1 -4 -4 Z" fill="${CHERRY}"/><path d="M104 66 q14 8 2 22 M100 84 l6 4 l2 -8" stroke="${CHERRY}" stroke-width="2.4"/>`) },
  { t:'Two-tone', d:'Two colours that work together or apart, styled however she likes.', tint:'var(--butter)', r:'-.8deg',
    art:dg(`<clipPath id="tt-l"><rect x="0" y="0" width="80" height="150"/></clipPath><clipPath id="tt-r"><rect x="80" y="0" width="80" height="150"/></clipPath><path d="${TEE}" fill="${BLUE}" stroke="none" clip-path="url(#tt-l)"/><path d="${TEE}" fill="${CHERRY}" stroke="none" clip-path="url(#tt-r)"/><path d="${TEE}"/>${COLLAR}<path d="M80 28 V144" stroke-dasharray="4 5"/>`) },
  { t:'Drop ???', d:'Who knows yet. That\u2019s the point. Every drop is a surprise.', tint:'var(--cream)', r:'1deg',
    art:dg(`<path d="${TEE}" fill="${PAPER}" stroke-dasharray="7 7"/>${COLLAR}<text x="80" y="112" text-anchor="middle" font-family="Oswald, sans-serif" font-weight="700" font-size="58" fill="${CHERRY}" stroke="none">?</text>`) }
];

export const WHY = [
  { t:'Kids want to make, not just own', d:'The swap-a-strap watch and Kinder Joy prove it: the fun is in building something yourself.' },
  { t:'A gift parents feel good about', d:'A birthday present and an afternoon of making, in one box.' },
  { t:'Sleepovers are a big deal here', d:'A ready-made group activity. Every sleepover shows the brand to a whole group of friends.' },
  { t:'One piece, many lives', d:'Flip it, swap it, stitch it, restyle it, so it gets worn for longer instead of thrown out.' },
  { t:'Waste becomes something new', d:'Kit pieces made from fabric offcuts give the brand a real sustainability story.' },
  { t:'Drops keep it fresh', d:'Something new every drop gives families a reason to come back and see what\u2019s next.' }
];

