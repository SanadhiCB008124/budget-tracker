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


<div className='flex flex-row flex-wrap  justify-center items-center  ' >

  <NavLink to="/setBudget">
  <div className='bg-red-500 p-9 border-2 rounded text-black'>Budget</div>

  </NavLink>

<NavLink to="/income">
<div className='bg-red-500 p-9 border-2 rounded text-black' >Income
<p>{totalIncome}</p>
</div>
</NavLink>


<NavLink to="/expenses">
  <div className='bg-red-500 p-9 border-2 rounded text-black' >
    Expenses
    <p>{totalExpenses}</p>
  </div>
</NavLink>


<div  className='flex flex-row flex-wrap  justify-end mr-10  ' >
  <NavLink to="/budget">
  <button className='bg-yellow-500 circle '>
     <p>+</p>
  </button>
  </NavLink>
  
</div>
</div>
  );
  
};  

export default Dashboard;
