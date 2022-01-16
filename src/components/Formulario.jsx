import { useEffect, useState } from "react"
import { Error } from "./Error"

export const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    const [nombre, setNombre] = useState("")
    const [propietario, setPropietario] = useState("")
    const [email, setEmail] = useState("")
    const [fecha, setFecha] = useState("")
    const [sintomas, setSintomas] = useState("")

    // Estado del error al enviar formulario si falta algun campo
    const [error, setError] = useState(false)

    // Ejecucion de los cambios y envio al formulario
    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    const generarId = () => {
        const random = Math.random().toString(36).substr(2)
        const fecha = Date.now().toString(36)
        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Comprobacion de error
        if ([mascota, propietario, email, alta, sintomas].includes("")) {
            setError(true)
            return
        }

        // Eliminacion de error y envio de paciente con ID
        setError(false)

        // Objeto de Paciente
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }

        if (paciente.id) {
            // Editando registro 
            objetoPaciente.id = paciente.id
            const pacientesActualizados = pacientes.map( 
                pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
            // Agregando el paciente acatualizado 
            setPacientes(pacientesActualizados)
            // limpiando el estado del paciente 
            setPaciente({})

        } else {
            // Nuevo registro
            objetoPaciente.id = generarId()
            setPacientes([...pacientes, objetoPaciente])
        }

        // Reinicia el formulario 
        setNombre("")
        setPropietario("")
        setEmail("")
        setFecha("")
        setSintomas("")
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {""}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-5"
            >
                {error && <Error error="Todos los campos son obligatorios" />}
                <div className="mb-5">
                    <label
                        htmlFor="mascota"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Nombre Mascota
                    </label>

                    <input
                        id="mascota"
                        name="mascota"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-red-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Nombre Propietario
                    </label>

                    <input
                        id="propietario"
                        name="propietario"
                        type="text"
                        placeholder="Nombre de la Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-red-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Contacto Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-red-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="alta"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Alta
                    </label>

                    <input
                        id="alta"
                        name="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-red-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Sintomas
                    </label>

                    <textarea
                        id="sintomas"
                        name="sintomas"
                        placeholder="Describe los Sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-red-400 rounded-md"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>

                {paciente.id ? (
                    <input
                        type="submit"
                        className="bg-green-600 rounded w-full p-3 text-white uppercase font-bold
                        hover:bg-green-700 cursor-pointer transition-colors"
                        value="Guardar Cambios"
                    />
                ) : (
                    <input
                        type="submit"
                        className="bg-indigo-600 rounded w-full p-3 text-white uppercase font-bold
                        hover:bg-indigo-700 cursor-pointer transition-colors"
                        value="Agregar Paciente"
                    />
                )}
            </form>
        </div>
    )
}
