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
<>
<div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
<NavLink to="/budget">
  <button >
  <svg width="67px" height="67px" fill="#e6ab0a" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#e6ab0a"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M128,23.99805a104,104,0,1,0,104,104A104.12041,104.12041,0,0,0,128,23.99805Zm40,112H136v32a8,8,0,1,1-16,0v-32H88a8,8,0,0,1,0-16h32v-32a8,8,0,0,1,16,0v32h32a8,8,0,0,1,0,16Z"></path> </g></svg>
  </button>
  </NavLink>
</div>
<div className='flex flex-row flex-wrap justify-center gap-4 m-10'>

<NavLink to="/setBudget">
  <div className='bg-black p-9 border-2 rounded-xl  text-white text-[16px] '>

    Budget
    
    </div>
  </NavLink>

<NavLink to="/income">
<div className='bg-black p-9 border-2 rounded-xl  text-white text-[16px]' >Income
<p> LKR {totalIncome}</p>
</div>
</NavLink>


<NavLink to="/expenses">
  <div className='bg-black p-9 border-2 rounded-xl  text-white text-[16px]' >
    Expenses
    <p>{totalExpenses}</p>
  </div>
</NavLink>


</div>
</>
  );
  
};  

export default Dashboard;
