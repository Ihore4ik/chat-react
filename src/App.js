import React from "react";
import Chat from "./components/chat/Chat";
import './App.css';

function App() {
  return (
    <div className="App">
         <Chat url="https://edikdolynskyi.github.io/react_sources/messages.json"/>
    </div>
  );
}

export default App;
