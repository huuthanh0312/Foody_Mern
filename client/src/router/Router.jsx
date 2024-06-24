import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import Menu from '../pages/shop/Menu';
import SignUp from '../components/SignUp';
import UpdateProfile from '../pages/dashboard/UpdateProfile';
import Cart from '../pages/shop/Cart';
import PrivateRouter from '../PrivateRouter/PrivateRoute';
import DashboardLayout from '../layout/DashboardLayout';
import Dashboard from '../pages/dashboard/admin/Dashboard';
import Users from '../pages/dashboard/admin/Users';
import Login from '../components/Login';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/menu',
				element: <Menu />,
			},
			{
				path: '/update-profile',
				element: <UpdateProfile />,
			},
			{
				path: '/cart',
				element: <Cart />,
			},
		],
	},
	{
		path: '/signup',
		element: <SignUp />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: 'dashboard',
		element: (
			<PrivateRouter>
				<DashboardLayout />
			</PrivateRouter>
		),
		children: [
			{ path: '', element: <Dashboard /> },
			{
				path: 'users',
				element: <Users />,
			},
		],
	},
]);

export default router;
