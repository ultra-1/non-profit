import React, { useState, useEffect } from 'react';
import { fetchObjects, createObject } from '../util/api';
import { FaBars } from 'react-icons/fa';

function MenuPage() {
  const [category, setCategory] = useState(null);
  const [objects, setObjects] = useState([]);
  const [filters, setFilters] = useState({}); // Filters specific to each category

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    // Handle click action for the selected option
    console.log(`Option clicked: ${option}`);
  };
  useEffect(() => {
    if (category) {
      fetchObjects(category, filters)
        .then(data => {
          setObjects(data);
        })
        .catch(error => {
          console.error('Error fetching objects:', error);
        });
    }
  }, [category, filters]);

  const handleCategoryChange = selectedCategory => {
    setCategory(selectedCategory);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handleCreateObject = () => {
    createObject(category)
      .then(newObject => {
        setObjects(prevObjects => [...prevObjects, newObject]);
      })
      .catch(error => {
        console.error('Error creating object:', error);
      });
  };

  return (
    <div>
    <FaBars onClick={toggleMenu} style={{ cursor: 'pointer' }} />
    {isOpen && (
      <nav className="menu-bar">
        <ul>
          <li onClick={() => handleCategoryChange("Foundation")}>Foundation</li>
          <li onClick={() => handleCategoryChange("Non-Profit")}>Non-Profit</li>
          <li onClick={() => handleCategoryChange("Grants")}>Grants</li>
          <li onClick={() => handleCategoryChange("Mail")}>Mail</li>
        </ul>
      </nav>
    )}
  

      {category && (
        <div>
          <h2>{category}s</h2>

          {/* Display filters specific to the selected category */}
          {/* Example: <FilterComponent onChange={handleFilterChange} /> */}

          <ul>
            {objects.map(object => (
              <li key={object.id}>{/* Display object details */}</li>
            ))}
          </ul>

          <button onClick={handleCreateObject}>Create New {category}</button>
        </div>
      )}
    </div>
  );
}

export default MenuPage;