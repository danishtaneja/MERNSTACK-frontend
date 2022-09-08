import React, {useState, useEffect} from 'react'
import {SpinnerCircular} from 'spinners-react'
import {Link } from 'react-router-dom'

const NewUsers = () => {
  const [loadingData, setLodaingData] = useState(false);
  useEffect(()=>{
    setLodaingData(true);
    setTimeout(()=>{
      setLodaingData(false)
    },900)
  }, [])

  const [mydata, setMydata] = useState([])
  const Orders = () =>{
    fetch('/new-users',{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
    },
      credentials:'include'
    })
    .then((res)=> {return res.json()})
    .then((resdata)=>{
      setMydata(resdata)
    })
  }

  useEffect(()=>{
    Orders();
  },[])

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
    <div>
      <div style={{marginTop:'80px'}}>
      
      {udata.isAdmin===true? <>
            <div className="sidebar">
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/profile' >Profile</Link>
            <Link to='/product'>ADD Product</Link>
            <Link to="/allproduct">All Product</Link>
            <Link to='/Orders'>All Orders</Link>
            <ul>
              <li><Link to='/new'>New Orders</Link></li>
              <li><Link to='/approved'>Approved</Link></li>
              <li><Link to='/cancel'>Cancel</Link></li>
              <li><Link to='/refund'>Refund</Link></li>
            </ul>
            <Link to='/help'>Help & Support</Link>
            <Link to='/logout'>Logout <i className="fa fa-sign-out" aria-hidden="true" /></Link>
            </div>
            </>:  udata.isAdmin===false ? <>
        <div className="sidebar">
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/profile'>Profile</Link>
           <Link to="/Orders">My Orders</Link>
           <ul>
              <li><Link to='/new'>New Orders</Link></li>
              <li><Link to='/approved'>Approved</Link></li>
              <li><Link to='/cancel'>Cancel</Link></li>
              <li><Link to='/refund'>Refund</Link></li>
            </ul>
            <Link to='/help'>Help & Support</Link>
           <Link to='/logout'>Logout <i className="fa fa-sign-out" aria-hidden="true" /></Link>
            </div>
            </> :
            <></>}
      </div>
      <div className='content'>
         {loadingData ? <div className='text-center p-5'><SpinnerCircular size={50} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 1)" /> <span>Loading Data...</span></div> : 
     <table className="table text-center table-responsive">
     <thead>
     <tr>
       <th scope='col'>S.No</th>
       <th scope='col'>Name</th>
       <th scope='col'>Email</th>
       <th scope='col'>Gender</th>
       <th scope='col'>Account Created</th>
     </tr>
     </thead>
     <tbody>
       {mydata.map((product, index)=>{
        return<> 
        <tr key={product._id}>
        <td>{index+1}</td>
        <td>{product.name}</td>
        <td>{product.email}</td>
        <td>{product.gender}</td>
        <td>{product.Date}</td>
        </tr>
        </>
       })}
       </tbody>
       </table>}
       </div>
    </div>
  )
}

export default NewUsers
