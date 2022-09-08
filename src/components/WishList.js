import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDipatchCart } from '../Context/CartContext';

const WishList = () => {
  const mydata = JSON.parse(localStorage.getItem('wishItems') || "[]")
    const navigate = useNavigate();
    const totalPrice = mydata.reduce((a,b)=> a + b.price, 0);
    const dispatch = useDipatchCart()
  
    const remove = (index) =>{
      dispatch({type:'REMOVE_ITEM', index})
    }
    if(mydata.length ===0){
      return <div>
        <div style={{ top:'40%', left:'40%',display:'inline-flexbox', position:"fixed", justifyContent:'center'}}>
        <div className='text-center'>
          <h1 >WishList is Empty</h1>
          <Link to='/' style={{fontSize:"1.4rem"}}>Go to Shopping</Link>
          <br />
          {/* <Link to='/cart'>my Cart</Link> */}
      </div>
        </div>

      </div>
    }
  return (
    <div className='row'>
    <div className='col-8 table-responsive' style={{marginTop:'100px'}}>
      <table className="table text-center">
        <thead>
        <tr>
          <th scope='col'>Product Image</th>
          <th scope='col'>Product Name</th>
          <th scope='col'>Product Price</th>
          {/* <th scope='col'>Product Quantity</th> */}
          <th scope='col'>Remove Item</th>
        </tr>
        </thead>
        {mydata.map((product, index)=>{
       return <>
       <tbody  key={product._id}>
       <tr id='cart'>
        <td><img className='img-thumbnail' src={product.image} alt={product.name} /></td>
        <td>{product.name}</td>
        <td>${product.price}</td>
        {/* <td><button className='btn-outline-dark' id='btn'><i className='fas fa-plus' /> </button> 1 <button className='btn-outline-dark' id='btn'> <i className='fas fa-minus' /></button></td> */}
        <td><button  onClick={()=>{remove(index)}} className='btn-outline-dark' id='btn'><i className='fas fa-trash-can'/></button></td>
        </tr>
        </tbody>
        </>
      })}
      </table>
    
      </div>
  <div className='col-2' style={{marginTop:'180px'}}>
    <table>
      <tbody>
      <tr style={{fontSize:'1.2rem', textAlign:'left'}}>
        <th><strong>Total Price:</strong></th>
        <td><span>${totalPrice}.00</span></td>
      </tr>
      <tr style={{fontSize:'1.2rem', textAlign:'left'}}>
        <th><strong>Total Items:</strong></th>
        <td className='text-center'><span>{mydata.length}</span></td>
      </tr>
      <tr>
        <td colSpan={2}><button type='submit' className='btn btn-outline-dark m-3 ' onClick={()=>navigate('/shipping')}>Check Out</button></td>
      </tr>
      <tr>
        <td colSpan={2}><Link to='/products'style={{fontSize:"1.1rem"}}>Continue Shopping</Link></td>
      </tr>
      </tbody>
    </table>
  </div>
  </div>
  )
}

export default WishList;