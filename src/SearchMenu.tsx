import React, { useState } from 'react';

const SearchMenu: React.FC<{ setSearchMenuOpen: (open: boolean) => void, setLocation: (location: string) => void }> = ({ setSearchMenuOpen, setLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    setLocation(searchTerm);
    setSearchMenuOpen(false);
  };

  return (
    <div className='fixed inset-0 bg-main p-6 z-20 flex flex-col gap-6 sm:w-30v fullhd:px-16 fullhd:gap-14'>
      <div className='w-full flex justify-end'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-6 w-6 text-text-main cursor-pointer' onClick={() => setSearchMenuOpen(false)}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className='flex justify-between'>
        <input 
          type='text' 
          placeholder='Search location' 
          className='py-2 px-4 bg-main text-text-main placeholder-text-search border border-text-main'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='bg-custom-blue text-white py-2 px-4' onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default SearchMenu;
