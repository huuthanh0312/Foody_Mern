import React, { createContext, useEffect, useState } from 'react';
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	//create an acount
	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	// signUp with gmail
	const signUpWithGmail = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	//login using gmail
	const login = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	// update profile
	const updateUserProfile = (name, photoURL) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photoURL,
		});
	};

	//logout
	const logout = () => {
		return signOut(auth);
	};

	//check sign in user profile
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setLoading(false);
			setUser(currentUser);
		});
		return () => {
			return unsubscribe();
		};
	}, []);

	// set loading login faild
	const loadingLoginFaild = () => {
		setLoading(false);
	}
	const authInfo = {
		user,
		loading,
		loadingLoginFaild,
		createUser,
		signUpWithGmail,
		login,
		updateUserProfile,
		logout,
	};
	return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
