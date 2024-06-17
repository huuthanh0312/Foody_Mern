import React, { useContext, useState } from 'react';
import useCart from '../../hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';

const Cart = () => {
	const { user } = useContext(AuthContext);
	const [cart, refetch] = useCart();
	const [cartItems, setCartItems] = useState([]);

	// CartItems delete
	const handleDeleteCartItem = (item) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`http://localhost:5000/api/carts/${item._id}`, {
					method: 'DELETE',
				}).then((data) => {
					if (data.status === 200) {
						refetch();
						Swal.fire({
							title: 'Deleted!',
							text: 'Your file has been deleted.',
							icon: 'success',
						});
					} else {
						Swal.fire({
							title: 'Deleted!',
							text: 'Deleted Item Faild.',
							icon: 'error',
						});
					}
				});
			}
		});
	};
	// function calculate price
	const calculatePrice = (item) => {
		return item.price * item.quantity;
	};
	//Total CartItems
	const subTotalCart = cart.reduce((total, item) => {
		return total + calculatePrice(item);
	}, 0);
	const orderTotal = subTotalCart;

	// Quantity Decrease and Increase
	const handleDecrease = (item) => {
		if (item.quantity > 1) {
			fetch(`http://localhost:5000/api/carts/${item._id}`, {
				method: 'PUT',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ quantity: item.quantity - 1 }),
			})
				.then((res) => res.json())
				.then((data) => {
					//if uppdate success change state update reload
					const updateCartItems = cartItems.map((cartItem) => {
						if (cartItem.id === item.id) {
							return { ...cartItem, quantity: cartItem.quantity + 1 };
						}
						return cartItem;
					});
					refetch();
					setCartItems(updateCartItems);
				});
		} else {
			Swal.fire({
				icon: 'error',
				title: `${item.name} can't not zero!`,
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};
	const handleIncrease = (item) => {
		fetch(`http://localhost:5000/api/carts/${item._id}`, {
			method: 'PUT',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ quantity: item.quantity + 1 }),
		})
			.then((res) => res.json())
			.then((data) => {
				//if uppdate success change state update reload
				const updateCartItems = cartItems.map((cartItem) => {
					if (cartItem.id === item.id) {
						return { ...cartItem, quantity: cartItem.quantity + 1 };
					}
					return cartItem;
				});
				refetch();
				setCartItems(updateCartItems);
			});
	};
	return (
		<>
			<div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
				<div className="py-24 pb-8 flex flex-col justify-center items-center">
					{/* menu bar */}
					<div className="text-center space-y-7 px-4">
						<h4 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
							Items Add The Cart <span className="text-green">Food</span>
						</h4>
					</div>
				</div>
				<div className="section-container">
					<div className="overflow-x-auto">
						<table className="table">
							{/* head */}
							<thead className="bg-green text-white rounded-sm">
								<tr className="text-center ">
									<th>#</th>
									<th>Food</th>
									<th>Items Name</th>
									<th>Quantity</th>
									<th>Price</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{/* row 1 */}
								{cart.map((item, index) => (
									<tr key={index} className="items-center justify-between text-center">
										<td>{index + 1}</td>
										<td>
											<div className="gap-3">
												<div className="avatar">
													<div className="mask mask-squircle w-12 h-12">
														<img src={item.image} alt="Avatar Menu" />
													</div>
												</div>
											</div>
										</td>
										<td className="font-medium">{item.name}</td>
										<td>
											<button
												className="btn btn-xs"
												onClick={() => {
													handleDecrease(item);
												}}>
												-
											</button>
											<input
												type="number"
												value={item.quantity}
												onChange={() => console.log(item.quantity)}
												className="w-10 mx-2 text-center overflow-hidden appearance-none"
											/>
											<button
												className="btn btn-xs"
												onClick={() => {
													handleIncrease(item);
												}}>
												+
											</button>
										</td>
										<td>
											<p>${calculatePrice(item).toFixed(2)}</p>
										</td>
										<td>
											<button
												className="btn btn-ghost text-red btn-sm"
												onClick={() => {
													handleDeleteCartItem(item);
												}}>
												<FaTrashAlt className=" w-4 h-4" />
											</button>
										</td>
									</tr>
								))}
							</tbody>
							{/* foot */}
						</table>
					</div>
					{/* Infomation and checkout */}
					<div className="my-12 flex flex-col md:flex-row">
						<div className="md:w-1/2 space-y-3">
							<h2 className="font-medium">Customer Details</h2>
							<p>Name: {user.displayName}</p>
							<p>Email: {user.email}</p>
							<p>User_id: {user.uid}</p>
						</div>
						<div className="md:w-1/2 space-y-3">
							<h2 className="font-medium">Shopping Details</h2>
							<p>Total Items: {cart.length}</p>
							<p>Total Price: ${orderTotal.toFixed(2)}</p>
							<button className="btn btn-ghost bg-green text-white">Procceed Checkout</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Cart;
