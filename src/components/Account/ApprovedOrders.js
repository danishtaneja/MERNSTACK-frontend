import React, {useState, useEffect} from 'react'
import {SpinnerCircular} from 'spinners-react'
import {Link } from 'react-router-dom'

const ApprovedOrders = () => {
  const [loadingData, setLodaingData] = useState(false);
  useEffect(()=>{
    setLodaingData(true);
    setTimeout(()=>{
      setLodaingData(false)
    },900)
  }, [])

  const [mydata, setMydata] = useState([])
  const Orders = () =>{
    fetch('/app_orders',{
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
       <th scope='col'>Phone</th>
       <th scope='col'>Items</th>
       <th scope='col'>Address</th>
       <th scope='col'>Products ID's</th>
       <th scope='col'>Paid Amount</th>
       <th scope='col'>Status</th>
       <th scope='col'>Order Placed Date</th>
       {udata.isAdmin === true ? <> <th scope='col'>EDIT Order</th> <th scope='col'>Note</th></>:<><th scope='col'>Customer Note</th></>}
     </tr>
     </thead>
     <tbody>
       {mydata.map((product, index)=>{
        return<> 
        <tr key={product._id}>
        <td>{index+1}</td>
        <td>{product.name}</td>
        <td>{product.email}</td>
        <td>{product.phone}</td>
        <td>{product.Items}</td>
        <td>{product.Address}&#44; {product.Country}&nbsp;{product.zip}</td>
        <td >
          <ul>
            <Link to={`/product/${product.products[0][0]}`} style={{color:'#000'}}>{product.products[0][0]}</Link><br/>
          <Link to={`/product/${product.products[0][1]}`} style={{color:'#000'}}>{product.products[0][1]}</Link><br/>
          <Link to={`/product/${product.products[0][2]}`} style={{color:'#000'}}>{product.products[0][2]}</Link><br/>
          <Link to={`/product/${product.products[0][3]}`}style={{color:'#000'}}>{product.products[0][3]}</Link><br/>
          <Link to={`/product/${product.products[0][4]}`}style={{color:'#000'}}>{product.products[0][4]}</Link><br/>
          <Link to={`/product/${product.products[0][5]}`} style={{color:'#000'}}>{product.products[0][5]}</Link><br/>
          {/*<Link to={`/product/${product.products[0][6]}`}>{product.products[0][6]}</Link><br/>
          <Link to={`/product/${product.products[0][7]}`}>{product.products[0][7]}</Link><br/>
          <Link to={`/product/${product.products[0][8]}`}>{product.products[0][8]}</Link><br/>
          <Link to={`/product/${product.products[0][9]}`}>{product.products[0][9]}</Link><br/> */}
          </ul>
        </td>
        <td>${product.price}</td>
        <td>{product.status}</td>
        <td>{product.Date}</td>
        {udata.isAdmin ===true ? <><td><Link to={`/edit/${product._id}`} style={{color:'#000'}}>Edit Order</Link></td> <td colSpan={4} style={{width:'350px'}}>{product.Comment}</td></>:<><td colSpan={4} style={{width:'350px'}}>{product.Comment}</td></>}
        </tr>
        </>
       })}
       </tbody>
       </table>}
       </div>
    </div>
  )
}

export default ApprovedOrders
