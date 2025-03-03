import React from 'react';

const TestQuery2 = () => {

    const handleTestRoute = () => {
        // Données à envoyer dans la requête POST
        const slotData = {
            name :"Query",
            adress: "rue du query",
            places: 30
        };

        // Envoie la requête POST à la route de test
        fetch('https://localhost:8000/venue/new',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slotData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Gérer la réponse
                console.log("Réponse de la route:", data);
                alert("Créneau créé avec succès !");
            })
            .catch((err) => {
                // Gérer les erreurs
                console.error("Erreur lors de la requête:", err);
                alert("Erreur lors de la création du créneau.");
            });
    };

    return (
        <>
            <button className="btn btn-primary" onClick={handleTestRoute}>Tester la route</button>
        </>
    );
}

export default TestQuery2;
