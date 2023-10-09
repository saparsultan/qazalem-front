import React from "react";
import EventsClient from "@/components/client/Blogs/Events.client";
const Events = async ({ params: { lng } }) => {
  return <EventsClient lng={lng} />;
};
export default Events;
