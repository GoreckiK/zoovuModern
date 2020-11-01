import React, { useState } from 'react';
import './App.css';
import { WelcomeComponent } from './components/WelcomeComponent';
import { GameComponent } from './components/GameComponent';

function App() {
    const [name, setName] = useState<string>();

    return (
        <div className="App">
            { name ? <GameComponent name={name} /> : <WelcomeComponent setName={setName}/>}
        </div>
    );
}
    
    export default App;
