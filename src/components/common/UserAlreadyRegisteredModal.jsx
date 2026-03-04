import React from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const UserAlreadyRegisteredModal = ({ isOpen, onClose, email }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700/50 overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiAlertCircle className="text-white text-2xl" />
            <h2 className="text-white text-xl font-bold">User Already Registered</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors ml-2"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-red-300 text-sm">
              <span className="font-semibold">Account Already Exists</span>
            </p>
          </div>

          <p className="text-gray-300 text-center">
            The email <span className="font-semibold text-white">{email}</span> is already registered with us.
          </p>

          <p className="text-gray-400 text-sm text-center">
            If this is your account, please log in instead. If you forget your password, you can reset it.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Go to Login
            </button>
            <button
              onClick={() => {
                onClose();
                navigate('/forgot-password');
              }}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              Forgot Password?
            </button>
            <button
              onClick={handleClose}
              className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAlreadyRegisteredModal;
