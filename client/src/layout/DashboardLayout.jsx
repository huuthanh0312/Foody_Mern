import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MdDashboard, MdDashboardCustomize } from 'react-icons/md';
import {
	FaEdit,
	FaLocationArrow,
	FaPlusCircle,
	FaRegUser,
	FaShoppingBag,
	FaShoppingBasket,
	FaShoppingCart,
	FaSuperpowers,
	FaUser,
} from 'react-icons/fa';
import logo from '../../public/logo.png';

const shareLinks = (
	<>
		<li>
			<Link to="/">
				<MdDashboardCustomize /> Home
			</Link>
		</li>
		<li>
			<Link to="/menu">
				<FaShoppingBag /> Menu
			</Link>
		</li>
		<li>
			<Link to="/menu">
				<FaLocationArrow /> Order Tracking
			</Link>
		</li>
		<li>
			<Link to="/menu">
				<FaSuperpowers /> Customer Support
			</Link>
		</li>
	</>
);

const DashboardLayout = () => {
	return (
		<div>
			<div className="drawer lg:drawer-open ">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col lg:items-start lg:justify-start my-2">
					<div className="flex items-center justify-between mx-4">
						<label htmlFor="my-drawer" aria-label="Menu" className="btn btn-square btn-ghost lg:hidden" title="Menu">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block h-6 w-6 stroke-current">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
							</svg>
						</label>
						<div className="flex-1 ml-1">
							<Link to="/dashboard" className="flex lg:hidden">
								<img src={logo} alt="" className="w-20 mr-2" />
								<div className="badge badge-primary mt-1">Admin</div>
							</Link>
						</div>

						<button className="btn rounded-full bg-green text-white lg:hidden px-6">
							<FaRegUser /> Logout
						</button>
					</div>
					<div className="mt-5 md:mt-2 mx-4">
						<Outlet />
					</div>
				</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
					<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
						{/* Sidebar content here */}
						<li className="">
							<Link to="/dashboard" className="flex justify-start mb-3">
								<img src={logo} alt="" className="w-20" />
								<div className="badge badge-primary">Admin</div>
							</Link>
						</li>
						<hr className="shadow-xl mb-2"></hr>
						<li>
							<Link to="/dashboard">
								<MdDashboard /> Dashboard
							</Link>
						</li>
						<li>
							<Link to="/dashboard">
								<FaShoppingCart /> Manage Bookings
							</Link>
						</li>
						<li>
							<Link to="/dashboard">
								<FaPlusCircle /> Add Menu
							</Link>
						</li>
						<li>
							<Link to="/dashboard">
								<FaEdit /> Manage Items
							</Link>
						</li>
						<li>
							<Link to="/dashboard/users">
								<FaUser /> All Users
							</Link>
						</li>
						<hr className="mt-5" />
						{/* share links */}
						{shareLinks}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
