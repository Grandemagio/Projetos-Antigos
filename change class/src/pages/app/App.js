import './App.scss'
import  {Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <img src="/assets/images/logo.jpg" alt="logo" />

      <h1>Bem-vindo</h1>

      <Link className='i' to="/contato">
        Ir para Contato
      </Link>
    </div>
  );
}

export default App;