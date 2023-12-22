import React, { useState } from 'react';
import bgImg from "../assets/splash4.jpg";
import qr from "../assets/qr.png";
import { useParams } from 'react-router-dom';


interface Contact {
    name: string;
    tel: string;
}

const Receive: React.FC = () => {

    const { cryptoName } = useParams();

    const [contacts, setContacts] = useState<Contact[]>([]);
    const [nameValue, setNameValue] = useState<string>('');
    const [phoneValue, setPhoneValue] = useState<string>('');
    const [isContactPickerSupported, setIsContactPickerSupported] = useState<boolean | null>(null);

    const handleContactPicker = async (event:React.FormEvent) => {
        event.preventDefault();
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if ('contacts' in navigator && 'select' in navigator.contacts) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const selectedContacts = await navigator.contacts.select(['name', 'tel'], { multiple: true });

                if (!selectedContacts.length) {
                    return;
                }

                setContacts(prevContacts => [...prevContacts, ...selectedContacts]);
            } else {
                setIsContactPickerSupported(false);
            }
        } catch (error) {
            console.error('Error accessing contacts:', error);
        }
    };

    const handleAddContact = (event: React.FormEvent) => {
        event.preventDefault();
        if (nameValue === '' || phoneValue === '') {
            // Handle validation or show an error message
            return;
        }

        const newContact: Contact = { name: nameValue, tel: phoneValue };
        setContacts(prevContacts => [...prevContacts, newContact]);

        // Clear input values
        setNameValue('');
        setPhoneValue('');
    };

    return (

        <div
            className=" w-full bg-primary h-full  flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover "
            style={{
                backgroundImage: `url(${bgImg})`
            }}
        >
            {/**}  <MobileNav/>**/}
            <div
                className=" w-full h-full  flex-auto items-center justify-center p-10 overflow-hidden text-white  ">
                <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">

                    <div>
                        <div className="lg:text-left text-center">
                            <div className="flex items-center justify-center">
                                <div className="bg-primary flex flex-col w-70 border-2 border-primary-500 rounded-3xl px-8 py-10">

                                    <form className="flex flex-col space-y-8 mt-10">
                                        <div>
                                            <img src={qr}></img>
                                        </div>
                                        <div>
                                            Send me {cryptoName} to this address
                                        </div>

                                        <input
                                            type="text"
                                            placeholder="set amount"
                                            value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)}

                                            className="border rounded-lg py-3 px-3 bg-black border-primary-500  placeholder-white-500 text-white"
                                        />

                                        {isContactPickerSupported === false && (
                                            <p>Your device/browser doesn't support the Contact Picker API.</p>
                                        )}

                                        <h2 className="flex flex-row ">To: </h2>

                                        <ul>
                                            {contacts.map((contact, index) => (
                                                <li key={index}>
                                                    <input
                                                        type="text"
                                                        placeholder="set amount"
                                                        value={contact.name}
                                                        className="border rounded-lg py-3 px-3 bg-black border-primary-500  placeholder-white-500 text-white"
                                                    />

                                                </li>
                                            ))}
                                        </ul>
                                        <ul>
                                            {contacts.map((contact, index) => (
                                                <li key={index}>
                                                    <input
                                                        type="text"
                                                        placeholder="set amount"
                                                        value={contact.tel}
                                                        className="border rounded-lg py-3 px-3 bg-black border-primary-500  placeholder-white-500 text-white"
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex flex-row flex-wrap space-x-4 justify-center">
                                            <button
                                                className="border border-primary-500 bg-green-950 text-white rounded-lg py-3 px-4 font-semibold"
                                                // onClick={onSubmit} // You can add your form submission logic here
                                            >
                                                <div className="flex flex-row space-x-2">
                                                    <div>
                                                        <svg viewBox="0 0 24 24" height="20px"  fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z" fill="#ffffff"></path> <path d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z" fill="#ffffff"></path> </g></svg>

                                                    </div>
                                                    <div>
                                                        Copy
                                                    </div>
                                                </div>

                                            </button>
                                            <button
                                                className="border border-primary-500 bg-green-950 text-white rounded-lg py-3 px-4 font-semibold"
                                                onClick={handleContactPicker}
                                            >
                                                <div className="flex flex-row space-x-2">
                                                    <div>
                                                        <svg viewBox="0 0 24 24" height="20px"  fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z" fill="#ffffff"></path> <path d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z" fill="#ffffff"></path> </g></svg>

                                                    </div>
                                                    <div>
                                                        Share
                                                    </div>
                                                </div>
                                            </button>


                                        </div>


                                    </form>
                                    <button onClick={handleAddContact} className="hidden">Add Contact</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Receive;
