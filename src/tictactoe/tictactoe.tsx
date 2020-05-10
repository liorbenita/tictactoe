import React from 'react';
import  style from './tictactoe.less';

// ts interfaces helps us to idenify problems and to know exactly what each component/function/class should get by type 

interface SquareProps{
    value: number;
    onClick: any;
}
interface SquareState{
    value: null | string;
}
interface BoardProps{
    squares: any[];
    onClick: any;
}
interface GameState{
    stepNumber : number;
    xIsNext: boolean;
    history: any[];
}

// project Component
class TicTacToe extends React.Component {
    render(){
        return(<Game/>)
    }
}
// the game component is the most important one it holds all the functionality 
// of the game , have state, and finding the winner;  
class Game extends React.Component<{},GameState>{
    constructor (props: any){
        super(props)
        this.state = { 
            history: [
                {squares: Array(9).fill(null)}
            ],
            stepNumber: 0,
            xIsNext: true
        };
    }
    calculateWinner(squares:any[]) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }
      // changes the step number , help us to get to different past points in the game / reseting the game (although a quick refresh will do the trick );
    jumpTo(step: number){
        this.setState({
            stepNumber:step,
            xIsNext: (step%2) === 0
        });
    }
    // gets the history and the current state of the squeares
    // check if someone won by now if yes does nothing
    // changes the state  increasing the stepnumber changing whos next and changes the specific square that we clicked on 
    handleClick(i:number){
        const history = this.state.history.slice(0,this.state.stepNumber +1);
        const current  = history[history.length -1];
        const squares = current.squares.slice();
        
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        
        squares[i] = this.state.xIsNext? "X":"O"
        this.setState({
            history:history.concat([{squares:squares}]),
            xIsNext: !(this.state.xIsNext),
            stepNumber: history.length
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
    
        const moves = history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
          return (
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        });
    
        let status;
        if (winner) {
          status = "Winner: " + winner;
        } else {
          status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
    
        return (
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i: any) => {
                    return this.handleClick(i);
                }}
              />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
        );
      }
}
// the board is all the nine squares 
// we render each square sepertly so any change will render the exact square and not more;
class Board extends React.Component<BoardProps,{}> {
    renderSquare(i:(number)){
        return <Square value={this.props.squares[i]}
        onClick ={()=> this.props.onClick(i)} />   
    }
    render(){
        return( 
         <div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
       </div>
    
        )
    }
}
// square is the most little piece of the game repersents a single square of the 9 
// get from parent hes value and the on click method; 
class Square extends React.Component<SquareProps,SquareState> { 
    constructor(props: SquareProps){
        super(props);
       
    }
    render( ){
        return (
            <button className = "square"  onClick={this.props.onClick}>
                {this.props.value} 
            </button>
        )
    }
}
// exporting the tictactoe compoenent so we can us it in app.tsx; 
export default TicTacToe;