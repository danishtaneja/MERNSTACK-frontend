import React, {useState, useEffect} from 'react'
const HelpReq = () => {
  const [udata, setUdata] = useState({});
  const AuthUSER = async() =>{
      try{
          const res = await fetch('/profile',{
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

  const [mydata, setMydata] = useState([]);
  const getData = () =>{
    fetch('/requests')
    .then((res)=> {return res.json()})
    .then((resdata)=>{
      console.log(resdata)
      setMydata(resdata)
    })
  }

  useEffect(()=>{
    getData();
  },[])
  
return (
  <div>
    {udata.isAdmin ===true ?<>
    <div className='content'>
    <h3>Help Requests</h3>
   <table className="table text-center">
   <thead>
   <tr>
    <th scope='col' colSpan={3}>S No.</th>
    <th scope='col'>Name</th>
    <th scope='col'>Email</th>
    <th scope='col'>Purpose</th>
    <th scope='col'>Message</th>
   </tr>
   </thead>
   <tbody>
     {mydata.map((product, id)=>{
      return<> 
      <tr key={id}>
      <td>{id+1}</td>
      <td colSpan={3}>{product.name}</td>
      <td>{product.email}</td>
      <td>{product.purpose}</td>
      <td>{product.message}</td>
      </tr>
      </>
     })}
     </tbody>
     </table>
     </div></>: udata.isAdmin===false ? <></>:<></>}  
  </div>
)
}
export default HelpReq