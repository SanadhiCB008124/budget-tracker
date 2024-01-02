import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';

import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';
import { useAuth } from '../../AuthContext';
import Transactions from './Transactions';
import TextField from '@mui/material/TextField';  // Import TextField
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';



interface Transactions {
  amount: string;
  description: string;
  category: string;
}

type Expenses = {
  id: string;
  category: string;
  amount: string;
  description: string;
};

type Income = {
  id: string;
  category: string;
  amount: string;
  description: string;
};

interface Category {
  name: string;
}

type Budget = {
  id: string;
  category: string;
  amount: string;
  description: string;
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<string[]>([]);
  const [expenseFormData, setExpenseFormData] = useState({
    category: '',
    amount: '',
    description: '',
  });
  const [incomeFormData, setIncomeFormData] = useState({
    category: '',
    amount: '',
    description: '',
  });
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [newExpenses, setNewExpenses] = useState('');
  const [newIncome, setNewIncome] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'budget'));
        const categoryData: string[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          categoryData.push(data.category);
        });

        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);


  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseFormData({
      ...expenseFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncomeFormData({
      ...incomeFormData,
      [e.target.name]: e.target.value,
    });
  };
  

  
  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const transactionData = {
      category: expenseFormData.category,
      amount: expenseFormData.amount,
      description: expenseFormData.description,
    };
  
    try {
      if (transactionData.category.trim() !== '' && transactionData.amount.trim() !== '') {
        const docRef = await addDoc(collection(firestore, 'expenses'), transactionData);
        console.log('Expense document added with ID: ', docRef.id);
        setExpenses([...expenses, { ...transactionData, id: docRef.id }]);
      } else {
        console.error('Invalid expense data');
      }
    } catch (error) {
      console.error('Error adding expense document:', error);
    }
  
    // Update local state or perform other actions as needed
    setTransactions([...transactions, transactionData]);
    setExpenseFormData({
      category: '',
      amount: '',
      description: '',
    });
  };
  
  const handleIncomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const transactionData = {
      category: incomeFormData.category,
      amount: incomeFormData.amount,
      description: incomeFormData.description,
    };
  
    try {
      if (transactionData.category.trim() !== '' && transactionData.amount.trim() !== '') {
        const docRef = await addDoc(collection(firestore, 'income'), transactionData);
        console.log('Income document added with ID: ', docRef.id);
        setIncome([...income, { ...transactionData, id: docRef.id }]);
      } else {
        console.error('Invalid income data');
      }
    } catch (error) {
      console.error('Error adding income document:', error);
    }
  
    // Update local state or perform other actions as needed
    setTransactions([...transactions, transactionData]);
    setIncomeFormData({
      category: '',
      amount: '',
      description: '',
    });
  };
  
  
  
    return (
      <>
        <h1>Add Expense</h1>
        <form onSubmit={handleExpenseSubmit}>
          <TextField
            select
            label="Category"
            name="category"
            value={expenseFormData.category}
            onChange={handleExpenseChange}
            fullWidth
            required
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Amount"
            name="amount"
            value={expenseFormData.amount}
            onChange={handleExpenseChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={expenseFormData.description}
            onChange={handleExpenseChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Add Transaction
          </Button>
        </form>
  
        <h1>Add Income</h1>
        <form onSubmit={handleIncomeSubmit}>
          <TextField
            select
            label="Category"
            name="category"
            value={incomeFormData.category}
            onChange={handleIncomeChange}
            fullWidth
            required
          >
             {categories.map((category) => (
    <MenuItem key={category} value={category}>
      {category}
    </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Amount"
            name="amount"
            value={incomeFormData.amount}
            onChange={handleIncomeChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={incomeFormData.description}
            onChange={handleIncomeChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Add Transaction
          </Button>
        </form>
    </>
  );
};

export default Dashboard;
