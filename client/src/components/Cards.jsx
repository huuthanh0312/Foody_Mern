/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Cards = ({ item }) => {
	const [isHeartFilted, SetHeartFilted] = useState(false);

	const handleHeartClick = () => {
		SetHeartFilted(!isHeartFilted);
	};
	return (
		<div>
			<div className="card shadow-xl relative mr-5 md:my-5">
				<div
					className={`rating gap-1 absolute cursor-pointer right-2 top-2 p-4 heartStar bg-green
            ${isHeartFilted ? 'text-rose-500' : 'text-white'}`}
					onClick={handleHeartClick}>
					<FaHeart className="w-5 h-5" />
				</div>
				<Link to={`/menu/${item._id}`}>
					<figure>
						<img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72" />
					</figure>
				</Link>
				<div className="card-body">
					<Link to={`/menu/${item._id}`}>
						<h2 className="card-title">{item.name}</h2>
					</Link>
					<p>{item.recipe}</p>
					<div className="card-actions justify-between items-center mt-2">
						<h5 className="font-semibold">
							<span className="text-sm text-red">$</span> {item.price}
						</h5>
						<button className="btn bg-green text-white">Add To Card</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cards;
