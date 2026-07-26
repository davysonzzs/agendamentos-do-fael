import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { supabase } from "./supabase-client/supabase"
import Visor from "./components/Visor"
import io from "socket.io-client"

export default function App() {
  const [socket, setSocket] = useState(null)
  const [visiModal, setVisiModal] = useState(false)
  const [preDados, setPreDados] = useState([])
  const assuntoRef = useRef()
  const diaRef = useRef()
  const horaRef = useRef()

  async function conectar() {
    const socketConnect = await io.connect("https://agendamentos-do-fael.onrender.com")
    setSocket(socketConnect)
  }

  async function salvarNoBanco() {
    const res = await supabase
    .from("agenda")
    .insert({
      assunto: assuntoRef.current.value,
      dia: diaRef.current.value,
      hora: horaRef.current.value
    })
  }

  async function puxarDados() {
    const res = await supabase
    .from("agenda")
    .select('*')

    setPreDados(res.data)
  }

  const enviarAgenda = () =>{
    const agenda = {
      assunto: assuntoRef.current.value,
      dia: diaRef.current.value,
      hora: horaRef.current.value
    }
    salvarNoBanco()
    socket.emit('message', agenda)
  }

  useEffect(() => {
    conectar()
    puxarDados()
  }, [])

  return(
    <div className="tudo">

      <Visor socket={socket} preDados={preDados}/>

      <div className="criar">
        <button className="criarbtn" onClick={() => setVisiModal(!visiModal)}>+</button>
      </div>
      
      {visiModal && (
        <div className="modal">
          <div className="prin">
            <input type="text" placeholder="assunto" ref={assuntoRef}/>
            <input type="date" ref={diaRef}/>
            <input type="datetime" ref={horaRef}/>
            <button className="enviar" onClick={() => {enviarAgenda()}}>enviar</button>
          </div>
        </div>
        )}
    </div>
  )
}