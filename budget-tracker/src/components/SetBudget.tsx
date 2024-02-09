import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  Firestore,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase';
import { getFirestore } from 'firebase/firestore';
import TextField from '@mui/material/TextField/TextField';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import React from 'react';
import { Button, Popover, Typography } from '@mui/material';


type Budget = {
  id: string;
  amount: number;
  date: string; // Change the type to string for the date
};

const SetBudget = () => {
  const [budget, setBudget] = useState<Budget[]>([]);
  const [newAmount, setNewAmount] = useState<number>(0);
  const [newDate, setNewDate] = useState<string>('');
  const [editMode, setEditMode] = useState<string | null>(null);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const db: Firestore = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'budget'));
        const budgetData: Budget[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Budget;
          budgetData.push({ id: doc.id, amount: data.amount, date: data.date });
        });

        setBudget(budgetData);
      } catch (error) {
        console.error('Error fetching budget data:', error);
      }
    };

    fetchBudget();
  }, []);

  const addBudget = async () => {
    if (newAmount !== 0 && newDate) {
      const budgetItem: Budget = {
        amount: newAmount,
        date: newDate,
        id: new Date().toISOString(),
      };

      setBudget([...budget, budgetItem]);
      setNewAmount(0);
      setNewDate('');

      try {
        await addDoc(collection(firestore, 'budget'), budgetItem);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  const editBudget = async (id: string) => {
    try {
      const db: Firestore = getFirestore();
      const budgetRef = doc(collection(db, 'budget'), id);
      const budgetDoc = await getDoc(budgetRef);

      if (budgetDoc.exists()) {
      
        // Assuming you have a way to get the updated amount (newAmount) and date (newDate)
        const updatedBudget: Budget = {
          id: id,
          amount: newAmount,
          date: newDate,
        };

        await updateDoc(budgetRef, updatedBudget);

        const updatedBudgetData: Budget[] = [...budget];
        const index = updatedBudgetData.findIndex((item) => item.id === id);
        updatedBudgetData[index] = updatedBudget;

        setBudget(updatedBudgetData);
        setEditMode(null); // Exit edit mode after saving changes
      } else {
        console.error('Budget document not found.');
      }
    } catch (error) {
      console.error('Error editing budget:', error);
    }
  };


  const deleteBudget = async (id: string) => {
    try {
      const db: Firestore = getFirestore();
      await deleteDoc(doc(db, 'budget', id));
      setBudget((prevBudget) => prevBudget.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <div>
      <div>
      <Button aria-describedby={id} variant="contained" style={{ backgroundColor: '#ff0000' }} onClick={handleClick}>
        Set a New Budget
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          
        <div className='flex flex-col items-center'>


<div >
  <TextField
    id="outlined-basic"
    type="text"
    value={newAmount}
    onChange={(e) => setNewAmount(Number(e.target.value))}
    label="Enter budget amount"
    variant="outlined"
  />
</div>


<div >
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer
      components={[
        'DatePicker',
        'MobileDatePicker',
        'DesktopDatePicker',
        'StaticDatePicker',
      ]}
    >
      <DemoItem label="Responsive variant">
        <DatePicker
          value={dayjs(newDate)}
          onChange={(date) => date && setNewDate(date.format())}
          defaultValue={dayjs('2022-04-17')}
        />
      </DemoItem>
    </DemoContainer>
  </LocalizationProvider>
</div>

<button onClick={addBudget} className='bg-black mt-2 text-white p-4 border-2 border-black rounded-3xl'>
  Add Budget
</button>

</div>
          
          </Typography>
      </Popover>
    </div>

      <ul >
        {budget.map((item) => (
          <li key={item.id} className='bg-pink-200 text-black pl-3 pr-3 pt-6 pb-6 m-2'>
          
            {`Amount: $${item.amount}, Date: ${item.date}`}
            <div className='flex flex-row justify-end'>
            <button onClick={()=>deleteBudget(item.id)}>
            <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
            <button onClick={() => setEditMode(item.id)}>
            <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#0F0F0F"></path> </g></svg>
            </button>
            </div>
            {editMode === item.id && (
              <>
                <input
                  type="text"
                  placeholder="Enter updated amount"
                  value={newAmount}
                  onChange={(e) => setNewAmount(Number(e.target.value))}
                />
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
                <button onClick={() => editBudget(item.id)}>Save</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetBudget;
