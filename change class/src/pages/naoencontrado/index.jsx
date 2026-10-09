import { Link } from 'react-router-dom';
import './index.scss'; 


export default function NaoEncontrado() {
  return (
    <div className="notfound">
      <h1 className='notfound-title'>Página não encontrada</h1>

      <img className='not'
        src="/assets/images/notfound.jpg"
        alt="Página não encontrada"
      />
        <div className='voltar'>
      <Link className='i' to="/">
        Voltar para Home
      </Link>
        </div>
    </div>
  );
}