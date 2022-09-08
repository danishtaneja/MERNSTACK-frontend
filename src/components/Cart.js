import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { useDipatchCart } from '../Context/CartContext';


const Cart = () => {

  const {state} = useContext(UserContext)
  

  const [myData , setMyData] = useState(JSON.parse(localStorage.getItem('cartItems') || "[]"));
    const navigate = useNavigate();
    const totalPrice = myData.reduce((a,b)=> a + b.price, 0);
    const dispatch = useDipatchCart()
  
    const remove = (index) =>{
      const updatedCartData = [...myData];
      updatedCartData.splice(index, 1);
      
      dispatch({type:'REMOVE_ITEM', index})
      
      setMyData(updatedCartData)
      dispatch({type:'REMOVE_ITEM', payload:index})
      console.log(index)
    }
    if(myData.length ===0){

      return <div>
        <div style={{ top:'40%', left:'40%',display:'inline-flexbox', position:"fixed", justifyContent:'center'}}>
        <div className='text-center'>
          <h1 >Cart is Empty</h1>
          <Link to='/' style={{fontSize:"1.4rem",color:'#000'}}>Go for Shopping</Link>
          <br />
          {/* <Link to='/wishlist'>my WishList</Link> */}
      </div>
      </div>
      </div>
    }
  
  const CARTDATA = () =>{
    if(state){
      return <div className='row'>
      <div className='col-8 table-responsive' id='cart_scroll' style={{marginTop:'100px', height:'555px'}}>
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
          {myData.map((product, index)=>{
         return <>
         <tbody id='height_table'>
         <tr id='cart' key={index}>
          <td><img className='img-thumbnail' src={product.image} alt={product.name} /></td>
          <td> 
            <Link to={`/product/${product._id}`}>{product.name}</Link></td>
          <td>${product.price}</td>
          {/* <td><button className='btn-outline-dark' id='btn'><i className='fas fa-plus' /> </button> 1 <button className='btn-outline-dark' id='btn'> <i className='fas fa-minus' /></button></td> */}
          <td><button  onClick={()=>{remove(index)}} className='btn'><i className='fas fa-trash-can'/></button></td>
          </tr>
          </tbody>
          </>
        })}
        </table>
      
        </div>
    <div className='col-2' style={{marginTop:'180px'}}>
      <Link to='/wishlist' style={{fontSize:"1.4rem",color:'#000'}}>My WishList</Link>
      <table>
        <tbody>
        <tr style={{fontSize:'1.2rem', textAlign:'left'}}>
          <th><strong>Total Price:</strong></th>
          <td><span>${totalPrice}</span></td>
        </tr>
        <tr style={{fontSize:'1.2rem', textAlign:'left'}}>
          <th><strong>Total Items:</strong></th>
          <td className='text-center'><span>{myData.length}</span></td>
        </tr>
        <tr>
          <td colSpan={2}>
            <div><button type='submit' className='btn btn-outline-dark m-3' onClick={()=>navigate('/shipping')}>Check Out</button></div> : 
          </td>
        </tr>
        <tr>
          <td colSpan={2}><Link to='/products'style={{fontSize:"1.1rem",color:'#000'}}>Continue Shopping</Link></td>
        </tr> 
        </tbody>
      </table>
    </div>
    </div>
    }
    else{
      return <div className='row'>
    <div className='col-8 table-responsive' id='cart_scroll' style={{marginTop:'100px', height:'555px'}}>
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
        {myData.map((product, index)=>{
       return <>
       <tbody key={product._id} id='height_table'>
       <tr id='cart'>
        <td><img className='img-thumbnail' src={product.image} alt={product.name} /></td>
        <td> 
            <Link to={`/product/${product.name}`}>{product.name}</Link></td>
        <td>${product.price}</td>
        {/* <td><button className='btn-outline-dark' id='btn'><i className='fas fa-plus' /> </button> 1 <button className='btn-outline-dark' id='btn'> <i className='fas fa-minus' /></button></td> */}
        <td><button  onClick={()=>{remove(index)}} className='btn'><i className='fas fa-trash-can'/></button></td>
        </tr>
        </tbody>
        </>
      })}
      </table>
    
      </div>
  <div className='col-2' style={{marginTop:'180px'}}>
    <Link to='/wishlist'>My WishList</Link>
    <table>
      <tbody>
      <tr style={{fontSize:'1.2rem', textAlign:'left'}}>
        <th><strong>Total Price:</strong></th>
        <td><span>${totalPrice}</span></td>
      </tr>
      <tr style={{fontSize:'1.2rem', textAlign:'left'}}>
        <th><strong>Total Items:</strong></th>
        <td className='text-center'><span>{myData.length}</span></td>
      </tr>
      <tr>
        <td colSpan={2}>
        <div><button type='submit' className='btn btn-outline-dark m-3 disabled' onClick={()=>navigate('/login')}>Check Out</button></div>

        </td>
      </tr>
      <tr>
        <td colSpan={2}><Link to='/products'style={{fontSize:"1.1rem", color:'#000'}}>Continue Shopping</Link></td>
      </tr> 
      </tbody>
    </table>
  </div>
  </div>
    }
  }
  return (

    <CARTDATA />
  )
}

export default Cart;