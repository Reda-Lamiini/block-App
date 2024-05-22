import React, { useContext, useState } from 'react';
import { ChatAppContext } from '../context/ChatAppContext';

const CreateAccount = () => {
    const { contract } = useContext(ChatAppContext);
    const [name, setName] = useState('');

    const handleCreateAccount = async () => {
        try {
            const tx = await contract.createAccount(name);
            await tx.wait();
            console.log("Account created:", tx);
        } catch (error) {
            console.error("Error creating account:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
            <button onClick={handleCreateAccount}>Create Account</button>
        </div>
    );
};

export default CreateAccount;
