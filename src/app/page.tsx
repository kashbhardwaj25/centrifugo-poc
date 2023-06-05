"use client";

import ChannelComponent from "@/components/ChannelComponent";
import { useState } from "react";

export default function Home() {
  const [channel, setChannel] = useState("");

  return (
    <main className="h-screen flex justify-center items-center">
      <div>
        {channel === "channel1" ? (
          <ChannelComponent channelName={channel} />
        ) : null}
        {channel === "channel2" ? (
          <ChannelComponent channelName={channel} />
        ) : null}

        <button
          className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => setChannel("channel1")}
        >
          Channel 1
        </button>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => setChannel("channel2")}
        >
          Channel 2
        </button>
      </div>
    </main>
  );
}
