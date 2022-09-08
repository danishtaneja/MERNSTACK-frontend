import React, {useState, useEffect} from 'react'
import {SpinnerCircular} from 'spinners-react'
import { Link } from 'react-router-dom';

const MyProducts = () => {
    const [loadingData, setLodaingData] = useState(false);
    useEffect(()=>{
      setLodaingData(true);
      setTimeout(()=>{
        setLodaingData(false)
      },900)
    }, [])
    const [mydata, setMydata] = useState([]);
    const getData = () =>{
      fetch('/product')
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
        <div className='content'>
         {loadingData ? <div className='text-center p-5'><SpinnerCircular size={50} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 1)" /> <span>Loading Data...</span></div> : <>
         <h3 className='mx-3 position-fixed bg-dark w-100 text-white' variant='flush' >Total Products: {mydata.length}</h3>
     <table className="table text-center my-5 mx-4">
     <thead>
     <tr>
      <th scope='col'>S No.</th>
      <th scope='col'>Product Image</th>
      <th scope='col'>Product Name</th>
      <th scope='col'>Product Price</th>
      <th scope='col'>Product Stock</th>
      <th scope='col'>Product Men/ Women</th>
      <th scope='col'>Product Category</th>
      <th scope='col'>Edit Product</th>
      <th scope='col'>Remove Product</th>
     </tr>
     </thead>
     <tbody>
       {mydata.map((product, id)=>{
        return<> 
        <tr key={id}>
        <td>{id+1}</td>
        <td><img src={product.image} alt={product.name} style={{width:'111px'}} className='img-thumbnail' /></td>
        <td><Link to={`/product/${product._id}`} style={{color:'#000'}}>{product.name}</Link></td>
        <td>${product.price}</td>
        <td>{product.count}</td>
        <td>{product.gender}</td>
        <td>{product.category}</td>
        <td><Link to={`/eprod/${product._id}`}><i className='fas fa-pen-to-square' style={{color:'#000'}}/></Link></td>
        <td><Link to={`/delete/${product._id}`} onClick={() => { window.confirm( 'Are you sure you want to delete this product?' ) }}><i className='fas fa-trash-can' style={{color:'#000'}}/></Link></td>
        </tr>
        </>
       })}
       </tbody>
       </table></>}
       </div>
    </div>
  )
}

export default MyProducts
