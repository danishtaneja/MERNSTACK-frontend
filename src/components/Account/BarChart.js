import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js'
import React ,{ useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const BarChart = () => {

    const [chartData, setChartData]= useState({datasets:[]});
    const [chartOptions, setChartOptions] = useState({})


    const MyBarGraph = () =>{
        fetch('/my-order',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'
        })
        .then((res)=> {return res.json()})
        .then((resdata)=>{
            setChartData({
                labels:['Approved', 'New Orders', 'Cancel', 'Refunded'],
                datasets:[{
                    data:[resdata[0],resdata[1],resdata[2],resdata[3]],
                    backgroundColor:['#5cb85c', '#f0ad4e', '#d9534f', '#0275d8'],
                }]
            })
    
            setChartOptions({
                responsive:true,
                plugins:{
                    legend:{
                        position:"top",
                        display:false
                    },
                    title:{
                        display:true,
                        text:"Orders Stats"
                    }
                }
            })
        })
      }
    useEffect(()=>{
        MyBarGraph();
    },[])
  return (
    <div>
        <form method='GET'>
      <Bar options={chartOptions} data={chartData}/>
      </form>
    </div>
  )
}

export default BarChart
