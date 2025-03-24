'use client';

import { useEffect, useState } from 'react';
import NumberTicker from '@/components/magicui/number-ticker';
import { fetchStars } from '@/lib/fetchers';

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
