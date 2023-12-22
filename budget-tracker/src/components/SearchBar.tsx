import React from 'react';

interface SearchBarProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchValue, setSearchValue }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="mb-3">
      <div className="mb-4 flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="m-0 block w-[4px] h-10 min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-purple-900 focus:text-black focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-purple-900 dark:text-black dark:placeholder:text-black dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
          value={searchValue}
          onChange={handleInputChange}
        />

        <span
          className="bg-white input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
          id="basic-addon2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
