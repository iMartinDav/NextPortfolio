// fetchFunctions.ts

export const fetchStars = async (): Promise<number> => {
  const baseUrl =
    typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/fetch-github-stars`);
  const data = await res.json();
  return Number(data?.totalStars);
};

export const fetchProjects = async () => {
  try {
    const baseUrl =
      typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/fetch-project-posts`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      console.warn(`Failed to fetch projects: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
};
