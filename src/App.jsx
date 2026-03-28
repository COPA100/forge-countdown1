import './App.css'

function Square({ value }) {
  return <button className="square">{value}</button>
}

export default function Board() {
  const rows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ]

  return (
    <>
      {rows.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((value) => (
            <Square key={value} value={value} />
          ))}
        </div>
      ))}
    </>
  )
}
