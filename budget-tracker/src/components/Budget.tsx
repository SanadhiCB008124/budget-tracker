import React, { useState } from 'react';

interface Category {
  name: string;
  budget: string;
}

const Budget: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newBudget, setNewBudget] = useState('');

  const addCategory = () => {
    if (newCategory.trim() !== '' && newBudget) {
      const newCategoryObj: Category = { name: newCategory, budget: newBudget };
      setCategories([...categories, newCategoryObj]);
      setNewCategory('');
      setNewBudget('');
    }
  };

  return (
    <div className="flex flex-row">
      <div className="w-full bg-primary h-full flex flex-row flex-wrap gap-6 justify-center p-10 overflow-hidden text-white">
        {categories.map((category, index) => (
          <a
            key={index}
            className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg "
            href="#"
          >
            <div className="p-5 text-primary-500 rounded bg-purple-300">
              <div className="mt-3 text-base font-bold text-center leading-8">
                {category.name} - Budget: LKR {category.budget}
              </div>
            </div>
          </a>
        ))}

        {/* Form for adding new category */}
        <div className="p-5 text-primary-500 rounded bg-purple-300">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-2"
          />
          <input
            type="text"
            placeholder="Budget"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            className="w-full p-2 mt-2"
          />
          <button onClick={addCategory} className="mt-3 bg-primary-500 text-white p-2 rounded">
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default Budget;
