
import './index.scss';

export default function Eventos() {
    function Alterou() {
        alert('você alterou o valor do input!');
    }
    
    function passou() {
        alert('você passou o mouse no input!');
    }


    return (
        <div className="eventos-pagina">
            <div className="eventos-container">
                <h2>Eventos</h2>

                <p onMouseOver={passou}>
                    <input type="text" placeholder="lore ipsum dolor sit amet, consectetur adipiscing elit." />
                </p>

                <input onChange={Alterou} type="text" placeholder="digite algo." />
                
                <select onChange={Alterou}>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                </select>
             <option className='uma-opcao'>Selecione uma opção</option>
       
                <div className="opcao">
                    <label>
                        <input type="radio" name="opcao" />    
                  <label>
                        opcao1
                    </label>

                          <input type="radio" name="opcao" />
                        opcao2
                    </label>
                
                    <label>
                        <input type="radio" name="opcao" />
                        opcao3
                    </label>  
                
                    <label>
                        <input type="radio" name="opcao" />
                        opcao4
                    </label>
                </div>

                <button className='click'>Clique aqui</button>
            </div>
        </div>
    );
}