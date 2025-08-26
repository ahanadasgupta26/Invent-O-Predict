import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="pt-24 min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Form Section */}
        <div className="flex-1 p-8 md:p-12 space-y-5">
          <h2 className="text-2xl font-bold">SIGN UP</h2>
          <input type="text" placeholder="Company Name" className="w-full p-3 border rounded bg-blue-50 outline-none" />
          <input type="text" placeholder="Company Code" className="w-full p-3 border rounded bg-blue-50 outline-none" />
          <input type="text" placeholder="Warehouse Name" className="w-full p-3 border rounded bg-blue-50 outline-none" />
          <input type="text" placeholder="Warehouse Location" className="w-full p-3 border rounded bg-blue-50 outline-none" />
          <input type="text" placeholder="Warehouse Code" className="w-full p-3 border rounded bg-blue-50 outline-none" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded bg-blue-50 outline-none" />
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <button className="w-full bg-gray-800 text-white py-3 rounded hover:bg-gray-900 transition">
            Create account
          </button>

          <p className="text-center text-sm">
            Already have an account? <Link to="/login" className="text-blue-600 font-medium">Login</Link>
          </p>
        </div>

        {/* Illustration */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
          {/* <img src="https://via.placeholder.com/400x400?text=Signup+Illustration" alt="Signup Illustration" className="max-w-full rounded" /> */}
          <img src="/assets/home.png" alt="home" className='h-full'/>
        </div>
      </div>
    </div>
  );
};

export default Register;
