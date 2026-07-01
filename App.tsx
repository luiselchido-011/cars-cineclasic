import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ───────────────────────────────────────────────

interface Bioma {
  id: number;
  nombre: string;
  clima: string;
  climaTag: string;
  temp: string;
  especie: string;
  descripcion: string;
  imagen: string;
}

const biomas: Bioma[] = [
  {
    id: 1, nombre: 'Selva Tropical', clima: 'calido', climaTag: 'Cálido / Húmedo',
    temp: '20°C - 30°C', especie: 'Jaguar',
    descripcion: 'El bioma con mayor biodiversidad del planeta. Hogar del 50% de las especies terrestres. Lluvias constantes y exuberante vegetación por todos los estratos.',
    imagen: '/images/bioma-selva.jpg'
  },
  {
    id: 2, nombre: 'Tundra Ártica', clima: 'frio', climaTag: 'Frío / Árido',
    temp: '-40°C - 10°C', especie: 'Oso Polar',
    descripcion: 'Llanuras polares sin árboles, permafrost permanente. La vida en su forma más resistente, donde solo las especies más adaptadas sobreviven.',
    imagen: '/images/bioma-tundra.jpg'
  },
  {
    id: 3, nombre: 'Desierto Árido', clima: 'seco', climaTag: 'Cálido / Seco',
    temp: '30°C - 50°C', especie: 'Camello',
    descripcion: 'Regiones con precipitaciones casi nulas. Adaptaciones extremas para la supervivencia en uno de los ambientes más hostiles del planeta.',
    imagen: '/images/bioma-desierto.jpg'
  },
  {
    id: 4, nombre: 'Taiga Boreal', clima: 'frio', climaTag: 'Frío / Húmedo',
    temp: '-5°C - 5°C', especie: 'Lince',
    descripcion: 'El bosque más grande del planeta. Cinturón de coníferas que abraza el hemisferio norte, sumergido en silencio y nieve durante meses.',
    imagen: '/images/bioma-taiga.jpg'
  },
  {
    id: 5, nombre: 'Sabana Africana', clima: 'calido', climaTag: 'Cálido / Seco',
    temp: '20°C - 30°C', especie: 'León',
    descripcion: 'Mares de hierba interrumpidos por acacias. Hogar de las grandes migraciones y de los depredadores más emblemáticos de la Tierra.',
    imagen: '/images/bioma-sabana.jpg'
  },
  {
    id: 6, nombre: 'Bosque Templado', clima: 'templado', climaTag: 'Templado / Húmedo',
    temp: '10°C - 20°C', especie: 'Ciervo',
    descripcion: 'Bosques de hoja caduca donde las estaciones marcan el ritmo de la vida. Un ciclo eterno de renacimiento en cada primavera.',
    imagen: '/images/bioma-bosque-templado.jpg'
  },
  {
    id: 7, nombre: 'Matorral Mediterráneo', clima: 'templado', climaTag: 'Templado / Seco',
    temp: '15°C - 25°C', especie: 'Lince Ibérico',
    descripcion: 'Ecosistemas de inviernos suaves y veranos secos. Biodiversidad concentrada en pequeñas extensiones, fragilidad y belleza entrelazadas.',
    imagen: '/images/bioma-matorral.jpg'
  },
  {
    id: 8, nombre: 'Pradera de Altura', clima: 'templado', climaTag: 'Templado / Seco',
    temp: '0°C - 15°C', especie: 'Bisonte',
    descripcion: 'Océanos de pasto donde el viento y el fuego esculpen el paisaje. Un mar verde que se extiende hasta donde alcanza la vista.',
    imagen: '/images/bioma-pradera.jpg'
  },
  {
    id: 9, nombre: 'Páramo Andino', clima: 'frio', climaTag: 'Frío / Húmedo',
    temp: '0°C - 10°C', especie: 'Oso de Anteojos',
    descripcion: 'Ecosistema de alta montaña tropical. Esponja natural de agua dulce que alimenta ríos para millones de personas.',
    imagen: '/images/bioma-paramo.jpg'
  },
  {
    id: 10, nombre: 'Manglar Costero', clima: 'calido', climaTag: 'Cálido / Húmedo',
    temp: '20°C - 30°C', especie: 'Cocodrilo',
    descripcion: 'Guardianes de las costas. Raíces que sostienen la vida marina y terrestre, protegiendo el litoral de huracanes y maremotos.',
    imagen: '/images/bioma-manglar.jpg'
  },
  {
    id: 11, nombre: 'Chaparral Californiano', clima: 'templado', climaTag: 'Templado / Seco',
    temp: '15°C - 25°C', especie: 'Puma',
    descripcion: 'Matorral denso adaptado al fuego. Resiliencia en cada hoja, renaciendo de sus cenizas una y otra vez.',
    imagen: '/images/bioma-chaparral.jpg'
  },
  {
    id: 12, nombre: 'Estepa Asiática', clima: 'frio', climaTag: 'Frío / Seco',
    temp: '-10°C - 20°C', especie: 'Caballo de Przewalski',
    descripcion: 'Llanuras sin fin donde el cielo se funde con la hierba. Libertad en su forma más pura bajo un horizonte infinito.',
    imagen: '/images/bioma-estepa.jpg'
  },
];

