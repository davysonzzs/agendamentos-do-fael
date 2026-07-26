import { useState, useEffect } from "react"
import "./visor.css"

export default function Visor({socket, preDados}) {
  const [agenda, setAgendas] = useState([])

  useEffect(() => {
    if (preDados) {
      setAgendas(preDados)
    }
  }, [preDados])
  
  useEffect(() =>{
      if (!socket) return;

      socket.on('recebendo_agendamento', data => {
        console.log(data)
      setAgendas((ultimaCoisa) => [...ultimaCoisa, data])
      })

      return () => socket.off('recebendo_agendamento')
  }, [socket])

  return(
    <div className="visor">
        {
          Array.isArray(agenda) && agenda.map((item, index) => ( 
            <div className="item" key={index}>
                <h1>{item.assunto}</h1>
                <p>{item.dia} as {item.hora}</p> 
            </div>
          ))
        }
    </div>
  )
}