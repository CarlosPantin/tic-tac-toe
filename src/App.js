import React, { Component } from 'react';
import Board from './components/Board';
import Confetti from 'react-confetti';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    };
  }

  handleClick(index) {
    if (this.state.squares[index] || this.state.winner) {
      return;
    }

    const squares = [...this.state.squares];
    squares[index] = this.state.currentPlayer;
    const winner = this.calculateWinner(squares);
    const currentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';

    this.setState({
      squares,
      currentPlayer,
      winner,
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

  
    if (squares.every((square) => square)) {
      return 'Tie';
    }

    return null;
  }

  resetGame() {
    this.setState({
      squares: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    });
  }

  render() {
    const status = this.state.winner
      ? this.state.winner === 'Tie'
        ? 'It\'s a Tie!'
        : `Winner: ${this.state.winner}`
      : `Next player: ${this.state.currentPlayer}`;

    return (
      <div className="app">
        <h1>Tic-Tac-Toe</h1>
        {this.state.winner && this.state.winner !== 'Tie' && <Confetti />}
        <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)} />
        <div className="game-status">{status}</div>
        {(this.state.winner || this.state.squares.every((square) => square)) && (
          <button onClick={() => this.resetGame()} className="button">
            Play Again
          </button>
        )}
      </div>
    );
  }
}

export default App;
