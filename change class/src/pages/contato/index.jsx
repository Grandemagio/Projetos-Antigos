
import './index.scss';
import { Link } from 'react-router-dom';


export default function Contato() {
  return (
    <div className="contato">
      <h1>Contato</h1>

      <img  src="/assets/images/link.jpg" alt="Link" />

      <Link className='i' to="/">
        <p className='voltartt'>Voltar para Home</p>
      </Link>
    </div>
  );
}