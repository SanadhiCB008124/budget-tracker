import { useEffect, useState } from 'react';
import { collection, getDocs,deleteDoc,updateDoc, doc, Firestore, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { getFirestore } from 'firebase/firestore';

type Income = {
  id: string;
  category: string;
  amount: number;
  description: string;
};

const Income = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
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
        const db: Firestore = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'income'));
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

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prevSelected) => prevSelected.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds((prevSelected) => [...prevSelected, id]);
    }
  };

  const deleteSelectedIncome = async () => {
    try {
      const db: Firestore = getFirestore();

      // Delete selected income items
      await Promise.all(selectedIds.map(async (id) => await deleteDoc(doc(db, 'income', id))));
      
      // Refresh the income list after deletion
      const querySnapshot = await getDocs(collection(db, 'income'));
      const updatedIncome: Income[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Income; 
        updatedIncome.push({ id: doc.id, category: data.category, amount: data.amount, description: data.description });
      });

      setIncome(updatedIncome);
      setSelectedIds([]); // Clear selected items after deletion
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  const deleteIncome=async(id:string)=>{
    try {

      const db:Firestore=getFirestore();
      await deleteDoc(doc(db,'income',id));
      setIncome((prevIncome)=>prevIncome.filter((income)=>income.id!==id));

      
    } catch (error) {
      console.error('Error deleting income:', error);
      
    }
  };

  
  const editIncome = async (id: string) => {
    try {
      const db: Firestore = getFirestore();
      const incomeRef = doc(db, 'income', id);
      const incomeDoc = await getDoc(incomeRef);
  
      if (incomeDoc.exists()) {
        const data = incomeDoc.data() as Income;
        const updatedIncome: Income = {
          id: id,
          amount: newAmount,
          category: newCategory,
          description: newDescription,
        };
  
        await updateDoc(incomeRef, updatedIncome);
  
        const updatedIncomeData: Income[] = [...income];
        const index = updatedIncomeData.findIndex((item) => item.id === id);
        updatedIncomeData[index] = updatedIncome;
  
        setIncome(updatedIncomeData);
        setEditMode(null); // Exit edit mode after saving changes
        setNewCategory('');
        setNewAmount(0);
        setNewDescription('');
      } else {
        console.error('Income document not found.');
      }
    } catch (error) {
      console.error('Error editing income:', error);
    }
  };
  

  return (
    <div>
      <h2>Income Data</h2>
      <button onClick={deleteSelectedIncome}>Delete Selected</button>
      <ul>
        {income.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={selectedIds.includes(item.id)}
              onChange={() => toggleSelection(item.id)}
            />
            <strong>Category:</strong> {item.category}, <strong>Amount:</strong> {item.amount},{' '}
            <strong>Description:</strong> {item.description}
            <button onClick={()=>deleteIncome(item.id)}>Delete</button>
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
      <button onClick={() => editIncome(item.id)}>Save</button>
    </div>
  )
}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Income;
