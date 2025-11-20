// "use client"
// import { useUser } from '@/app/provider'
// import React from 'react'
// import Image from 'next/image'

// function WelcomeContainer() {
//   const {user} = useUser();
//   return (
//     <div className='bg-white p-5 rounded-xl flex justify-between items-center '>
//       <div >
//         <h2 className='text-lg font-bold'>Welcome Back, {user?.name ? `, ${user.name}` : ''}</h2>
//         <h2 className='text-gray-500'>AI-Driven, Hassel-Free  Hiring</h2>
//       </div>
//       {user && <Image src={user?.picture} alt='userAvatar' width={40} height={40} className='rounded-full'/> }  
//     </div>
//   )
// }

// export default WelcomeContainer








"use client";
import { useUser } from '@/app/provider';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/services/supabaseClient';

function WelcomeContainer() {
    const { user } = useUser();
    const [userData, setUserData] = useState({
        name: user?.name || 'User',
        picture: null
    });

    useEffect(() => {
        if (user?.email) {
            fetchLatestUserData();
        }
    }, [user]);

    const fetchLatestUserData = async () => {
        try {
            const { data: userRecord, error } = await supabase
                .from('Users')
                .select('name, picture')
                .eq('email', user.email)
                .single();

            if (!error && userRecord) {
                setUserData({
                    name: userRecord.name || user?.name || user?.email?.split('@')[0] || 'User',
                    picture: userRecord.picture || user?.picture
                });
            } else {
                setUserData({
                    name: user?.name || user?.email?.split('@')[0] || 'User',
                    picture: user?.picture
                });
            }

            if (typeof window !== 'undefined') {
                const googleProfile = localStorage.getItem('googleProfile');
                if (googleProfile) {
                    const { name, picture } = JSON.parse(googleProfile);
                    setUserData(prev => ({
                        ...prev,
                        name: name || prev.name,
                        picture: picture || prev.picture
                    }));
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserData({
                name: user?.name || user?.email?.split('@')[0] || 'User',
                picture: user?.picture
            });
        }
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg flex justify-between items-center">
            
            <div>
                <h2 className="text-xl font-semibold flex items-center gap-1">
                    Welcome Back, 
                    <span className="text-blue-600 font-bold">
                        {userData.name}
                    </span>
                </h2>
                <p className="text-gray-500 mt-1">
                    AI-Driven Interviews • Hassle-Free Hiring
                </p>
            </div>

            <div className="relative group">
                {userData.picture ? (
                    <Image
                        src={userData.picture}
                        alt='userAvatar'
                        width={55}
                        height={55}
                        className="rounded-full ring-2 ring-blue-200 group-hover:ring-blue-400 transition-all shadow-md"
                    />
                ) : (
                    <div className="w-[55px] h-[55px] rounded-full bg-blue-100 flex items-center justify-center 
                        text-blue-700 text-xl font-semibold ring-2 ring-blue-200 group-hover:ring-blue-400 transition-all shadow-md">
                        {userData.name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WelcomeContainer;
