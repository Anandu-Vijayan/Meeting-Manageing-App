'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useState } from 'react'
import { app } from '@/config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function CreateBusiness() {
    const [businessName, setBusinessName] = useState('');
    const db = getFirestore(app);
    const { user } = useKindeBrowserClient();
    const router = useRouter();

    const onCreateBusiness = async () => {
        console.log("btn Click", businessName);
        try {
            await setDoc(doc(db, 'Business', user.email), {
                businessName: businessName,
                email: user.email,
                useName: user.given_name + " " + user.family_name
            });
            console.log("Data saved");
            toast("New Business Created!!")
            router.replace('/dashboard')

        } catch (error) {
            console.error("Error saving data:", error);
        }
    }

    return (
        <div className='p-14 items-center flex flex-col gap-20 my-10'>
            <Image
                src="/log.svg"
                width={100}
                height={100}
                alt="logo"
                className="w-[150px] md:w-[200px]"
            />
            <div className='flex flex-col items-center gap-4 max-w-3xl'>
                <h2 className='text-4xl font-bold'>What should we call your Business</h2>
                <p className='text-slate-500'>You can always change this later from settings</p>
                <div className='w-full'>
                    <label className='text-slate-400'>Team Name</label>
                    <Input placeholder="Ex. EduTeach" className='mt-2' onChange={(event) => setBusinessName(event.target.value)} />
                </div>
                <Button className='w-full' disabled={!businessName} onClick={onCreateBusiness}>Create Business</Button>
            </div>
        </div>
    );
}

export default CreateBusiness;
