// "use client"; 
// import { UserDetailContext } from "@/context/UserDetailContext"; 
// import { supabase } from "@/services/supabaseClient"; 
// import React, { useContext, useEffect, useState } from "react"; 
// function Provider({children}){
//    const [user, setUser] = useState(); 
//    useEffect(()=>{ 
//     CreateNewUser(); 
//     },
//     []) 
//     const CreateNewUser=()=>{ 
//       supabase.auth.getUser().then(async({data:{user}})=>{ 
//         let { data: Users, error } = await supabase 
//         .from('Users') 
//         .select("*") 
//         .eq('email',user?.email); 
//         console.log(Users) 
//         if(Users?.length ==0){ 
//           const{data,error} = await supabase.from("Users") 
//           .insert([ 
//             { name:user?.user_metadata?.name, 
//               email:user?.email,
//               picture: user?.user_metadata?.picture
//             } 
          
//           ]) 
//           console.log(data)

//           if (error) {
//           console.log("Insert Error:", error);
//             return;
//           }
//           setUser(data[0]); 


//           return; 
//         } 
//         setUser(Users[0]); 
//       }) 
//     } 
//     return( 
//     <UserDetailContext.Provider value={{user,setUser}}> 
//     <div>{children}</div> 
//     </UserDetailContext.Provider> ) } 
//     export default Provider 
//     export const useUser=()=>{ 
//       const context = useContext(UserDetailContext); 
//       return context; }








"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import React, { useContext, useEffect, useState } from "react";

function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    const { data: authData } = await supabase.auth.getUser();
    const authUser = authData?.user;

    // USER NOT LOGGED IN
    if (!authUser) {
      console.log("No logged-in user found");
      return;
    }

    // CHECK IF USER EXISTS IN TABLE
    const { data: Users, error: fetchError } = await supabase
      .from("Users")
      .select("*")
      .eq("email", authUser.email);

    console.log("Users:", Users);

    // IF NOT FOUND → CREATE NEW USER
    if (!Users || Users.length === 0) {
      const { data: newUser, error: insertError } = await supabase
        .from("Users")
        .insert([
          {
            name: authUser.user_metadata?.name,
            email: authUser.email,
            picture: authUser.user_metadata?.picture,
          },
        ])
        .select(); // MOST IMPORTANT

      if (insertError) {
        console.log("Insert Error:", insertError);
        return;
      }

      setUser(newUser[0]);
      return;
    }

    setUser(Users[0]);
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  return useContext(UserDetailContext);
};
