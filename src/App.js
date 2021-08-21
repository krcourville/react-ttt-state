import React from "react";
import { Game } from "./game";

export default function App() {
  return (
    <div css={{ margin: "1em" }}>
      <header>
        <h1>Tic Tac Toe in React</h1>
      </header>
      <Game />
    </div>
  );
}
