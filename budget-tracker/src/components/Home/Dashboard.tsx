import React from 'react';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { NavLink } from 'react-router-dom';


const Dashboard: React.FC = () => {

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'income'));
        let total = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          total += data.amount;
        });

        setTotalIncome(total);
      } catch (error) {
        console.error('Error fetching income:', error);
      }
    };

    fetchIncome();
  }, []);

  useEffect(()=>{
    const fetchExpenses=async()=>{
      try {
        const querySnapshot=await getDocs(collection(firestore, 'expenses'));
        let total=0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          total += data.amount;
        });

        setTotalExpenses(total);
        
      } catch (error) {
        console.error('Error fetching expenses:', error);
        
      }
    };
    fetchExpenses();
  },[]);

  return (


<div className='flex flex-row justify-center gap-4 m-10'>

<NavLink to="/setBudget">
  <div className='bg-black p-9 border-2 rounded-xl  text-white text-[20px] '>Budget</div>

  </NavLink>

<NavLink to="/income">
<div className='bg-black p-9 border-2 rounded-xl  text-white text-[20px]' >Income
<p> LKR {totalIncome}</p>
</div>
</NavLink>


<NavLink to="/expenses">
  <div className='bg-black p-9 border-2 rounded-xl  text-white text-[20px]' >
    Expenses
    <p>{totalExpenses}</p>
  </div>
</NavLink>


</div>
  );
  
};  

export default Dashboard;
