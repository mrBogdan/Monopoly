import React from 'react';
import Board from './components/Board';
import './styles/App.css';
import {Counter, Timer} from './components/Counter';

function App() {
    return (
        <div className="App">
            <Counter/>
            <Timer />
            <Board/>
        </div>
    );
}

export default App;
