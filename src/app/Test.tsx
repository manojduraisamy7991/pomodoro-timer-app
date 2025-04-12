'use client';

import { useEffect, useState } from 'react';

type ApiResponse = {
  data: {
    email: string;
    // add more fields if your API returns more
  };
};

export default function Test() {
  const [data, setData] = useState<ApiResponse['data'] | null>(null);
  const [error, setError] = useState<string>(''); // store dynamic error message

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://test-express-app-delta.vercel.app');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const json: ApiResponse = await res.json();
        setData(json.data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>{data.email}</p>
    </div>
  );
}
