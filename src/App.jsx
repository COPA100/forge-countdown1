import { useState } from 'react'
import './App.css'

function Square() {
  const [mark, setMark] = useState(null)

  function handleSelect() {
    setMark('X')
  }

  return (
    <button className="square" onClick={handleSelect}>
      {mark}
    </button>
  )
}

export default function Board() {
  const rows = [0, 1, 2]

  return (
    <>
      {rows.map((row) => (
        <div className="board-row" key={row}>
          {rows.map((col) => (
            <Square key={`${row}-${col}`} />
          ))}
        </div>
      ))}
    </>
  )
}
