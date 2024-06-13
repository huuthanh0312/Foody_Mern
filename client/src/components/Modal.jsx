import React, { useContext, useState } from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthProvider';

const Modal = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const { signUpWithGmail, login } = useContext(AuthContext);
	const [errorMessage, setErrorMessage] = useState('');

	// google sign in gmail
	const handleLoginGmail = () => {
		signUpWithGmail()
			.then((result) => {
				const user = result.user;
				alert('Login successful');
			})
			.catch((error) => console.error(error));
	};
	const onSubmit = (data) => {
		const email = data.email;
		const password = data.password;
		login(email, password)
			.then((result) => {
				const user = result.user;
				alert('Login successful');
			})
			.catch((error) => {
				const errorMessage = error.message;
				setErrorMessage('Provide a correct email and password');
			});
	};
	return (
		<>
			<dialog id="login" className="modal">
				<div className="modal-box">
					<button
						htmlFor="login"
						onClick={() => document.getElementById('login').close()}
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
					<form className="card-body" method="dialog" onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col md:flex-row  items-center justify-between">
							<img src="/logo.png" alt="" className="md:max-w-20" />
							<h3 className="font-semibold text-lg ">Thanh Foody Login! 👋</h3>
						</div>
						{/* Email */}
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input type="email" {...register('email', { required: true })} placeholder="email" className="input input-bordered" />
						</div>

						{/* Password */}
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								{...register('password', { required: true })}
								placeholder="password"
								className="input input-bordered"
							/>
							<label className="label mt-1">
								<a href="#" className="label-text-alt link link-hover">
									Forgot password?
								</a>
							</label>
						</div>
						{/* error */}
						{errorMessage ? <p className="text-red">{errorMessage}</p> : ''}
						<div className="form-control mt-1">
							<input type="submit" className="btn text-white bg-green" value="Login" />
						</div>
						<div className="form-control justify-center items-center">
							<p>
								Don't have an account?{' '}
								<Link to="/signup" className="text-green">
									Sign Up
								</Link>
							</p>
						</div>
					</form>
					<div className="text-center space-x-3 ">
						<button onClick={handleLoginGmail} className="btn btn-circle btn-outline hover:text-white hover:bg-green mr-2">
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
