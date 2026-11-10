import { useEffect } from 'react'
import { company } from '../../config/company.js'
import { cookieCategories, legalPages } from './content.js'
import './LegalPage.css'

export default function LegalPage({ page }) {
  useEffect(() => {
    document.title = `${page.title} | Milplacas`
    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.appendChild(description)
    }
    description.content = page.description
  }, [page])

  return (
    <article className="legal-page" aria-labelledby="legal-page-title">
      <div className="legal-page__inner">
        <p className="legal-page__eyebrow">Milplacas · Informações legais</p>
        <h1 id="legal-page-title">{page.title}</h1>
        <p className="legal-page__intro">{page.intro}</p>
        <p className="legal-page__date">Atualização: <time dateTime="2026-11-10">10 de novembro de 2026</time></p>

        {page.sections.map((section, index) => (
          <section className="legal-page__section" key={section.title} aria-labelledby={`legal-section-${index}`}>
            <h2 id={`legal-section-${index}`}>{section.title}</h2>
            {section.cookies && <div className="legal-page__table-scroll" role="region" aria-label="Categorias de cookies" tabIndex={0}>
              <table>
                <caption>Categorias de cookies na versão atual do site</caption>
                <thead><tr><th scope="col">Categoria</th><th scope="col">Uso e finalidade</th><th scope="col">Duração</th></tr></thead>
                <tbody>{cookieCategories.map(([category, purpose, duration]) => (
                  <tr key={category}><th scope="row">{category}</th><td>{purpose}</td><td>{duration}</td></tr>
                ))}</tbody>
              </table>
            </div>}
            {section.paragraphs.map((text) => <p key={text}>{text}</p>)}
          </section>
        ))}

        <section className="legal-page__section" aria-labelledby="legal-contact-title">
          <h2 id="legal-contact-title">Fale com a Milplacas</h2>
          <p>{company.name} · CNPJ {company.cnpj}</p>
          <p><a href={company.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp: {company.phone}</a></p>
          {company.email && <p><a href={`mailto:${company.email}`}>{company.email}</a></p>}
          {page.reference && <p><a href={page.reference.href} target="_blank" rel="noopener noreferrer">{page.reference.label}</a></p>}
        </section>

        <nav className="legal-page__related" aria-label="Outras informações legais">
          {legalPages.filter((item) => item.path !== page.path).map((item) => <a key={item.path} href={item.path}>{item.title}</a>)}
        </nav>
      </div>
    </article>
  )
}
