import { findByLabelText } from '@testing-library/react';
import React, { useState } from 'react';

function App() {
  const [valTela, setValTela] = useState('') 
  const [resultado, setResultado] = useState(0) 
  const [acumulador, setAcumulador] = useState(0) 
  const [operado, setOperado] = useState(false) 

  //COMPONENTES
  const Tela = (valor, res) => {
    return (
      <div style={styleTela}>
        <small style={styleTelaRes}>{res}</small>
        <p style={styleTelaOperacao}>{valor}</p>
      </div>
    )
  }
  const Btn = (label, onClick) => {
    return (
      <button style={styleBtn} onClick={onClick}>{label}</button>
    )
  }

  //FUNÇÕES
  const addDigitoTela = (d) => {
    let lastDig = valTela[valTela.length-1];

    if(lastDig == '.' && d == '.'){
      return;
    }
    
    if((lastDig == '+' || lastDig == '-' || lastDig == '*' || lastDig == '/') && 
      (d == '+' || d == '-' || d == '*' || d == '/')){
        return;
    }
    if((d == '+' || d == '-' || d == '*' || d == '/') && operado){
      setOperado(false)
      setValTela(resultado + d)
      return 
    }
    if(operado){
      setValTela(d)
      setOperado(false)
      return
    }
    const valorDigitadoTela = valTela+d;
    setValTela(valorDigitadoTela)
  }
  const limparMemoria = () => {
    setOperado(false)
    setValTela('')
    setResultado(0)
    setAcumulador(0)
    return
  }
  const operacao = (oper) => {
    if(oper === 'bs'){
      let vtela = valTela;
      vtela = vtela.substring(0,(vtela.length-1));
      setValTela(vtela);
      setOperado(false);
      return
    }
    try { //cálculo
      const res = eval(valTela); 
      setAcumulador(res)
      setResultado(res)
      setOperado(true)
    } catch {
      setResultado('ERRO');
    }
  }

  //ESTILOS
  const cssContainer = {
    display:'flex',
    margin: "0 auto",
    justifyContent:'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: 300,
    border: '1px solid #000'
  }
  const cssBotoes = {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
  const styleTela = {
    display: 'flex',
    paddingLeft:20,
    paddingRight:20,
    justifyContent:'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#444',
    width:260
  }
  const styleTelaOperacao = {
    fontSize: 25,
    color: '#fff',
    height:'20px',
  }
  const styleTelaRes = {
    fontSize: 50,
    color: '#fff',
    height:'20px',
    marginBottom: '5px'
  }
  const styleBtn = {
    fontSize: 30,
    height: 75,
    width: 75,
    padding:20,
    backgroundColor: '#000',
    color:'#fff',
    borderColor: '#000',
    textAlign: 'center',
    outline: 'none'
  }

  return (
    <>
      <div style={cssContainer}>
        <h3>Calculadora Matemática Simples</h3>
        {Tela(valTela, resultado)}
        <div style={cssBotoes}>
          {Btn('AC', limparMemoria)}
          {Btn('(', ()=>addDigitoTela('('))}
          {Btn(')', ()=>addDigitoTela(')'))}
          {Btn('/', ()=>addDigitoTela('/'))}
          {Btn('7', ()=>addDigitoTela('7'))}
          {Btn('8', ()=>addDigitoTela('8'))}
          {Btn('9', ()=>addDigitoTela('9'))}
          {Btn('x', ()=>addDigitoTela('*'))}
          {Btn('4', ()=>addDigitoTela('4'))}
          {Btn('5', ()=>addDigitoTela('5'))}
          {Btn('6', ()=>addDigitoTela('6'))}
          {Btn('-', ()=>addDigitoTela('-'))}
          {Btn('1', ()=>addDigitoTela('1'))}
          {Btn('2', ()=>addDigitoTela('2'))}
          {Btn('3', ()=>addDigitoTela('3'))}
          {Btn('+', ()=>addDigitoTela('+'))}
          {Btn('0', ()=>addDigitoTela('0'))}
          {Btn(',', ()=>addDigitoTela('.'))}
          {Btn('<-', ()=>operacao('bs'))}
          {Btn('=', ()=>operacao('='))}
        </div>
      </div>
    </>
  );
}

export default App;
