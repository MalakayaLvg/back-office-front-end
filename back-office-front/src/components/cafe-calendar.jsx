import Modal from "react-modal";
import '../App.css';

import {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

Modal.setAppElement("#root");

function CafeCalendar (){

    //CALENDAR
    const [ slots, setSlots ] = useState([])
    const [ cafe, setCafe ] = useState([])
    const [slotTime, setSlotTime] = useState('titre du créneau');
    const [slotDate, setSlotDate] = useState('2025-02-25');
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    function handleEventClick(clickInfo) {
        console.log(clickInfo.event.extendedProps)
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            const eventId = clickInfo.event.id;



            fetch(`https://localhost:8000/slot/delete/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {

                        clickInfo.event.remove();
                        alert("Créneau supprimé avec succès !");
                    } else {
                        alert("Erreur lors de la suppression du créneau");
                    }
                })
                .catch((err) => {
                    console.error("Erreur lors de la suppression du créneau :", err);
                    alert("Erreur réseau, impossible de supprimer le créneau");
                });
        }
    }

    function handleDateClick(selectInfo){
        console.log(selectInfo.dateStr)
        setSlotDate(selectInfo.dateStr)
        setModalIsOpen(true)
    }

    const handleSaveEvent = () => {
        console.log("save event")

        const newSlotDate = new Date(`${slotDate}T${slotTime}:00`);

        const newSlot = {
            title: cafe.name,
            date: newSlotDate.toISOString()
        };
        console.log(newSlot)
        fetch('https://localhost:8000/slot/new/venue/1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSlot),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Slot créé:", data);
                setSlots([...slots, newSlot]);
                setModalIsOpen(false)
                setSlotTime('18:00');
                setSlotDate('');
            })
            .catch((err) => {
                console.error('Erreur lors de la création du créneau:', err);
                setError('Erreur lors de la création du créneau');
            });
    };


    useEffect(() => {
        console.log("useeffect")
        fetch('https://localhost:8000/venue/1')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setCafe(data);
                setSlots(data.slots)
                setIsLoading(false);
            })
            .catch((err) => {
                setError('Erreur lors du chargement du café');
                setIsLoading(false);
            });
    },[]);


    //MODAL


    const [modalIsOpen, setModalIsOpen] = useState(false)

    if (isLoading) return <p>Chargement des créneaux...</p>;
    if (error) return <p>{error}</p>;

    return(
        <>
            <h1 className="text-center py-2">{ cafe.name }</h1>
            <h4 className="text-muted text-center">{ cafe.address }</h4>

            <div className="full-calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={slots}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                />
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={()=>{setModalIsOpen(false)}}
                className="modal-custom"
                overlayClassName="overlay-custom"
            >
                <h2 className="text-xl font-bold mb-4">Proposer un créneau</h2>

                <div className="d-flex flex-column justify-content-between  w-75 h-75">
                    <div className="my-3 d-flex flex-column">

                        <label>Definisser l'heure</label>
                        <input
                            type="time"
                            className="py-2"
                            value={slotTime}
                            onChange={(e) => setSlotTime(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="btn btn-danger mx-3"
                        > Fermer </button>
                        <button
                            onClick={handleSaveEvent}
                            className="btn btn-success mx-3"
                        > Créer </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CafeCalendar;