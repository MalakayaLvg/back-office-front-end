import { useEffect, useState } from 'react';

export default function EventsList() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://localhost:8000/comedyclub/all')
            .then((response) => response.json())
            .then((data) => {
                setEvents(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError('Erreur lors du chargement des créneaux');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <p>Chargement des créneaux...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Liste des créneaux</h2>
            <ul className="space-y-2">
                {events.map((event) => (
                    <li key={event.id} className="border p-2 rounded bg-gray-100">
                        <h3 className="text-lg font-semibold">id {event.id}</h3>
                        <h3 className="text-lg font-semibold">name {event.name}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}
