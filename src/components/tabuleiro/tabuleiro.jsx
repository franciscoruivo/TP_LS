import React, { useState, useEffect } from "react";
import "./tabuleiro.css";
import { MensagemAtualizada, AtualizaJogadaCPU } from "../../App";

export let NumJogosGanhosJogador1 = 0;
export let NumJogosGanhosJogador2 = 0;

export let Jogadores = {
  AtualLetra: "",
  JogadorAtual: "Nenhum",
  NomeJogadorAtual: "Nenhum",
  Jogador1: "",
  NomeJogador1: "",
  Jogador2: "",
  NomeJogador2: "",
};

export function JogadoresAtualizados(NovosJogador) {
  Jogadores = NovosJogador;
}

let AlertaExtra = false;

export function AtualizaNomes(Nome1, Nome2) {
  Jogadores.NomeJogador1 = Nome1;
  Jogadores.NomeJogador2 = Nome2;

  if (Jogadores.AtualLetra === Jogadores.Jogador1) {
    Jogadores.NomeJogadorAtual = Jogadores.NomeJogador1;
  } else {
    Jogadores.NomeJogadorAtual = Jogadores.NomeJogador2;
  }

  if (Jogadores.NomeJogadorAtual === "CPU") {
    AtualizaJogadaCPU(true);
  } else {
    AtualizaJogadaCPU(false);
  }

  if (Jogadores.AtualLetra) {
    if (AlertaExtra) {
      setTimeout(() => {
        MensagemAtualizada({ estado: false });
        MensagemAtualizada({
          estado: true,
          mensagem:
            "🎮 É a vez de " +
            Jogadores.NomeJogadorAtual +
            " [" +
            Jogadores.AtualLetra +
            "]",
        });
        if (AlertaExtra) AlertaExtra = false;
      }, 1000);
    } else {
      MensagemAtualizada({ estado: false });
      MensagemAtualizada({
        estado: true,
        mensagem:
          "🎮 É a vez de " +
          Jogadores.NomeJogadorAtual +
          " [" +
          Jogadores.AtualLetra +
          "]",
      });
    }
  }
}

let Jogos = ["", "", "", "", "", "", "", "", ""];

export let JogoGlobalTerminado = false;

export function AtualizaJogoGlobalTerminado(estado) {
  JogoGlobalTerminado = estado;
}

let LocalOndeJogadaPermitida;

