import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square.jsx"
import { TURNS} from "./const.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { Aside } from "./components/Aside.jsx"
import { saveGameToStorage, resetGameStorage } from "./logic/Storage/index.js"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.O
  })

  const [winner, setWinner] = useState(null) /*null = no hay ganador, false = empate*/
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)

    resetGameStorage()
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

    saveGameToStorage({ 
      board: newBoard, 
      turn: newTurn
    })

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
    <Aside>
  
    </Aside>
      <h1>Tic Tac Toe</h1>
      <button className="resetGameButton" onClick={resetGame}>Comenzar de nuevo</button>
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
        <button className="turnButton" onClick={changeTurn}>
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
        </button>
        <button className="turnButton" onClick={changeTurn}> 
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
