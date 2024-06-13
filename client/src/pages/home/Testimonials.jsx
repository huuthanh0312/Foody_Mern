import React from 'react';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
	return (
		<div className="section-container ">
			<div className="flex flex-col md:flex-row justify-between items-center gap-12">
				<div className="md:w-1/2">
					<img src="/images/home/testimonials/testimonials.png" alt="" className="hover:scale-105 transition-all duration-300" />
				</div>
				<div className="md:w-1/2">
					<div className="text-left md:w-4/5">
						<p className="subtitle">Testimonials</p>
						<h2 className="title">What our Cutomers Say About Us</h2>
						<blockquote className="my-5 text-secondary ">
							"I had the pleasure of dining at Foodi last night, and I'm still rawing about the experiencel ! The attention to detail in
							presentation and service was impeccable"
						</blockquote>

						{/* avatar */}
						<div className="avatar-group -space-x-6 rtl:space-x-reverse">
							<div className="avatar">
								<div className="w-12">
									<img src="/images/home/testimonials/testimonial1.png" />
								</div>
							</div>
							<div className="avatar">
								<div className="w-12">
									<img src="/images/home/testimonials/testimonial2.png" />
								</div>
							</div>
							<div className="avatar">
								<div className="w-12">
									<img src="/images/home/testimonials/testimonial3.png" />
								</div>
							</div>
							<div className="avatar placeholder">
								<div className="w-12 bg-neutral text-neutral-content">
									<span>+99</span>
								</div>
							</div>
						</div>
						<div className="space-y-1">
							<h5 className="text-lg font-semibold">Customer Feedbacks</h5>
							<div className="flex items-center gap-2">
								<FaStar className="text-yellow-400" />
								<span className="font-medium">4.9</span> <span className="text-[$807E7E]">(18.6k Reviews)</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Testimonials;
