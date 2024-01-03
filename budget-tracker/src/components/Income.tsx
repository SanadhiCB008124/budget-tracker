import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

type Income = {
  id: string;
  category: string;
  amount: number;
  description: string;
};

const Income = () => {
  const [income, setIncome] = useState<Income[]>([]);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'income'));
        const incomeData: Income[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Income; 
          incomeData.push({ id: doc.id, category: data.category, amount: data.amount, description: data.description });

        });

        setIncome(incomeData);
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };

    fetchIncome();
  }, []);

  return (
    <div>
      <h2>Income Data</h2>
      <ul>
        {income.map((item) => (
          <li key={item.id}>
            <strong>Category:</strong> {item.category}, <strong>Amount:</strong> {item.amount},{' '}
            <strong>Description:</strong> {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Income;
