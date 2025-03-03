import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'

import '@schedule-x/theme-default/dist/index.css'
import {useEffect, useState} from "react";

function CalendarApp() {
    const[ eventsService ] = useState(() => createEventsServicePlugin())

    const [events, setEvent] = useState([{
        id: '1',
        title: 'Event 1',
        start: '2025-02-25',
        end: '2025-02-25',
    },])

    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: events,
        plugins: [eventsService]
    },[eventsService])

    useEffect(() => {
        console.log("useeffect")
        eventsService.getAll()
    }, [events.length])

    const addEvent = () => {
        console.log("addEvent")
        const newEvent = {
            id: `${Date.now()}`,
            title: "Nouvel Événement",
            start: "2025-02-28",
            end: "2025-02-28",
        };
        const updatedEvents = [...events, newEvent];
        setEvent(updatedEvents);
        eventsService.add(newEvent);
        console.log(updatedEvents);
    };









    return (

        <div>
            <button className="btn btn-primary" onClick={addEvent}>Ajouter un event</button>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )
}

export default CalendarApp