const glosario = [
  { termino: 'Bioma', definicion: 'Gran comunidad ecológica caracterizada por tipos de vegetación, fauna y clima predominantes que ocupan extensas regiones del planeta.' },
  { termino: 'Biodiversidad', definicion: 'Variedad de vida en el planeta, medida como la diversidad de especies, genes y ecosistemas en un área determinada.' },
  { termino: 'Permafrost', definicion: 'Capa de suelo que permanece congelada durante al menos dos años consecutivos, típica de la tundra ártica y subártica.' },
  { termino: 'Estrato', definicion: 'Cada uno de los niveles verticales en un bosque: dosel, subdose, sotobosque y estrato herbáceo.' },
  { termino: 'Migración', definicion: 'Desplazamiento estacional de especies en busca de recursos alimenticios, climas favorables o zonas de reproducción.' },
  { termino: 'Endemismo', definicion: 'Condición de una especie que es exclusiva de una región geográfica determinada y no se encuentra en ningún otro lugar del mundo.' },
  { termino: 'Fotosíntesis', definicion: 'Proceso mediante el cual los organismos con clorofila convierten la luz solar en energía química para su crecimiento.' },
  { termino: 'Cadena trófica', definicion: 'Secuencia lineal de organismos donde cada uno se alimenta del anterior, transferiendo energía a través de los niveles.' },
];

const estadisticas = [
  { valor: 8700000, sufijo: '', etiqueta: 'Especies Estimadas', prefix: '' },
  { valor: 14, sufijo: '', etiqueta: 'Biomas Terrestres', prefix: '' },
  { valor: 31, sufijo: '%', etiqueta: 'Superficie Forestal', prefix: '' },
  { valor: 50, sufijo: '%', etiqueta: 'Especies en Selvas', prefix: '' },
];

const fauna = [
  { nombre: 'Jaguar', bioma: 'Selva Tropical', emoji: '🐆' },
  { nombre: 'Oso Polar', bioma: 'Tundra Ártica', emoji: '🐻‍❄️' },
  { nombre: 'León', bioma: 'Sabana Africana', emoji: '🦁' },
  { nombre: 'Águila Real', bioma: 'Bosque Templado', emoji: '🦅' },
  { nombre: 'Camello', bioma: 'Desierto Árido', emoji: '🐪' },
  { nombre: 'Oso de Anteojos', bioma: 'Páramo Andino', emoji: '🐻' },
  { nombre: 'Cocodrilo', bioma: 'Manglar Costero', emoji: '🐊' },
  { nombre: 'Lince', bioma: 'Taiga Boreal', emoji: '🐱' },
];

// ─── Component ──────────────────────────────────────────

