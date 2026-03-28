import { useState } from 'react'
import './App.css'

function Square({ value, onSelect, isWinningSquare }) {
  return (
    <button
      className={`square ${isWinningSquare ? 'winning-square' : ''}`.trim()}
      onClick={onSelect}
    >
      {value}
    </button>
  )
}

function Board({ cells, isXTurn, onPlay }) {
  const winnerInfo = detectWinner(cells)

  function handleSelect(index) {
    if (cells[index] || winnerInfo) {
      return
    }

    const updatedCells = cells.slice()
    updatedCells[index] = isXTurn ? 'X' : 'O'
    onPlay(updatedCells)
  }

  const winner = winnerInfo?.winner
  const isDraw = !winner && cells.every(cell => cell !== null)
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? 'Result: Draw'
      : `Next player: ${isXTurn ? 'X' : 'O'}`

  const boardRows = []
  for (let row = 0; row < 3; row += 1) {
    const squares = []
    for (let col = 0; col < 3; col += 1) {
      const index = row * 3 + col
      squares.push(
        <Square
          key={index}
          value={cells[index]}
          onSelect={() => handleSelect(index)}
          isWinningSquare={winnerInfo?.line.includes(index) ?? false}
        />,
      )
    }

    boardRows.push(
      <div key={row} className="board-row">
        {squares}
      </div>,
    )
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [moveIndex, setMoveIndex] = useState(0)
  const [isAscending, setIsAscending] = useState(true)

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

  const moveButtons = history.map((cells, move) => {
    let description

    if (move === 0) {
      description = 'Go to game start'
    } else {
      const previousCells = history[move - 1]
      const changedIndex = cells.findIndex((cell, idx) => cell !== previousCells[idx])
      const row = Math.floor(changedIndex / 3) + 1
      const col = (changedIndex % 3) + 1
      description = `Go to move #${move} (${col}, ${row})`
    }

    if (move === moveIndex) {
      return (
        <li key={move} className="current-move">
          {description}
        </li>
      )
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  if (!isAscending) {
    moveButtons.reverse()
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board cells={currentCells} isXTurn={isXTurn} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button
          type="button"
          className="sort-button"
          onClick={() => setIsAscending(prev => !prev)}
        >
          Sort: {isAscending ? 'Ascending' : 'Descending'}
        </button>
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
      return {
        winner: cells[a],
        line: [a, b, c],
      }
    }
  }

  return null
}
