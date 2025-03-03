import Modal from "react-modal";
import '../App.css';
import Moment from 'moment';

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
    const [ selectedSlotId, setSelectedSlotId ] = useState(null);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [ comedyClubId ] = useState(1)
    const [ comedyClub, setComedyClub ] = useState({})
    const [ showDescription, setShowDescription ] = useState("pas de description")
    const [ comedyclubShows, setComedyclubShows ] = useState([])

    function handleEventClick(slot) {

        const slotData = slot.event.extendedProps;
        setSelectedSlot(slotData);
        console.log("selected slot",selectedSlot)
        console.log(slot.event.id)
        setSelectedSlotId(slot.event.id)
        setModalIsOpen(true)
    }

    function handleDateClick(selectInfo){
        console.log(selectInfo)
    }

    const handleReserverShow = () => {

        console.log("reserver show")
        console.log(selectedSlotId)

        const newShow = {
            comedy_club: comedyClub,
            description: showDescription,
            slot: selectedSlotId
        }

        console.log(newShow)
        fetch('https://backend-comedyclub.esdlyon.dev/show/new',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newShow)
        })
            .then((response) => response.json())
            .then((data) => {
                alert("Show créer avec succes !");
                setShowDescription("pas de description")
                setModalIsOpen(false)
            })
            .catch((err) => {
                console.log(err)
                alert("Error lors de la création du show !");
            })
    }

    const handleProposer = (artistId,showId) => {

        console.log(artistId,showId)

        const proposalData = {
            show: showId,
            artist: artistId,
            status: "pending"
        };

        fetch('https://backend-comedyclub.esdlyon.dev/show-proposition/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proposalData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log("Proposition envoyée:", data);
                alert("Proposition envoyée avec succès !");
            })
            .catch((err) => {
                console.error('Erreur lors de l\'envoi de la proposition:', err);
                alert('Erreur lors de l\'envoi de la proposition');
            });
    };


    useEffect(() => {
        fetch('https://backend-comedyclub.esdlyon.dev/slot/all')
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

        fetch('https://backend-comedyclub.esdlyon.dev/artist/all')
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

        fetch(`https://backend-comedyclub.esdlyon.dev/comedyclub/${comedyClubId}`)
            .then((response) => response.json())
            .then((data) => {
                setComedyClub(data)
                setComedyclubShows(data.shows)
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
            <div>
                <h1>Calendrier</h1>
            </div>

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

            <div className="mx-5">
                <h1 className="my-5">Mes shows</h1>
                { comedyclubShows.map((show)=> (
                    <div className="form-control" key={show.id}>
                        <h3>{show.description}</h3>
                        <h6 className="text-muted">{show.showTime}</h6>

                        <div className="my-3 d-flex flex-column">
                            <h3 className="my-3">Proposer aux artistes</h3>
                            <ul className="space-y-2">
                                {artists.map((artist) => (
                                    <li key={artist.id} className="border p-2 rounded bg-gray-100">
                                        <h3 className="text-lg font-semibold">{artist.firstName} {artist.lastName}</h3>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleProposer(artist.id,show.id)}
                                        >proposer</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                ))}
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


                    <label> Description </label>
                    <input
                        onChange={(event)=> setShowDescription(event.target.value)} type="text"/>

                    <div className="d-flex justify-content-center">
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="btn btn-danger mx-3"
                        > Fermer </button>
                        <button
                            className="btn btn-success mx-3"
                            onClick={() => handleReserverShow()}
                        > Reserver </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ComedyClubCalendar;