import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
    Title,
    ArcElement,
    Tooltip,
    Legend
)

const DoughnutChart = () => {

    const [chartData, setChartData]= useState({datasets:[]});
    const DoughChart = () =>{
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
        })
      }
    useEffect(()=>{
        DoughChart();
    },[])

  return (
    <div >
        <Doughnut data={chartData}  />
    </div>
  )
}

export default DoughnutChart