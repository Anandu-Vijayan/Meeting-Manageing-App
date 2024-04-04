"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LocationOption from "@/app/_utils/LocationOption";
import Image from "next/image";
import ThemeOptions from "@/app/_utils/ThemeOptions";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function MeetingForm({ setFormValue }) {
  const [location, setLocation] = useState();
  const [themeColor, setThemeColor] = useState();
  const [eventName, setEventName] = useState();
  const [duration, setDuration] = useState(30);
  const [locationType, setLocationType] = useState();
  const [locationUrl, setLocationUrl] = useState();
  const { user } = useKindeBrowserClient();

  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    setFormValue({
      eventName: eventName,
      duration: duration,
      themeColor: themeColor,
      locationType: locationType,
      locationUrl: locationUrl,
    });
  }, [eventName, duration, locationType, locationUrl, themeColor]);

  const onCreateClick = async () => {
    const id = Date.now().toString();
    await setDoc(doc(db, "MeetingEvent", id), {
      id: id,
      eventName: eventName,
      duration: duration,
      themeColor: themeColor,
      locationType: locationType,
      locationUrl: locationUrl,
      businessId: doc(db, "Business", user?.email),
      createdBy:user?.email
    })
      .then((resp) => {
        toast.success("New Meeting Event Created!");
        router.replace("/dashboard/meeting-type");
      })
      .catch((error) => {
        toast.error("Error creating meeting event.");
        console.error("Error creating meeting event:", error);
      });
  };

  return (
    <div className="p-8">
      <Link href="/dashboard">
        <h2 className="flex gap-4">
          <ChevronLeft />
          Cancel
        </h2>
      </Link>
      <div className="mt-4">
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr />
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name *</h2>
        <Input
          placeholder="Meeting Name"
          onChange={(event) => setEventName(event.target.value)}
        />

        <h2 className="font-bold">Duration *</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              {duration}Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setDuration(15)}>
              15 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(30)}>
              30 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(45)}>
              45 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(60)}>
              60 Min
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h2 className="font-bold">Location *</h2>
        <div className="grid grid-cols-4 gap-3">
          {LocationOption.map((option, index) => (
            <div
              key={index}
              className={`border flex flex-col
                     justify-center items-center 
                     p-3 rounded-lg cursor-pointer
                     hover:bg-blue-100 hover:border-primary
                     ${
                       locationType == option.name &&
                       "bg-blue-100 border-primary"
                     }`}
              onClick={() => setLocationType(option.name)}
            >
              <Image
                src={option.icon}
                width={30}
                height={30}
                alt={option.name}
              />
              <h2>{option.name}</h2>
            </div>
          ))}
        </div>
        {locationType && (
          <>
            <h2 className="font-bold">Add {locationType} Url *</h2>
            <Input
              placeholder="Add url"
              onChange={(event) => setLocationUrl(event.target.value)}
            />
          </>
        )}
        <h2 className="font-bold">Select Theme Color</h2>
        <div className="flex justify-evenly">
          {ThemeOptions.map((color, index) => (
            <div
              key={index}
              className={`h-7 w-7 rounded-full ${
                themeColor === color ? "border-4 border-black" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setThemeColor(color)}
            ></div>
          ))}
        </div>
      </div>
      <Button
        className="w-full mt-9"
        disabled={!eventName || !duration || !locationType || !locationUrl}
        onClick={onCreateClick}
      >
        Create
      </Button>
    </div>
  );
}

export default MeetingForm;
