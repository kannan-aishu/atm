import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Add_User() {
    const [user, setUser] = useState({
        Phone_Number: '',
        Username: '',
        Age: '',
        Account_Number: '',
        Email_Id: '',
        Balance: '',
        Address: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Initialize the navigate function

    const validateFields = () => {
        let tempErrors = {};

        if (!user.Username) tempErrors.Username = "Username is required";
        if (!user.Age || user.Age < 18) tempErrors.Age = "Age must be at least 18";
        if (!user.Account_Number) tempErrors.Account_Number = "Account Number is required";
        if (!user.Phone_Number || user.Phone_Number.length < 10) tempErrors.Phone_Number = "Phone Number must be 10 digits";
        if (!user.Email_Id || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.Email_Id)) tempErrors.Email_Id = "Invalid email address";
        if (!user.Balance || user.Balance <= 0) tempErrors.Balance = "Balance must be greater than 0";
        if (!user.Address) tempErrors.Address = "Address is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const userset = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handlesubmit = async () => {
        if (!validateFields()) return;

        try {
            const response = await fetch('http://localhost:8000/api/v1/create_users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            console.log(data);

            // Navigate to the home page or another route after successful submission
            navigate('/'); // Replace '/' with your desired route

        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
            <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
                <p className='text-2xl text-center mb-6 font-semibold text-gray-700'>Create Bank Account</p>

                <div className='flex flex-col gap-5'>
                    {[
                        { label: "Name", type: "text", name: "Username" },
                        { label: "Age", type: "number", name: "Age" },
                        { label: "Account Number", type: "number", name: "Account_Number" },
                        { label: "Phone Number", type: "text", name: "Phone_Number" },
                        { label: "Email Id", type: "text", name: "Email_Id" },
                        { label: "First Balance", type: "number", name: "Balance" },
                        { label: "Address", type: "textarea", name: "Address" },
                    ].map(({ label, type, name }) => (
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between' key={name}>
                            <label className='font-medium text-gray-700 sm:w-1/3'>{label}</label>
                            <div className='sm:w-2/3'>
                                {type === "textarea" ? (
                                    <textarea
                                        onChange={userset}
                                        name={name}
                                        className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 ${errors[name] ? 'border-red-500' : 'focus:ring-blue-500'} mt-2`}
                                    />
                                ) : (
                                    <input
                                        type={type}
                                        onChange={userset}
                                        name={name}
                                        className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 ${errors[name] ? 'border-red-500' : 'focus:ring-blue-500'} mt-2`}
                                    />
                                )}
                                {errors[name] && <p className='text-red-500 text-sm mt-1'>{errors[name]}</p>}
                            </div>
                        </div>
                    ))}

                    <div className='flex justify-center mt-6'>
                        <button
                            onClick={handlesubmit}
                            className='bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-semibold px-6 py-3 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out'
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
