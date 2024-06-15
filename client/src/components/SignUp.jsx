import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, Navigate, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SignUp = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [showPassword, setShowPassword] = useState(false);

	const from = location.state?.from?.pathname || '/';

	// validation form register
	const formSchema = Yup.object().shape({
		email: Yup.string().email().required('Email is required'),
		password: Yup.string()
			.required('Password is required')
			.min(8, 'Password length should be at least 8 characters')
			.max(16, 'Password cannot exceed more than 16 characters'),
		current_password: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match'),
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(formSchema),
	});

	const { createUser, login } = useContext(AuthContext);

	const onSubmit = (data) => {
		const email = data.email;
		const password = data.password;
		createUser(email, password)
			.then((result) => {
				// Signed up
				const user = result.user;
				toast.success('Account Create Successfully Done');
				navigate(from, { replace: true });
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};

	// show hide password
	const showPasswordClick = () => {
		if (showPassword === true) {
			setShowPassword(false);
		} else {
			setShowPassword(true);
		}
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
						<input
							type="email"
							{...register('email', { required: true })}
							placeholder="Email"
							className="input input-bordered"
						/>
					</div>
					<p className="alerts text-red">{errors.email?.message}</p>
					{/* Password */}
					<div className="form-control mt-1">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<div className="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								{...register('password')}
								className="py-3 px-4 w-full input input-bordered"
								placeholder="Enter password"
							/>
							<button
								type="button"
								className="absolute top-0 end-0 p-3.5 rounded-e-md"
								onClick={() => showPasswordClick()}>
								{showPassword ? <FaEye /> : <FaEyeSlash />}
							</button>
						</div>
					</div>
					<p className="alerts  text-red">{errors.password?.message}</p>
					{/* /Password */}
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
					</div>

					<p className="alerts  text-red">{errors.current_password?.message}</p>
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
