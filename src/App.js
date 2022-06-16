import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css'
import api from './services/api.js'

function App() {

 


const [ input, setInput ] = useState('') //input é o valor do estado, setInput é para passar o novo valor do estado

const [cep, setCep] = useState({});

async function Pesquisar(){ //função assincrona
  if (input === ""){
    alert("Preencha algum CEP")
    return;
  }

  try{ //o que quer fazer, mas pode dar errado
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")// deixa o input vazio
  }

  catch{
    alert("Ops, não foi possível encontrar o CEP.")
    setInput("")
  }
}

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep"
        value={input}
        onChange={(evento) => setInput(evento.target.value) } // evento.target.value é o valor do input que está sendo mandado para o setInput
        />

        <div className="botao">
        <button className="buttonSearch" onClick={Pesquisar}>
          <FiSearch size={25} color="#FFF"/>
        </button>
        </div>
    </div>

        {Object.keys(cep).length > 0 && (
           <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

        </main>
        )
        
        }

       

    
<div className="footer">Desenvolvido por: Gabriela Ramires | Para mais aplicações: <a href="https://portfolio-gabi.herokuapp.com/">www.portfolio-gabi.herokuapp.com</a></div>
      
    </div>
    
  );
}

export default App;
