import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Fields = () => {
    const [fields, setFields] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/fields`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data); // Log de data om de structuur te controleren
                setFields(data); // Sla de opgehaalde data op
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="container mx-auto p-6">
            {fields && fields.map((field) => (
                <div key={field.id} className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">{field.fieldname}</h2>
                    <p><span className="font-semibold">Veldnummer:</span> {field.fieldnumber}</p>
                    <p><span className="font-semibold">Aantal rijen:</span> {field.rows.length}</p>
                    
                    <button
                        onClick={() => navigate(`/field/${field.id}`, { state: { field } })}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Bekijk veld
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Fields;
