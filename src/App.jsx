import { useState } from 'react'
import './App.css'

function Square({ value, onSelect }) {
  return (
    <button className="square" onClick={onSelect}>
      {value}
    </button>
  )
}

function Board({ cells, isXTurn, onPlay }) {
  function handleSelect(index) {
    if (cells[index] || detectWinner(cells)) {
      return
    }

    const updatedCells = cells.slice()
    updatedCells[index] = isXTurn ? 'X' : 'O'
    onPlay(updatedCells)
  }

  const winner = detectWinner(cells)
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXTurn ? 'X' : 'O'}`

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={cells[0]} onSelect={() => handleSelect(0)} />
        <Square value={cells[1]} onSelect={() => handleSelect(1)} />
        <Square value={cells[2]} onSelect={() => handleSelect(2)} />
      </div>
      <div className="board-row">
        <Square value={cells[3]} onSelect={() => handleSelect(3)} />
        <Square value={cells[4]} onSelect={() => handleSelect(4)} />
        <Square value={cells[5]} onSelect={() => handleSelect(5)} />
      </div>
      <div className="board-row">
        <Square value={cells[6]} onSelect={() => handleSelect(6)} />
        <Square value={cells[7]} onSelect={() => handleSelect(7)} />
        <Square value={cells[8]} onSelect={() => handleSelect(8)} />
      </div>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [moveIndex, setMoveIndex] = useState(0)

  const isXTurn = moveIndex % 2 === 0
  const currentCells = history[moveIndex]

  function handlePlay(nextCells) {
    const trimmedHistory = history.slice(0, moveIndex + 1)
    const nextHistory = [...trimmedHistory, nextCells]
    setHistory(nextHistory)
    setMoveIndex(nextHistory.length - 1)
  }

  function jumpTo(move) {
    setMoveIndex(move)
  }

  const moveButtons = history.map((_, move) => {
    const label = move === 0 ? 'Go to game start' : `Go to move #${move}`
    const currentLabel =
      move === 0 ? 'You are at game start' : `You are at move #${move}`

    if (move === moveIndex) {
      return <li key={move}>{currentLabel}</li>
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{label}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board cells={currentCells} isXTurn={isXTurn} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moveButtons}</ol>
      </div>
    </div>
  )
}

function detectWinner(cells) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const [a, b, c] of winPatterns) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a]
    }
  }

  return null
}
