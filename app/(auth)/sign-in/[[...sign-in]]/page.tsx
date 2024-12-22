"use client"
import { SignIn,useUser } from "@clerk/nextjs";
 
export default function Page() {
  const {user}=useUser();
  if(!user){
    return<SignIn/>
  }
  return <SignIn />;
}