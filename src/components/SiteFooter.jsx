import { useState } from 'react'
import { company } from '../config/company.js'
import { legalPages } from '../pages/legal/content.js'

export default function SiteFooter() {
  const [footerSolutionsOpen, setFooterSolutionsOpen] = useState(false)
  return (
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <img src="/brand/LogoMilplacasWeb.svg" alt="Milplacas" />
            <p>transformando projetos em referência</p>
          </div>

          <nav className={`site-footer__column site-footer__solutions${footerSolutionsOpen ? ' is-open' : ''}`} aria-labelledby="footer-solutions-title">
            <h2 id="footer-solutions-title">Soluções</h2>
            <button className="site-footer__solutions-toggle" type="button"
              aria-expanded={footerSolutionsOpen} aria-controls="footer-solutions-links"
              onClick={() => setFooterSolutionsOpen((value) => !value)}>
              Soluções <span aria-hidden="true">{footerSolutionsOpen ? '−' : '+'}</span>
            </button>
            <div className="site-footer__solutions-links" id="footer-solutions-links">
            <a href="/solucoes#fachadas-em-acm">Fachadas em ACM</a>
            <a href="/solucoes#pele-de-vidro">Pele de Vidro / Glazing</a>
            <a href="/solucoes#esquadrias-de-aluminio">Esquadrias de Alumínio</a>
            <a href="/solucoes#comunicacao-visual">Comunicação Visual</a>
            <a href="/solucoes#homenagens-corporativas">Homenagens Corporativas</a>
            </div>
          </nav>

          <nav className="site-footer__column" aria-labelledby="footer-legal-title">
            <h2 id="footer-legal-title">Informações Legais</h2>
            {legalPages.map((page) => <a key={page.path} href={page.path}>{page.title}</a>)}
          </nav>

          <div className="site-footer__column">
            <h2>Contato</h2>
          <a
            className="site-footer__contact"
            href="https://wa.me/5514997192223"
            target="_blank"
            rel="noreferrer"
            aria-label="Falar com a Milplacas pelo WhatsApp: (14) 99719-2223"
          >
            <span>(14) 99719-2223</span>
          </a>
          {company.email && <a href={`mailto:${company.email}`}>{company.email}</a>}
          </div>

          <div className="site-footer__column">
            <h2>Acompanhe nossas redes sociais!</h2>
            <div className="site-footer__social-links">
            <a className="site-footer__instagram" href="https://www.instagram.com/mil.placas.oficial/"
              target="_blank" rel="noopener noreferrer" aria-label="Instagram oficial da Milplacas">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a className="site-footer__facebook" href="https://www.facebook.com/milplacasoficial/"
              target="_blank" rel="noopener noreferrer" aria-label="Facebook oficial da Milplacas">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 22v-9h3l.5-4H14V7c0-1.15.35-2 2-2h2V1.4A25 25 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9h4Z" />
              </svg>
            </a>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>© 2026 Milplacas. Todos os direitos reservados.</p>
          <p className="site-footer__cnpj">CNPJ: {company.cnpj}</p>
          <p className="site-footer__credit">
            {company.developerUrl
              ? <a href={company.developerUrl} target="_blank" rel="noopener noreferrer">Desenvolvido por Venovra</a>
              : 'Desenvolvido por Venovra'}
          </p>
        </div>
      </footer>
  )
}
