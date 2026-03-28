import { useState } from 'react'
import './App.css'

function Square({ value, onSelect }) {
  return (
    <button className="square" onClick={onSelect}>
      {value}
    </button>
  )
}

export default function Board() {
  const [isXTurn, setIsXTurn] = useState(true)
  const [cells, setCells] = useState(Array(9).fill(null))

  function handleSelect(index) {
    if (cells[index] || detectWinner(cells)) {
      return
    }

    const updatedCells = cells.slice()
    updatedCells[index] = isXTurn ? 'X' : 'O'
    setCells(updatedCells)
    setIsXTurn(!isXTurn)
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
