/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../hooks/useCart';

const Cards = ({ item }) => {
	const [isHeartFilted, SetHeartFilted] = useState(false);
	const { user } = useContext(AuthContext);
	const { _id, name, recipe, image, price } = item;
	const location = useLocation();
	const navigate = useNavigate();
	const [cart, refetch] = useCart();

	// onclick add heart
	const handleHeartClick = () => {
		SetHeartFilted(!isHeartFilted);
	};

	// onclick add to cart
	const handleAddToCart = (item) => {
		if (user && user?.email) {
			const cartItem = { menuItemId: _id, name, recipe: recipe, image, price, quantity: 1, email: user.email };
			fetch('http://localhost:5000/api/carts', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(cartItem),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.message) {
						Swal.fire({
							icon: 'error',
							title: data.message,
							showConfirmButton: false,
							timer: 1500,
						});
					} else {
						refetch();
						Swal.fire({
							icon: 'success',
							title: 'Add To Cart Success',
							showConfirmButton: false,
							timer: 1500,
						});
					}
				});
		} else {
			Swal.fire({
				title: 'Please Login?',
				text: "Without an acount can't able to add  product!",
				icon: 'warning',
				showDenyButton: true,
				showCloseButton: true,
				confirmButtonColor: '#00FF33',
				denyButtonColor: '#3085d6',
				confirmButtonText: `Sign In Now!`,
				denyButtonText: 'Register Acount!',
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.close();
					document.getElementById('login').show();
				} else if (result.isDenied) {
					navigate('/signup', { state: { from: location } });
				}
			});
		}
	};
	return (
		<div>
			<div className="card shadow-xl relative mr-5 md:my-5">
				<div
					className={`rating gap-1 absolute cursor-pointer right-2 top-2 p-2 heartStar bg-green
            ${isHeartFilted ? 'text-rose-500' : 'text-white'}`}
					onClick={handleHeartClick}>
					<FaHeart className="w-5 h-5" />
				</div>
				<Link to={`/menu/${item._id}`}>
					<figure>
						<img src={item.image} alt="Shoes" className="w-40 hover:scale-95 transition-all duration-300 md:h-50" />
					</figure>
				</Link>
				<div className="card-body">
					<Link to={`/menu/${item._id}`}>
						<h2 className="card-title text-center">{item.name}</h2>
					</Link>
					<p>{item.recipe}</p>
					<div className="card-actions justify-between items-center mt-2">
						<h5 className="font-semibold">
							<span className="text-sm text-red">$</span> {item.price}
						</h5>
						<button className="btn bg-green text-white" onClick={() => handleAddToCart(item)}>
							Add To Card
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cards;
