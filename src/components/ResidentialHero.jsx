import HeroSlider from './HeroSlider.jsx'

const images = import.meta.glob('/public/bgResidencial*.png', { eager: true, query: '?url', import: 'default' })
const slides = Object.keys(images)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path) => path.replace('/public', ''))

export default function ResidentialHero(props) {
  return <HeroSlider {...props} residential slides={slides} />
}