const JogoDoGalo = ({ jogoIndex, JogadaCPU }) => {
  const [Tabuleiro, setTabuleiro] = useState(Array(9).fill(""));
  const [Vencedor, setVencedor] = useState("");
  const [JogoTerminado, setJogoTerminado] = useState(false);

  useEffect(() => {
    if (JogadaCPU) {
      if (Jogadores.NomeJogadorAtual === "CPU") {
        const BoardAtualizada = [...Tabuleiro];

        let index = Math.floor(Math.random() * 9);
        while (BoardAtualizada[index] !== "") {
          index = Math.floor(Math.random() * 9);
        }

        BoardAtualizada[index] = Jogadores.AtualLetra;
        setTabuleiro(BoardAtualizada);

        VerificaJogo(BoardAtualizada);
        TrocaJogador();
        if (Jogos[index] === "") {
          LocalOndeJogadaPermitida = index;
        } else {
          let NovoIndex = Math.floor(Math.random() * 9);
          while (Jogos[NovoIndex] !== "") {
            NovoIndex = Math.floor(Math.random() * 9);
          }
          LocalOndeJogadaPermitida = NovoIndex;

          AlertaExtra = true;

          if (!JogoTerminado) {
            MensagemAtualizada({ estado: false });
            MensagemAtualizada({
              estado: true,
              mensagem: "🚫 Tabuleiro destino já está completo",
            });
          }
        }
      }
    }
    // talvez nao devia comentar isto
    // eslint-disable-next-line
  }, [JogadaCPU, Tabuleiro]);

  if (!JogoGlobalTerminado) {
    if (Jogadores.AtualLetra) {
      if (AlertaExtra) {
        setTimeout(() => {
          MensagemAtualizada({ estado: false });
          MensagemAtualizada({
            estado: true,
            mensagem:
              "🎮 É a vez de " +
              Jogadores.NomeJogadorAtual +
              " [" +
              Jogadores.AtualLetra +
              "]",
          });
          if (AlertaExtra) AlertaExtra = false;
        }, 1000);
      } else {
        MensagemAtualizada({ estado: false });
        MensagemAtualizada({
          estado: true,
          mensagem:
            "🎮 É a vez de " +
            Jogadores.NomeJogadorAtual +
            " [" +
            Jogadores.AtualLetra +
            "]",
        });
      }
    }
  }

  const ManipulaClick = (index) => {
    if (!JogoTerminado && !JogoGlobalTerminado && Tabuleiro[index] === "") {
      if (!LocalOndeJogadaPermitida) {
        const BoardAtualizada = [...Tabuleiro];
        BoardAtualizada[index] = Jogadores.AtualLetra;
        setTabuleiro(BoardAtualizada);
        VerificaJogo(BoardAtualizada);
        TrocaJogador();
        if (Jogos[index] === "") {
          LocalOndeJogadaPermitida = index;
        } else {
          let NovoIndex = Math.floor(Math.random() * 9);
          while (Jogos[NovoIndex] !== "") {
            NovoIndex = Math.floor(Math.random() * 9);
          }
          LocalOndeJogadaPermitida = NovoIndex;

          AlertaExtra = true;

          if (!JogoTerminado) {
            MensagemAtualizada({ estado: false });
            MensagemAtualizada({
              estado: true,
              mensagem: "🚫 Tabuleiro destino já está completo",
            });
          }
        }
      } else {
        if (LocalOndeJogadaPermitida === jogoIndex) {
          const BoardAtualizada = [...Tabuleiro];
          BoardAtualizada[index] = Jogadores.AtualLetra;
          setTabuleiro(BoardAtualizada);
          VerificaJogo(BoardAtualizada);
          TrocaJogador();
          if (Jogos[index] === "") {
            LocalOndeJogadaPermitida = index;
          } else {
            let NovoIndex = Math.floor(Math.random() * 9);
            while (Jogos[NovoIndex] !== "") {
              NovoIndex = Math.floor(Math.random() * 9);
            }
            LocalOndeJogadaPermitida = NovoIndex;

            AlertaExtra = true;

            if (!JogoTerminado) {
              MensagemAtualizada({ estado: false });
              MensagemAtualizada({
                estado: true,
                mensagem: "🚫 Tabuleiro destino já está completo",
              });
            }
          }
        }
      }
    }
  };

  const TrocaJogador = () => {
    if (Jogadores.JogadorAtual === "Jogador1") {
      Jogadores.JogadorAtual = "Jogador2";
      Jogadores.NomeJogadorAtual = Jogadores.NomeJogador2;
      Jogadores.AtualLetra = Jogadores.Jogador2;
    } else {
      Jogadores.JogadorAtual = "Jogador1";
      Jogadores.NomeJogadorAtual = Jogadores.NomeJogador1;
      Jogadores.AtualLetra = Jogadores.Jogador1;
    }

    JogadoresAtualizados(Jogadores);

    if (Jogadores.NomeJogadorAtual) {
      AtualizaJogadaCPU(true);
    } else {
      AtualizaJogadaCPU(false);
    }
  };

  // maybe a algum problema xD
  // eslint-disable-next-line
  useEffect(() => {
    if (Tabuleiro.includes("")) {
      VerificaJogo(Tabuleiro);
    } else {
      if (Jogos[jogoIndex] === "") {
        // Empate
        Jogos[jogoIndex] = "E";
      }

      if (Jogos[jogoIndex] !== "") {
        let NovoIndex = Math.floor(Math.random() * 9);
        while (Jogos[NovoIndex] !== "") {
          NovoIndex = Math.floor(Math.random() * 9);
        }
        LocalOndeJogadaPermitida = NovoIndex;

        AlertaExtra = true;

        if (!JogoTerminado) {
          MensagemAtualizada({ estado: false });
          MensagemAtualizada({
            estado: true,
            mensagem: "🚫 Tabuleiro destino já está completo",
          });
        }
      }

      VerificaJogo(Jogos, true);

      setJogoTerminado(true);
    }
  });

  const VerificaJogo = (Tabuleiro, Grande) => {
    const IndexsVitoria = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Linhas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Colunas
      [0, 4, 8],
      [2, 4, 6], // Diagonais
    ];

    if (!JogoTerminado) {
      for (let i = 0; i < IndexsVitoria.length; i++) {
        const [a, b, c] = IndexsVitoria[i];

        if (
          Tabuleiro[a] &&
          Tabuleiro[a] === Tabuleiro[b] &&
          Tabuleiro[a] === Tabuleiro[c]
        ) {
          if (!Grande) {
            setVencedor(Jogadores.NomeJogadorAtual);
            setJogoTerminado(true);
            GuardaResultadoJogo(jogoIndex, Tabuleiro[a]);
          } else {
            if (AlertaExtra) {
              // eslint-disable-next-line
              setTimeout(() => {
                MensagemAtualizada({ estado: false });
                MensagemAtualizada({
                  estado: true,
                  mensagem:
                    "🎉 Jogo Terminado! Vencedor: " +
                    Jogadores.NomeJogadorAtual,
                });
                if (AlertaExtra) AlertaExtra = false;
              }, 1000);
            } else {
              MensagemAtualizada({ estado: false });
              MensagemAtualizada({
                estado: true,
                mensagem:
                  "🎉 Jogo Terminado! Vencedor: " + Jogadores.NomeJogadorAtual,
              });
            }
            JogoGlobalTerminado = true;
            Jogos = ["", "", "", "", "", "", "", "", ""];
          }
          return;
        }
      }

      if (Grande && !JogoTerminado) {
        NumJogosGanhosJogador1 = 0;
        NumJogosGanhosJogador2 = 0;

        let Empate = true;
        Tabuleiro.forEach((Char) => {
          if (Char === "") {
            Empate = false;
          } else if (Char === Jogadores.Jogador2) {
            NumJogosGanhosJogador2 = NumJogosGanhosJogador2 + 1;
          } else if (Char === Jogadores.Jogador1) {
            NumJogosGanhosJogador1 = NumJogosGanhosJogador1 + 1;
          }
        });

        if (Empate) {
          JogoGlobalTerminado = {
            Jogos1: NumJogosGanhosJogador1,
            Jogos2: NumJogosGanhosJogador2,
          };
          Jogos = ["", "", "", "", "", "", "", "", ""];
        }
      }
    }
  };

  const GuardaResultadoJogo = (index, vencedor) => {
    if (!JogoGlobalTerminado) {
      if (Jogos[index] === "") {
        Jogos[index] = vencedor;
      }
      VerificaJogo(Jogos, true);
    }
  };

  return (
    <div className="JogoDoGalo">
      <div
        className={`board ${JogoTerminado ? "finished" : ""}`}
        id={`board-${jogoIndex}`}
      >
        {Tabuleiro.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell}`}
            onClick={() => ManipulaClick(index)}
          >
            <div className="cell-content">{cell}</div>
          </div>
        ))}
        {JogoTerminado && (
          <div className={`Mensagem-Vencedor ${Vencedor ? "winner" : ""}`}>
            <div className="Mensagem-Vencedor-Texto">
              {Vencedor ? `Vencedor: ${Vencedor}` : "Empate!"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JogoDoGalo;
