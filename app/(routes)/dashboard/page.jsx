"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

function Dashboard() {
  const db = getFirestore(app);

  const { user } = useKindeBrowserClient();
  const [loading,setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      isBusinessRegistered();
    }
  }, [user]);

  const isBusinessRegistered = async () => {
    try {
      const docRef = doc(db, "Business", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setLoading(false)
      } else {
        console.log("No such document!");
        setLoading(false)
        router.replace('/create-business');
      }
    } catch (error) {
      console.error("Error checking if business is registered:", error);
      setLoading(false)
      router.replace('/create-business');
    }
  };

  if(loading){
    {
      return <h2>Loading .....</h2>
    }

  }

  return (
    <div>
      <p>Dashboard</p>
      <LogoutLink>Log out</LogoutLink>
    </div>
  );
}

export default Dashboard;