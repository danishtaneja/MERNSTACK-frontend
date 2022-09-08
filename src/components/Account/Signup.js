import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
    const navigate = useNavigate();
    

    const [user, setUser] = useState({name:'', email:'', gender:'' , password :'', confirm_password:''});

    let name, value;
    const handleInput = (e) =>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value});
    }

    const RegisterUSER = async(e) =>{
        e.preventDefault();
    const { name, email, gender,password, confirm_password} = user;
    if(name ==='' || email===''|| gender==='' || password === '' || confirm_password === ''){
       return toast.warning('Please fill the form properly....')
    }

    else if(password !== confirm_password){
        return toast.error('Please Check your details....')
    }

        const res = await fetch('/signup', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:name, email:email, gender:gender,password:password, confirm_password:confirm_password})
        })

        const data = await res.json();

        if(res.status === 422 || !data){
            toast.error('Invalid Registration...')
        }
        else{
            toast.success('Registration Successfull...')
            navigate('/login')
        }
}

  return (
    <div>
        <div className='body'>
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                    <div className="col-lg-12 login-key">
                        {/* <i className="fa fa-user" aria-hidden="true"></i> */}
                        <img src="https://seeklogo.com/images/G/girls-and-clothing-fashion-shop-logo-0620490E6A-seeklogo.com.png" className='img-thumbnail form-logo' alt="" />
                    </div>
                    <div className="col-lg-12 login-title">
                       Fashion Shop Signup
                    </div>
    
                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <form method='POST'>
                            <div className="form-group">
                                    <label className="form-control-label">FULL NAME</label>
                                    <input type="text" className="form-control" name='name' value={user.name} onChange={handleInput}/>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">USERNAME or email</label>
                                    <input type="email" className="form-control" name='email' value={user.email} onChange={handleInput} />
                                </div>
                                <div className='form-group'>
                                    <label className="form-control-label"  htmlFor="sel1">GENDER</label>
                                        <select className="form-control w-25" id="sel1" name='gender' value={user.gender} 
                                            onChange={handleInput} >
                                            <option >----</option>
                                            <option value={'Men'}>Men</option>
                                            <option value={'Women'}>Women</option>
                                        </select>
                                </div>  
                                <div className="form-group">
                                    <label className="form-control-label">PASSWORD</label>
                                    <input type="password" className="form-control" name='password' value={user.password} onChange={handleInput}/>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">CONFIRM PASSWORD</label>
                                    <input type="password" className="form-control" name='confirm_password' value={user.confirm_password} onChange={handleInput}/>
                                </div>
                                {/* <div className="form-group">
                                    <label className="form-control-label">Confirm PASSWORD</label>
                                    <input type="password" className="form-control" />
                                </div>
     */}
                                <div className="col-lg-12 loginbttm">
                                    <div className="col-lg-6 login-btm login-text">
                                        {/* <Link to="/forgot-password">forgot Password</Link> */}
                                        
                                      Already Have an Account? <Link to='/login'style={{color:'#000'}}>Click here.</Link>
                                    </div>
                                    <div className="col-lg-6 login-btm login-button">
                                        <button type="submit" className="btn btn-outline-primary" onClick={RegisterUSER}>SIGNUP</button>
                                    </div>
                                    <div className='p-2'>
                                      {/* Already Have an Account? <Link to='/login'>Click here.</Link> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                        </div>
                </div>

            </div>
        </div>
        </div>
    
    </div>
  )
}

export default Signup