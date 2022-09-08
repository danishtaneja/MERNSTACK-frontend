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

const CategoryChart = () => {

    const [chartData, setChartData]= useState({datasets:[]});
    const [chartOptions, setChartOptions] = useState({})


    const MyBarGraph = () =>{
        fetch('/category',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'
        })
        .then((res)=> {return res.json()})
        .then((resdata)=>{
            setChartData({
                labels:['T-shirt', 'Jacket','Pants','Jeans','Shoes', 'Trouser', 'Hoodie', 'Others'],
                datasets:[{
                    data:[resdata[0], resdata[1], resdata[2],resdata[3],resdata[4],resdata[5], resdata[6], resdata[7]],
                    backgroundColor:['#5cb85c', '#f0ad4e', '#d9534f', '#0275d8', '#5bc0de', '#6C3483', '#ff8200', '#ffc000'],
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
                        text:"Product Category Chart"
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

export default CategoryChart
