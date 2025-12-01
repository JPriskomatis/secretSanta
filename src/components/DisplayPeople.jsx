import React from "react";

function DisplayPeople({ people = [], emails = [], onDelete }) {
    return (
        <ol className="flex flex-col justify-between h-full"> {/* h-full ensures spacing fills the container */}
            {people.map((person, index) => (
                <li key={index} className="flex justify-between items-center mb-2 last:mb-0">
                    <span>{person} - {emails[index]}</span>
                    <button
                        className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                        onClick={() => onDelete(index)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ol>
    );
}

export default DisplayPeople;
