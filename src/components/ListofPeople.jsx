import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import '../index.css';
import DisplayPeople from "./DisplayPeople"

function ListOfPeople() {
    const [people, setPeople] = useState([]);
    const [email, setEmail] = useState([]);

    const [newPeople, setNewPeople] = useState("");
    const [newEmail, setNewEmail] = useState("");

    function addPerson() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (newPeople.trim() === "" || newEmail.trim() === "") {
            return;
        }

        if (!emailRegex.test(newEmail)) {
            alert("Please enter a valid email.");
            return;
        }

        setPeople(t => [...t, newPeople]);
        setEmail(t => [...t, newEmail]);

        setNewEmail("");
        setNewPeople("");
    }

    function deletePeople(index) {
        setPeople(people.filter((_, i) => i !== index));
        setEmail(email.filter((_, i) => i !== index));
    }

    function sendEmail() {
        if (people.length < 2) {
            alert("Add at least 2 people to assign Secret Santa!");
            return;
        }

        const shuffled = [...people];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        for (let k = 0; k < people.length; k++) {
            if (shuffled[k] === people[k]) {
                const swapIndex = (k + 1) % people.length;
                [shuffled[k], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[k]];
            }
        }

        const promises = email.map((recipientEmail, index) => {
            const assignedPerson = shuffled[index];
            const templateParams = {
                to_name: people[index],
                to_email: recipientEmail,
                message: `Hello ${people[index]}! Your Secret Santa is: ${assignedPerson}`
            };

            console.log(`Sending to ${recipientEmail}: ${assignedPerson}`);

            return emailjs.send(
                'service_px9bnsu',
                'template_8nz1jcb',
                templateParams,
                '03-gt6e_v59Zf2JMi'
            );
        });

        Promise.all(promises)
            .then(() => alert("All Secret Santa emails sent successfully!"))
            .catch((err) => {
                console.error("Failed to send some emails:", err);
                alert("Some emails could not be sent.");
            });
    }

    return (
        <div className="bg-white backdrop-blur-4xl rounded-2xl p-8">
            <h1 className="text-[#652b2d]">Secret Santa!</h1>
            <p className="pt-4">Add your name and your friends’ names & emails <br /> to get matched with your Secret Santa!</p>
            <div className="flex flex-col pt-4">
                <input
                    className="m-4 border-b-2 border-yellow-500 bg-transparent focus:outline-none focus:border-blue-500 text-black"
                    type="text"
                    color="red"
                    placeholder="Enter your name..."
                    value={newPeople}
                    onChange={(e) => setNewPeople(e.target.value)}
                />
                <input
                    className="m-4 border-b-2 border-yellow-500 bg-transparent focus:outline-none focus:border-blue-500 text-black"
                    type="email"
                    placeholder="Enter your email..."
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                <button
                className="bg-green-500 text-white"
                onClick={addPerson}>Add</button>
            </div>

            {/* Use the new component here */}
            <div className="pt-10 flex flex-col justify-between">
                <DisplayPeople people={people} emails={email} onDelete={deletePeople} />

                <button
                    className="mt-8 bg-green-500 text-white" 
                    onClick={sendEmail}>Send Email</button>
            </div>
            
        </div>
    );
}

export default ListOfPeople;
