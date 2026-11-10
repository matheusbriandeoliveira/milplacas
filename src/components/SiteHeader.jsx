import { useEffect, useState } from 'react'
import SolutionsMenu from './SolutionsMenu.jsx'

const navigation = [
  { label: 'Projetos', href: '#projetos' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Residencial', href: '/residencial' },
]


export default function SiteHeader({ homePrefix = '' }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined
    const mobile = window.matchMedia('(max-width: 700px)')
    if (!mobile.matches) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnDesktop = (event) => {
      if (!event.matches) setIsMobileMenuOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
        document.querySelector('.header__menu-button')?.focus()
      }
    }
    mobile.addEventListener('change', closeOnDesktop)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      mobile.removeEventListener('change', closeOnDesktop)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMobileMenuOpen])

  return (
        <header className={`header ${isMobileMenuOpen ? 'is-menu-open' : ''}`}>
          <a className="header__brand" href={`${homePrefix}#inicio`} aria-label="Milplacas — início">
            <img src="/brand/LogoMilplacasWeb.svg" alt="Milplacas" />
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
              <a href={item.href.startsWith('#') ? `${homePrefix}${item.href}` : item.href} key={item.label} onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <SolutionsMenu onNavigate={() => setIsMobileMenuOpen(false)} />
          </nav>
        </header>
  )
}
