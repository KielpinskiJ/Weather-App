import React, { useEffect, useState } from 'react';

const SearchMenu: React.FC<{ setSearchMenuOpen: (open: boolean) => void, setLocation: (location: string) => void }> = ({ setSearchMenuOpen, setLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    return savedSearches ? JSON.parse(savedSearches) : [];
  });

  const updateSearches = async (searchTerm: string) => {
    return new Promise(resolve => {
      setRecentSearches(prev => {
        const updatedSearches = [searchTerm, ...prev].slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        resolve(updatedSearches);
        return updatedSearches;
      });
    });
  };
  
  const handleSearch = async () => {
    setLocation(searchTerm);
    await updateSearches(searchTerm);
    setSearchMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='fixed inset-0 bg-main p-6 z-20 flex flex-col gap-6 sm:w-30v fullhd:px-16 fullhd:gap-14'>
      <div className='w-full flex justify-end'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-6 w-6 text-text-main cursor-pointer' onClick={() => setSearchMenuOpen(false)}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className='flex justify-between sm:flex-col sm:gap-4 hd:flex-row'>
        <input 
          type='text' 
          placeholder='Search location' 
          className='py-2 px-4 bg-main text-text-main placeholder-text-search border border-text-main'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={`bg-custom-blue text-white py-2 px-4 ${!searchTerm ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleSearch} disabled={!searchTerm}>Search</button>
      </div>
      <div className='flex flex-col gap-3'>
        {recentSearches.map((search, index) => (
          <div key={index} className='w-full border border-main p-4 hover:border-text-search text-text-main cursor-pointer' onClick={() => {setLocation(search); setSearchMenuOpen(false);}}>
            <p>{search}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMenu;
