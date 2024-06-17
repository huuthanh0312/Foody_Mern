import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
	const { user } = useContext(AuthContext);
	const { refetch, data: cart = [] } = useQuery({
		queryKey: ['carts', user?.email],
		queryFn: async () => {
			const response = await fetch(`http://localhost:5000/api/carts?email=${user?.email}`);
			return response.json();
		},
	});
	return [cart, refetch];
};

export default useCart;
