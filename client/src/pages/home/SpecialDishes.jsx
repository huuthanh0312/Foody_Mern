import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Cards from '../../components/Cards';

const SpecialDishes = () => {
	const [recipes, setRecipes] = useState([]);
	const slider = React.useRef(null); // kấy giá trị của một input hoặc thực hiện các hành động khác
	useEffect(() => {
		fetch('/menu.json')
			.then((res) => res.json())
			.then((data) => {
				const specails = data.filter((item) => item.category === 'popular');
				setRecipes(specails);
			});
	}, []); // Chạy chỉ một lần sau khi component được render
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<div className="section-container my-20">
			<div>
				<div className="text-left">
					<p className="subtitle">Customer Favorites</p>
					<h2 className="title md:w-[520px]">Popular Categories</h2>
				</div>

				<Slider {...settings} className="mt-10 space-x-5">
					{recipes.map((item, i) => (
						<Cards item={item} key={i} />
					))}
				</Slider>
			</div>
		</div>
	);
};

export default SpecialDishes;
