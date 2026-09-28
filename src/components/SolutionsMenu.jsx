import { useState } from 'react'
import './SolutionsMenu.css'

const solutions = [
  { label: 'Fachadas em ACM', id: 'fachadas-em-acm' },
  { label: 'Pele de Vidro / Glazing', id: 'pele-de-vidro' },
  { label: 'Esquadrias de Alumínio', id: 'esquadrias-de-aluminio' },
  { label: 'Comunicação Visual', id: 'comunicacao-visual' },
  { label: 'Homenagens Corporativas', id: 'homenagens-corporativas' },
]

export default function SolutionsMenu({ onNavigate }) {
  const [open, setOpen] = useState(false)
  const pagePrefix = window.location.pathname.replace(/\/$/, '') === '/solucoes' ? '' : '/solucoes'

  return (
    <div className={`solutions-menu ${open ? 'is-open' : ''}`}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation()
          setOpen(false)
          event.currentTarget.querySelector('.solutions-menu__trigger').focus()
        }
      }}>
      <a href="/solucoes" className="solutions-menu__trigger" aria-expanded={open}
        onFocus={() => setOpen(true)}
        aria-controls="solutions-dropdown" onClick={() => { setOpen(false); onNavigate() }}>
        Soluções <span aria-hidden="true">⌄</span>
      </a>
      <div className="solutions-menu__dropdown" id="solutions-dropdown" inert={!open}>
        {solutions.map((solution) => (
          <a key={solution.id} href={`${pagePrefix}#${solution.id}`} onClick={() => { setOpen(false); onNavigate() }}>
            {solution.label}
          </a>
        ))}
      </div>
    </div>
  )
}
