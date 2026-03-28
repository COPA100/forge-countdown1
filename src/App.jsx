import './App.css'

export default function Board() {
  function renderNumberedSquare(n) {
    return <button className="square">{n}</button>
  }

  return (
    <>
      <div className="board-row">
        {renderNumberedSquare(1)}
        {renderNumberedSquare(2)}
        {renderNumberedSquare(3)}
      </div>
      <div className="board-row">
        {renderNumberedSquare(4)}
        {renderNumberedSquare(5)}
        {renderNumberedSquare(6)}
      </div>
      <div className="board-row">
        {renderNumberedSquare(7)}
        {renderNumberedSquare(8)}
        {renderNumberedSquare(9)}
      </div>
    </>
  )
}
