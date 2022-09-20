import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../../App'

const Navbar = () => {

	const {state} = useContext(UserContext);

	const NavSet = () =>{
		if(state){
			return <>
			<div className="collapse navbar-collapse" id="navbarSupportedContent" >
			<ul className="navbar-nav ml-auto py-4 py-md-0">
				<li className='pl-4 pl-md-0 ml-0 ml-md-4 active'>
					<Link className='nav-link' to='/'>Home</Link>
				</li>
				<li className='pl-4 pl-md-0 ml-0 ml-md-4 active'>
					<Link className='nav-link' to='/products'>Products</Link>
				</li>
				<li className='pl-4 pl-md-0 ml-0 ml-md-4 active'>
					<Link className='nav-link' to='/contact'>Contact Us</Link>
				</li>
				<li className='pl-4 pl-md-0 ml-0 ml-md-4 active'>
					<Link className='nav-link' to='/cart'>Cart <i className='fas fa-bag-shopping'/></Link>
				</li>
				<li className='pl-4 pl-md-0 ml-0 ml-md-4 active'>
					<Link className='nav-link' to='/logout'>Logout <i className="fa fa-sign-out" aria-hidden="true" /></Link>
				</li>
			</ul>
		</div>
		</>
		}
		else{
			return<>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav ml-auto py-4 py-md-0">
				<li className='pl-4 pl-md-0 ml-0 ml-md-4 active'>
					<Link className='nav-link' to='/'>Home</Link>
				</li>
				<li className='pl-4 pl-md-0 ml-0 ml-md-4 active'>
					<Link className='nav-link' to='/products'>Products</Link>
				</li>
				<li className='pl-4 pl-md-0 ml-0 ml-md-4 active'>
					<Link className='nav-link' to='/contact'>Contact Us</Link>
				</li>
				<li className='pl-4 pl-md-0 ml-0 ml-md-4 active'>
					<Link className='nav-link' to='/cart'>Cart <i className='fas fa-bag-shopping'/></Link>
				</li>

				 <li className='pl-4 pl-md-0 ml-0 ml-md-4 active'>
					<Link className='nav-link' to='/login'>Login <i className='fas fa-user'/></Link>
				</li>
			</ul>
		</div>
		</>
		}
	}

  return (
    <div>
    <section  className="hero-anime">	

	<div className="navigation-wrap bg-light start-header start-style">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<nav className="navbar navbar-expand-md navbar-light">
					
						<Link className="navbar-brand" to="/" >
							{/* <img src="https://seeklogo.com/images/G/girls-and-clothing-fashion-shop-logo-0620490E6A-seeklogo.com.png" alt="Fashion Touch" /> */}
							<span>Fashion Shop</span> 
						</Link>	
						
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						
						<NavSet />
						
					</nav>		
				</div>
			</div>
		</div>
	</div>
</section>
</div>
  )
}

export default Navbar
