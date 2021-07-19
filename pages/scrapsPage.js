import React from 'react'
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'


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

export default function Home(props) {
    const usuarioAleatorio = props.githubUser;
    const [scraps, setScraps] = React.useState([]);

    React.useEffect(function () {

        // API GraphQL
        fetch('https://graphql.datocms.com/', {
            method: 'POST',
            headers: {
                'Authorization': '1d684c35522ed9c22f87b8e60ca429',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "query": `query {
                    allScraps{
                        id
                        text
                        creatorSlug
                    }
                }`  })
        })
            .then((response) => response.json())
            .then((respostaCompleta) => {
                const scrapsDato = respostaCompleta.data.allScraps;
                setScraps(scrapsDato)
            })
    }, [])

    return (
        <>
            <AlurakutMenu />
            <MainGrid>
                <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                    <ProfileSideBar githubUser={usuarioAleatorio} />
                </div>
                <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
                    <Box>
                        <form onSubmit={function handleCriaScrap(e) {
                            e.preventDefault();
                            const dadosDoForm = new FormData(e.target);

                            const scrap = {
                                text: dadosDoForm.get('text'),
                                creatorSlug: dadosDoForm.get('username'),
                            }

                            fetch('/api/scraps', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',

                                },
                                body: JSON.stringify(scrap)
                            })
                                .then(async (response) => {
                                    const dados = await response.json();
                                    const scrap = dados.registroCriado;
                                    const scrapsAtualizados = [scrap, ...scraps];
                                    setScraps(scrapsAtualizados);
                                })
                        }}>
                            <div>
                                <textarea placeholder="digite o texto" name="text" rows='5' columns="10"></textarea>
                            </div>
                            <div>
                                <input className="userScrap" placeholder="Nome do usuario"
                                    name="username"
                                    aria-label="Qual vai ser o nome da sua comunidade?"
                                />
                            </div>
                            <button>
                                Deixar recado
                            </button>
                        </form>
                    </Box>
                    <h2 className="smallTitle">Scraps({scraps.length})</h2>

                    {scraps.map((itemAtual) => {
                        return (
                            <Box className="scrapBox">
                                <ProfileRelationsBoxWrapper>
                                    <ul>
                                        <li key={itemAtual.id}>
                                            <a href={`https://github.com/${itemAtual.creatorSlug}`}>
                                                <span>{itemAtual.creatorSlug}</span>
                                                <img src={`https://github.com/${itemAtual.creatorSlug}.png`} />
                                            </a>
                                        </li>
                                        <li>
                                            <p>{itemAtual.text}</p>
                                        </li>
                                    </ul>
                                </ProfileRelationsBoxWrapper>
                            </Box>
                        )
                    })}
                </div>
            </MainGrid>
        </>
    )
}

export async function getServerSideProps(context) {
    const cookies = nookies.get(context);
    const token = cookies.USER_TOKEN;


    const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
        headers: {
            Authorization: token
        }
    })
        .then((resposta) => resposta.json())

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    const { githubUser } = jwt.decode(token);
    return {
        props: {
            githubUser
        }, // will be passed to the page component as props
    }
}