import React, { useState, useEffect } from "react";
import "./menu.css";
import Relogio from "./relogio";
import { Jogadores } from "../tabuleiro/tabuleiro";
import { MensagemAtualizada,  } from "../../App";
import { JogoGlobalTerminado, AtualizaNomes, NumJogosGanhosJogador1, NumJogosGanhosJogador2, AtualizaJogoGlobalTerminado } from "../tabuleiro/tabuleiro";

function Menu({ onSubmit }) {
  const [Jogador1, setJogador1] = useState("");
  const [Jogador2, setJogador2] = useState("");
  const [ContraCPU, setContraCPU] = useState(false);
  const [MostrarJogo, setMostrarJogo] = useState(false);
  const [TempoJogador1, setTempoJogador1] = useState(0);
  const [TempoJogador2, setTempoJogador2] = useState(0);
  const [TempoLimite, setTempoLimite] = useState(10);

  const handleSliderChange = (event) => {
    setTempoLimite(parseInt(event.target.value));
  };

  useEffect(() => {
    let tempoInicio;
    let Timer;

    if (JogoGlobalTerminado) {
      if (JogoGlobalTerminado.Jogos1) {
        if (TempoJogador2 > TempoJogador1) {
          MensagemAtualizada({ estado: false });
          MensagemAtualizada({
            estado: true,
            mensagem:
              "🎉 Jogo Terminado! Vencedor: " +
              Jogadores.NomeJogador1 +
              " (por ter usado menos tempo)",
          });
        } else if (TempoJogador1 > TempoJogador2) {
          MensagemAtualizada({ estado: false });
          MensagemAtualizada({
            estado: true,
            mensagem:
              "🎉 Jogo Terminado! Vencedor: " +
              Jogadores.NomeJogador2 +
              " (por ter usado menos tempo)",
          });
        } else {
          if (JogoGlobalTerminado.Jogos1 > JogoGlobalTerminado.Jogos2) {
            MensagemAtualizada({ estado: false });
            MensagemAtualizada({
              estado: true,
              mensagem:
                "🎉 Jogo Terminado! Vencedor: " + Jogadores.NomeJogador1,
            });
          } else {
            MensagemAtualizada({ estado: false });
            MensagemAtualizada({
              estado: true,
              mensagem:
                "🎉 Jogo Terminado! Vencedor: " + Jogadores.NomeJogador2,
            });
          }
        }
        setMostrarJogo(false);
        setTempoJogador1(0);
        setTempoJogador2(0);
      } else {
        setMostrarJogo(false);
        setTempoJogador1(0);
        setTempoJogador2(0);
      }
    }

    let tempoLimiteMs = TempoLimite * 60000;

    if (MostrarJogo) {
      tempoInicio = Date.now();
      const executeCode = () => {
        const tempoAtual = Date.now();
        const tempoPassado = tempoAtual - tempoInicio;


        if (Jogadores.JogadorAtual === "Jogador1") {
          setTempoJogador1(TempoJogador1 + tempoPassado);

          if(TempoJogador1>=tempoLimiteMs){
            if (NumJogosGanhosJogador1 > NumJogosGanhosJogador2) {
              MensagemAtualizada({ estado: false });
              MensagemAtualizada({
                estado: true,
                mensagem:
                  "🎉 Jogo Terminado! Vencedor: " + Jogadores.NomeJogador1,
              });
            } else {
              MensagemAtualizada({ estado: false });
              MensagemAtualizada({
                estado: true,
                mensagem:
                  "🎉 Jogo Terminado! Vencedor: " + Jogadores.NomeJogador2,
              });
            }
            
            AtualizaJogoGlobalTerminado(true);
            setMostrarJogo(false);
            setTempoJogador1(0);
            setTempoJogador2(0);
          }

        } else {
          setTempoJogador2(TempoJogador2 + tempoPassado);
          
          if(TempoJogador2>=tempoLimiteMs){
            if (NumJogosGanhosJogador1 > NumJogosGanhosJogador2) {
              MensagemAtualizada({ estado: false });
              MensagemAtualizada({
                estado: true,
                mensagem:
                  "🎉 Jogo Terminado! Vencedor: " + Jogadores.NomeJogador1,
              });
            } else {
              MensagemAtualizada({ estado: false });
              MensagemAtualizada({
                estado: true,
                mensagem:
                  "🎉 Jogo Terminado! Vencedor: " + Jogadores.NomeJogador2,
              });
            }
            
            AtualizaJogoGlobalTerminado(true);
            setMostrarJogo(false);
            setTempoJogador1(0);
            setTempoJogador2(0);
          }
        }

        Timer = setTimeout(executeCode, 1000);
      };

      Timer = setTimeout(executeCode, 1000);
    }

    return () => {
      clearTimeout(Timer);
    };
  }, [MostrarJogo, Jogador1, Jogador2, TempoJogador1, TempoJogador2, TempoLimite]);

  const InputNomeJogador1 = (e) => {
    setJogador1(e.target.value);
    Jogadores.NomeJogador1 = Jogador1;
  };

  const InputNomeJogador2 = (e) => {
    setJogador2(e.target.value);
    Jogadores.NomeJogador2 = Jogador2;
  };

  const InputJogarContraCPU = () => {
    setContraCPU(!ContraCPU);
    if (!ContraCPU) {
      setJogador2("CPU");
    }
  };

  const InputBotaoComecarParar = (e) => {
    e.preventDefault();
    if (((Jogador1 !== "") && (Jogador2 !== ""))) {
      onSubmit(Jogador1, Jogador2);
      setMostrarJogo(true);
      setTempoJogador1(0);
      setTempoJogador2(0);
      setTimeout(() => {
        AtualizaNomes(Jogador1, Jogador2);
      }, 1000);
    }
  };

  const AlternaBotao = () => {
    setMostrarJogo(false);
    setTempoJogador1(0);
    setTempoJogador2(0);
  };

  return (
    <div className={`Menu ${MostrarJogo ? "MostrarJogo" : ""}`}>
      <h2>Tic Tac Toe Ultimate!</h2>
      {!MostrarJogo ? (
        <form onSubmit={InputBotaoComecarParar}>
          <label>
            Jogador 1:
            <input type="text" value={Jogador1} onChange={InputNomeJogador1} />
          </label>
          <label>
            Jogador 2:
            {ContraCPU ? (
              <input type="text" value="" disabled />
            ) : (
              <input
                type="text"
                value={Jogador2}
                onChange={InputNomeJogador2}
              />
            )}
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={ContraCPU}
              onChange={InputJogarContraCPU}
            />
            Contra CPU
          </label>
          <div className="slider-container">
            <label>Tempo:</label>
            <div className="slider">
              <input
                type="range"
                min={10}
                max={20}
                step={5}
                value={TempoLimite}
                onChange={handleSliderChange}
              />
            </div>
            <span className="slider-value">{TempoLimite} m</span>
          </div>
          <button type="submit">Começar Jogo</button>
        </form>
      ) : (
        <div>
          <div className="GameSection">
            <button className="SettingsButton" onClick={AlternaBotao}>
              ⚙️ Definições
            </button>
          </div>
          {Jogadores.Jogador1 === "X" ? (
            <div className="RelogioContainer">
              <Relogio
                Tempo1={TempoJogador1}
                Tempo2={TempoJogador2}
                NomeJogador2={Jogador2}
              />
            </div>
          ) : (
            <div className="RelogioContainer">
              <Relogio
                Tempo1={TempoJogador2}
                Tempo2={TempoJogador1}
                NomeJogador2={Jogador1}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Menu;
