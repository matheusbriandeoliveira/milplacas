import { useEffect, useRef, useState } from 'react'

import './App.css'
import Aurora from './components/Aurora.jsx'
import BlurText from './components/BlurText.jsx'
import ScrollExpand from './components/ScrollExpand.jsx'

const navigation = [
  { label: 'Projetos', href: '#projetos' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'FAQ', href: '#faq' },
]

const featuredProjects = [
  {
    name: 'Datta - Jacto',
    image: '/datta-jacto.png',
    alt: 'Vista aérea da fachada Datta - Jacto',
  },
  {
    name: 'Rodonaves',
    image: '/rodonaves.png',
    alt: 'Fachada azul da Rodonaves',
  },
  {
    name: 'Shopping Boulevard',
    image: '/boulevard.png',
    alt: 'Entrada iluminada do Shopping Boulevard',
  },
  {
    name: 'Citap',
    image: '/citap.png',
    alt: 'Fachada do Citap',
  },
]

const clientLogos = [
  { name: 'Comasa', image: '/Comasa.svg' },
  { name: 'Cocipa', image: '/Cocipa.svg' },
  { name: 'Dori', image: '/Dori.svg' },
  { name: 'Coca-Cola', image: '/CocaCola.svg' },
  { name: 'Jacto', image: '/Jacto.svg' },
  { name: 'Marilan', image: '/Marilan.svg' },
  { name: 'Rodonaves', image: '/Rodonaves.svg' },
  { name: 'Boulevard Marília Shopping', image: '/Boulevard Marília Shopping.svg' },
  { name: 'Sesi', image: '/Sesi.svg' },
  { name: 'Conti', image: '/Conti.svg' },
]

const structureHighlights = [
  {
    title: 'Projetos sob medida',
    description: 'Soluções pensadas para traduzir a identidade de cada projeto.',
    image: '/ImgProjetos.png',
    alt: 'Equipe Milplacas reunida em torno de um projeto técnico',
  },
  {
    title: 'Infraestrutura fabril',
    description: 'Tecnologia de ponta para transformar precisão em acabamento.',
    image: '/ImgInfraEstruturaFabril.png',
    alt: 'Equipamento de corte a laser em operação',
  },
  {
    title: 'Capacidade produtiva',
    description: 'Processos integrados para atender demandas de diferentes escalas.',
    image: '/ImgCapacidadeProdutiva.png',
    alt: 'Operador Milplacas acompanhando uma máquina de produção',
  },
  {
    title: 'Logística integrada',
    description: 'Planejamento e distribuição que dão agilidade a cada etapa.',
    image: '/ImgLogistica.png',
    alt: 'Centro de logística com empilhadeira e materiais organizados',
  },
  {
    title: 'Assistência especializada',
    description: 'Atendimento próximo do desenvolvimento ao pós-obra.',
    image: '/ImgAssistencia.png',
    alt: 'Equipe Milplacas analisando uma planta de projeto',
  },
  {
    title: 'Grandes projetos',
    description: 'Experiência aplicada a fachadas que unem desempenho e presença.',
    image: '/GrandesProjetos.png',
    alt: 'Projeto de grande porte executado pela Milplacas',
  },
]

const faqItems = [
  {
    question: 'Em que fase da obra devo contactar a Milplacas?',
    answer: 'Quanto antes a solução de fachada e esquadrias for considerada, maior é a capacidade de integrar acabamentos, desempenho e cronograma.',
  },
  {
    question: 'A Milplacas ajuda a definir materiais?',
    answer: 'Sim. A nossa equipa apoia a leitura da especificação e propõe materiais, sistemas e detalhes de execução compatíveis com a intenção arquitetónica do projeto.',
  },
  {
    question: 'Como acompanho o andamento da execução?',
    answer: 'Organizamos as etapas de aprovação, produção e instalação para que a equipa do cliente tenha visibilidade sobre decisões, prazos e necessidades de obra.',
  },
  {
    question: 'Atendem projetos fora de Marília?',
    answer: 'O alcance do atendimento é avaliado conforme o escopo, a logística e os requisitos técnicos de cada empreendimento.',
  },
]

