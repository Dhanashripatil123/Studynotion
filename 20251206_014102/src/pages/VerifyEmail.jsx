import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendOtp, signUp } from '../services/operations/authAPI';
import OTPInput from 'react-otp-input';
import { useNavigate, Link } from 'react-router-dom';


const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signupData, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("signup data",signupData);
    
    if (!signupData) {
      navigate('/signup');
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      
    } = signupData;

   
    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp,navigate));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      {loading ? (
        <div className="text-white text-xl">Loading...</div>
      ) : (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white w-[90%] max-w-md">
          <h1 className="text-2xl font-bold mb-2">Verify Email</h1>
          <p className="mb-4 text-sm">
            A verification code has been sent to your email. Enter the code below to complete signup.
          </p>

          <form onSubmit={handleOnSubmit} className="flex flex-col items-center">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-10 h-10 mx-1 text-center rounded-md bg-gray-700 text-white"
                />
              )}
              shouldAutoFocus
            />

            <button
              type="submit"
              className="mt-6 bg-yellow-500 text-black font-semibold py-2 px-6 rounded-xl"
            >
              Verify Email
            </button>
          </form>

          <div className="mt-4">
            <Link to="/login" className="text-blue-400 hover:underline text-sm">
              Back to Login
            </Link>
          </div>

          <button
            onClick={() => dispatch(sendOtp(signupData.email))}
            className="mt-4 text-sm text-gray-300 hover:text-white underline"
          >
            Resend OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
