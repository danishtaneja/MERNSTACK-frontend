import React from 'react'
import Products from './Products'

const Home = () => {
  return (
    <div><div className="section full-height">
    <div className="absolute-center">
        <div className="section">
            <div className="container slider--container">
                <div className="row">
                    <div className="col-12 slider--heading">
                     <h1 className=''><span>Fashion Shop.</span></h1>
                        <p>scroll for nav animation</p>	
                    </div>	
                    <img className="slider--image" src="https://images.sportsdirect.com/images/products/12705382_l.jpg" alt="winter-01" />
                    <img className="slider--image" src="https://diginomica.com/sites/default/files/styles/article_images_desktop/public/images/2020-04/Screenshot%202020-04-28%20at%2015.14.29.png?itok=mIB4Zmpr" alt="winter-02" />
                    <img className="slider--image" src="https://sneakerbardetroit.com/wp-content/uploads/2017/08/nike-hyperadapt-1-0-black-blue-lagoon-843871-001-7.jpg" alt="winter-03" />
                </div>		
            </div>	
        </div>
        
    </div>
</div>
<div>
<h1 className=''><span className='mt-5'>Product</span>s</h1>
<Products />
</div>

{/* <Link to="https://front.codes/" className="logo" target="_blank">
    <img src="https://assets.codepen.io/1462889/fcy.png" alt="" />
</Link> */}
</div>
  )
}

export default Home