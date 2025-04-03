import { createContext, useContext } from "react";
import useChart from "../hooks/useChart";
// 1 creo el context
const charContext = createContext()

// 2 creo el proveedor del context

export const ChartProvider = ({children})=>{
    const {state,agregarGrafico, actualizarGrafico, eliminarGrafico}= useChart()

    return(
        <charContext.Provider
            value ={{state, agregarGrafico, actualizarGrafico, eliminarGrafico}}
        >
            {children}
        </charContext.Provider>
    )
}
// 3 creamos para acceder al const

export const useChartContext =()=>{
    const context = useContext(charContext)

    if(!context){
        throw new Error('useChart ')
    }
    return context

}