// import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
// import { createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar';
// import "@schedule-x/theme-default/dist/calendar.css";
// import {createEventModalPlugin} from "@schedule-x/event-modal";
// import {createDragAndDropPlugin} from "@schedule-x/drag-and-drop";
// import { createEventsServicePlugin } from '@schedule-x/events-service'
//
// function CalendarV2 (){
//
//     const eventsServicePlugin = createEventsServicePlugin();
//
//     const calendar = useCalendarApp({
//         views: [
//             createViewWeek(),
//             createViewMonthGrid(),
//             createViewMonthAgenda(),
//             createViewDay()
//         ],
//         events: [
//             {
//                 id: '1',
//                 title: 'new event',
//                 start: '2025-02-25 16:00',
//                 end: '2025-02-25 18:00',
//                 description: "la description"
//             }
//         ],
//         plugins: [
//             createEventModalPlugin(),
//             createDragAndDropPlugin(),
//         ]
//     })
//
//     function addEvent(){
//         calendar.eventsService.add({
//             title: 'Event 1',
//             start: '2025-02-26',
//             end: '2024-02-26',
//             id: 1
//         })
//     }
//
//     return(
//         <>
//             <div>
//                 <button className="btn btn-primary" onClick={addEvent}>Add Event</button>
//                 <ScheduleXCalendar calendarApp={calendar} />
//             </div>
//         </>
//     );
// }
//
// export default CalendarV2;