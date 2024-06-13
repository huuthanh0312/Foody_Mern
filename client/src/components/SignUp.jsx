import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';

const SignUp = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const { createUser, login } = useContext(AuthContext);

	const onSubmit = (data) => {
		const email = data.email;
		const password = data.password;
		createUser(email, password)
			.then((result) => {
				// Signed up
				const user = result.user;
				alert('Account Create Successfully Done');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
			});
	};
	return (
		<div className="max-w-md bg-white shadow-md w-full mx-auto flex items-center justify-center my-16">
			<div className="card flex flex-col justify-center mt-0 mb-5">
				<Link to="/" className="btn btn-sm btn-outline btn-circle btn-ghost absolute right-0 top-1">
					✕
				</Link>
				<form className="card-body" method="dialog" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col md:flex-row  items-center justify-between">
						<img src="/logo.png" alt="" className="md:max-w-20" />
						<h3 className="font-semibold text-lg ">Thanh Foody Register! 👋</h3>
					</div>
					{/* Email */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input type="email" {...register('email', { required: true })} placeholder="email" className="input input-bordered" />
					</div>
					{/* Password */}
					<div className="form-control mt-1">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input type="password" {...register('password', { required: true })} placeholder="password" className="input input-bordered" />
					</div>
					{/* Password
					<div className="form-control mt-1">
						<label className="label">
							<span className="label-text">Current Password</span>
						</label>
						<input
							type="password"
							{...register('current_password', { required: true })}
							placeholder="Current Password"
							className="input input-bordered"
						/>
					</div> */}
					<div className="form-control mt-1">
						<input type="submit" className="btn text-white bg-green" value="Sign Up" />
					</div>
					<div className="form-control justify-center items-center">
						<p>
							Already have an account?
							<a onClick={() => document.getElementById('login').showModal()} className="text-green">
								Login
							</a>
						</p>
					</div>
					<Modal />
				</form>
				<div className="text-center space-x-3 ">
					<button className="btn btn-circle btn-outline hover:text-white hover:bg-green mr-2">
						<FaGoogle />
					</button>
					<button className="btn btn-circle btn-outline hover:text-white hover:bg-green mr-2">
						<FaFacebook />
					</button>
					<button className="btn btn-circle btn-outline hover:text-white hover:bg-green ">
						<FaGithub />
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
