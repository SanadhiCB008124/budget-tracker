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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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

  const toggleSelection=(id:string)=>{
    if(selectedIds.includes(id)){
      setSelectedIds((prevSelected) => prevSelected.filter((selectedId) => selectedId !== id));
    }else{
      setSelectedIds((prevSelected) => [...prevSelected, id]);
    }
  };

  const deleteSelectedBudget = async () => {  
    try {
      const db: Firestore = getFirestore();

      await Promise.all(selectedIds.map(async (id) => await deleteDoc(doc(db, 'budget', id))));

      const querySnapshot = await getDocs(collection(db, 'budget'));
      const updatedBudget: Budget[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Budget; 
        updatedBudget.push({ id: doc.id, amount: data.amount, date: data.date });
      });
      
    } catch (error) {
      console.log(error,"Error deleting budget")
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

  return (
    <div>
      <h2>Set Budget</h2>
      <button onClick={deleteSelectedBudget}>Delete  selected </button>
      <input
        type="text"
        placeholder="Enter budget amount"
        value={newAmount}
        onChange={(e) => setNewAmount(Number(e.target.value))}
      />
      <input
        type="date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
      />
      <button onClick={addBudget}>Add Budget</button>

      <ul>
        {budget.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={selectedIds.includes(item.id)}
              onChange={() => toggleSelection(item.id)}
            
            />
            {`Amount: $${item.amount}, Date: ${item.date}`}
            <button onClick={()=>deleteBudget(item.id)}>Delete</button>
            <button onClick={() => setEditMode(item.id)}>Edit</button>
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
