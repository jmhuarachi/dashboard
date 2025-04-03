
export const initialState = {
    datos: [] // aqui se almacenaran los graficos
}

//Reducer: nos sirve para manejar las acciones de creacion , actualizacion y eliminacion
export const dashboardReducer = (state, action)=>{
    
    if (action.type === 'crear_grafico') {
        console.log("los datos ya sse encuentran en el reducer: ", action.payload)
        return {
            ...state,
            datos: [
                ...state.datos,
                action.payload

            ]
        }
    }
    if (action.type === 'actualizar_grafico') {
        console.log("los datos ya sse encuentran en el reducerss: ", action.payload)
        return {
            ...state,
            datos: state.datos.map((grafico) => grafico.id === action.payload.id ? {...grafico, ...action.payload} : grafico )
        }
    }
    if (action.type === 'eliminar_grafico') {
       return {
            ...state,
            datos: state.datos.filter(grafico => grafico.id !== action.payload.id)
       }
    }
    return state
}