
import './App.css';
import Chat from "./components/chat/Chat";

const api_url = "https://edikdolynskyi.github.io/react_sources/messages.json";

function App() {
  return (
    <div className="App">
         <Chat url={api_url}/>
    </div>
  );
}

export default App;
