'use client';

import { useEffect, useState } from 'react';

interface ApiData {
  email: string;
}

interface ApiResponse {
  data: ApiData;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export default function Test() {
  const [data, setData] = useState<ApiData | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const json: ApiResponse = await res.json();
        setData(json.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>{data.email}</p>
    </div>
  );
}
