import React, { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthProvider';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile = (user) => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const handleLogout = () => {
		logout()
			.then(() => {
				navigate(from, { replace: true });
				toast.success('Logout Successfully');
			})
			.catch((error) => {
				// An error happened.
			});
	};
	return (
		<div>
			<div className="drawer drawer-end z-[1]">
				<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content">
					{/* Page content here */}
					<label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full rounded-circle">
							{user.photoURL ? (
								<img alt="Profile" src={user.photoURL} />
							) : (
								<img alt="Profile" src="/images/home/testimonials/testimonial2.png" />
							)}
						</div>
					</label>
				</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
					<ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
						{/* Sidebar content here */}
						<li>
							<a href="/update-profile">Profile</a>
						</li>
						<li>
							<a>Order</a>
						</li>
						<li>
							<a>Setting</a>
						</li>
						<li>
							<a onClick={handleLogout}>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Profile;
