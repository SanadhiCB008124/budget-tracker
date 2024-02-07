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

      <div>
        <button className='button-50 ml-10 mb-10' onClick={handleOpen1}>Add a Category</button>
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
      
</div>

<React.Fragment>
  <div>
    <div className=''>
      {categories.map((category) => (
        <div key={category.id} className='p-4 m-2 bg-white border-2 w-1/6 border-orange-500 text-black flex flex-row flex-wrap rounded-md relative'>
          <button onClick={() => deleteCategory(category.id)} className='absolute top-0 right-0 m-2'>
          <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#e91c1c"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.30958 3.54424C7.06741 2.56989 8.23263 2 9.46699 2H20.9997C21.8359 2 22.6103 2.37473 23.1614 2.99465C23.709 3.61073 23.9997 4.42358 23.9997 5.25V18.75C23.9997 19.5764 23.709 20.3893 23.1614 21.0054C22.6103 21.6253 21.8359 22 20.9997 22H9.46699C8.23263 22 7.06741 21.4301 6.30958 20.4558L0.687897 13.2279C0.126171 12.5057 0.126169 11.4943 0.687897 10.7721L6.30958 3.54424ZM10.2498 7.04289C10.6403 6.65237 11.2734 6.65237 11.664 7.04289L14.4924 9.87132L17.3208 7.04289C17.7113 6.65237 18.3445 6.65237 18.735 7.04289L19.4421 7.75C19.8327 8.14052 19.8327 8.77369 19.4421 9.16421L16.6137 11.9926L19.4421 14.8211C19.8327 15.2116 19.8327 15.8448 19.4421 16.2353L18.735 16.9424C18.3445 17.3329 17.7113 17.3329 17.3208 16.9424L14.4924 14.114L11.664 16.9424C11.2734 17.3329 10.6403 17.3329 10.2498 16.9424L9.54265 16.2353C9.15212 15.8448 9.15212 15.2116 9.54265 14.8211L12.3711 11.9926L9.54265 9.16421C9.15212 8.77369 9.15212 8.14052 9.54265 7.75L10.2498 7.04289Z" fill="#e91c1c"></path> </g></svg>
          </button>
          <div>
            <h1 className='w-full justify-start '>{category.name}</h1>
          </div>
        </div>
      ))}
    </div>
  </div>
</React.Fragment>

    </>
  );
};

export default Budget;
