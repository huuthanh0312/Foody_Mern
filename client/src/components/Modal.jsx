import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthProvider';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Modal = () => {
	const { signUpWithGmail, login, loading, loadingLoginFaild } = useContext(AuthContext);
	const [errorMessage, setErrorMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	// validation form register
	const formSchema = Yup.object().shape({
		email: Yup.string().email().required('Email is required'),
		password: Yup.string()
			.required('Password is required')
			.min(8, 'Password length should be at least 8 characters')
			.max(16, 'Password cannot exceed more than 16 characters'),
	});

	// form submit
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(formSchema),
	});

	// google sign in gmail
	const handleLoginGmail = () => {
		signUpWithGmail()
			.then((result) => {
				const user = result.user;
				navigate(from, { replace: true });
				toast.success("'Login successful");
			})
			.catch((error) => {
				console.error(error);
				toast.error('Login failed');
			});
	};

	//Login with acount
	const onSubmit = (data) => {
		const email = data.email;
		const password = data.password;
		login(email, password)
			.then((result) => {
				const user = result.user;
				document.getElementById('login').close();
				loadingLoginFaild();
				navigate(from, { replace: true });
				toast.success('Sign In Successfully');
			})
			.catch((error) => {
				loadingLoginFaild();
				const errorMessage = error.message;
				setErrorMessage('Provide a correct email and password');
			});
	};

	const showPasswordClick = () => {
		if (showPassword === true) {
			setShowPassword(false);
		} else {
			setShowPassword(true);
		}
	};
	return (
		<>
			<dialog id="login" className="modal z-1">
				<div className="modal-box relative">
					<button
						htmlFor="login"
						onClick={() => document.getElementById('login').close()}
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
					<form id="login-form" className="card-body" method="dialog" onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col md:flex-row  items-center justify-between">
							<img src="/logo.png" alt="" className="md:max-w-20" />
							<h3 className="font-semibold text-lg ">Thanh Foody Login! 👋</h3>
						</div>
						{/* Email */}
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input type="email" {...register('email')} placeholder="email" className="input input-bordered" />
						</div>
						<p className="alerts text-red">{errors.email?.message}</p>
						{/* Password */}
						<div className="form-control">
							<div className="flex flex-col md:flex-row justify-between items-center">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<label className="label mt-1">
									<a href="#" className="label-text-alt link link-hover text-primary">
										Forgot password?
									</a>
								</label>
							</div>
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
						<p className="alerts text-red mb-2">{errors.password?.message}</p>
						{/* error */}
						{errorMessage ? <p className="text-red">{errorMessage}</p> : ''}
						<div className="form-control mt-1">
							{loading ? (
								<div className="btn text-white bg-green justify-center items-center ">
									<div className=" loading loading-bars loading-xs"></div>
								</div>
							) : (
								<>
									<input type="submit" className="btn text-white bg-green" value="Login" />
								</>
							)}
						</div>
						<div className="form-control justify-center items-center">
							<p>
								Don't have an account?{' '}
								<Link to="/signup" className="text-green pl-1">
									Sign Up
								</Link>
							</p>
						</div>
					</form>
					<div className="text-center space-x-3 ">
						<button
							onClick={handleLoginGmail}
							className="btn btn-circle btn-outline hover:text-white hover:bg-green mr-2">
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
			</dialog>
		</>
	);
};

export default Modal;
