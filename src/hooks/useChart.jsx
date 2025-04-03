import { useEffect, useReducer, useState } from "react"
import { dashboardReducer, initialState } from "../reducers/charReducer"

export default function useChart() {
  const [state, dispatch] = useReducer(dashboardReducer, initialState)
   const [graficosCargados, setGraficoCargados] = useState(false)
  const ids = new Set();

  useEffect( () => {
    if (!graficosCargados) {
      const storeData = localStorage.getItem('graficos')
      if (storeData) {
        const graficos = JSON.parse(storeData)

        graficos.forEach((grafico) => {
          if (!ids.has(grafico.id)) {
            ids.add(grafico.id)
            dispatch({type : 'crear_grafico', payload: grafico})
          }
        });
      }
    }
    setGraficoCargados(true)
  },[graficosCargados])

  useEffect(() => {
    if (graficosCargados) {
      localStorage.setItem("graficos", JSON.stringify(state.datos))
    }
  }, [state.datos, graficosCargados])

  const agregarGrafico = (grafico) => {
    console.log("datos originales del grafico", grafico)
    if (!ids.has(grafico.id)) {
      ids.add(grafico.id)
      dispatch({ type: 'crear_grafico', payload: grafico })
    } else {
      console.warn("grafico con id duplicado", `${grafico.id} , este gradico no se publicara y se omitira`)
    }
  }

  const actualizarGrafico = (graficoElegido) => {
    console.log("hook useChart - Actualizar Grafico", graficoElegido)
    dispatch({ type: 'actualizar_grafico', payload: graficoElegido })
  }
  const eliminarGrafico = (id) => {
    dispatch({ type: 'eliminar_grafico', payload: { id } })
  }
  const resetApp = () => {
    dispatch({ type: 'reset_app' });
  }


  return {
    state,
    agregarGrafico,
    actualizarGrafico,
    eliminarGrafico,
    resetApp
  }
}
