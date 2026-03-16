"use client";
import { useState } from "react";
export default function EventObject() {
  const [event, setEvent] = useState<any>(null);
  const handleClick = (e: React.MouseEvent) => {
    const eventData = {
      type: e.type,
      screenX: e.screenX,
      screenY: e.screenY,
      clientX: e.clientX,
      clientY: e.clientY,
    };
    setEvent(eventData);
  };
  return (
    <div id="wd-event-object">
      <h2>Event Object</h2>
      <button onClick={handleClick} className="btn btn-primary"
        id="wd-display-event-obj-click">
        Display Event Object
      </button>
      {event && (
        <pre className="mt-2">{JSON.stringify(event, null, 2)}</pre>
      )}
      <hr />
    </div>
  );
}
