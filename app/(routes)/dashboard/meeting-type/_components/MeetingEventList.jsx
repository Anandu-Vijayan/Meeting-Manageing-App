'use client'; // Assuming this is a comment, otherwise correct if it's meant to be something else
import React, { useState, useEffect } from 'react';
import { app } from '@/config/FirebaseConfig'; // Assuming `@` is configured for absolute imports
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Clock, Copy, MapPin, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function MeetingEventList() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    if (user) {
      getEventList();
    }
  }, [user]);

  const getEventList = async () => {
    const q = query(collection(db, 'MeetingEvent'), where('createdBy', '==', user?.email), orderBy('id', 'desc'));

    try {
      const querySnapshot = await getDocs(q);
      const events = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        events.push({ id: doc.id, ...doc.data() }); // Include the document ID
      });
      setEventList(events);
    } catch (error) {
      console.error('Error fetching documents: ', error);
    }
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {eventList.length > 0 ? (
        eventList.map((event, index) => (
          <div
            key={index}
            className="border shadow-md border-t-8 rounded-lg p-3 flex-col gap-5"
            style={{ borderTopColor: event?.themeColor }}
          >
            <div className='flex justify-end'>
              <Settings className='cursor-pointer'/>
            </div>
            <h2 className="font-medium text-xl">{event?.eventName}</h2>
            <div className="flex justify-between mt-2">
              <h2 className="flex gap-2 text-gray-500">
                <Clock />
                {event?.duration} Min{' '}
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <MapPin />
                {event?.locationType} Meeting{' '} 
              </h2>
            </div>
            <hr className='mt-2'></hr>
            <div className='flex justify-between'>
              <h2 className='flex gap-3 text-sm items-center text-primary mt-2 cursor-pointer' onClick={()=>{
                navigator.clipboard.writeText(event.locationUrl)
                toast('Url copyed on Clipboard')
              }}><Copy className='h-4 w-4'/>Copy Link</h2>
              <Button variant="outline" className="rounded-full text-primary border-primary mt-3">Share</Button>
            </div>
          </div>
        ))
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
}

export default MeetingEventList;
