import { useEffect, useState } from 'react'
import './HeroSlider.css'
import BlurText from './BlurText.jsx'

const defaultSlides = ['/bcg1.png', '/bcg2.png', '/bcg3.png']

export default function HeroSlider({ children, ready = true, projectsHref = '#projetos', slides = defaultSlides, residential = false }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!ready || slides.length < 2) return undefined
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % slides.length), 6000)
    return () => window.clearTimeout(timer)
  }, [active, ready, slides.length])

  const move = (direction) => setActive((index) => (index + direction + slides.length) % slides.length)

  return (
    <section className={`anniversary-hero${residential ? ' anniversary-hero--residential' : ''}`} id="inicio" aria-labelledby="hero-title" aria-roledescription={slides.length > 1 ? 'carrossel' : undefined}>
      <div className="anniversary-hero__slides" aria-hidden="true">
        {slides.map((src, index) => (
          <img key={src} src={src} alt="" className={index === active ? 'is-active' : ''}
            fetchPriority={index === 0 ? 'high' : 'auto'} />
        ))}
      </div>
      {children}
      <div className="anniversary-hero__panel">
        <div className="anniversary-hero__content">
          {residential ? <>
            <h1 id="hero-title" className="residential-hero__title"><BlurText text="Soluções que valorizam o seu espaço." enabled={ready} /></h1>
            <p className="residential-hero__description"><BlurText text="Esquadrias, vidros e soluções arquitetônicas que unem funcionalidade, conforto e um acabamento de alto padrão para projetos residenciais." delay={20} enabled={ready} /></p>
          </> : <>
          <h1 id="hero-title">
            <span className="anniversary-hero__number"><BlurText text="26" enabled={ready} /></span>
            <span className="anniversary-hero__years"><BlurText text="anos" enabled={ready} /></span>
            <span className="anniversary-hero__statement"><BlurText text="Construindo" enabled={ready} /><br /><em><BlurText text="referências." enabled={ready} /></em></span>
          </h1>
          <a className="anniversary-hero__cta" href={projectsHref}>Ver projetos <span aria-hidden="true">→</span></a>
          </>}
        </div>
        {slides.length > 1 &&
        <div className="anniversary-hero__controls" aria-label="Navegação das imagens">
          <button type="button" onClick={() => move(-1)} aria-label="Imagem anterior">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Próxima imagem">→</button>
          <div className="anniversary-hero__dots">
            {slides.map((src, index) => (
              <button key={src} type="button" aria-label={`Mostrar imagem ${index + 1}`}
                aria-current={active === index ? 'true' : undefined}
                onClick={() => setActive(index)}><span /></button>
            ))}
          </div>
        </div>
        }
      </div>
    </section>
  )
}
