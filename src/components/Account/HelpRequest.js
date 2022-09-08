import React, {useState, useEffect} from 'react'
import {SpinnerCircular} from 'spinners-react'

const HelpRequest = () => {
    const [loadingData, setLodaingData] = useState(false);
    useEffect(()=>{
      setLodaingData(true);
      setTimeout(()=>{
        setLodaingData(false)
      },900)
    }, [])
    const [mydata, setMydata] = useState([]);
    const getData = () =>{
      fetch('/requests')
      .then((res)=> {return res.json()})
      .then((resdata)=>{
        setMydata(resdata)
      })
    }
  
    useEffect(()=>{
      getData();
    },[])
    
  return (
    <div>
        <div style={{marginTop:'-60px', marginLeft:'-110px'}}>
         {loadingData ? <div className='text-center p-5'><SpinnerCircular size={50} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 1)" /> <span>Loading Data...</span></div> : <>
     
     <div style={{width:'650px'}}>
        <h3 className='text-center'>Help Requests</h3>
        <table className="table text-center">
     <thead>
     <tr>
       <th scope='col'> Name</th>
       <th scope='col'>Email</th>
       <th scope='col'> Purpose</th>
       <th scope='col'> MESSAGE</th>
     </tr>
     </thead>
     <tbody>
       {mydata.map((product, id)=>{
        return<> 
        <tr key={id}>
        <td>{product.name}</td>
        <td>{product.email}</td>
        <td>{product.purpose}</td>
        <td>{product.message}</td>
     </tr>
        </>
       })}
       </tbody>
       </table> 
        </div></>}
       </div>
    </div>
  )
}

export default HelpRequest
