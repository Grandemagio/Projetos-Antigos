import './index.scss';

export default function Formulario() {
    function alterou() {
        alert('você alterou o valor do input!');
    }
    
    function passou() {
        alert('você passou o mouse no input!');
    }

    function clicou() {
        alert('você clicou no botão!');
    }

    return (
        <div className="formulario-pagina">
            <div className="formulario-container">
             <h2 className="titulo">CADASTRO DE FUNCIONÁRIOS</h2>
                
                    <input 
                        onMouseOver={passou} 
                        type="text" 
                        placeholder="lore ipsum dolor sit amet, consectetur adipiscing elit." 
                    />
                

                <input onChange={alterou} type="text" placeholder="Departamento." />
                
                <p className="tipo-funcio">Tipos de Funcionários</p>
                
                <select onChange={alterou}>
                    <option value="opcao1">Opção 1</option>
                    <option value="opcao2">Opção 2</option>
                    <option value="opcao3">Opção 3</option>
                    <option value="opcao4">Opção 4</option>
                </select>

                <div className="opcao">
                    <label>
                        <input type="radio" name="opcao" onChange={alterou} />
                        Efetivo
                    </label>

                    <label>
                        <input type="radio" name="opcao" onChange={alterou} />
                        Temporário
                    </label>
                
                    <label>
                        <input type="radio" name="opcao" onChange={alterou} />
                        Estagiário
                    </label>  
                
                    <label>
                        <input type="radio" name="opcao" onChange={alterou} />
                        Jovem Aprendiz
                    </label>
                </div>

                <button onClick={clicou} className="click">
                    Clique aqui
                </button>
            </div>
        </div>
    );
}