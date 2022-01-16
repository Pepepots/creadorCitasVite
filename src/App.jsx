import { useEffect, useState } from "react"
import { Formulario } from "./components/Formulario"
import { Header } from "./components/Header"
import { ListadoPacientes } from "./components/ListadoPacientes"

export const App = () => {

    const pacientesIniciales =  JSON.parse(localStorage.getItem('pacientes')) || [] 

    const [pacientes, setPacientes] = useState(pacientesIniciales)
    // Estado al querer hacer un cambio a algun paciente
    const [paciente, setPaciente] = useState({})

    useEffect(() => {
        localStorage.setItem('pacientes', JSON.stringify(pacientes))
    }, [pacientes])

    const eliminarPaciente = (id) => {
        const pacientesActualizados = pacientes.filter( pacienteState => pacienteState.id !== id )
        setPacientes(pacientesActualizados)
    }

    return (
        <div className="container mx-auto mt-4">
            <Header />
            <div className="md:flex mt-12">
                <Formulario 
                    pacientes={pacientes}
                    setPacientes={setPacientes}
                    paciente={paciente}
                    setPaciente={setPaciente}
                />
                <ListadoPacientes
                    pacientes={pacientes}
                    setPaciente={setPaciente} 
                    eliminarPaciente={eliminarPaciente}
                />
            </div>
        </div>
    )
}
