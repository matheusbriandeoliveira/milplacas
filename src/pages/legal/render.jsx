import { renderToStaticMarkup } from 'react-dom/server'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import BackToTop from '../../components/BackToTop.jsx'
import FloatingWhatsApp from '../../components/FloatingWhatsApp.jsx'
import LegalPage from './LegalPage.jsx'

export function renderLegalPage(page) {
  return renderToStaticMarkup(<>
    <main className="home">
      <div className="anniversary-hero legal-header" id="inicio"><SiteHeader homePrefix="/" /></div>
      <LegalPage page={page} />
      <SiteFooter />
    </main>
    <BackToTop />
    <FloatingWhatsApp />
  </>)
}
