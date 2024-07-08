import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
  const {user,setUser} = useContext(UserContext); 
  const navigate = useNavigate();
  return (
    <nav className="bg-indigo-600 p-4 shadow-lg mx-auto">
      <div className="container w-4/5 mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-bold">
          <Link to="/" className="text-white font-serif">Insights</Link>
        </div>
        <div className="flex space-x-8">
          <Link
            to="/"
            className="text-gray-200 hover:text-white hover:underline transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-200 hover:text-white hover:underline transition duration-300"
          >
            Dashboard
          </Link>
          {!user?<Link
            to="/login"
            className="text-gray-200 hover:text-white hover:underline transition duration-300"
          >
            Login
          </Link> : <Link onClick={() => {
            window.FB.logout(res => {
              setUser(undefined);
              navigate('/login');
            })}
            } className="text-gray-200 hover:text-white hover:underline transition duration-300">
          Logout
          </Link>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