export default function App() {
  const [filtro, setFiltro] = useState<string>('todos');
  const [expandedGloss, setExpandedGloss] = useState<number | null>(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [heroTyped, setHeroTyped] = useState(false);
  const [showArrow, setShowArrow] = useState(true);

  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const showcaseRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const glossRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLElement>(null);
  const faunaRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glossRefs = useRef<(HTMLDivElement | null)[]>([]);
  const faunaCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const heroTitle = 'Enciclopedia Global de los Biomas';

  // ── Scroll listener ──
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
      if (window.scrollY > 100) setShowArrow(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Typing effect ──
  useEffect(() => {
    if (!heroTitleRef.current) return;
    const el = heroTitleRef.current;
    el.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < heroTitle.length) {
        el.textContent += heroTitle.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        setHeroTyped(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // ── Subtitle fade in ──
  useEffect(() => {
    if (heroTyped && heroSubtitleRef.current) {
      gsap.to(heroSubtitleRef.current, { opacity: 1, duration: 1, ease: 'power2.out' });
    }
  }, [heroTyped]);

  // ── Showcase cards stagger animation ──
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;
    gsap.set(cards, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: showcaseRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          stagger: 0.1,
        });
      },
    });
  }, [filtro]);

  // ── Counters animation ──
  useEffect(() => {
    const counters = counterRefs.current.filter(Boolean);
    if (!counters.length) return;
    counters.forEach((el) => { if (el) el.textContent = '0'; });

    ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        estadisticas.forEach((stat, i) => {
          const el = counterRefs.current[i];
          if (!el) return;
          gsap.to({ val: 0 }, {
            val: stat.valor,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              const v = Math.floor(this.targets()[0].val);
              if (v >= 1000000) {
                el.textContent = (v / 1000000).toFixed(1) + 'M' + stat.sufijo;
              } else {
                el.textContent = stat.prefix + v + stat.sufijo;
              }
            },
          });
        });
      },
    });
  }, []);

  // ── Glossary slide-in ──
  useEffect(() => {
    const items = glossRefs.current.filter(Boolean);
    if (!items.length) return;
    gsap.set(items, { opacity: 0, x: -20 });
    ScrollTrigger.create({
      trigger: glossRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1, x: 0, duration: 0.5, ease: 'power2.out',
          stagger: 0.08,
        });
      },
    });
  }, []);

  // ── Fauna cards ──
  useEffect(() => {
    const cards = faunaCardRefs.current.filter(Boolean);
    if (!cards.length) return;
    gsap.set(cards, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: faunaRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          stagger: 0.1,
        });
      },
    });
  }, []);

  // ── Filter handler ──
  const biomasFiltrados = filtro === 'todos'
    ? biomas
    : biomas.filter((b) => b.clima === filtro);

  const filtros = ['todos', 'calido', 'frio', 'seco', 'templado'];
  const filtrosLabels: Record<string, string> = {
    todos: 'Todos', calido: 'Cálido', frio: 'Frío', seco: 'Seco', templado: 'Templado'
  };

  const tagColors: Record<string, string> = {
    calido: 'bg-[#c8963e] text-[#0d1a12]',
    frio: 'bg-[#7aafc7] text-[#0d1a12]',
    seco: 'bg-[#c8a868] text-[#0d1a12]',
    templado: 'bg-[#4a7c59] text-[#f5f7f2]',
  };

  const setCardRef = useCallback((el: HTMLDivElement | null, idx: number) => {
    cardRefs.current[idx] = el;
  }, []);

  const mapColors: Record<string, string> = {
    selva: '#2d6a4f',
    tundra: '#a8c8e1',
    desierto: '#d4a373',
    taiga: '#588157',
    sabana: '#e9c46a',
    bosque: '#7cb062',
    matorral: '#bc6c25',
    pradera: '#a7c957',
    paramo: '#6b8f71',
    manglar: '#386641',
    chaparral: '#dda15e',
    estepa: '#b08968',
  };

  return (
    <div className="min-h-screen bg-forest-main">
      {/* ═══════ NAVIGATION ═══════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navScrolled ? 'bg-[rgba(13,26,18,0.85)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 md:px-10 lg:px-16">
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-2xl">🌿</span>
            <span className="font-display text-xl md:text-2xl font-semibold text-bioma-warm tracking-wide">
              BioWiki
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <div className="w-px h-5 bg-forest-jade/60" />
            {['Biomas', 'Glosario', 'Distribución', 'Fauna'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-display text-xs uppercase tracking-[2px] text-amber-accent hover:text-bioma-warm transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(30,58,41,0.6)] to-[rgba(13,26,18,0.85)]" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="label-tag mb-6">Ecosistemas Terrestres</div>
          <h1
            ref={heroTitleRef}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-bioma-warm leading-tight text-shadow-hero min-h-[1.2em]"
          />
          <p
            ref={heroSubtitleRef}
            className="mt-6 font-body text-base md:text-lg text-bioma-warm/80 max-w-2xl mx-auto leading-relaxed opacity-0"
          >
            Explora las grandes comunidades ecológicas del planeta, su clima, flora y fauna.
          </p>
        </div>
        {showArrow && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f7f2" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        )}
      </section>

      {/* ═══════ BIOMES SHOWCASE ═══════ */}
      <section id="biomas" ref={showcaseRef} className="bg-forest-dark py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="label-tag mb-6">Biodiversidad Global</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-bioma-light mb-4">
            Los Ecosistemas que Sostienen la Vida
          </h2>
          <p className="font-body text-base md:text-lg text-bioma-medium max-w-3xl mb-10">
            Descubre las características únicas de cada bioma, desde los hielos perpetuos de la tundra hasta las copas de los árboles en la selva tropical.
          </p>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-3 mb-14">
            {filtros.map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-5 py-2 rounded-full border font-body text-sm transition-all duration-300 ${
                  filtro === f
                    ? 'bg-forest-jade text-bioma-warm border-forest-jade'
                    : 'border-forest-jade/60 text-bioma-medium hover:border-forest-jade hover:text-bioma-light'
                }`}
              >
                {filtrosLabels[f]}
              </button>
            ))}
          </div>

          {/* Biome cards */}
          <div className="space-y-16">
            {biomasFiltrados.map((bioma, idx) => (
              <div
                key={bioma.id}
                ref={(el) => setCardRef(el, idx)}
                className={`flex flex-col ${
                  idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 lg:gap-12 items-center`}
              >
                <div className="w-full lg:w-1/2 overflow-hidden rounded">
                  <img
                    src={bioma.imagen}
                    alt={bioma.nombre}
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-body font-medium mb-4 ${tagColors[bioma.clima]}`}>
                    {bioma.climaTag}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-bioma-light mb-3">
                    {bioma.nombre}
                  </h3>
                  <p className="font-body text-sm md:text-base text-bioma-medium leading-relaxed mb-5">
                    {bioma.descripcion}
                  </p>
                  <div className="flex flex-wrap gap-6 mb-5">
                    <div className="flex items-center gap-2 text-bioma-medium text-sm">
                      <span>🌡️</span>
                      <span className="font-body">{bioma.temp}</span>
                    </div>
                    <div className="flex items-center gap-2 text-bioma-medium text-sm">
                      <span>🐾</span>
                      <span className="font-body">{bioma.especie}</span>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="inline-block font-display text-sm text-amber-accent hover:underline underline-offset-4 transition-all"
                  >
                    Leer ficha completa →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ STATISTICS ═══════ */}
      <section ref={statsRef} className="bg-forest-dark py-24 md:py-32 px-6 md:px-10 border-t border-green-subtle">
        <div className="max-w-6xl mx-auto text-center">
          <div className="label-tag mb-6 justify-center !before:hidden">Datos del Planeta</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-bioma-light mb-14">
            La Tierra en Cifras
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {estadisticas.map((stat, i) => (
              <div key={i} className="text-center">
                <span
                  ref={(el) => { counterRefs.current[i] = el; }}
                  className="font-display text-5xl md:text-6xl font-semibold text-amber-accent block mb-2"
                >
                  0
                </span>
                <span className="font-body text-xs uppercase tracking-wider text-bioma-medium">
                  {stat.etiqueta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ GLOSSARY ═══════ */}
      <section id="glosario" ref={glossRef} className="bg-forest-main py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="label-tag mb-6">Aprendizaje</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-bioma-light mb-12">
            Glosario de Ecología
          </h2>
          <div className="space-y-0">
            {glosario.map((item, i) => (
              <div
                key={i}
                ref={(el) => { glossRefs.current[i] = el; }}
                className="border-b border-green-subtle"
              >
                <button
                  onClick={() => setExpandedGloss(expandedGloss === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="font-display text-lg md:text-xl text-bioma-light group-hover:text-amber-accent transition-colors">
                    {item.termino}
                  </span>
                  <span
                    className={`text-amber-accent text-xl transition-transform duration-300 ${
                      expandedGloss === i ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedGloss === i ? 'max-h-40 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="font-body text-sm md:text-base text-bioma-medium leading-relaxed pl-1">
                    {item.definicion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MAP ═══════ */}
      <section id="distribución" ref={mapRef} className="bg-forest-dark py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="label-tag mb-6">Geografía</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-bioma-light mb-4">
            Distribución Global de Biomas
          </h2>
          <p className="font-body text-base md:text-lg text-bioma-medium max-w-3xl mb-12">
            Cada bioma ocupa una franja específica de nuestro planeta, determinada por la latitud, la altitud y las corrientes oceánicas.
          </p>

          {/* Simplified world map SVG */}
          <div className="w-full overflow-x-auto">
            <svg viewBox="0 0 1000 500" className="w-full max-w-5xl mx-auto" style={{ minWidth: '600px' }}>
              {/* Ocean background */}
              <rect width="1000" height="500" fill="#162d1f" rx="4" />

              {/* Simplified continents with biome zones */}
              {/* North America */}
              <path d="M120 60 L280 50 L320 120 L260 200 L180 180 L100 130 Z" fill={mapColors.tundra} opacity="0.9" />
              <path d="M120 130 L180 180 L260 200 L240 260 L150 240 L100 180 Z" fill={mapColors.taiga} opacity="0.9" />
              <path d="M150 240 L240 260 L230 320 L140 300 Z" fill={mapColors.bosque} opacity="0.9" />
              <path d="M140 300 L230 320 L200 360 L130 340 Z" fill={mapColors.pradera} opacity="0.9" />
              <path d="M130 340 L200 360 L180 400 L140 380 Z" fill={mapColors.chaparral} opacity="0.9" />
              <path d="M100 180 L150 240 L140 300 L80 250 Z" fill={mapColors.bosque} opacity="0.9" />

              {/* South America */}
              <path d="M240 260 L310 250 L340 320 L300 420 L250 400 L230 320 Z" fill={mapColors.selva} opacity="0.9" />
              <path d="M250 400 L300 420 L290 480 L260 460 Z" fill={mapColors.bosque} opacity="0.9" />
              <path d="M300 420 L340 320 L350 380 L320 450 Z" fill={mapColors.sabana} opacity="0.9" />
              <path d="M250 400 L260 460 L230 460 L240 420 Z" fill={mapColors.matorral} opacity="0.9" />

              {/* Europe */}
              <path d="M460 80 L560 70 L580 130 L500 150 L450 130 Z" fill={mapColors.tundra} opacity="0.9" />
              <path d="M450 130 L500 150 L520 200 L460 190 L430 160 Z" fill={mapColors.bosque} opacity="0.9" />
              <path d="M460 190 L520 200 L510 250 L470 240 Z" fill={mapColors.matorral} opacity="0.9" />
              <path d="M430 160 L460 190 L470 240 L430 220 Z" fill={mapColors.bosque} opacity="0.9" />

              {/* Africa */}
              <path d="M470 240 L560 230 L600 320 L540 420 L480 380 L460 300 Z" fill={mapColors.desierto} opacity="0.9" />
              <path d="M480 380 L540 420 L520 480 L470 450 Z" fill={mapColors.sabana} opacity="0.9" />
              <path d="M520 420 L580 380 L560 450 L520 480 Z" fill={mapColors.sabana} opacity="0.9" />
              <path d="M540 320 L600 320 L620 380 L580 400 Z" fill={mapColors.sabana} opacity="0.9" />
              <path d="M500 280 L560 230 L540 320 L500 300 Z" fill={mapColors.desierto} opacity="0.9" />

              {/* Asia */}
              <path d="M580 70 L780 60 L820 140 L700 180 L580 130 Z" fill={mapColors.tundra} opacity="0.9" />
              <path d="M580 130 L700 180 L720 260 L600 240 L560 230 Z" fill={mapColors.taiga} opacity="0.9" />
              <path d="M560 230 L600 240 L620 320 L540 320 L520 260 Z" fill={mapColors.estepa} opacity="0.9" />
              <path d="M600 240 L720 260 L700 340 L620 320 Z" fill={mapColors.estepa} opacity="0.9" />
              <path d="M700 180 L820 140 L850 240 L780 280 L720 260 Z" fill={mapColors.bosque} opacity="0.9" />
              <path d="M720 260 L780 280 L760 360 L700 340 Z" fill={mapColors.estepa} opacity="0.9" />
              <path d="M700 340 L760 360 L740 420 L680 400 Z" fill={mapColors.selva} opacity="0.9" />
              <path d="M760 360 L850 320 L880 400 L780 420 Z" fill={mapColors.selva} opacity="0.9" />
              <path d="M780 280 L850 240 L860 320 L800 340 Z" fill={mapColors.bosque} opacity="0.9" />

              {/* Southeast Asia islands */}
              <circle cx="780" cy="420" r="20" fill={mapColors.selva} opacity="0.9" />
              <circle cx="820" cy="400" r="15" fill={mapColors.selva} opacity="0.9" />
              <circle cx="860" cy="440" r="25" fill={mapColors.selva} opacity="0.9" />

              {/* Australia */}
              <path d="M780 380 L900 370 L920 460 L820 480 L760 440 Z" fill={mapColors.desierto} opacity="0.9" />
              <ellipse cx="850" cy="400" rx="40" ry="30" fill={mapColors.desierto} opacity="0.9" />
              <path d="M820 440 L880 430 L860 470 L800 460 Z" fill={mapColors.matorral} opacity="0.9" />

              {/* Greenland */}
              <ellipse cx="360" cy="60" rx="60" ry="30" fill={mapColors.tundra} opacity="0.9" />

              {/* Grid lines */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#4a7c59" strokeWidth="0.5" opacity="0.3" />
              <line x1="500" y1="0" x2="500" y2="500" stroke="#4a7c59" strokeWidth="0.5" opacity="0.3" />

              {/* Equator label */}
              <text x="510" y="245" fill="#a8c896" fontSize="10" fontFamily="Inter">Ecuador</text>
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {Object.entries(mapColors).map(([key, color]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
                <span className="font-body text-xs text-bioma-medium capitalize">{key}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FAUNA ═══════ */}
      <section id="fauna" ref={faunaRef} className="bg-forest-main py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="label-tag mb-6">Reino Animal</div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-bioma-light mb-14">
            Especies Emblemáticas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fauna.map((animal, i) => (
              <div
                key={i}
                ref={(el) => { faunaCardRefs.current[i] = el; }}
                className="bg-forest-dark rounded-lg p-6 text-center hover:shadow-lg hover:shadow-forest-jade/10 transition-shadow duration-300"
              >
                <div className="text-5xl mb-4">{animal.emoji}</div>
                <h4 className="font-display text-lg font-semibold text-bioma-light mb-1">
                  {animal.nombre}
                </h4>
                <p className="font-body text-xs text-amber-accent mb-2">{animal.bioma}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="bg-forest-dark border-t border-green-subtle py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🌿</span>
                <span className="font-display text-xl font-semibold text-bioma-light">BioWiki</span>
              </div>
              <p className="font-body text-sm text-bioma-medium leading-relaxed">
                Enciclopedia visual de los ecosistemas terrestres del planeta. Un viaje por la biodiversidad de la Tierra.
              </p>
            </div>
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider text-bioma-light mb-4">Enlaces</h4>
              <div className="space-y-2">
                {['Biomas', 'Glosario', 'Distribución', 'Fauna'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block font-body text-sm text-bioma-medium hover:text-amber-accent transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider text-bioma-light mb-4">Créditos</h4>
              <p className="font-body text-xs text-bioma-medium leading-relaxed">
                Datos científicos: WWF, National Geographic, NASA Earth Observatory.
                Proyecto educativo sin fines de lucro.
              </p>
            </div>
          </div>
          <div className="border-t border-green-subtle pt-6 text-center">
            <p className="font-body text-xs text-bioma-medium">
              © 2026 BioWiki — Proyecto Educativo de Naturaleza
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
