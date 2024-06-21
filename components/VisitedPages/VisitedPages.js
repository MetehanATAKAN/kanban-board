import { useEffect, useState } from 'react';
import { getVisitedPages } from '../../lib/localStorage/localStorage';

const VisitedPages = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages(getVisitedPages());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setPages(getVisitedPages());
    };

    window.addEventListener('storage', handleStorageChange);
  }, []);

  if (pages.length === 0) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-white text-lg mb-2">Recently Visited</h3>
      <ul>
        {pages.map((page, index) => (
          <li key={index}>
            <a href={page} className="text-blue-400 hover:underline">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisitedPages;
