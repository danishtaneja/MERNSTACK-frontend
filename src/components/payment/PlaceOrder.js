
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CheckOutSession from './CheckOut';
import StripeCheckout from 'react-stripe-checkout';
import {toast} from 'react-toastify';

const PlaceOrder = () => {

    var userData = JSON.parse(localStorage.getItem('shipTo'))
    // console.log(userData);
    const mydata = JSON.parse(localStorage.getItem('cartItems'))

    const navigate = useNavigate();
    const totalPrice = mydata.reduce((a,b)=> a + b.price, 0);
    const amount = totalPrice*100

    const [user, setUser] = useState({name:userData.name, email:userData.email, phone:userData.phone, Address:userData.addess, Country:userData.country, zip:userData.zip, price:totalPrice, Items:mydata.length, products:[]});
    let name, value;
    const handleInput = (e) =>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value});
    }
    const Placed = async() =>{
  const { name, email, phone, Address, Country, zip, price, Items, products} = user;
  if(name===''||  email===''||  phone===''||  Address===''||  Country===''||  zip===''||  price===''||  Items===''|| products===[]){
     return toast.warning('Please fill the form properly....')
  }
      const res = await fetch('/place-order', {
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({name:name, email:email, phone:phone, Address:Address, Country:Country, zip:zip, price:price, Items:Items, products:mydata})
      })

      const data = await res.json();
      console.log(data)

      if(data){
        localStorage.clear();
        localStorage.removeItem('shipTo')
        localStorage.removeItem('cartItems')
        navigate('/placed')
        toast.success('Thankyou for shopping with us...')
      }
}

const onToken =(token) =>{
  const check = token.card.funding;
  if(check === 'credit'){
    Placed();
  }
  else{
    toast.error('Please Pay the amount...')
  }
}

  return (
     <>
     <div className=''>
          <CheckOutSession step1 step2 step3 />
      <h1 >PlaceOrder</h1>
      <div className='row'>
        <div className='col-sm-7 col-md-7 col-lg-7'>
          <h4>Ordered Items</h4>
          <span ><Link to='/products' style={{color:'#000'}}> Continue for more Shopping </Link></span>
          
        <form  method='POST'>
          
        </form>
          <table className="table ">
        <thead>
        <tr>
          <th scope='col'>Product Image</th>
          <th scope='col'>Product Name</th>
          <th scope='col'>Product Price</th>
          {/* <th scope='col'>Product Quantity</th> */}
          {/* <th scope='col'>Remove Item</th> */}
        </tr>
        </thead>
        <tbody>
           {mydata.map((product, id)=>{
           return<> 
           <tr key={id}>
           <td><img src={product.image} alt={product.name} style={{width:'111px', borderBottom:'none'}} className='img-thumbnail' /></td>
           <td><input type='text' value={product.name} name='products' onChange={handleInput} style={{borderBottom:'none'}}/></td>
           <td>$<input type='text' value={product.price} name='products' onChange={handleInput} style={{border:'none'}}/></td>
           </tr>
           </>
          })}
          </tbody>
          </table>
        </div>
        <div className='col-sm-4 col-md-4 col-lg-5'>
  
        <h4>Shipping Address</h4>
        <span><span style={{fontWeight:'bold'}}>Full Name:</span> <i><input type='text' value={user.name} name='name' style={{borderBottom:'none'}} onChange={handleInput} /></i></span><br/>
        <span><span style={{fontWeight:'bold'}}>Email:</span> <input type="text" value={user.email} name='email' style={{borderBottom:'none', width:"500px"}}  onChange={handleInput} /></span><br />
        <span><span style={{fontWeight:'bold'}}>Phone:</span> <input type="text" value={user.phone} name='phone' style={{borderBottom:'none'}}  onChange={handleInput} /></span><br />
        <span><span style={{fontWeight:'bold'}}>Address:</span> <input type="text" value={user.Address} name='Address' style={{borderBottom:'none'}}  onChange={handleInput} /></span><br/>
        <span><span style={{fontWeight:'bold'}}>Country:</span> <input type="text" value={user.Country} name='Country' style={{borderBottom:'none'}} onChange={handleInput} /></span><br/>
        <span><span style={{fontWeight:'bold'}}>Zip:</span> <input type="text" value={user.zip} name='zip' style={{borderBottom:'none'}} onChange={handleInput} /> </span> <br />
        <div className='mt-2'>
          <h4>CheckOut Here...</h4>
        <span>Total Price: $<input type="text" value={totalPrice} style={{borderBottom:'none'}} name='price' onChange={handleInput}/></span><br/>
        <span>Total Items: <input type="text" value={mydata.length} style={{borderBottom:'none'}} name='Items'  onChange={handleInput}/></span><br/>
        {/* <button className='btn btn-outline-dark' onClick={()=>toast('Pay Amount...')}>Pay ${totalPrice}</button> */}
        </div>
        <StripeCheckout
        token={onToken}
        name='Fashion Shop Checkout'
        currency='AUD'
        amount={amount}
        shippingAddress={userData.addess}
        billingAddress={false}
        email={userData.email}
        label={`Pay $ ${totalPrice}`}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        />
        </div>
        </div>
      </div>
  </>
  )
}

export default PlaceOrder