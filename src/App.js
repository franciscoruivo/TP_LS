import { useState, useEffect, useCallback } from "react";
import { BackGround, Menu, Tabuleiro } from "./components";
import {
  JogadoresAtualizados,
  JogoGlobalTerminado,
  AtualizaJogoGlobalTerminado,
} from "./components/tabuleiro/tabuleiro";
import "./assets/styles/App.css";
import "./components/background/background.css";

let MensagemGlobal = {
  estado: false,
  mensagem: "",
};

export function MensagemAtualizada(novaMensagem) {
  if (novaMensagem.estado) {
    MensagemGlobal.estado = true;
    MensagemGlobal.mensagem = novaMensagem.mensagem;
  } else {
    MensagemGlobal.estado = false;
    MensagemGlobal.mensagem = "";
  }
}

let JogadaCPU = false;
export function AtualizaJogadaCPU(estado) {
  JogadaCPU = estado;
}

let Jogadores = {
  AtualLetra: "",
  JogadorAtual: "Nenhum",
  NomeJogadorAtual: "Nenhum",
  Jogador1: "",
  NomeJogador1: "",
  Jogador2: "",
  NomeJogador2: "",
};

function App() {
  const [JogoAtivo, setJogoAtivo] = useState(false);
  const [Mensagem, setMensagem] = useState("");
  const [MostraMensagem, setMostraMensagem] = useState(false);

  const AbreMenu = useCallback(() => {
    if (JogoGlobalTerminado) {
      setJogoAtivo(false);
      AtualizaJogoGlobalTerminado(false);
      setTimeout(() => {
        setJogoAtivo(true);
      }, 100);
    } else {
      setJogoAtivo(true);
    }
  }, []);

  useEffect(() => {
    JogadoresAtualizados(Jogadores);
  }, [JogoAtivo]);

  useEffect(() => {
    let timer;

    const executeCode = () => {
      if (MensagemGlobal.estado) {
        setMostraMensagem(true);
        console.log(MensagemGlobal.mensagem)
        setMensagem(MensagemGlobal.mensagem);
      } else {
        setMostraMensagem(false);
      }
    };

    timer = setInterval(executeCode, 400);

    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    let timer;

    const executeCode = () => {
      if (JogoGlobalTerminado) {
        Jogadores = {
          AtualLetra: "",
          JogadorAtual: "Nenhum",
          NomeJogadorAtual: "Nenhum",
          Jogador1: "",
          NomeJogador1: "",
          Jogador2: "",
          NomeJogador2: "",
        };
      }
    };

    timer = setInterval(executeCode, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    if (JogoAtivo) {
      const LetraJogador1 = Math.random() < 0.5 ? "X" : "O";
      const LetraJogador2 = LetraJogador1 === "X" ? "O" : "X";

      Jogadores.JogadorAtual = Math.random() < 0.5 ? "Jogador1" : "Jogador2";
      Jogadores.Jogador1 = LetraJogador1;
      Jogadores.Jogador2 = LetraJogador2;

      if (Jogadores.JogadorAtual === "Jogador1") {
        Jogadores.AtualLetra = Jogadores.Jogador1;
      } else {
        Jogadores.AtualLetra = Jogadores.Jogador2;
      }

      JogadoresAtualizados(Jogadores);
    } else {
      Jogadores = {
        AtualLetra: "",
        JogadorAtual: "Nenhum",
        NomeJogadorAtual: "Nenhum",
        Jogador1: "",
        NomeJogador1: "",
        Jogador2: "",
        NomeJogador2: "",
      };
    }
  }, [JogoAtivo]);
  
  return (
    <div className="App">
      <BackGround />
      <Menu onSubmit={AbreMenu} />

      {MostraMensagem && (
        <div className="alert">
          <div className="alert-text">{Mensagem}</div>
        </div>
      )}

      {JogoAtivo && (
        <div className="Caixa-Tabuleiros">
          {[...Array(9)].map((_, index) => (
            <Tabuleiro key={index} jogoIndex={index} JogadaCPU={JogadaCPU} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
