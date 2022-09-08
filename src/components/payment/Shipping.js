import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckOutSession from './CheckOut'
import { toast } from 'react-toastify';


const Shipping = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    // const [lname, setLname] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');
    const [addess, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const sendMessage = async () =>{
      try{
        if(name===''||country===''|| zip===''|| phone==='' || addess==='' || email ===''){
        //  lname ==='' || 
          toast.warn('Please fill your form correctly..',{
            position:'top-center',
            autoClose: 500,
            pauseOnHover:false
          })
        }
        else{
          const ShipData = {name:String(name),  country:String(country), zip:Number(zip), phone:Number(phone), addess:String(addess), email:String(email)}
            // lname:String(lname),
          localStorage.setItem('shipTo', JSON.stringify(ShipData))
          navigate('/payment')
        }
      }
      catch(e){
        console.error(e);
      }
    }

return (
<>
 
<div style={{position:'auto', width:'100%'}}>
        <CheckOutSession step1 step2 className='fixed' />
        <h3 style={{textAlign:'center'}}>Shipping</h3>
    <div className="row mt-3 mx-3" style={{marginTop:"25px"}}>
  <div className="col-md-3">
    <div style={{marginTop: "50px", marginLeft: "10px"}} className="text-center">
      <i id="animationDemo" data-mdb-animation="slide-right" data-mdb-toggle="animation"
        data-mdb-animation-reset="true" data-mdb-animation-start="onScroll"
        data-mdb-animation-on-scroll="repeat" className="fas fa-3x fa-shipping-fast text-white"></i>
      <h3 className="mt-3 text-dark">Welcome</h3>
      <p className="text-dark">You are 30 seconds away from compleating your order!</p>
    </div>
    <div className="text-center">
      <button type="submit" className="btn btn-white btn-rounded back-button" onClick={()=>navigate('/cart')}>Go back</button>
    </div>


  </div>
  <div className="col-md-9 justify-content-center">
    <div className="card card-custom pb-4">
      <div className="card-body mt-0 mx-5">
        <div className="text-center mb-3 pb-2 mt-3">
          <h4 style={{color: "#495057" }}>Delivery Details</h4>
        </div>

        {/* <form className="mb-0" > */}

          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form9Example1">Name</label>
                <input type="text" id="form9Example1" className="form-control input-custom" onChange={(e)=>{setName(e.target.value)}} />
              </div>
            </div>
            {/* <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form9Example2">Last name</label>
                <input type="text" id="form9Example2" className="form-control input-custom" onChange={(e)=>{setLname(e.target.value)}} />
              </div>
            </div> */}
          </div>
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form9Example3">Country</label>
                <input type="text" id="form9Example3" className="form-control input-custom" onChange={(e)=>{setCountry(e.target.value)}} />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form9Example4">Zip</label>
                <input type="text" id="form9Example4" className="form-control input-custom" onChange={(e)=>{setZip(e.target.value)}}/>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form9Example6">Address</label>
                <input type="text" id="form9Example6" className="form-control input-custom" onChange={(e)=>{setAddress(e.target.value)}}/>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
              <label className="form-label" htmlFor="typeEmail">Email</label>
                <input type="email" id="typeEmail" className="form-control input-custom" onChange={(e)=>{setEmail(e.target.value)}} />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <label className="form-label" htmlFor="form9Example6">Phone</label>
                <input type="text" id="form9Example6" className="form-control input-custom" onChange={(e)=>{setPhone(e.target.value)}}/>
              </div>
            </div>
          </div>

          <div className="float-end ">
            <button type="submit" id='btn' className="btn btn-outline-dark btn-rounded" onClick={()=>{sendMessage()}}>Continue</button>
          </div>

        {/* </form> */}
      </div>
    </div>
  </div>
</div></div>
</>
  )
}

export default Shipping