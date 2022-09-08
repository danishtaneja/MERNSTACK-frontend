import React, {useEffect, useState} from 'react'
import AdminDashboard from './AdminDashboard';
import Panel from './Panel';

const Dashboard = () => {
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
        <form method='GET'>
            <div style={{marginTop:'80px'}}>
        <Panel />
        </div>
        {udata.isAdmin === true ? <>
            <div className="content">
               <h2 className='m-3'>Welcome {udata.name}</h2>
  <AdminDashboard />
</div></>: udata.isAdmin===false ? <>{udata.isAdmin === true ? <><span>Admin </span> <span className='dot'></span></> : udata.isAdmin===false ? <><span> <h2 style={{marginLeft:'222px'}}>Welcome {udata.name}</h2><p style={{marginTop:'none', marginLeft:'200px'}}><AdminDashboard /></p></span> <span className='dots'></span></> : <>    </>}</>:<> <h1 style={{marginTop:'200px'}}>USER NOT ACCCESS</h1></>}
        
        </form>
    </div>
  )
}

export default Dashboard