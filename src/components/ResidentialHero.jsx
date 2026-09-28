import HeroSlider from './HeroSlider.jsx'

const slides = [
  '/images/residential/bgResidencial1.png',
  '/images/residential/bgResidencial2.png',
]

export default function ResidentialHero(props) {
  return <HeroSlider {...props} residential slides={slides} />
}
