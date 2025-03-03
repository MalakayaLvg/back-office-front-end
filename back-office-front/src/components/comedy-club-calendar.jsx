import Modal from "react-modal";
import '../App.css';

import {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

Modal.setAppElement("#root");

function ComedyClubCalendar (){

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    //CALENDAR
    const [ slots, setSlots ] = useState([
        {
            "id": 0,
            "title": "Café du miaou",
            "date": "2025-02-26T21:00:00",
            "color": "#FF0000",
            "isAvailable": true,
            "cafe": {
                "id": 1,
                "name": "café du miaou",
                "address": "20 rue du miaou",
                "places": 20
            }
        },
    ]);
    const [ artists, setArtists ] = useState([]);
    const [ eventTitle, setEventTitle ] = useState('titre du créneau');
    const [ eventDate, setEventDate ] = useState('2025-02-25');
    const [ selectedSlot, setSelectedSlot ] = useState(null);
    const [selectedArtist, setSelectedArtist] = useState(null);

    function handleEventClick(slot) {
        console.log(slot.event.extendedProps)
        const slotData = slot.event.extendedProps;
        setSelectedSlot(slotData);
        setModalIsOpen(true)
    }

    function handleDateClick(selectInfo){
        console.log(selectInfo)
    }

    const handleProposer = (artistId) => {
        if (!selectedSlot) {
            alert("Veuillez sélectionner un créneau.");
            return;
        }

        console.log(artistId)

        const proposalData = {
            show: selectedSlot.id,
            artist: artistId,
            status: "pending"
        };

        fetch('https://localhost:8000/show-proposition/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proposalData),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Proposition envoyée:", data);
                alert("Proposition envoyée avec succès !");
            })
            .catch((err) => {
                console.error('Erreur lors de l\'envoi de la proposition:', err);
                alert('Erreur lors de l\'envoi de la proposition');
            });
    };


    useEffect(() => {
        fetch('https://localhost:8000/slot/all')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setSlots(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });

        fetch('https://localhost:8000/artist/all')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setArtists(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });

    }, []);

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    //MODAL

    return(
        <>
            <button
                className="btn btn-primary"
                onClick={()=> setModalIsOpen(true)}
            >
                Ouvrir le modal
            </button>

            <div className="full-calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next',
                        center: 'title',
                        right: 'dayGridWeek,dayGridMonth'
                    }}
                    events={slots}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                />
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={()=>{setModalIsOpen(false)}}
                className="modal-custom-cc"
                overlayClassName="overlay-custom"
            >
                <h2 className="text-xl font-bold mb-4">Reserver le créneau</h2>

                {selectedSlot && (
                    <div className="d-flex flex-column justify-content-between w-75 h-75">
                        <div className="my-3 d-flex flex-column">
                            { selectedSlot.isAvailable ? (
                                <span className="rounded-pill bg-success text-center">Disponible</span>
                            ) : (
                                <span className="rounded-pill bg-danger text-center">Non disponible</span>
                            )}
                            <h3>Lieu : {selectedSlot.cafe.name}</h3>
                            <p>Adresse : {selectedSlot.cafe.adress}</p>
                        </div>

                    </div>
                )}



                <div className="d-flex flex-column justify-content-between  w-75 h-75">

                    <div className="my-3 d-flex flex-column">
                        <h3>Proposer aux artistes</h3>
                        <ul className="space-y-2">
                            {artists.map((artist) => (
                                <li key={artist.id} className="border p-2 rounded bg-gray-100">
                                    <h3 className="text-lg font-semibold">Name : {artist.firstName}</h3>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleProposer(artist.id)}
                                    >proposer</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="btn btn-danger mx-3"
                        > Fermer </button>
                        <button
                            className="btn btn-success mx-3"
                        > Reserver </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ComedyClubCalendar;