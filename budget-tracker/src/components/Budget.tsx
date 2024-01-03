import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import Modal from '@mui/material/Modal';
import { CardActionArea } from '@mui/material';
import Transactions from '../components/Home/Transactions';
import TextField from '@mui/material/TextField';  // Import TextField
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

interface Category {
  name: string;
}



type Budget = {
  id: string;
  category: string;
  
};

const Budget: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [expenseFormData, setExpenseFormData] = useState({
    category: '',
    amount:'' ,
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
        const categoryData: string[] = [];
    
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Category data:', data); // Log the data object
          // Assuming the field name is 'name', update this based on your Firestore schema
          categoryData.push(data.name);
        });
    
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    

    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (newCategory.trim() !== '') {
      const newCategoryObj: Category = { name: newCategory };
      setCategories([...categories, newCategoryObj.name]);
      setNewCategory('');
      try {
        const docRef = await addDoc(collection(firestore, 'category'), newCategoryObj);
        console.log('Category document added with ID: ', docRef.id);
        handleClose1();
      } catch (error) {
        console.error('Error adding category document:', error);
      }
    }
  }


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
      amount: bigInt(expenseFormData.amount).valueOf(), // Convert to BigInteger
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
      amount: bigInt(incomeFormData.amount).valueOf(), // Convert to BigInteger
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
      <React.Fragment>
    <div>
      <div className=' '>
      
      {categories.map((category) => (
        <div key={category} className='p-4 m-2 bg-white border-2 w-1/6 border-orange-500 text-black flex flex-row flex-wrap rounded-md'>
          <h1>{category}</h1>
        </div>
      ))}
        
      </div>
    </div>
   
  </React.Fragment>
      

    <div>
      <button className='button-50 ml-10 mb-10'  onClick={handleOpen}>Add  an Expense</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="p-5 text-white rounded bg-purple-300">
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
          <button onClick={handleClose} className="m-3  bg-primary-500 text-white p-2 rounded">
          Cancel
          </button>
        </form>
         
        </div>
        </Box>
      </Modal>
    </div>

    <div>
      <button className='button-50 ml-10 mb-10'  onClick={handleOpen}>Add  an  Income</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="p-5 text-white rounded bg-purple-300">

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
          <button onClick={handleClose} className="m-3  bg-primary-500 text-white p-2 rounded">
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
                 <Typography  fontSize="20px" fontFamily={'monospace'} component="div">
                 {budget.category}
                </Typography>
              </CardContent>
            </CardActionArea>
           </Card>
          </div> ))
        }
        </div>
      </div>
   
  
        
  
      <div>
      <button className='button-50 ml-10 mb-10'  onClick={handleOpen1}>Add a Category</button>
      <Modal
       open={open1} 
       onClose={handleClose1}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description">

        <Box sx={style}>
        <div className="p-5 text-white rounded bg-purple-300">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-2"
          />
         
          <button onClick={addCategory} className="m-3 bg-primary-500 text-white p-2 rounded">
            Add Category
          </button>
          <button onClick={handleClose1} className="m-3  bg-primary-500 text-white p-2 rounded">
          Cancel
          </button>
        </div>
        </Box>
      </Modal>
    </div>
       
    </>
  );
};

export default Budget;
