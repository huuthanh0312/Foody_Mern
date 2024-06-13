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
		return createUserWithEmailAndPassword(auth, email, password);
	};

	// signUp with gmail
	const signUpWithGmail = () => {
		return signInWithPopup(auth, googleProvider);
	};

	//login using gmail
	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	//logout
	const logout = () => {
		return signOut(auth);
	};

	// update profile
	const updateUserProfile = ({ name, photoURL }) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photoURL,
		});
	};

	//check sign in user profile
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
				setLoading(false);
			} else {
				setLoading(true);
			}
		});
		return unsubscribe();
	}, []);

	const authInfo = {
		user,
		createUser,
		signUpWithGmail,
		login,
		updateProfile,
		logout,
	};
	return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
