const BASE_URL = `http://localhost:5000`;

export const request = async (url, restProperty) => {
  try {
    console.log(BASE_URL + url, { ...restProperty })
    const res = await fetch(BASE_URL + url, { ...restProperty });
    
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    // const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // rethrow the error for handling elsewhere if needed
  }
};
