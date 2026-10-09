import { useState } from 'react';
import './index.scss';

export default function Descricao() {
 
  const [descricao, setDescricao] = useState('Eu amo as aulas do professor Robson');
  const [mudar2, setMudar2] = useState('Robson');

  
  const [gostaDeProgramar, setGostaDeProgramar] = useState(false);

 
  const [corFundo, setCorFundo] = useState('#ffffff');
  const [corCaixa, setCorCaixa] = useState('#0000ff');

  
  function MudarFrase(e) {
    setDescricao(e.target.value);
  }

  function MudarNome(e) {
    setMudar2(e.target.value);
  }

 
  function MudarCheckbox(e) {
    setGostaDeProgramar(e.target.checked);
  }

  function MudarCorFundo(e) {
    let novovalor = e.target.value;
    setCorFundo(novovalor);
    document.body.style.backgroundColor = novovalor;
  }

  function MudarCorCaixa(e) {
    let novovalor = e.target.value;
    setCorCaixa(novovalor);
  }

  
  document.documentElement.style.setProperty('--bg-tema-2', corCaixa);

  return (
    <div className="container">
      
      <section>
        <h1>{descricao}</h1>
        
        <input 
          type="text" 
          className="input-colorido"
          value={descricao}
          onChange={MudarFrase} 
          placeholder="Digite algo aqui..." 
        />

        <button onClick={() => setDescricao('Eu amo as aulas do professor Robson')}>
          Amo
        </button>
        <button onClick={() => setDescricao('Eu odeio as aulas do professor Robson')}>
          Odeio
        </button>
      </section>

      <hr className="divisor" />

     
      <section>
        <h1>{mudar2}</h1>

        <input 
          type="text" 
          className="input-colorido"
          value={mudar2}
          onChange={MudarNome} 
          placeholder="Digite algo aqui..." 
        />

        <select value={mudar2} onChange={MudarNome}>
          <option value="Robson">Robson</option>
          <option value="Bruno">Bruno</option>
          <option value="Diogo">Diogo</option>
        </select>
      </section>

      <hr className="divisor" />

      
      <section>
        <label className="label-checkbox">
          <h1>Perguntas</h1>
          <input 
            type="checkbox" 
            className="input-checkbox"
            checked={gostaDeProgramar} 
            onChange={MudarCheckbox} 
          />
          Você gosta de programar?
        </label>

        <p className="mensagem-resposta">
          {gostaDeProgramar ? ' Que legal! Programar é incrível!' : ' Que pena... quem sabe no futuro!'}
        </p>
      </section>

      <hr className="divisor" />

      
      <section>
        <h2>Cor do Fundo da Página: {corFundo}</h2>
        <label className="label-cor">
          <span>Escolha a cor de fundo da página:</span>
          <input 
            type="color" 
            className="input-color-circle"
            value={corFundo} 
            onChange={MudarCorFundo} 
          />
        </label>

        <div className="caixa-tema-2">
          Cor do Input e da Caixa: {corCaixa}
        </div>

        <label className="label-cor">
          <span>Escolha a cor dos inputs e da caixa:</span>
          <input 
            type="color" 
            className="input-color-circle"
            value={corCaixa} 
            onChange={MudarCorCaixa} 
          />
        </label>
      </section>
    </div>
  );
}