

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { loading } = useSelector((state) => state.auth);

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    };

    return (
        <div className='text-white'>
            <h1>Choose New Password</h1>
            <p>Almost done. Enter your new password and you’re all set.</p>

            <form onSubmit={handleOnSubmit}>
                {/* Password */}
                <label>
                    <p className='text-white'>Password*</p>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Password"
                      
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <FaEyeSlash fontSize={24} /> : <FaEye fontSize={24} />}
                    </span>
                </label>

                {/* Confirm Password */}
                <label className='text-white'>
                    <p>Confirm New Password*</p>
                    <input
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword" 
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder="ConfirmPassword"
                        class="w-1xl px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 placeholder:font-medium rounded-2xl"
                    />
                    <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ? <FaEyeSlash fontSize={24} /> : <FaEye fontSize={24} />}
                    </span>
                </label>

                <button type="submit">
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>

            <div>
                <Link to="/login">
                    <p>Back to Login</p>
                </Link>
            </div>
        </div>
    );
};

export default UpdatePassword;
