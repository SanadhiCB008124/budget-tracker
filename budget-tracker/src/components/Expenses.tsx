import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Box, MenuItem, Modal, TextField } from '@mui/material';

type Expenses = {
  id: string;
  category: string;
  amount: number;
  description: string;
  date:string;
};

const Expenses = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [editMode, setEditMode] = useState<string | null>(null);
  const [newAmount, setNewAmount] = useState<number>(0);
  const [newDescription, setNewDescription] = useState<string>('');
  const [newDate, setNewDate] = useState<string>('');
  const [popoverItemId, setPopoverItemId] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'category'));
        setCategories(querySnapshot.docs.map((doc) => doc.data().name));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'expenses'));
        setExpenses(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Expenses[]
        );
        }catch (error) {
        console.error('Error fetching Expense data:', error);
      }
    };

    fetchCategories();
    fetchExpenses();
  }, []);

  const deleteExpense = async (id: string) => {
    try {
      const db: Firestore = getFirestore();
      await deleteDoc(doc(db, 'expenses', id));
      setExpenses((prevExpenses) => prevExpenses.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const openModal = (id: string) => {
    setModalIsOpen(true);
    setEditMode(id);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditMode(null);
    setNewCategory('');
    setNewAmount(0);
    setNewDescription('');
    setNewDate('');
  };



  const editExpense = async () => {
    try {
      const id = editMode as string;
      const db: Firestore = getFirestore();
      const expenseRef = doc(db, 'expenses', id);
      const expenseDoc = await getDoc(expenseRef);

      if (expenseDoc.exists()) {
        const updatedExpense: Expenses = {
          id,
          amount: newAmount,
          category: newCategory,
          description: newDescription,
          date: newDate,
        };

        await updateDoc(expenseRef, updatedExpense);

        setExpenses((prevExpenses) =>
          prevExpenses.map((item) => (item.id === id ? updatedExpense : item))
        );

        closeModal();
      } else {
        console.error('Expense document not found.');
      }
    } catch (error) {
      console.error('Error editing Expense:', error);
    }
  };

  return (
    <div>
      <ul>
        {expenses.map((item) => (
      <li key={item.id} className='bg-pink-100 pl-3 pr-2 pb-6 pt-6 m-10 text-black'>
            <div onClick={() => setPopoverItemId(item.id)}>
              <div className='flex flex-row justify-end '>
                <button onClick={() => deleteExpense(item.id)}>
                <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

                </button>
                <button onClick={() => openModal(item.id)}>
                <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#0F0F0F"></path> </g></svg>

                </button>
              </div>
              <div className='flex flex-row'>
                {`${item.category}`}
              </div>
              <div className='flex flex-row justify-end'>
                LKR {` ${item.amount}`}
              </div>
            </div>

      {modalIsOpen && editMode && editMode === item.id && (
      <Modal
      open={modalIsOpen}
        onClose={closeModal}
  aria-labelledby="Edit Expense Modal"
  aria-describedby="modal-modal-description"
    >
          <Box>
            <div>
              <TextField
                select
                label="Category"
                fullWidth
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                type="text"
                placeholder="Enter amount"
                value={newAmount}
                onChange={(e) => setNewAmount(Number(e.target.value))}
              />
              <TextField
                type="text"
                placeholder="Enter description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
             <div className='ml-3 mt-3 flex flex-row gap-3'>
                      <button onClick={editExpense} className='bg-blue-700 p-2 rounded'>Save</button>
                      <button onClick={closeModal} className='bg-red-700 p-2 rounded'>Cancel</button>
             </div>
            </div>
          </Box>
        </Modal>
      )}

      {popoverItemId === item.id && (
        <div className="popover">
          <p>{`Description: ${item.description}`}</p>
          <p>{`Date: ${new Date(item.date).toLocaleDateString()}`}</p>
        </div>
      )}
    </li>
  ))}
</ul>
</div>
);


};

export default Expenses;
