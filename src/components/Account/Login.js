import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserContext } from '../../App'

const Login = () => {

    const {dispatch} = useContext(UserContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const LoginUSER = async(e) =>{
        e.preventDefault();
        const res = await fetch('/sign-in',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify({email:email, password:password})
        })
        const data = await res.json();
        console.log(data)
        if(email==='' || password === ''){
            toast.warning('Please fill the form properly....')
        }
        else if(res.status=== 200 && data){
            dispatch({type:'USER', payload:true})
            toast.success('Welcome')
            navigate('/dashboard')
        }
        else if(res.status === 201 && data){
            dispatch({type:'USER', payload:true})
            toast.success('Welcome Back...')
            navigate('/dashboard')
        }
        else{
            toast.error('Invalid Registration...')
        }
}

  return (
    <div >
        <div className='body'>
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                    <div className="col-lg-12 login-key">
                        <i className="fa fa-user" aria-hidden="true"></i>
                        {/* <img src="https://seeklogo.com/images/G/girls-and-clothing-fashion-shop-logo-0620490E6A-seeklogo.com.png" className='img-thumbnail form-logo' alt="" /> */}
                    </div>
                    <div className="col-lg-12 login-title">
                       Fashion Shop Login
                    </div>
    
                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <form method='POST'>
                                <div className="form-group">
                                    <label className="form-control-label">USERNAME or EMAIL</label>
                                    <input type="email" className="form-control" value={email} onChange={(e)=>{ setEmail(e.target.value)}} />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">PASSWORD</label>
                                    <input type="password" className="form-control" value={password} onChange={(e)=>{ setPassword(e.target.value)}} />
                                </div>
    
                                <div className="col-lg-12 loginbttm">
                                    <div className="col-lg-6 login-btm login-text">
                                        <Link to="/forgot-password" style={{color:'#000'}}>forgot Password</Link>
                                    </div>
                                    <div className="col-lg-6 login-btm login-button">
                                        <button type="submit" className="btn btn-outline-primary" onClick={LoginUSER}>LOGIN</button>
                                    </div>
                                    <div className='p-2'>
                                      Not Have an Account? <Link to='/signup' style={{color:'#000'}}>Click here.</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <center>-------------------- OR --------------------</center>
                        <div className='text-center '>
                            <div className='btn btn-outline-dark m-2'><i className='fab fa-google' /> Continue with google</div><br/>
                            <div className='btn btn-outline-dark'><i className='fab fa-facebook' /> Continue with facebook</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    
    </div>
  )
}

export default Login
