import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import axiosInstance from "@/utils/axiosInstance";

export const useAuthStore = create(
    persist(immer((set) => ({
        hydrated: false,// false , true
        isLoggedIn: null, // true , false, null 
        user: null,


        async Login(email, password) {
            try {
                const resp = (await axiosInstance.post("auth/signup",{
                    email,
                    password
                })
                ).data
                
                if (data.success){
                    
                    set({isLoggedIn:true,
                        user:data.user
                    })
                }


            } catch (e) {
                set({isLoggedIn:false,
    
                })

            }
        },

        async Logout(){
            console.log("Logout Function is  called")
            
        },

        setHydrated() {
            set({ hydrated: true });
        },
    }))),
    {
        name: "auth",
        onRehydrateStorage() {
            return (state, error) => {
                if (!error) state?.setHydrated();
            };
        },
    }
)


// export const useAuthStore = create(
//     persist(immer((set)=>({
//     hydrated: false,
//         makeHydration(){
//             set({ hydrated: true });
//         }
//     }))),{
//         name:"favourites",
//         onRehydrationStorage(){
//             return (state,error)=>{
//                 if (!error) state?.makeHydration()
//             }
//         }
//     }
// )