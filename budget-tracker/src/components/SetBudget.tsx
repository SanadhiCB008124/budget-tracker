import React, { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

type Budget = {
  id: string;
  amount: number;
  date: Date;
};

const SetBudget = () => {
  const [budget, setBudget] = useState<Budget[]>([]);
  const [newBudget, setNewBudget] = useState<number>(0); // Updated state type to number

  const addBudget = async () => {
    if (newBudget !== 0) { // Check if newBudget is not 0
      const budgetItem: Budget = {
        amount: newBudget,
        date: new Date(),
        id: new Date().toISOString(), // Generating a simple id based on the current timestamp
      };

      setBudget([...budget, budgetItem]);
      setNewBudget(0); // Reset newBudget after adding

      try {
        const docRef = await addDoc(collection(firestore, 'budget'), budgetItem);
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  return (
    <div>
      <h2>Set Budget</h2>
      <input
        type="text"
        placeholder="Enter budget amount"
        value={newBudget}
        onChange={(e) => setNewBudget(Number(e.target.value))}
      />
      <button onClick={addBudget}>Add Budget</button>

      {/* Render existing budgets */}
      <ul>
        {budget.map((item) => (
          <li key={item.id}>{`Amount: $${item.amount}, Date: ${item.date.toISOString()}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default SetBudget;
