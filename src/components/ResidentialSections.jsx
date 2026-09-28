import SolutionsSections from './SolutionsSections.jsx'

const services = [
  {
    id: 'portas-de-correr',
    title: 'Portas de correr',
    description: 'Esquadrias de alumínio para integração de ambientes e grandes vãos.',
    image: '/r1.png',
  },
  {
    id: 'portas-pivotantes',
    title: 'Portas pivotantes',
    description: 'Soluções de entrada com presença arquitetônica e acabamento sob medida.',
    image: '/r2.png',
  },
  {
    id: 'caixilhos',
    title: 'Caixilhos',
    description: 'Estruturas de alumínio utilizadas em portas, janelas e fechamentos, garantindo resistência e acabamento.',
    image: '/r3.png',
  },
  {
    id: 'guarda-corpos-em-vidro',
    title: 'Guarda-corpos em vidro',
    description: 'Sistemas para varandas, escadas e áreas internas ou externas.',
    image: '/r4.png',
  },
  {
    id: 'pergolado-com-vidro',
    title: 'Pergolado com vidro',
    description: 'Estrutura com cobertura em vidro para proteção de áreas externas, mantendo iluminação natural e amplitude.',
    image: '/r5.png',
  },
]

export default function ResidentialSections() {
  return <SolutionsSections title="Soluções Residenciais" items={services} />
}
