import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square.jsx"
import { TURNS} from "./const.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.O)

  const [winner, setWinner] = useState(null) /*null = no hay ganador, false = empate*/

  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    
    setWinner(null)
  }

  const changeTurn = () => {
    resetGame()
    if (turn === TURNS.X) {
      setTurn(TURNS.O)
    } else if (turn === TURNS.O) {
      setTurn(TURNS.X)
    }
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return

    const newBoard = [ ... board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Comenzar de nuevo</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <button onClick={changeTurn}>
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
        </button>
        <button onClick={changeTurn}> 
          <Square isSelected={turn != TURNS.X}>
            {TURNS.O}
          </Square>
        </button>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
