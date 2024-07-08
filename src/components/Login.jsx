import React, { useContext } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        try {
            window.FB.login(response => {
              if (response.authResponse) {
                window.FB.api(
                    '/me',
                    'GET',
                    {"fields":"picture,name,id"},
                    function(res) {
                        setUser(res);
                        navigate('/');
                    }
                  );
              }
            }, { 
                config_id: '445044065037335',
               });
        } catch (error) {
            console.log(error);
        }
      };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center w-full py-3 px-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          <FaFacebook className="mr-2" />
          Login with Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
