export async function fetchObjects(category, filters) {
    const apiUrl = `http://localhost:8001/${category}`;
  const queryParams = new URLSearchParams(filters).toString();

  try {
    const response = await fetch(`${apiUrl}?${queryParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch objects');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
  }
  
export async function createObject(category, name, email, address) {
    const apiUrl = `http://localhost:8001/${category}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, address }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create object');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
}