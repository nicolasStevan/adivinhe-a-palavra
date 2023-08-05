// CSS
import './App.css'

//REACT

import { useCallback, useEffect, useState } from 'react'

// DATA

import { wordList } from './data/words'

//Components
import InitialWindow from './components/initialWindow'
import StartGame from './components/StartGame'
import GameOver from './components/GameOver'

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'playing'},
  {id: 3, name: 'end'},
]

const tentativasQtde = 4

function App() {
const [gameStage, setGameStage] = useState(stages[0].name)
const [words, setWords] = useState(wordList)

const [pegarPalavra, setPegarPalavra] = useState('')
const [pegarCategoria, setPegarCategoria] = useState('')
const [letras, setLetras] = useState([])
const [letrasDigitadas, setLetrasDigitadas] = useState([])

const [LetrasAdvinhadas, setLetrasAdvinhadas] = useState([])
const [letrasErradas, setLetrasErradas] = useState([])
const [tentativas, setTentativas] = useState(tentativasQtde)
const [pontos, setPontos] = useState(0)

const pegaPalavraeCategoria = useCallback(() =>{
  //pegando uma categoria aleatoria
    const categories = Object.keys(words) 
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)

  // pegando uma palavra aleatoria
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)

    return {word, category}
},[words])

//iniciando o jogo
const startGame = useCallback(() => {
  //limpa o state das letras
  limpaStateLetras()

  //pega uma palavra e uma categoria
 const {word,category} = pegaPalavraeCategoria()
  
  //cria um array de letras
  let wordLetters = word.split('')

  // passando as letras para minusculas
  wordLetters = wordLetters.map((l) => l.toLowerCase())


  console.log(word, category)
  console.log(wordLetters)

  //fill state
  setPegarPalavra(word)
  setPegarCategoria(category)
  setLetras(wordLetters)

  setGameStage(stages[1].name)
}, [pegaPalavraeCategoria])

//processa a letra digitada

const verificaLetra = (letter) => {
    const normalizedLetter = letter.toLowerCase()

  //verifica se a letra ja foi digitada
  if(LetrasAdvinhadas.includes(normalizedLetter) || letrasErradas.includes(normalizedLetter)){
    return
  }

  //inclui as letras que o usuario inserir nas erradas ou acertadas.
  if(letras.includes(normalizedLetter)){
    setLetrasAdvinhadas((AtualEstadoDasLetras) => [
      ...AtualEstadoDasLetras,
      normalizedLetter
    ])
  }else{
    setLetrasErradas((AtualErroDasLetras) => [
      ...AtualErroDasLetras,
      normalizedLetter
    ])
    setTentativas((AtualTentativas) => AtualTentativas - 1)
  };

}
const limpaStateLetras = () =>{
  setLetrasAdvinhadas([])
  setLetrasErradas([])
  setWords([])
}

// const handleChute2 = (word) => {
//   if(word === pegarPalavra){
//     setPontos((AtualPontos) => AtualPontos += 100)
//     startGame()
//   }else{
//     setTentativas((AtualTentativas) => AtualTentativas - 1)
//   }
// }

//função para chutar a palavra
// useEffect(() => {
//     if(letrasDigitadas.length === pegarPalavra.length){
//       setGameStage(stages[2].name)
//     }
// }, [letrasDigitadas, pegarPalavra])


//checa se as tentativas tiverem terminado
  useEffect(() => {
    if(tentativas <= 0){
      //função para resetar o jogo reiniciar. os states quando errar as tentativas
      
      setGameStage(stages[2].name)
    }
  },[tentativas])

//checa se o usuario acertou todas as letras
  useEffect(() => {

const LetrasUnicas = [...new Set(letras)]

// condição para verificar se o usuario acertou todas as letras

if(LetrasAdvinhadas.length === LetrasUnicas.length){
  //calcula os pontos
  setPontos((AtualPontos) => AtualPontos += 100)

  //reincia o jogo 
  startGame()
}
console.log(LetrasUnicas)

},[LetrasAdvinhadas, letras, startGame])


// REINICIA O JOGO

const retryGame = () => {
  setPontos(0)
  setTentativas(tentativasQtde)


  setGameStage(stages[0].name)
}

  return (
    <div className='App'>
      {gameStage === 'start' && <InitialWindow startGame={startGame} />}
      {gameStage === 'playing' && <StartGame 
      verificaLetra={verificaLetra}
      pegarPalavra={pegarPalavra}
      pegarCategoria={pegarCategoria}
      letras={letras}
      LetrasAdvinhadas={LetrasAdvinhadas}
      tentativas={tentativas}
      pontos={pontos}
      letrasErradas={letrasErradas}
      letrasDigitadas={letrasDigitadas}
      words={words}/>}
      {gameStage === 'end' && <GameOver retryGame={retryGame} pontos={pontos}  />}
    </div>
  )
}

export default App
