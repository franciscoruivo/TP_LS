import React from "react";

const Relogio = ({ Tempo1, Tempo2, NomeJogador2 }) => {
  const formatarTempo = (tempo) => {
    const minutos = Math.floor(tempo / 60000);
    const segundos = Math.floor((tempo % 60000) / 1000);
    return `${minutos.toString().padStart(2, "0")}:${segundos
      .toString()
      .padStart(2, "0")}`;
  };

  if (!NomeJogador2) {
    if (Tempo1 === 0) {
      NomeJogador2 = "Bom Jogo!";
    } else {
      NomeJogador2 = "CPU";
    }
  }

  return (
    <div className="TempoComponent">
      <p className="RelogioContainer Jogador1">
        <span>Tempo: {formatarTempo(Tempo1)}</span>
      </p>
      <p className="RelogioContainer Jogador2">
        <span>Tempo: {formatarTempo(Tempo2)}</span>
      </p>
    </div>
  );
};

export default Relogio;
