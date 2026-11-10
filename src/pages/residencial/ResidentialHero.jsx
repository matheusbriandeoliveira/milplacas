import HeroSlider from '../../components/HeroSlider.jsx'
import residentialHeroOne from './assets/bgResidencial1.png'
import residentialHeroTwo from './assets/bgResidencial2.png'

const slides = [residentialHeroOne, residentialHeroTwo]

export default function ResidentialHero(props) {
  return <HeroSlider {...props} residential slides={slides} />
}
