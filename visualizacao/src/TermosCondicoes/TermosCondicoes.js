
import { useState } from 'react';
import React from 'react';
import './TermosCondicoes.css';
import '../PaginaInicial/PaginaInicial.css';
import { useNavigate } from "react-router-dom";



import { useEffect } from 'react';
const TermosCondicoes = () => {
    const navigate = useNavigate();

    async function backToLogin() {
        navigate("/");
    }



    return (
        <div className="paginaInicial">
            <div className="termos">
                <div className="termos-info">
                    <form className="login-form">
                        <span className="login-titulo">Termos e Condições</span>
                        <div className="login-input">
                            <view>
                                <text>
                                    Política de Privacidade.<br /><br />
                                    Em vigor a partir de 9 de janeiro de 2023.  <br />
                                    De maneira a compreender que informações são recolhidas e como são utilizadas a EletricAcme, S.A aconselha que leia esta Política de Privacidade que visa explicar as nossas práticas no que diz respeito à recolha, utilização e conservação de determinadas informações, incluindo os seus dados pessoais, no âmbito da aplicação EletricGo. Criamos o nosso serviço tendo como base o respeito pela sua privacidade.<br />
                                    Responsável pelo tratamento<br />
                                    A EletricAcme, S.A, sediada no Porto, é a organização responsável pelo tratamento dos seus dados pessoais. Poderá entrar em contacto com a empresa através do email info@eletricacme.pt.<br /><br />

                                    Recolha de Informações<br />
                                    Para usar a nossa aplicação é necessário ter uma conta de utilizador, criada pelo nosso administrador, e por esse motivo é preciso fornecer-nos certas informações. Isto inclui o nome, uma palavra-passe, um endereço de email, um número de telemóvel e o seu cargo na organização.<br />
                                    O número de telemóvel é requerido para facilitar o contacto em caso de necessidade de coordenação operacional entre os diferentes utilizadores, o endereço de email e a palavra-passe para autenticação no sistema, o nome tem o propósito para a identificação e o cargo na organização para determinação de que funcionalidades do nosso serviço pode ter acesso.<br />
                                    Para que o administrador possa registar o utilizador no sistema, o consentimento da recolha das suas informações é efetuado quando o trabalhador assina o seu contrato de trabalho, sendo neste momento também garantido que o utilizador tem a idade mínima para consentir o uso dos seus dados pessoais. No momento de efetuar o login no sistema é possível reler a política de privacidade.<br /><br />

                                    Direitos dos Titulares dos Dados<br />
                                    Ao abrigo da legislação de proteção de dados aplicável, tem o direito de aceder à sua informação pessoal, retificar os seus dados, efetuar a portabilidade, apagar as suas informações e limitar e opor-se a determinados tratamentos das suas informações, bem como o direito de apresentação de uma reclamação junto da CNPD – Comissão Nacional de Proteção de Dados (geral@cnpd.pt).<br />
                                    Para exercer os seus direitos, ou caso tenha uma questão relacionada com a nossa política de privacidade, contacte o nosso Encarregado da Proteção de Dados, através do email protecaodedados@eletricacme.pt.<br /><br />

                                    Alteração de informações pessoais<br />
                                    Os dados pessoais devem encontrar-se sempre atualizados e por este motivo o utilizador deve solicitar a correção dos mesmos para que não existam dados inexatos. Os dados que se encontravam incorretos são nesse momento apagados.<br /><br />

                                    Conservação das Informações<br />
                                    A EletricAcme conservará os seus dados pessoais enquanto for trabalhador da empresa, pois a sua conta no nosso serviço é imprescindível para que consiga exercer o seu cargo. Quando a sua conta for eliminada, eliminamos as suas informações não sendo possível recuperar esse conteúdo mais tarde.<br /><br />

                                    Obrigações do utilizador<br />
                                    O utilizador declara ser maior de idade e que leu a política de privacidade, concordando na sua totalidade com todas as informações nela presentes.<br /><br />

                                    Outros Termos<br />
                                    Os seus dados pessoais poderão ser comunicados a entidades públicas ou autoridades judiciais, se assim for obrigatório por lei ou para prevenir ou punir a prática de crimes.<br />
                                </text>
                            </view>
                            <div className="back-btn">
                                <input onClick={() => backToLogin()} className="btn-back" type="button" value="Sair" />
                            </div>

                        </div>
                    </form>
                </div>
            </div>
            <div>

            </div>
        </div>
    );


}
export default TermosCondicoes;