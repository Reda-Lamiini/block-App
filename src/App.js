import './App.css';
import { ChatAppProvider } from './context/ChatAppContext';
import CreateAccount from './components/CreateAccount';

function App() {
  return (
    <div className="App">
      <ChatAppProvider>
        <CreateAccount/>
      </ChatAppProvider>
    </div>
  );
}

export default App;
