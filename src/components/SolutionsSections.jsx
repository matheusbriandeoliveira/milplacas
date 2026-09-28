import './SolutionsSections.css'
import BlurText from './BlurText.jsx'

const services = [
  {
    id: 'fachadas-em-acm',
    title: 'Fachadas em ACM',
    description: 'Sistema de revestimento feito com painéis de alumínio composto, utilizado para acabamento e proteção de fachadas.',
    image: '/images/solutions/s1.png',
  },
  {
    id: 'pele-de-vidro',
    title: 'Pele de Vidro / Glazing',
    description: 'Sistema de fachada em que grandes painéis de vidro formam a parte externa da edificação, criando um acabamento contínuo e moderno.',
    image: '/images/solutions/s2.png',
  },
  {
    id: 'esquadrias-de-aluminio',
    title: 'Esquadrias de Alumínio',
    description: 'Estruturas de alumínio utilizadas na fabricação de portas, janelas, fechamentos e outros sistemas de abertura.',
    image: '/images/solutions/s3.png',
  },
  {
    id: 'comunicacao-visual',
    title: 'Comunicação Visual',
    description: 'Conjunto de elementos utilizados para identificar, sinalizar ou apresentar visualmente uma empresa, ambiente ou empreendimento.',
    image: '/images/solutions/s4.png',
  },
  {
    id: 'homenagens-corporativas',
    title: 'Homenagens Corporativas',
    description: 'Peças personalizadas, como placas, troféus e medalhas, produzidas para reconhecer pessoas, empresas, conquistas ou momentos especiais.',
    image: '/images/solutions/s5.png',
  },
]

export default function SolutionsSections({ items = services, title, titleHighlight }) {
  return (
    <section className="solutions-sections" aria-label={title || 'Soluções da Milplacas'}>
      {title && <h2 className="solutions-sections__title">
        {titleHighlight && title.endsWith(titleHighlight)
          ? <><BlurText text={title.slice(0, -titleHighlight.length).trim()} />{' '}<span className="solutions-sections__highlight"><BlurText text={titleHighlight} /></span></>
          : <BlurText text={title} />}
      </h2>}
      {items.map((service, index) => (
        <article className="solution-block" id={service.id} key={service.id} aria-labelledby={`${service.id}-title`}>
          <div className="solution-block__info">
            <span className="solution-block__index" aria-hidden="true">0{index + 1} / SOLUÇÕES</span>
            {title ? <h3 id={`${service.id}-title`}><BlurText text={service.title} /></h3> : <h2 id={`${service.id}-title`}><BlurText text={service.title} /></h2>}
            <p><BlurText text={service.description} delay={20} /></p>
          </div>
          <div className="solution-block__image">
            <img src={service.image} alt={service.title} loading="lazy" decoding="async" />
            <img className="solution-block__full-image" src={service.image} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </div>
        </article>
      ))}
    </section>
  )
}
