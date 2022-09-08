import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HelpForm from './HelpForm';
import Login from './Login';

const Help = () => {
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
  return (
    <div style={{marginTop:'80px'}}>
        <form method='GET'>
        {udata.isAdmin === true ?<> 
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
            <div className="content" style={{marginLeft:'-50px'}}>
              <HelpForm />
            </div></> :   udata.isAdmin===false ? <>
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
            </div>  <div className="content" style={{marginLeft:'-50px'}}>
            <HelpForm />
            </div></> : <><Login /></>}
        </form>
    </div>
  )
}

export default Help
