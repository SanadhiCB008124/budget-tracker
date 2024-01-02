import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
 
  p: 4,
};



interface Category {
  name: string;
 
}

type Budget = {
  id: string;
  category: string;
  
};

const Budget: React.FC = () => {

  
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'budget'));
        const budgetData: Budget[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Budget;

          budgetData.push({
            ...data,
          });
        });

        setBudgets(budgetData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addCategory = async () => {
    if (newCategory.trim() !== '' ) {
      const newCategoryObj: Category = { name: newCategory};
      setCategories([...categories, newCategoryObj]);
      setNewCategory('');
     

      // Save data to Firestore
      try {
        const docRef = await addDoc(collection(firestore, 'budget'), {
          category: newCategory,
         
        });

        // Update the state with the newly added document
        setBudgets((prevBudgets) => [
          ...prevBudgets,
          { id: docRef.id, category: newCategory },
        ]);
        handleClose();
      } catch (error) {
        console.error('Error adding document:', error);
      }
    }
  };


  return (
    <>
    <div>
      <button className='button-50 ml-10 mb-10'  onClick={handleOpen}>Add a Category</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          <button onClick={handleClose} className="m-3  bg-primary-500 text-white p-2 rounded">
          Cancel
          </button>
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
          <Typography variant="body2" color="text.secondary">
            
            
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </div>
        ))}

       

        
        </div>
      </div>
   
    </>
  );
};

export default Budget;
