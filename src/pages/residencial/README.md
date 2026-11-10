# Página Residencial

Esta pasta reúne os componentes e as imagens específicos da página Residencial.

- `ResidentialHero.jsx`: hero e imagens de fundo.
- `ResidentialSections.jsx`: lista de soluções e respectivas imagens.
- `assets/`: imagens usadas exclusivamente pela página.
- `index.jsx`: ponto de entrada dos componentes.

A página usa os componentes compartilhados `HeroSlider` e `SolutionsSections`,
que por sua vez dependem de `BlurText` e dos estilos correspondentes em
`src/components`. A rota `/residencial` e o cabeçalho compartilhado continuam
integrados em `src/App.jsx`.

Ao transferir esta pasta para outro projeto, leve também esses componentes
compartilhados ou substitua-os por equivalentes do projeto de destino.
