import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="pt-24 min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Form Section */}
        <div className="flex-1 p-8 md:p-12 space-y-5">
          <h2 className="text-2xl font-bold">LOGIN</h2>
          <input type="text" placeholder="Warehouse Name" className="w-full p-3 border rounded bg-blue-50 outline-none" />
          <input type="text" placeholder="Warehouse Code" className="w-full p-3 border rounded bg-blue-50 outline-none" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded bg-blue-50 outline-none" />
          
          <div className="flex justify-end">
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          </div>

          <button type='submit' className="w-full bg-gray-800 text-white py-3 rounded hover:bg-gray-900 transition">
            Login Now
          </button>

          <p className="text-center text-sm">
            Don’t have an account? <Link to="/register" className="text-blue-600 font-medium">Sign up</Link>
          </p>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
          {/* <img src="https://via.placeholder.com/400x400?text=Login+Illustration" alt="Login Illustration" className="max-w-full rounded" /> */}
          <img src="/assets/home.png" alt="home"/>
        </div>
      </div>
    </div>
  );
};

export default Login;
