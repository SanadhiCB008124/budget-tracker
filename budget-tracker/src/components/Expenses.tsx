import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firestore } from '../firebase';
import { set } from 'firebase/database';

type Expenses = {
    id: string;
    category: string;
    amount: number;
    description: string;
    
};

const Expenses = () => {

  const [categories, setCategories] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [editMode, setEditMode] = useState<string | null>(null);
  const [newAmount, setNewAmount] = useState<number>(0);
  const [newDescription, setNewDescription] = useState<string>('');

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

  const toggleSelection = (id: string) => {

    if(selectedIds.includes(id)){
      setSelectedIds((prevSelected) => prevSelected.filter((selectedId) => selectedId !== id));
    }else{
      setSelectedIds((prevSelected) => [...prevSelected, id]);
    }
  };

  const deleteSelectedExpenses = async () => {
    try {
      const db:Firestore = getFirestore();

      await Promise.all(selectedIds.map(async (id) => await deleteDoc(doc(db, 'expenses', id))));

      const querySnapshot = await getDocs(collection(db, 'expenses'));
      const updatedExpenses: Expenses[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Expenses; 
        updatedExpenses.push({ id: doc.id, category: data.category, amount: data.amount, description: data.description });
      });
      
    } catch (error) {
      console.log(error,"Error deleting expenses")
    }
  }

  const deleteExpense=async(id:string)=>{
    try {
      const db: Firestore = getFirestore();
      await deleteDoc(doc(db, 'expenses', id));
      setExpenses((prevExpenses) => prevExpenses.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const editExpense = async (id: string) => {
    try {
      const db: Firestore = getFirestore();
      const expenseRef = doc(db, 'expenses', id);
      const expenseDoc = await getDoc(expenseRef);
  
      if (expenseDoc.exists()) {
        const data = expenseDoc.data() as Expenses;
        const updatedExpense: Expenses = {
          id: id,
          amount: newAmount,
          category: newCategory,
          description: newDescription,
        };
  
        await updateDoc(expenseRef, updatedExpense);
  
        const updatedExpenseData: Expenses[] = [...expenses];
        const index = updatedExpenseData.findIndex((item) => item.id === id);
        updatedExpenseData[index] = updatedExpense;
  
        setExpenses(updatedExpenseData);
        setEditMode(null); // Exit edit mode after saving changes
        setNewCategory('');
        setNewAmount(0);
        setNewDescription('');
      } else {
        console.error('Expense document not found.');
      }
    } catch (error) {
      console.error('Error editing Expense:', error);
    }
  };



  return (
    <div>
    <h2>Expense Data</h2>
    <button onClick={deleteSelectedExpenses}>Delete Selected</button>
    <ul>
      {expenses.map((item) => (
        <li key={item.id}>

          <input
            type="checkbox"
            checked={selectedIds.includes(item.id)}
            onChange={() => toggleSelection(item.id)}
          />
          <strong>Category:</strong> {item.category}, <strong>Amount:</strong> {item.amount},{' '}
          <strong>Description:</strong> {item.description}
          <button onClick={() => deleteExpense(item.id)}>delete</button>
          <button onClick={()=>setEditMode(item.id)}>Edit</button>
          {
  editMode === item.id && (
    <div>
      <select
        value={newCategory}
       
        onChange={(e) => setNewCategory(e.target.value)}
      >
        {categories.map((category) => (
          
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter amount"
        value={newAmount}
        onChange={(e) => setNewAmount(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Enter description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button onClick={() => editExpense(item.id)}>Save</button>
    </div>
  )
}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Expenses
