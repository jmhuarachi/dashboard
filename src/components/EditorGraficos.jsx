
import { useState } from "react"
import { useChartContext } from "../context/ChartContext"
import ModalEliminar from "./ModalEliminar"
import useModal from "../hooks/useModal"

export default function EditorGraficos() {

    const { state ,actualizarGrafico, eliminarGrafico} = useChartContext()
    const [selectorTitulo, setSelectorTitulo] = useState('')
    const [valorGrafico, setValorGrafico]= useState(0)
    const [fecha, setFecha] = useState( new Date())

    const {isOpen :isOpenModalEliminar, openModal : openModalEliminar,closeModal : closeModalEliminar} = useModal()

    const listaGraficos = state.datos

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({selectorTitulo, valorGrafico, fecha})

        const fechaFormateada = fecha.toISOString().split(`T`)[0]
        const nuevoDato = {
            x: fechaFormateada,
            y: valorGrafico

        }
        const graficoSeleccionado = state.datos.find((grafico) => grafico.id === selectorTitulo )
        if (graficoSeleccionado) {
            let nuevosDatos = [...graficoSeleccionado.series[0].data]

            const indiceFecha = nuevosDatos.findIndex(dato => dato.x ===nuevoDato.x)

            if(indiceFecha !== -1){

                nuevosDatos[indiceFecha] = nuevoDato
            } else{
                nuevosDatos.push(nuevoDato)
            }
            nuevosDatos.sort((fechaA,fechaB) => fechaA.x.localeCompare(fechaB.x))

            const nuevoGrafico = {
                ...graficoSeleccionado,
                series: [{
                    ...graficoSeleccionado.series[0],
                    data: nuevosDatos
                }]

            }
            console.log("grafico actualizado en editor grafico", nuevoGrafico)
            actualizarGrafico(nuevoGrafico)
        }
        resetForm()
    }

    const resetForm = () => {
        setSelectorTitulo("")
        setValorGrafico(0)
        setFecha(new Date())
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex-2/6 justify-around ">
                <select
                    value={selectorTitulo}
                    onChange={(e) => setSelectorTitulo(e.target.value)}
                    className="w-72 m-5 p-1 rounded shadow-lg  focus:shadow-slate-400 focus: outline-none"

                >
                    <option className="text-center">-- Titulo del Grafico</option>
                    {listaGraficos.map((grafico) => (
                        <option
                            key={grafico.id}
                            value={grafico.id}
                        >
                            {grafico.titulo}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Dato"
                    className="w-24 m-5 p-1 rounded shadow-lg  focus:shadow-slate-400 focus: outline-none"
                    value={valorGrafico}
                    onChange={(e) => setValorGrafico(Number(e.target.value))}
                />
                <input
                    type="date"
                    className="w-44 m-5 p-1 rounded shadow-lg  focus:shadow-slate-400 focus: outline-none"
                    value={fecha.toISOString().split(`T`)[0]}
                    onChange={(e) => setFecha(new Date(e.target.value))}
                />
                <button
                    type="button"
                    className="
                            bg-red-600 hover:bg-red-500
                            text-white font-semibold
                            rounded-lg
                            py-2 px-4
                            shadow-md hover:shadow-lg
                            transition-all duration-200 ease-in-out
                            transform hover:-translate-y-0.5
                            active:scale-95
                            border-2 border-transparent hover:border-red-300
                            focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75
                            cursor-pointer
                        "
                    onClick={() => openModalEliminar()}
                >
                    Eliminar Gráfico
                </button>
                {isOpenModalEliminar &&
                    <ModalEliminar
                        onClose ={closeModalEliminar}
                        selectorTitulo = {selectorTitulo}
                        eliminarGrafico = {eliminarGrafico}
                    />
                }
                <button
                    type="submit"
                    className="
    bg-indigo-600 hover:bg-indigo-500
    text-white font-semibold
    rounded-lg
    py-2 px-4
    shadow-md hover:shadow-lg
    transition-all duration-200 ease-in-out
    transform hover:-translate-y-0.5
    active:scale-95
    border-2 border-transparent hover:border-indigo-300
    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75
    cursor-pointer
    ml-4  // Margen izquierdo para separar ambos botones
  "
                >
                    Actualizar Gráfico
                </button>
            </div>
        </form>
    )
}

