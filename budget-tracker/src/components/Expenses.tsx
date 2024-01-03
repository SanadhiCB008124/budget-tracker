import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { set } from 'firebase/database';

type Expenses = {
    id: string;
    category: string;
    amount: number;
    description: string;
    
};

const Expenses = () => {

  const [expenses, setExpenses] = useState<Expenses[]>([]);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'expenses'));
        const expenseData: Expenses[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Expenses; 
          expenseData.push({ id: doc.id, category: data.category, amount: data.amount, description: data.description });

        });

        setExpenses(expenseData);
      } catch (error) {
        console.error('Error fetching Expense data:', error);
      }
    };

    fetchIncome();
  }, []);




  return (
    <div>
    <h2>Expense Data</h2>
    <ul>
      {expenses.map((item) => (
        <li key={item.id}>
          <strong>Category:</strong> {item.category}, <strong>Amount:</strong> {item.amount},{' '}
          <strong>Description:</strong> {item.description}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Expenses
