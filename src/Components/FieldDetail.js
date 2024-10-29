import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FieldDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const field = location.state?.field;

    if (!field) {
        return <p>Geen gegevens beschikbaar voor dit veld.</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">{field.fieldname}</h2>
            <p><span className="font-semibold">Veldnummer:</span> {field.fieldnumber}</p>
            <p><span className="font-semibold">Aantal rijen:</span> {field.rows.length}</p>
            
            <div className="mt-6">
                <h3 className="font-semibold mb-2">Rijen:</h3>
                <div className="flex space-x-4 overflow-x-auto py-4">
                    {field.rows.map((row, index) => (
                        <div key={index} className="flex flex-col bg-gray-100 p-4 rounded-md shadow-md min-w-[180px]">
                            <p className="font-semibold">Rijnummer: <span className="font-normal">{row.Rownumber}</span></p>
                            <p className="font-semibold">Lengte: <span className="font-normal">{row.Length}</span></p>
                            
                            <p className="font-semibold">Werknemers:</p>
                            <ul className="font-normal list-disc list-inside">
                                {row.AttachedUsers.length > 0 
                                    ? row.AttachedUsers.map((user, i) => (
                                        <li key={i}>{user}</li>
                                    ))
                                    : <li>Geen</li>}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => navigate(-1)}
                className="mt-6 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
                Terug
            </button>
        </div>
    );
};

export default FieldDetail;
