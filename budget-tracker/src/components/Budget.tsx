import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, Firestore, deleteDoc, getFirestore, doc } from 'firebase/firestore';
import { firestore } from '../firebase';
import Modal from '@mui/material/Modal';
import { CardActionArea } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import bigInt from 'big-integer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

interface Transactions {
  amount: number;
  description: string;
  category: string;
}

type Expenses = {
  id: string;
  category: string;
  amount: number;
  description: string;
};

type Income = {
  id: string;
  category: string;
  amount: number;
  description: string;
};

type Category = {
  id: string;
  name: string;
};

type Budget = {
  id: string;
  category: string;
};

const Budget: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
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
  const [budgets] = useState<Budget[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'category'));
        const categoryData: Category[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Category data:', data);
          categoryData.push({ id: doc.id, name: data.name });
        });

        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async () => {
    try {
      const db: Firestore = getFirestore();
      const docRef = await addDoc(collection(db, 'category'), { name: newCategory });
      console.log('Category document written with ID: ', docRef.id);
      setCategories((prevCategories) => [...prevCategories, { id: docRef.id, name: newCategory }]);
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category document:', error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const db: Firestore = getFirestore();
      await deleteDoc(doc(db, 'category', id));
      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
      console.log('Category document deleted with ID: ', id);
    } catch (error) {
      console.error('Error deleting category document:', error);
    }
  };

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
      amount: bigInt(expenseFormData.amount).valueOf(),
      description: expenseFormData.description,
    };

    try {
      if (transactionData.category.trim() !== '' && transactionData.amount) {
        const docRef = await addDoc(collection(firestore, 'expenses'), transactionData);
        console.log('Expense document added with ID: ', docRef.id);
        setExpenses([...expenses, { ...transactionData, id: docRef.id }]);
        handleClose();
      } else {
        console.error('Invalid expense data');
      }
    } catch (error) {
      console.error('Error adding expense document:', error);
    }

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
      amount: bigInt(incomeFormData.amount).valueOf(),
      description: incomeFormData.description,
    };

    try {
      if (transactionData.category.trim() !== '' && transactionData.amount) {
        const docRef = await addDoc(collection(firestore, 'income'), transactionData);
        console.log('Income document added with ID: ', docRef.id);
        setIncome([...income, { ...transactionData, id: docRef.id }]);
        handleClose();
      } else {
        console.error('Invalid income data');
      }
    } catch (error) {
      console.error('Error adding income document:', error);
    }

    setTransactions([...transactions, transactionData]);
    setIncomeFormData({
      category: '',
      amount: '',
      description: '',
    });
  };

  return (
    <>
      

<div className='flex  flex-wrap flex-row justify-center mt-10'>
  
      <div className='' >
        <button className='button-50  ml-10 mb-10' onClick={handleOpen}>Add an Expense</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="p-5 text-black rounded bg-white">
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
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
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
                <Button type="submit" className='bg-blue-700  '>
                  Add Transaction
                </Button>
                <button onClick={handleClose} className="m-3  bg-red-700 text-white p-2 rounded">
                  Cancel
                </button>
              </form>
            </div>
          </Box>
        </Modal>
      </div>

      <div>
        <button className='button-50 ml-10 mb-10' onClick={handleOpen}>Add an Income</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="p-5 text-black rounded bg-white">
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
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
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
                <Button type="submit"  className='bg-blue-700 '>
                  Add Transaction
                </Button>
                <button onClick={handleClose} className="m-3  bg-red-700 text-white p-2 rounded">
                  Cancel
                </button>
              </form>
            </div>
          </Box>
        </Modal>
      </div>

      <div className="">
        <div className=" flex flex-row flex-wrap gap-1">
          {budgets.map((budget) => (
            <div key={budget.id} className="">
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardContent>
                    <Typography fontSize="20px" fontFamily={'monospace'} component="div">
                      {budget.category}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </div>
      </div>

      
</div>
<div className='flex flex-row flex-wrap justify-end p-5'>
  <button onClick={handleOpen1}>
  <svg width="37px" height="37px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  </button>
  <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="p-5 text-black rounded bg-white">
              <input
                type="text"
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full p-2"
              />

              <button onClick={addCategory} className="m-3 bg-blue-700 text-white p-2 rounded">
                Add Category
              </button>
              <button onClick={handleClose1} className="m-3  bg-red-700 text-white p-2 rounded">
                Cancel
              </button>
            </div>
          </Box>
        </Modal>

</div>

<React.Fragment>
  
    <div className='flex flex-row flex-wrap  justify-center'>
      {categories.map((category) => (
        <div key={category.id} className='p-4 m-2 bg-white border-2 border-orange-500 text-black rounded-md relative'>
          <button onClick={() => deleteCategory(category.id)} className='relative top-0 right-0 '>
          <svg width="20px"  height="20px" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g></svg>          
          </button>
         
            <h1 className='w-full  '>{category.name}</h1>
       
        </div>
      ))}
    </div>
  
</React.Fragment>

    </>
  );
};

export default Budget;
