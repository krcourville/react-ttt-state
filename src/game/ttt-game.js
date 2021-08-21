import React from "react";

import { flatten, clone } from "../utils";

export function useTicTacToe() {
  return React.useReducer(reducer, getInitialState());
}

const NEXT_TURN = {
  O: "X",
  X: "O",
};

function reducer(state, action) {
  const { type, payload } = action;
  if (state.status === "success" && action.type !== "RESET") {
    return state;
  }
  switch (type) {
    case "RESET": {
      return getInitialState();
    }
    case "CLICK": {
      const { x, y } = payload;
      const { grid, turn } = state;

      if (grid[y][x]) {
        return state;
      }

      const nextState = clone(state);
      nextState.grid[y][x] = turn;

      const flatGrid = flatten(nextState.grid);

      if (checkForWin(flatGrid)) {
        nextState.status = "success";
        return nextState;
      }

      if (checkForDraw(flatGrid)) {
        return getInitialState();
      }

      nextState.turn = NEXT_TURN[turn];

      return nextState;
    }

    default: {
      return state;
    }
  }
}

function getInitialState() {
  return {
    grid: newTicTacToeGrid(),
    turn: "X",
    status: "inProgress",
  };
}

function newTicTacToeGrid() {
  return generateGrid(3, 3, () => null);
}

function generateGrid(rows, columns, mapper) {
  return Array(rows)
    .fill(null)
    .map(() => Array(columns).fill(null).map(mapper));
}

function matchTree(a, b, c) {
  if (!a || !b || !c) return false;

  return a === b && b === c;
}

function checkForWin(flatGrid) {
  // prettier-ignore
  const [
      nw, n, ne, 
       w, c, e, 
      sw, s, se
    ] = flatGrid;

  return (
    // horizontals
    matchTree(nw, n, ne) ||
    matchTree(w, c, e) ||
    matchTree(sw, s, se) ||
    // verticals
    matchTree(nw, w, sw) ||
    matchTree(n, c, s) ||
    matchTree(ne, e, se) ||
    // diagonal
    matchTree(nw, c, se) ||
    matchTree(sw, c, ne)
  );
}

function checkForDraw(flatGrid) {
  return (
    !checkForWin(flatGrid) &&
    flatGrid.filter(Boolean).length === flatGrid.length
  );
}
