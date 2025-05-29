import { useState } from 'react';
import axios from 'axios';
import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                email: formData.email,
                password: formData.password,
            });

            // Redirect or do something after successful login
            setMessage("Login successful!");
        } catch (error) {
            setMessage("Login failed. Check your credentials.");
            console.error(error);
        }
    };

    return (
        <>
            <div className="grid-container grid grid-cols-1 md:grid-cols-2 min-h-screen">
                {/* Back Button */}
                <div className="col-span-full p-4">
                    <Link
                        to="/"
                        className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
                    >
                        ← Back
                    </Link>
                </div>

                {/* Form Section */}
                <div className="login-form pt-4 px-6 flex flex-col justify-center items-center">
                    <div className="w-full max-w-md">
                        <h2 className="font-bold text-3xl">Welcome back 👋</h2>
                        <p className="pt-5">Today's a good day to spot scams and stay safe.</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-2 pt-5">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@gmail.com"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-[#F7FBFF] p-3 border-1 rounded-xl border-[#ccc]"
                            />

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-[#F7FBFF] p-3 border-1 rounded-xl border-[#ccc]"
                            />

                            <div className="text-right">
                                <Link to="/forgot-password" className="text-sm text-blue-500 font-semibold">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="bg-[#162D3A] text-white p-3 mt-3 rounded-3xl"
                            >
                                Log in
                            </button>
                        </form>

                        {message && (
                            <p className="mt-4 text-center text-red-600">{message}</p>
                        )}

                        {/* "or" separator */}
                        <div className="flex items-center gap-4 my-6">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="text-gray-500 text-sm">or</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>

                        <div className="social-login flex flex-col gap-3 items-center">
                            <button className="flex items-center gap-2 justify-center bg-[#F7FBFF] w-[90%] p-4 rounded-4xl border-1 border-[#ccc]">
                                <img
                                    src="https://developers.google.com/identity/images/g-logo.png"
                                    alt="Google logo"
                                    style={{ width: '20px', height: '20px' }}
                                />
                                Continue with Google
                            </button>
                            <button className="flex items-center gap-2 bg-[#F7FBFF] justify-center w-[90%] p-4 rounded-4xl border-1 border-[#ccc]">
                                <Wallet />
                                Continue with Wallet
                            </button>
                        </div>

                        <p className="text-center mt-4">
                            Don’t have an account?{' '}
                            <Link to="/signup" className="font-bold text-blue-500">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Image Section */}
                <div className="image p-4 hidden md:block h-full">
                    <img
                        src='https://otiktpyazqotihijbwhm.supabase.co/storage/v1/object/public/images/12195a9a-cea9-4bea-9ba1-d91b12b99040-image.png'
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </>
    );
};

export default Login;
