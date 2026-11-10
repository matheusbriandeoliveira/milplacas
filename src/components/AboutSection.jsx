import { useEffect, useRef } from 'react'
import './AboutSection.css'

const strengths = [
  ['Desenvolvimento', 'Soluções pensadas para cada necessidade.'],
  ['Fabricação', 'Produção de peças, estruturas e elementos personalizados.'],
  ['Instalação', 'Execução e aplicação das soluções desenvolvidas.'],
  ['Soluções completas', 'Fachadas, placas, medalhas, sinalização e comunicação corporativa.'],
]

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.15 })

    section.classList.add('is-reveal-ready')
    section.querySelectorAll('.about__reveal').forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      section.classList.remove('is-reveal-ready')
    }
  }, [])

  return (
    <section className="about" id="sobre" aria-label="Sobre nós" ref={sectionRef}>
      <div className="about__inner">
        <header className="about__header about__reveal">
          <h2 className="about__title">Sobre nós</h2>
          <p className="about__description">
            A Milplacas desenvolve, fabrica e instala soluções em comunicação visual para empresas, condomínios e indústrias. De fachadas e estruturas à sinalização e identificação de ambientes, entregamos soluções personalizadas para diferentes necessidades.
          </p>
        </header>
        <div className="about__strengths">
          {strengths.map(([title, description], index) => (
            <div className="about__strength about__reveal" key={title} style={{ '--about-delay': `${index * 80}ms` }}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
