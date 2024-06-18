import React, { useContext, useEffect, useState } from 'react';
import logo from '../../public/logo.png';
import { BiPhoneCall } from 'react-icons/bi';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Navbar = () => {
	const [sticky, setSticky] = useState(false);
	const { user, logout } = useContext(AuthContext);
	const [cart, refetch] = useCart();
	//handle scroll function
	useEffect(() => {
		const handleScroll = () => {
			const offset = window.scrollY;
			if (offset > 0) {
				setSticky(true);
			} else {
				setSticky(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const navItems = (
		<>
			<li>
				<a href="/" className="text-green">
					Home
				</a>
			</li>
			<li tabIndex={0}>
				<details>
					<summary>Menu</summary>
					<ul className="p-2">
						<li>
							<a href="/menu">All</a>
						</li>
						<li>
							<a>Salad</a>
						</li>
						<li>
							<a>Pizza</a>
						</li>
					</ul>
				</details>
			</li>
			<li tabIndex={0}>
				<details>
					<summary>Services</summary>
					<ul className="p-2">
						<li>
							<a>Online Order</a>
						</li>
						<li>
							<a>Table Booking</a>
						</li>
						<li>
							<a>Order Tracking</a>
						</li>
					</ul>
				</details>
			</li>
			<li>
				<a>Offers</a>
			</li>
		</>
	);
	return (
		<div>
			<header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out">
				<div
					className={`navbar xl:px-24 
						${sticky ? 'bg-white shadow-xl transition-all duration-300 ease-in-out' : ''}`}>
					<div className="navbar-start">
						<div className="dropdown">
							<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
								</svg>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
								{navItems}
							</ul>
						</div>
						<a href="/">
							<img src={logo} alt="" />
						</a>
					</div>
					<div className="navbar-center hidden lg:flex">
						<ul className="menu menu-horizontal px-1">{navItems}</ul>
					</div>

					<div className="navbar-end">
						{/* Search */}

						<button className="btn btn-ghost btn-circle hidden lg:flex">
							<FaSearch className="h-5 w-5" />
						</button>

						{/* Cart */}
						{user ? (
							<Link to="/cart">
								<label tabIndex={0} className="mr-3 justify-center items-center hidden lg:flex">
									<div className="dropdown dropdown-end">
										<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
											<div className="indicator">
												<FaShoppingCart className="h-5 w-5" />
												<span className="badge badge-sm indicator-item ">{cart.length || 0}</span>
											</div>
										</div>
									</div>
								</label>
							</Link>
						) : (
							<label tabIndex={0} className="mr-3 justify-center items-center hidden lg:flex">
								<div className="dropdown dropdown-end">
									<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
										<div className="indicator">
											<FaShoppingCart className="h-5 w-5" />
											<span className="badge badge-sm indicator-item ">{cart.length || 0}</span>
										</div>
									</div>
								</div>
							</label>
						)}
						{/* button login modal */}
						{user ? (
							<Profile user={user} />
						) : (
							<button
								onClick={() => document.getElementById('login').showModal()}
								className="btn bg-green rounded-xl px-6 text-white items-center gap-2">
								<FaUser /> Login
							</button>
						)}

						<Modal />
					</div>
				</div>
			</header>
		</div>
	);
};

export default Navbar;
