import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import React from 'react'

function ProfileSideBar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const usuarioAleatorio = 'dticed';
  const [comunidades, setComunidades] = React.useState([
    {
      id: '129312387162939718263981',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    },
    {
      id: '1293123871151562939711238263981',
      title: 'Fans do ator Leonardo Da Vinci',
      image: 'https://exame.com/wp-content/uploads/2021/04/dicaprio.jpg'
    },
    {
      id: '129312387162932319741418263981',
      title: 'Tocava a campainha e corria',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsantil.cdn.plataformaneo.com.br%2Fproduto%2F1629507PRM112_318447513.jpg&f=1&nofb=1'
    },
    {
      id: '12931112387162939741418263981',
      title: 'Eu nunca morri na minha vida',
      image: 'https://4.bp.blogspot.com/-3QU3vRUIhOA/UcGQ5DhqoVI/AAAAAAABSxA/SMDQEmUYG7g/s1600/sepultura.jpg'
    },
    {
      id: '12931112387162939741418263981',
      title: 'Eu tomo banho pelado',
      image: 'https://latina.com.br/wp-content/uploads/2017/05/por-que-evitar-banho-nos-horarios-de-pico.jpg'
    },
    {
      id: '12931112387162939741418263981',
      title: 'Frio e calculista',
      image: 'https://imagens1.ne10.uol.com.br/blogsne10/social1/uploads/2021/05/Ramon-Valdes-como-Seu-Madruga-em-Chaves.jpg'
    }

  ]);
  const pessoasFavoritas = [
    'rochacbruno',
    'davidbegin',
    'iankury',
    'dunossauro',
    'ramalho',
    'marcobrunodev'
  ];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }

              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
            }}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Qual vai ser o nome da sua comunidade?" />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidades({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
