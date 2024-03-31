import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="flex flex-col justify-center items-center my-20">
      <div className="hidden lg:block">
        <Image
          src="/athul.png"
          alt="profile"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute right-36"
        />
        <Image
          src="/Rashid.png"
          alt="profile"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute top-48 left-16"
        />
        <Image
          src="/insaf.png"
          alt="profile"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute bottom-20 left-36"
        />
        <Image
          src="/Anandu.png"
          alt="profile"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute right-16 bottom-32"
        />
      </div>

      <div className="text-center max-w-2x1">
        <h2 className="font-bold text-[50px] text-slate-700">
          Easy Scheduling ahead
        </h2>
        <h2 className="text-xl mt-6 text-slate-500">bala bla nla</h2>
        <div className="flex gap-4 flex-col mt-5">
          <h3 className="text-sm mt-6 text-slate-500">
            Sign up free with google and facebook
          </h3>
          <div className="flex justify-center gap-8 ">
            <Button className="p-7 flex gap-4">
              <Image src="/google.png" alt="google" width={40} height={40} />
              Sign up with Google
            </Button>
            <Button className="p-7 flex gap-4">
              <Image
                src="/facebook.png"
                alt="facebook"
                width={40}
                height={40}
              />
              Sign up with Facebook
            </Button>
          </div>
          <hr></hr>
          <h2>
            <Link href="" className="text-primary">
              Sign up Free with Email.
            </Link>{" "}
            No Credit card required
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Hero;
