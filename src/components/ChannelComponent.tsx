import { Centrifuge } from "centrifuge";
import { useEffect, useState } from "react";

interface ChannelComponentProps {
  channelName: string;
}

const ChannelComponent = ({ channelName }: ChannelComponentProps) => {
  const [message, setMessage] = useState("");

  const centrifuge = new Centrifuge(
    "ws://localhost:8000/connection/websocket",
    {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE2ODYxMzMwNTEsImlhdCI6MTY4NTUyODI1MX0.Cuu_QXShGOJIEVSjUlHfRAQO584a1oyuhVOt5EVagQs",
    }
  );

  const subToken =
    channelName === "channel1"
      ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE2ODY1NDk1ODAsImlhdCI6MTY4NTk0NDc4MCwiY2hhbm5lbCI6ImNoYW5uZWwxIn0.Xm9JZm4LcqGfapGam0t9lomzjpI1D-Oly2olOuUsAXM"
      : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE2ODY1NDk2MDEsImlhdCI6MTY4NTk0NDgwMSwiY2hhbm5lbCI6ImNoYW5uZWwyIn0.eg5SJSNp_Wx_-MkhovYGrkwhxW75rX9eT-zpuhBownk";

  useEffect(() => {
    centrifuge
      .on("connecting", function (ctx) {
        console.log(`connecting: ${ctx.code}, ${ctx.reason}`);
      })
      .on("connected", function (ctx) {
        console.log(`connected over ${ctx.transport}`);
      })
      .on("disconnected", function (ctx) {
        console.log(`disconnected: ${ctx.code}, ${ctx.reason}`);
      })
      .connect();

    const sub = centrifuge.newSubscription(channelName, {
      token: subToken,
    });

    sub
      .on("publication", function (ctx) {
        setMessage(ctx.data.value);
      })
      .on("subscribing", function (ctx) {
        console.log(`subscribing: ${ctx.code}, ${ctx.reason}`);
      })
      .on("subscribed", function (ctx) {
        console.log("subscribed", ctx);
      })
      .on("unsubscribed", function (ctx) {
        console.log(`unsubscribed: ${ctx.code}, ${ctx.reason}`);
      })
      .subscribe();

    return () => {
      centrifuge.disconnect();
    };
  }, [centrifuge]);

  return <div>{message}</div>;
};

export default ChannelComponent;
