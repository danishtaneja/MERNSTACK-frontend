import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDipatchCart } from '../Context/CartContext'
// import data from '../main/data'
import Ratings from './Ratings'
import {SpinnerCircular} from 'spinners-react'
import { Link } from 'react-router-dom'

const Products = () => {
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

  // const filterResult = (props) =>{
  //   const result = mydata.filter((curData)=>{
  //     // if(curData.count === 0 || curData.count !==0 ) 
  //     return curData.gender === props;
  //   });
  //   setMydata(result)
  // }
  // const [mydata, setMydata] = useState(data)

  const dispatch = useDipatchCart()
  const addtocart = (item) =>{
    dispatch({type:'ADD_ITEM',item});
  }
  

  return (
    <>
    <div>
      {/* <div className='filters'>
        <button id='btn' onClick={()=>{setMydata(mydata)}}>All</button>
        <button id='btn' onClick={()=>{filterResult('Men')}}>Men</button>
        <button id='btn' onClick={()=>{filterResult('Women')}}>Women</button>
      </div> */}
      {loadingData ? <div className='text-center p-5'><SpinnerCircular size={50} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 1)" /> <span>Loading Data...</span></div> : 
      mydata.map((item, index)=>{
        return (
            <div key={index}>
            <div className="sections">
            <div className="products">
                <div className="product">
                <label id='product_label'>{item.gender}</label>
                    <img src={item.image} alt={item.name}  className={'img-fluid img-thumbnail'}/>
                    </div>
                    <div className='name'>
                        <Link to={`/product/${item._id}`} style={{color:'#000'}}>
                          {item.name}
                          </Link>
                    </div>
                    <div className='price m-2'>
                        <span>Price: ${item.price}</span>
                    </div>
                    <div className='ratings m-2 p-2'>
                        <span><Ratings rating={item.rating} numReviews={item.numReviews} /></span>
                    </div>
                    <div className='m-2'>
                    {/* <span><i className='fas fa-heart'  onClick={()=>{toast(`${item.name} addedd to Wish List...`); addtowish(item);}} style={{padding:"20px",fontSize:'24px'}} /></span> */}
                     {item.count === 0  ? <><button className='btn btn-outline-dark disabled btn-rounded' onClick={()=>toast(<span style={{fontWeight:'bolder'}}>{item.name} currently out of Stock</span>)}>Out of Stock &nbsp;<i className='fas fa-bag-shopping'/> </button></> : <> <button className='btn btn-outline-dark btn-rounded' onClick={()=>{toast(`${item.name} addedd to Cart...`); addtocart(item);}} >Add to Cart &nbsp;<i className='fas fa-bag-shopping'/> </button></> }
                    </div>
                </div>
            </div>
        </div>
        )
      })}
    </div>
    
    </>
  )
}

export default Products
