import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import React from "react";
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

function MeetingForm() {
  return (
    <div className="p-4">
      <h2 className="flex gap-4">
        <ChevronLeft />
        Cancel
      </h2>
      <div className="mt-4">
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr />
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name *</h2>
        <Input placeholder="Meeting Name" />
        <h2 className="font-bold">Duration *</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              30 Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>15 Min</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>30 Min</DropdownMenuItem>
            <DropdownMenuItem>45 Min</DropdownMenuItem>
            <DropdownMenuItem>60 Min</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h2 className="font-bold">Location *</h2>
        <div className="grid grid-cols-4 gap-3">
          {LocationOption.map((option, index) => (
            <div className="border flex flex-col justify-center items-center p-3 rounded-lg hover:bg-blue-100 hover:border-primary cursor-pointer">
              <Image
                src={option.icon}
                alt={option.name}
                width={30}
                height={30}
              />
              <h2>{option.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MeetingForm;
