import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useAuth } from "@clerk/clerk-react"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// export const  TokenGetter = ()=>{
//   let token
//   useAuth.getToken()
//         .then((res)=>{
            
//             // const {data} = useGetDataQuery({data:"",token:res})
//             // console.log(data)
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
// }
