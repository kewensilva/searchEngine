import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import "./styles.css";
import api from './service/api';


function App() {
  const [input, setInput] = useState('');

  const [cep, setCep] = useState({});

  const handleCep = (event: any) => {
    const {value} = event.target;
    setInput(value);
  }


  async function handleSearch() {
    if (input === "") {
      alert('Campo não preenchido');
      return;
    }

    try {
      const resp = await api.get(`${input}/json`)
      setCep(resp.data)
      setInput('')
      console.log(resp);
      
    } catch (error) {
      alert("Erro ao Buscar CEP")
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title"> Buscador de Endereço</h1>
      <div className="containerInput">
        <input
          type={""}
          placeholder={"digite seu CEP"}
          value={input}
          onChange={handleCep}
        />
        <button className="search" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />

        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="content">

          <h2> CEP: {cep.cep}</h2>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Estado: {cep.uf} </span>

        </main>

      )}

    </div>
  )
}

export default App
