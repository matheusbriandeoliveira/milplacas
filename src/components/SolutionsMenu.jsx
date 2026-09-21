import { useState } from 'react'
import './SolutionsMenu.css'

const solutions = [
  'Fachadas em ACM',
  'Pele de Vidro / Glazing',
  'Esquadrias de Alumínio',
  'Revestimentos',
  'Comunicação Visual',
  'Homenagens Corporativas',
]

export default function SolutionsMenu({ onNavigate }) {
  const [open, setOpen] = useState(false)

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
          event.currentTarget.querySelector('button').focus()
        }
      }}>
      <button type="button" className="solutions-menu__trigger" aria-expanded={open}
        aria-controls="solutions-dropdown" onClick={() => setOpen((value) => !value)}>
        Soluções <span aria-hidden="true">⌄</span>
      </button>
      <div className="solutions-menu__dropdown" id="solutions-dropdown" inert={!open}>
        {solutions.map((solution) => (
          <a key={solution} href="#solucoes" onClick={() => { setOpen(false); onNavigate() }}>
            {solution}
          </a>
        ))}
      </div>
    </div>
  )
}
