import {useEffect, useState} from "react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as React from 'react';
import  {getAuth,signOut, onAuthStateChanged} from "firebase/auth";
import {collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { storage, firestore } from "../firebase";


import {Avatar} from "@mui/material";
import {useNavigate} from "react-router-dom";

const constraints = {
    video: {
        width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
        },
        height: {
            min: 720,
            ideal: 1080,
            max: 1440,
        },
        facingMode: 'user',
    },
};

function Camera() {
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const [galleryImage, setGalleryImage] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const auth=getAuth();
    const navigate = useNavigate();

   onAuthStateChanged(auth, (user) => {
       if(user){
           console.log(user);
           const uid=user.uid;
           console.log(uid);
       }
       else{
              console.log("no user");
       }
   });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                const uid = user.uid;
                console.log(uid);

                setUserEmail(user.email);
            } else {
                console.log("no user");
            }
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, [auth]);

     const initCamera = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoCam = devices.find((device) => device.kind === 'videoinput');
            {/**  const [galleryImage, setGalleryImage] = useState<string | null>(null);**/}
            if (videoCam) {
                const updatedConstraints = {
                    ...constraints,
                    deviceId: {
                        exact: videoCam.deviceId,
                    },
                };

                const stream = await navigator.mediaDevices.getUserMedia(updatedConstraints);
                setVideoStream(stream);
            } else {
                alert('No video camera found.');
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Error accessing camera. Please check your settings.');
        }
    };


    const fetchCurrentProfileImage = async () => {
        try {
            // Query Firestore to get the latest uploaded image metadata
            const imagesCollection = collection(firestore, "images"); // Change "images" to your Firestore collection name
            const q = query(imagesCollection, orderBy("timestamp", "desc"), limit(1));
            const querySnapshot = await getDocs(q);

            // Check if there are any images
            if (!querySnapshot.empty) {
                const latestImageMetadata = querySnapshot.docs[0].data();
                const imagePath = latestImageMetadata.path;

                // Create a reference to the location in Firebase Storage where the latest image is stored
                const storageRef = ref(storage, imagePath);

                // Get the download URL for the latest image
                const downloadURL = await getDownloadURL(storageRef);

                // Set the downloaded URL as the gallery image
                setGalleryImage(downloadURL);
            } else {
                console.log("No images found in Firestore.");
            }
        } catch (error) {
            console.error("Error fetching profile image: ", error);
        }
    };

    useEffect(() => {
        fetchCurrentProfileImage();
    }, []);






    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            try {
                // Create a reference to the location in Firebase Storage where you want to upload the image.
                const storageRef = ref(storage, `profile-images/${selectedFile.name}`);

                // Upload the selected file to Firebase Storage.
                await uploadBytes(storageRef, selectedFile);

                // Get the download URL for the uploaded file.
                const downloadURL = await getDownloadURL(storageRef);

                // Set the downloaded URL as the gallery image.
                setGalleryImage(downloadURL);
            } catch (error) {
                console.error("Error uploading image: ", error);
                // Handle the error
            }
        }
    };

   const startCamera = () => {
        if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
            initCamera();
        } else {
            alert('Media features are not available on this device.');
        }
    };

    const SignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log('User signed out');
                navigate("/");
            })
            .catch((error) => {
                // An error happened.
                console.error('Sign-out error:', error);
            });
    };




    return (
        <div className="bg-primary">
            <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-primary">
                <div>
                   <button onClick={() => startCamera()} className="hidden">Start Camera

                        <svg viewBox="0 0 24 24" height="30px" width="30px" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>

                    {videoStream && (
                        <video
                            style={{ width: 1280, height: 720 }}
                            autoPlay
                            ref={(videoElement) => {
                                if (videoElement) {
                                    videoElement.srcObject = videoStream;
                                }
                            }}
                        ></video>
                    )}
                    {/** <button onClick={() => handleImageUpload}>

                     <svg viewBox="0 0 24 24" height="30px" width="30px" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

                     </button>**/}
                    {/**  <label htmlFor="fileInput" className="file-input-label">
                     <svg viewBox="0 0 24 24" height="30px" width="30px" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

                     Upload Image
                     </label>
                     <input
                     type="file"
                     accept="image/*"
                     onChange={handleImageUpload}
                     />**/}



                    {/**    {galleryImage && (
                        <div>
                            <h2>Preview:</h2>
                            <img src={galleryImage} alt="Uploaded" />
                        </div>
                    )}**/}
                </div>
                <div className="grid grid-cols-12 gap-6">
                    <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                        <div className="col-span-12 mt-8">
                            <div className="flex flex-row justify-center">
                                {galleryImage ? (
                                    <Avatar
                                        alt="Selected Avatar"
                                        src={galleryImage}
                                        style={{ width: '150px', height: '150px' }} // Adjust the width and height as needed
                                    />
                                ) : (
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/1.jpg"
                                        style={{ width: '150px', height: '150px' }} // Adjust the width and height as needed
                                    />
                                )}
                                <label htmlFor="fileInput" className="file-input-label">
                                    <svg viewBox="0 0 24 24" height="30px" width="30px" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />

                            </div>

                            <div className="grid grid-cols-12 gap-6 mt-5 mb-5">


                                <div className=" bg-black border-2 border-primary-500 p-3 text-white shadow-xl rounded-2xl col-span-12 sm:col-span-6 xl:col-span-3 intro-y ">
                                    <div className=" text-sm text-left p-2">{userEmail}</div>
                                </div>
                            </div>
                            <div className="p-3 mt-10 bg-gray-700 text-white rounded-2xl">My wallet</div>
                            <div className="p-3 mt-3 bg-gray-700 text-white rounded-2xl">Payment settings</div>
                            <div className="p-3 mt-3 bg-gray-700 text-white rounded-2xl">Notifications</div>
                            <div className="p-3 mt-3 bg-gray-700 text-white rounded-2xl">Privacy settings</div>
                            <div className="p-3 mt-3 bg-gray-700 text-white rounded-2xl">Support and Help</div>
                            <div className="p-3 mt-3 bg-gray-700 text-white rounded-2xl" >  <button onClick={SignOut}>Logout </button></div>
                            <div className="p-3 mt-3 bg-gray-700 text-white rounded-2xl">Delete Account</div>



                        </div>
                    </div>
                </div>
            </div>

        </div>




    );
}

export default Camera;