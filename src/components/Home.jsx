import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Home = () => {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            window.FB.getLoginStatus(function(response) {
                if(response.status === 'unknown'){
                    navigate('/login');
                }else if(response.status === 'connected'){
                    window.FB.api('/me', {fields: 'id, name, picture'}, function(response) {
                        setUser(response);
                    });
                }
            });  
        }
    }, [user]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {!user ? <div className="text-center">
                <h1 className="text-4xl font-bold">Loading...</h1>
            </div> : 
                <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                    <div className="bg-white rounded-lg overflow-hidden mb-10 p-8">
                        <img
                            src={user.picture.data.url}
                            alt=''
                            className="border-4 border-black w-50 h-1/2 rounded-full mx-auto Profile"
                        />
                        <div className="p-6 sm:p-7 md:p-5 xl:p-7 text-center">
                            <h3 className='text-2xl font-bold'>
                                Welcome, {user.name}
                            </h3>
                        </div>
                    </div>
                </div>
                
            }
        </div>
    );
};

export default Home;
