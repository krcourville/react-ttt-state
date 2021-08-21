import { useTicTacToe } from "./ttt-game";

export function Game() {
  const [state, dispatch] = useTicTacToe();
  const { grid, status, turn } = state;

  const handleClick = (x, y) => {
    dispatch({ type: "CLICK", payload: { x, y } });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };
  return (
    <div css={{ display: "inline-block" }}>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.25em",
        }}
      >
        <div>Next turn: {turn}</div>
        <div>{status === "success" ? `${turn} won!` : null}</div>
        <button onClick={reset} type="button">
          Reset
        </button>
      </div>
      <div>
        <Grid grid={grid} handleClick={handleClick}></Grid>
      </div>
    </div>
  );
}

function Grid({ grid, handleClick }) {
  return (
    <div
      css={{
        display: "inline-block",
      }}
    >
      <div
        css={{
          backgroundColor: "#444",
          display: "grid",
          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          gridGap: 2,
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((value, colIdx) => (
            <Cell
              key={`${colIdx}-${rowIdx}`}
              value={value}
              onClick={() => {
                handleClick(colIdx, rowIdx);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

function Cell({ onClick, value }) {
  return (
    <div
      css={{
        backgroundColor: "#fff",
        width: 100,
        height: 100,
      }}
    >
      <button
        css={{
          width: "100%",
          height: "100%",
        }}
        onClick={onClick}
        type="button"
      >
        {value}
      </button>
    </div>
  );
}
