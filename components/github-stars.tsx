// GitHubStars.tsx

'use client';

import { useState, useEffect } from 'react';
import { fetchStars } from '@/lib/fetchers';
import NumberTicker from '@/components/magicui/number-ticker';

const GitHubStars = () => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const getStars = async () => {
      const totalStars = await fetchStars();
      setStars(totalStars);
    };

    getStars();
  }, []);

  if (stars === null) {
    return <div>0</div>;
  }

  return <NumberTicker value={stars} />;
};

export default GitHubStars;
