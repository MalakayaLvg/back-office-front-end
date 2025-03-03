import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import Modal from "react-modal";

function MyCalendar() {
    const [events, setEvents] = useState([
        { id: "1", title: "Événement 1", start: "2025-02-28" },
    ]);
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ newEvent, setNewEvent ] = useState({
        title: "",
        date: "",
        time: "",
    })

    const handleDateClick = (info) => {
        setNewEvent({title: "", date: info.date ,time: ""});
        setModalIsOpen(true);
    };

    const handleAddEvent = () => {
        console.log("addEvent")
        if (newEvent.date && newEvent.title){
            const formattedDate = `${newEvent.date}T${newEvent.time}`;
            setEvents([...events, {id: `${Date.now()}`, title: newEvent.title, start: formattedDate}])
        }
        setModalIsOpen(false);
    }

    const handleEventClick = (info) => {
        if (window.confirm(`supprimer l'evenement ${info.event.title} ?`)) {
            setEvents(events.filter(event => event.id !== info.event.id))
        }
    }

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
            />

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                   appElement={document.getElementById('root')}
                   className="form-control d-flex flex-column"
                   style={{ content: { width: "300px", margin: "auto", padding: "20px", borderRadius: "10px" } }}>
                <h2>Ajouter un événement</h2>
                <label>Titre :</label>
                <input
                    className="my-3"
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Nom de l'événement"
                />

                <label>Date :</label>
                <input
                    className="my-3"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />

                <label>Heure :</label>
                <input
                    className="my-3"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                />
                <button
                    onClick={()=> setModalIsOpen(false)}
                    className="btn btn-danger">
                    close
                </button>
                <button
                    onClick={handleAddEvent}
                    className="btn btn-primary">
                    Ajouter
                </button>
            </Modal>
        </div>
    );
}

export default MyCalendar;