const smoothstep = (value) => {
  const progress = Math.min(Math.max(value, 0), 1)
  return progress * progress * (3 - 2 * progress)
}

function App() {
  const featuredProjectsRef = useRef(null)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeClientIndex, setActiveClientIndex] = useState(null)
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true)
  const [isPreloaderLeaving, setIsPreloaderLeaving] = useState(false)

  useEffect(() => {
    const minimumPreloaderTime = 2000
    const startedAt = performance.now()
    let frameId = 0
    let exitTimer = 0
    let fadeTimer = 0

    const startExit = () => {
      frameId = requestAnimationFrame(() => {
        setIsPreloaderLeaving(true)
        fadeTimer = window.setTimeout(() => setIsPreloaderVisible(false), 520)
      })
    }

    const finishLoading = () => {
      const elapsed = performance.now() - startedAt
      exitTimer = window.setTimeout(startExit, Math.max(0, minimumPreloaderTime - elapsed))
    }

    if (document.readyState === 'complete') {
      finishLoading()
    } else {
      window.addEventListener('load', finishLoading, { once: true })
    }

    return () => {
      window.removeEventListener('load', finishLoading)
      cancelAnimationFrame(frameId)
      window.clearTimeout(exitTimer)
      window.clearTimeout(fadeTimer)
    }
  }, [])

  useEffect(() => {
    const section = featuredProjectsRef.current
    if (!section) return undefined

    const cards = Array.from(section.querySelectorAll('.project-card'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0

    const setCardFocus = (card, focus) => {
      card.style.setProperty('--card-blur', `${(1 - focus) * 3}px`)
      card.style.setProperty('--card-scale', `${1 + (1 - focus) * 0.01}`)
    }

    const updateCards = () => {
      animationFrame = 0

      if (reducedMotion) {
        cards.forEach((card) => setCardFocus(card, 1))
        return
      }

      const viewportCenter = window.innerHeight * 0.52
      const focusRange = window.innerHeight * 0.54

      cards.forEach((card) => {
        const bounds = card.getBoundingClientRect()
        const cardCenter = bounds.top + bounds.height / 2
        const proximity = 1 - Math.abs(cardCenter - viewportCenter) / focusRange
        setCardFocus(card, smoothstep(proximity))
      })
    }

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateCards)
    }

    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    requestUpdate()

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <>
      {isPreloaderVisible && (
        <div
          className={`preloader ${isPreloaderLeaving ? 'is-leaving' : ''}`}
          role="status"
          aria-label="Carregando site Milplacas"
        >
          <div className="preloader__glow" aria-hidden="true" />
          <img className="preloader__logo" src="/LogoMilplacasWeb.svg" alt="" />
        </div>
      )}

      <main className="home" aria-busy={isPreloaderVisible}>
      <section className="hero" aria-labelledby="hero-title">
        <Aurora
          colorStops={['#F43F5E', '#F43F5E', '#5227FF']}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />

        <header className="header">
          <a className="header__brand" href="#inicio" aria-label="Milplacas — início">
            <img src="/LogoMilplacasWeb.svg" alt="Milplacas" />
          </a>

          <button
            type="button"
            className={`header__menu-button ${isMobileMenuOpen ? 'is-open' : ''}`}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            className={`header__nav ${isMobileMenuOpen ? 'is-open' : ''}`}
            id="mobile-navigation"
            aria-label="Navegação principal"
          >
            {navigation.map((item) => (
              <a href={item.href} key={item.label} onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <div className="hero__content" id="inicio">
          <h1 id="hero-title" className="hero__title">
            <span><BlurText text="Fachadas que" /></span>
            <span className="hero__title--muted"><BlurText text="transformam ideias" /></span>
            <span>
              <BlurText text="ambiciosas em" /><em><BlurText text="presença." /></em>
            </span>
          </h1>

          <p className="hero__description">
            Projetamos e executamos soluções que unem acabamento, desempenho e a
            força visual que o seu projeto merece.
          </p>
        </div>
      </section>

      <section className="projects-showcase" aria-label="Projetos em destaque">
        <ScrollExpand
          src="/videoHero.mp4"
          mobileSrc="/videoHeroMobile.mp4"
          mediaType="video"
          scrollHint="Role para explorar"
          startWidth={70}
          startHeight={62}
          startRadius={28}
          endRadius={0}
          mediaZoom={1.2}
          scrollDistance={1.2}
          holdDistance={0.35}
          smoothing={0.1}
          overlayScrim={0.45}
          useWindowScroll
          enabled
        />
      </section>

      <section
        className="featured-projects"
        id="projetos"
        aria-labelledby="featured-projects-title"
        ref={featuredProjectsRef}
      >
        <div className="featured-projects__inner">
          <h2 id="featured-projects-title" className="featured-projects__title">
            <span><BlurText text="Nossos destaques." /></span>
            <span><BlurText text="Projetos dos quais temos orgulho." /></span>
          </h2>

          <div className="featured-projects__grid">
            {featuredProjects.map((project) => (
              <article className="project-card" key={project.name}>
                <div className="project-card__content">
                  <img src={project.image} alt={project.alt} />
                  <div className="project-card__shade" aria-hidden="true" />
                  <h3><BlurText text={project.name} delay={55} /></h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="client-trust" id="clientes" aria-labelledby="client-trust-title">
        <div className="client-trust__inner">
          <h2 id="client-trust-title" className="client-trust__eyebrow">
            <BlurText text="Empresas que" />
          </h2>

          <div className="client-trust__logo-viewport">
            <ul
              className="client-trust__logos"
              aria-label="Clientes Milplacas"
              onMouseLeave={() => setActiveClientIndex(null)}
            >
              {[...clientLogos, ...clientLogos].map((client, index) => {
                const clientIndex = index % clientLogos.length
                const distance = activeClientIndex === null ? null : Math.abs(clientIndex - activeClientIndex)
                const dockClass = distance === 0 ? 'is-active' : distance === 1 ? 'is-neighbor' : distance === 2 ? 'is-near' : ''

                return (
                <li
                  className={dockClass}
                  key={`${client.name}-${index}`}
                  aria-hidden={index >= clientLogos.length}
                  onMouseEnter={() => setActiveClientIndex(clientIndex)}
                >
                  <img src={client.image} alt={index < clientLogos.length ? client.name : ''} />
                  <span className="client-trust__logo-name">{client.name}</span>
                </li>
                )
              })}
            </ul>
          </div>

          <p className="client-trust__title">
            <BlurText text="Confiam na" /><strong><BlurText text="Milplacas" /></strong>
          </p>
          <p className="client-trust__description">
            Atendemos empresas com soluções completas em fachadas, esquadrias e
            revestimentos de alto padrão.
          </p>
        </div>
      </section>

      <section className="structure" id="solucoes" aria-labelledby="structure-title">
        <div className="structure__inner">
          <div className="structure__intro">
            <p className="structure__label">Nossa estrutura</p>
            <h2 id="structure-title">
              <BlurText text="Estrutura, Tecnologia e Experiência para" /><em><BlurText text="Grandes Projetos." /></em>
            </h2>
            <p>
              Unimos conhecimento técnico, capacidade industrial e proximidade para
              entregar soluções completas em cada detalhe.
            </p>
          </div>

          <div className="structure__grid">
            {structureHighlights.map((highlight) => (
              <article className="structure-card" key={highlight.title}>
                <div className="structure-card__image">
                  <img src={highlight.image} alt={highlight.alt} />
                </div>
                <div className="structure-card__body">
                  <div>
                    <h3><BlurText text={highlight.title} delay={55} /></h3>
                    <p>{highlight.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="final-cta-title">
        <div className="final-cta__shapes" aria-hidden="true">
          <span className="final-cta__shape final-cta__shape--one" />
          <span className="final-cta__shape final-cta__shape--two" />
          <span className="final-cta__shape final-cta__shape--three" />
        </div>

        <div className="final-cta__inner">
          <div className="final-cta__main">
            <p className="final-cta__label">Vamos juntos?</p>
            <h2 id="final-cta-title">
              <span><BlurText text="Vamos tornar" /></span>
              <span><BlurText text="sua" /><em><BlurText text="marca" /></em></span>
              <span><BlurText text="impossível de ignorar" /><span className="final-cta__period"><BlurText text="." animateBy="letters" /></span></span>
            </h2>
          </div>

          <div className="final-cta__contact">
            <p>Conte onde sua marca precisa aparecer. Organizamos o ponto de partida juntos.</p>
            <a
              className="final-cta__button"
              href="https://wa.me/5514997192223"
              target="_blank"
              rel="noreferrer"
            >
              Iniciar conversa <span aria-hidden="true">↗</span>
            </a>
            <a
              className="final-cta__whatsapp"
              href="https://wa.me/5514997192223"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.5 3.5A11.84 11.84 0 0 0 12.04 0C5.46 0 .11 5.35.11 11.94c0 2.1.55 4.15 1.59 5.96L0 24l6.27-1.64a11.92 11.92 0 0 0 5.76 1.47h.01c6.58 0 11.94-5.35 11.94-11.94 0-3.19-1.24-6.18-3.48-8.39ZM12.04 21.81h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.24-.37a9.88 9.88 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.9a9.85 9.85 0 0 1 2.9 7c0 5.47-4.45 9.92-9.92 9.92Zm5.44-7.43c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47a9.04 9.04 0 0 1-1.66-2.06c-.17-.3-.02-.47.13-.62.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.08-.8.38-.27.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35Z" />
              </svg>
              <span>
                <strong>(14) 99719-2223</strong>
                <small>Atendimento rápido pelo WhatsApp.</small>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="faq" id="faq" aria-labelledby="faq-title">
        <div className="faq__inner">
          <div className="faq__intro">
            <p className="faq__label">Transparência de ponta a ponta</p>
            <h2 id="faq-title">
              <span><BlurText text="Todo projeto" /></span>
              <span><BlurText text="começa com" /></span>
              <span><BlurText text="uma boa pergunta." /></span>
            </h2>
          </div>

          <div className="faq__list">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index

              return (
                <article className={`faq__item ${isOpen ? 'is-open' : ''}`} key={item.question}>
                  <button
                    type="button"
                    className="faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <span><BlurText text={item.question} delay={35} /></span>
                    <span className="faq__symbol" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className="faq__answer" id={`faq-answer-${index}`} role="region">
                    <div>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <img src="/LogoMilplacasWeb.svg" alt="Milplacas" />
            <p>© 2026 Milplacas. Todos os direitos reservados.</p>
          </div>

          <a
            className="site-footer__contact"
            href="https://wa.me/5514997192223"
            target="_blank"
            rel="noreferrer"
            aria-label="Falar com a Milplacas pelo WhatsApp: (14) 99719-2223"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.5 3.5A11.84 11.84 0 0 0 12.04 0C5.46 0 .11 5.35.11 11.94c0 2.1.55 4.15 1.59 5.96L0 24l6.27-1.64a11.92 11.92 0 0 0 5.76 1.47h.01c6.58 0 11.94-5.35 11.94-11.94 0-3.19-1.24-6.18-3.48-8.39ZM12.04 21.81h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.24-.37a9.88 9.88 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.9a9.85 9.85 0 0 1 2.9 7c0 5.47-4.45 9.92-9.92 9.92Zm5.44-7.43c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47a9.04 9.04 0 0 1-1.66-2.06c-.17-.3-.02-.47.13-.62.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.08-.8.38-.27.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35Z" />
            </svg>
            <span>(14) 99719-2223</span>
          </a>
        </div>
      </footer>
      </main>
    </>
  )
}

export default App
