import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
const DeletProduct = () => {
    const param = useParams();
    const {_id} = param; 
    const navigate = useNavigate();
    const [setMydata] = useState({})
    const getData = async() =>{
      await fetch(`/delete/${_id}`)
      .then((res)=> {return res.json();})
      .then((resdata)=>{
        setMydata(resdata);
      })
    }
  
    useEffect(()=>{
      getData(_id);
      navigate('/allproduct')
    })
  return (
    <div>
    </div>
  )
}

export default DeletProduct
