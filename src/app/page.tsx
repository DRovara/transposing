"use client"

import Game from "./game";
import React, { useEffect } from "react";
import Menu from "./menu";
import { GameState } from "@/model/game-state";

function preventTouchActions() {
  document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
  });
  
  document.addEventListener("gesturechange", function (e) {
    e.preventDefault();
  
  });
  document.addEventListener("gestureend", function (e) {
      e.preventDefault();
  });
}

export default function Home() {
  const [inGame, setInGame] = React.useState(false);
  const [gameState, setGameState] = React.useState<GameState | null>(null);
  useEffect(() => {
    preventTouchActions();
    const newGameState = new GameState();
    setGameState(newGameState);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {
        !inGame ? (
          <Menu lastScore={gameState?.score} onStart={(selected) => {
            const possibleBases: number[][] = [[], []];
            for(let i = 0; i < 2; i++) {
              if (selected[i].includes("Eb")) {
                possibleBases[i].push(3);
              }
              if (selected[i].includes("Bb")) {
                possibleBases[i].push(10);
              }
              if (selected[i].includes("F")) {
                possibleBases[i].push(5);
              }
              if (selected[i].includes("C")) {
                possibleBases[i].push(0);
              }
            }
            gameState!.start();
            gameState!.randomise(possibleBases);
            setInGame(true);
          }}></Menu>
        ) : (
          <Game gameState={gameState!} onEnd={() => {
            setInGame(false);
          }}></Game>
        )
      }
      
    </div>
  );
}
