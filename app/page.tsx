'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLeetCodeData } from '../hooks/useLeetCodeData';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Calendar, Star, Medal } from 'lucide-react';

const queryClient = new QueryClient();

function LeetCodeWrapped() {
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { data, isLoading, error } = useLeetCodeData(submitted ? username : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-transparent bg-clip-text">
        LeetCode Wrapped
      </h1>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
        <div className="flex gap-2">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter LeetCode username"
            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
          />
          <Button type="submit">
            Get Stats
          </Button>
        </div>
      </form>

      {isLoading && (
        <div className="text-center">
          <Progress value={33} className="w-60 mx-auto mb-4" />
          <p>Loading your LeetCode journey...</p>
        </div>
      )}
      
      {error && (
        <Card className="max-w-md mx-auto bg-red-500/10 border-red-500/20">
          <CardContent className="pt-6">
            <p className="text-red-400">Error: {(error as Error).message}</p>
          </CardContent>
        </Card>
      )}
      
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-400">Ranking</span>
                  <span className="font-mono">{data.profile?.profile?.ranking || 'N/A'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Reputation</span>
                  <span className="font-mono">{data.profile?.profile?.reputation || 0}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Star Rating</span>
                  <span className="font-mono">{data.profile?.profile?.starRating || 0}</span>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Contest Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-400">Contests</span>
                  <span className="font-mono">{data.contest?.attendedContestsCount || 0}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Rating</span>
                  <span className="font-mono">{data.contest?.rating || 'N/A'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Global Rank</span>
                  <span className="font-mono">{data.contest?.globalRanking || 'N/A'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Top Percentage</span>
                  <span className="font-mono">
                    {data.contest?.topPercentage 
                      ? `${data.contest.topPercentage.toFixed(1)}%` 
                      : 'N/A'}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-yellow-500" />
                Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-400">Current Streak</span>
                  <span className="font-mono">{data.calendar?.streak || 0}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Total Active Days</span>
                  <span className="font-mono">{data.calendar?.totalActiveDays || 0}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Active Years</span>
                  <span className="font-mono">
                    {data.calendar?.activeYears?.length || 0}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="h-5 w-5 text-yellow-500" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-400">Contest Badge</span>
                  <span className="font-mono">{data.contest?.badge?.name || 'None'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Submissions</span>
                  <span className="font-mono">
                    {data.profile?.submitStats?.acSubmissionNum?.[0]?.submissions || 0}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Problems Solved</span>
                  <span className="font-mono">
                    {data.profile?.submitStats?.acSubmissionNum?.[0]?.count || 0}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <LeetCodeWrapped />
    </QueryClientProvider>
  );
}
