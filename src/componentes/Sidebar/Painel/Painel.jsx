// src/components/Painel/Painel.jsx

import React, { useState } from "react";
import "./Painel.css";
import { assets } from "../../../assets/assets";
import getApiData from "../../../config/apigemini";

const Painel = () => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // ALTERAÇÃO 1: A função agora recebe o prompt (texto) como argumento
  const onSentApi = async (prompt) => {
    // Se não houver prompt (texto), não faz nada
    if (!prompt) {
      return;
    }

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);

    const response = await getApiData(prompt);
    
    // ALTERAÇÃO 2: Verifica se a resposta da API é válida antes de processar
    if (response) {
      let responseArray = response.split("**");
      let formatedResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 0) {
          formatedResponse += responseArray[i];
        } else {
          formatedResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      const newResponse = formatedResponse.replace(/\n/g, "<br />");
      setResultData(newResponse);
    } else {
      // Mensagem de erro para o usuário se a API falhar
      setResultData("Desculpe, ocorreu um erro ao buscar a resposta. Por favor, tente novamente.");
    }
    
    setLoading(false);
    setInput("");
  };
  const handleReloadPage = () => {
      window.location.reload();
    };
  // ALTERAÇÃO 3: O 'Enter' agora chama onSentApi com o valor do input
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSentApi(input);
    }
  };

  // ALTERAÇÃO 4: O clique no card agora chama onSentApi diretamente com o texto do card
  const handleCardClick = (text) => {
    onSentApi(text);
  };

  return (
    <div className="main">
      <div className="nav" onClick={handleReloadPage}>
        <p>Transtorno do Espectro Autista (TEA)</p>
        <p onClick={() => newChat()} data-alt="Novo chat">Tire suas dúvidas sobre Transtorno do Espectro Autista (TEA)</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>“Olá! Como posso te ajudar? </span></p>
              <p>Bem-vindo! Tire suas dúvidas sobre o Transtorno do Espectro Autista (TEA).</p>
            </div>
            <div className="cards">
              {/* CADA CARD AGORA CHAMA handleCardClick */}
              <div className="card" onClick={() => handleCardClick('Entenda o que é o Transtorno do Espectro Autista e suas principais características.')}>
                <p>Entenda o que é o Transtorno do Espectro Autista e suas principais características.</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick('Como é feito o diagnóstico do TEA e quais profissionais estão envolvidos.')}>
                <p>Como é feito o diagnóstico do TEA e quais profissionais estão envolvidos.</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick('Conheça os sinais mais frequentes do autismo em diferentes idades.')}>
                <p>Conheça os sinais mais frequentes do autismo em diferentes idades.</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick('O que se sabe sobre as possíveis causas do TEA até hoje.')}>
                <p>O que se sabe sobre as possíveis causas do TEA até hoje.</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.dummy_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.user_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr /><hr /><hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder="Entre com sua pergunta aqui"
            />
            <div>
              {/* ALTERAÇÃO 5: O botão de envio também chama onSentApi com o valor do input */}
              <img onClick={() => onSentApi(input)} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Este assistente utiliza uma base de dados com informações sobre o Transtorno do Espectro Autista (TEA). Algumas respostas são geradas por IA e podem conter imprecisões. Consulte fontes oficiais sempre que necessário.
          </p>
          <footer className="bottom-info">
          <p>
            Desenvolvido por{' '}
            <a href="https://github.com/AthosTelini" target="_blank" rel="noopener noreferrer">
              Athos Telini
            </a>{' '}
            e{' '}
            <a href="https://github.com/GustavoAlvesLuiz" target="_blank" rel="noopener noreferrer">
              Gustavo Alves Luiz
            </a>
            .
          </p>
          <p>
            Trabalho para a disciplina de Inteligência Artificial II (Prof. Matheus Eloy Franco).
          </p>
          <p>Sistemas de Informação - IFSULDEMINAS, Campus Machado © 2025</p>
        </footer>
        </div>
      </div>
    </div>
  );
};

export default Painel;