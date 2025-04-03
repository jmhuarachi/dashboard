import ReactApexChart from "react-apexcharts"

export default function ApexChartEnlace({dataGrafico}) {
    
  const {tipo, series} = dataGrafico

  const options = {
        chart: {
          type: tipo // tipo de grafico
        },
        series: series,
        xaxis: {
          type: 'datatime', //Categorias
          labels: {format: 'dd MMM'}
        }
      }
  
    return (
    <div className="bg-white">
        <ReactApexChart
            options ={options}
            series = {options.series}
            type = {tipo}
        />
        
    </div>
  )
}
