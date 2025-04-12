'use client';

import { useEffect, useState } from 'react';

export default function Test() {
  const [data, setData] = useState(null);  // State to store the fetched data
  const [error, setError] = useState(''); // State to store any error message

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://test-express-app-delta.vercel.app');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();

        setData(data.data);  // Set the response data to the state
      } catch (err) {
        setError('err');  // Handle any errors
        console.error('Fetch error:', err);
      }
    };

    fetchData(); // Trigger the fetch function
  }, []); // Empty dependency array to run the effect only once on component mount

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  // Render the fetched data if it's available
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
{data?.email}    </div>
  );
}
