import SolutionsSections from '../../components/SolutionsSections.jsx'
import slidingDoorsImage from './assets/r1.png'
import pivotDoorsImage from './assets/r2.png'
import framesImage from './assets/r3.png'
import glassRailingsImage from './assets/r4.png'
import glassPergolaImage from './assets/r5.png'

const services = [
  {
    id: 'portas-de-correr',
    title: 'Portas de correr',
    description: 'Esquadrias de alumínio para integração de ambientes e grandes vãos.',
    image: slidingDoorsImage,
  },
  {
    id: 'portas-pivotantes',
    title: 'Portas pivotantes',
    description: 'Soluções de entrada com presença arquitetônica e acabamento sob medida.',
    image: pivotDoorsImage,
  },
  {
    id: 'caixilhos',
    title: 'Caixilhos',
    description: 'Estruturas de alumínio utilizadas em portas, janelas e fechamentos, garantindo resistência e acabamento.',
    image: framesImage,
  },
  {
    id: 'guarda-corpos-em-vidro',
    title: 'Guarda-corpos em vidro',
    description: 'Sistemas para varandas, escadas e áreas internas ou externas.',
    image: glassRailingsImage,
  },
  {
    id: 'pergolado-com-vidro',
    title: 'Pergolado com vidro',
    description: 'Estrutura com cobertura em vidro para proteção de áreas externas, mantendo iluminação natural e amplitude.',
    image: glassPergolaImage,
  },
]

export default function ResidentialSections() {
  return <SolutionsSections title="Soluções Residenciais" items={services} className="solutions-sections--residential" revealImages />
}
