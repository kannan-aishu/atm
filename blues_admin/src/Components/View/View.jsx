import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function View() {
    const { id } = useParams(); 
    const [user, setUser] = useState(null);
    const [withdrawalAmount, setWithdrawalAmount] = useState();
    const [depositAmount, setDepositAmount] = useState();
    const navigate = useNavigate(); // To redirect after deletion

    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/Get_ParticularUsers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();
            setUser(data.test);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleWithdrawal = async () => {
        if (withdrawalAmount <= 0) {
            alert("Withdrawal amount must be greater than zero.");
            return;
        }
        if(withdrawalAmount){
            setWithdrawalAmount('')
        }

        try {
            const response = await fetch('http://localhost:8000/api/v1/Withdrawal', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Id: id, Withdraw: Number(withdrawalAmount) }), 
            });
            const data = await response.json();
            alert(data.success ? "Withdrawal successful!" : data.message);

            if (data.success) {
                setUser((prev) => ({ ...prev, Balance: data.w.Balance }));
            }
        } catch (error) {
            console.error("Error processing withdrawal:", error);
        }
    };

    const handleDeposit = async () => {
        if (depositAmount <= 0) {
            alert("Deposit amount must be greater than zero.");
            return;
        }
        if(depositAmount){
            setDepositAmount('')
        }

        try {
            const response = await fetch('http://localhost:8000/api/v1/deposit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Id: id, Deposit: Number(depositAmount) }), 
            });
            const data = await response.json();
            alert(data.success ? 'Deposit successful!' : 'Deposit failed.');

            if (data.success) {
                setUser((prev) => ({ ...prev, Balance: data.w.Balance }));
            }
        } catch (error) {
            console.error("Error processing deposit:", error);
        }
    };

    const handleDeleteUser = async () => {
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            try {
                const response = await fetch('http://localhost:8000/api/v1/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });
                const data = await response.json();
                alert(data.success ? "User deleted successfully!" : data.message);

                if (data.success) {
                    navigate('/'); // Redirect to home or user list after deletion
                }
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    useEffect(() => {
        getUser();
    }, [id]);

    return (
        <div className="container mx-auto p-4">
            {user ? (
                <div>
                    <div className="mt-12 max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden border-[2px] border-gray-300">
                        <div className="p-6 space-y-4">
                            <h2 className="text-gray-900 text-xl sm:text-2xl font-bold">User Details</h2>
                            <div className="space-y-2">
                                <p className="text-gray-900">Username: <span className="text-gray-700">{user.Username}</span></p>
                                <p className="text-gray-900">Age: <span className="text-gray-700">{user.Age}</span></p>
                                <p className="text-gray-900">Account No: <span className="text-gray-700">{user.Account_Number}</span></p>
                                <p className="text-gray-900">Phone No: <span className="text-gray-700">{user.Phone_Number}</span></p>
                                <p className="text-gray-900">Email ID: <span className="text-gray-700">{user.Email_Id}</span></p>
                                <p className="text-gray-900">Address: <span className="text-gray-700">{user.Address}</span></p>
                                <p className="text-gray-900">Balance: <span className="text-gray-700 font-semibold">{user.Balance}</span></p>
                            </div>
                            <button onClick={handleDeleteUser} className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete User</button>
                        </div>

                        <div className='flex flex-col sm:flex-row justify-between mt-4 p-4'>
                            <div className="m-2 flex-grow">
                                <input 
                                    type="number" 
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)} 
                                    placeholder="Deposit Amount"
                                    className="border border-gray-300 rounded-lg py-2 px-3 text-gray-700 shadow-sm w-full focus:outline-none transition duration-150 ease-in-out"
                                />
                                <button onClick={handleDeposit} className="mt-2 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Deposit</button>
                            </div>

                            <div className="m-2 flex-grow">
                                <input 
                                    type="number" 
                                    value={withdrawalAmount}
                                    onChange={(e) => setWithdrawalAmount(e.target.value)} 
                                    placeholder="Withdrawal Amount"
                                    className="border border-gray-300 rounded-lg py-2 px-3 text-gray-700 shadow-sm w-full focus:outline-none transition duration-150 ease-in-out"
                                />
                                <button onClick={handleWithdrawal} className="mt-2 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Withdraw</button>
                            </div>
                        </div>

                        <div className='border-[5px] mt-6 border-gray-300'>
                            <h3 className="text-gray-900 text-lg font-bold p-[20px] mt-4">Transaction History</h3>
                            {user.Statement.length > 0 ? (
                                <table className="min-w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-300 p-2 text-left">S.no</th>
                                            <th className="border border-gray-300 p-2 text-left">Method</th>
                                            <th className="border border-gray-300 p-2 text-left">Amount</th>
                                            <th className="border border-gray-300 p-2 text-left">Date and Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user.Statement.map((val, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                                <td className="border border-gray-300 p-2">{val.status}</td>
                                                <td className="border border-gray-300 p-2">{val.amount}</td>
                                                <td className="border border-gray-300 p-2">{val.dateAndTime}</td>  
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-700 p-4">No transactions available.</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center mt-12 text-gray-700">Loading...!</div>
            )}
        </div>
    );
}
