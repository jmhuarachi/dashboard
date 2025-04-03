import { useState } from "react"
import {v4 as uuidv4} from "uuid"
import { useChartContext } from "../context/ChartContext"
export default function FormularioPrincipal() {
    const { agregarGrafico} =  useChartContext()
    const [titulo, setTitulo] = useState('')
    const [valorGrafico, setValorGrafico] = useState('')
    const [fecha, setFecha] = useState(new Date())
    const [tipoGrafico, setTipoGrafico] = useState('')

    const tiposDeGraficos = ['line', 'bar','area','heatmap']

    const handleSubmit = (e) => {
        e.preventDefault()
        // Flujo de la fecha en el formulario
        const fechaFormateada = fecha.toISOString().split(`T`)[0]

        // creamos un nuevo grafico
        const nuevoGrafico = {
            id: uuidv4(),
            titulo,
            tipo: tipoGrafico,
            series: [{
                data:[{
                    x: fechaFormateada,
                    y: valorGrafico
                }]
            }]
        }
        console.log("Datos del grafico : ", nuevoGrafico)
        agregarGrafico(nuevoGrafico)
        resetForm()
    }
    
    const resetForm = () => {
        setTitulo("")
        setValorGrafico(0)
        setFecha(new Date())
        setTipoGrafico("")
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex-auto justify-around">
                <input
                    type="text"
                    placeholder="Nombre del Grafico"
                    className="w-64 m-5 p-1 rounded shadow-lg focus:shadow-slate-400 focus:outline-none"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Dato"
                    className="w-24 m-5 p-1 rounded shadow-lg focus:shadow-slate-400 focus:outline-none"
                    value={valorGrafico}
                    onChange={(e) => setValorGrafico(Number(e.target.value))}
                    required
                />
                <input
                    type="date"
                    className="w-24 m-5 p-1 rounded shadow-lg focus:shadow-slate-400 focus:outline-none"
                    value={fecha.toISOString().split(`T`)[0]}
                    onChange={(e) => setFecha(new Date(e.target.value))}
                />

                <select
                    className="w-48 m-5 p-1 rounded shadow-lg focus:shadow-slate-400 focus:outline-none"
                    value={tipoGrafico}
                    onChange={(e) => setTipoGrafico(e.target.value)}
                >
                    <option value="">-- Tipo de Grafico --</option>
                    {tiposDeGraficos.map((tipo,index)=> (
                        <option 
                            key={index}
                            value={tipo}
                            className="text-amber-950"
                        >
                            {tipo.toUpperCase()}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg m-4 p-2 px-10 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                    Crear Grafico
                </button>
            </div>
        </form>
    )
}