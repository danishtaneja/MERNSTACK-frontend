import React, { useEffect, useState } from 'react'
// import BarChart from './BarChart'
import {Row, Col} from 'react-bootstrap'
import CategoryChart from './CategoryChart'
import Pallet from './Pallets'
import DoughnutChart from './DoughnutChart'

const AdminDashboard = () => {

  const [udata, setUdata] = useState({});
  const AuthUSER = async() =>{
      try{
          const res = await fetch('/authUSER',{
          method:'GET',
          headers:{
              Accept:'application/json',
              'Content-Type':'application/json'
          },
          credentials:"include"
      })

      const data = await res.json();
      if(res.status === 200 && data){
          setUdata(data)
      }
      else if(res.status === 201  && data){
          setUdata(data)
      }
      else{
          const error = new Error(res.error) 
          throw error;
      }
  }
  catch(err){
      console.log(err)
  }
  }

  useEffect(()=>{
      AuthUSER();
  },[])

  return (
    <div >
       {udata.isAdmin===true? <>
       <div className='overflow-hidden'>
       <Pallet />
        <Row>
          <Col md={3} style={{margin:'80px'}}>
            <DoughnutChart />
          </Col>
          <Col md={4} style={{margin:'80px'}}>
            <CategoryChart />
          </Col>
        </Row> 
       </div>
     
        </>: 
        udata.isAdmin===false ? <>
        <Pallet />
         <Row>
          <Col md={3} style={{margin:'80px'}}>
            <DoughnutChart />
          </Col>
        </Row>
            </> :
            <></>}
    </div>
  )
}

export default AdminDashboard
