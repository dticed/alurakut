import React from 'react';

export default function LoginScreen() {

    return (
        <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div className="logoutScreen">
                <section className="logoArea">
                    <img src="https://alurakut.vercel.app/logo.svg" />

                    <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
                    <h1>Você deslogou da sua conta.</h1>
                </section>

                <section className="formArea">


                    <footer className="box">
                        <p>
                            Clique para ser redirecionado para tela de login. <br />
                            <a href="/login">
                                <strong>
                                    Login
                                </strong>
                            </a>
                        </p>
                    </footer>
                </section>

                <footer className="footerArea">
                    <p>
                        © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
                    </p>
                </footer>
            </div>
        </main>
    )
}