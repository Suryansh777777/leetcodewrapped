import { useQuery } from '@tanstack/react-query';

export function useLeetCodeData(username: string) {
  return useQuery({
    queryKey: ['leetcode', username],
    queryFn: async () => {
      const response = await fetch(`/api/leetcode/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch LeetCode data');
      }
      return response.json();
    },
    enabled: Boolean(username),
  });
} 