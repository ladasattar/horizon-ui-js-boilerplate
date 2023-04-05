import React from "react";
import Card from "components/card";
import "leaflet/dist/leaflet.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = (props) => {
  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  return (
    <div className="mt-3">
      <Card extra={"w-full p-4 h-full"}>
        <div className="mb-8 w-full">
          {props.title !== "" && (
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {props.title}
            </h4>
          )}
          {props.description !== "" && (
            <p className="mt-2 text-base text-gray-600">{props.description}</p>
          )}
        </div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={[
            { title: "event 1", date: "2023-03-27" },
            { title: "event 2", date: "2023-03-29" },
          ]}
          dateClick={(arg) => alert(arg.dateStr)}
          eventContent={renderEventContent({
            timeText: "12:00",
            event: { title: "event 1" },
          })}
          eventDragStart={(arg) => alert(arg.event.title)}
        />
      </Card>
    </div>
  );
};

Calendar.defaultProps = {
  title: "Calendar by FullCalendar",
  description: "Calendar React",
};

export default Calendar;
