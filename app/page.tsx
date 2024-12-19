"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLeetCodeData } from "../hooks/useLeetCodeData";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Calendar,
  Star,
  Medal,
  Code,
  Search,
  Loader2,
} from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/components/wrapped/home";

const queryClient = new QueryClient();

// First, let's define an interface for the language data
interface LanguageStats {
  languageName: string;
  problemsSolved: number;
}

// function LeetCodeWrapped() {
//   const [username, setUsername] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const { data, isLoading, error } = useLeetCodeData(submitted ? username : "");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-6xl font-bold mb-4 text-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-transparent bg-clip-text">
//           LeetCode Wrapped
//         </h1>
//         <p className="text-zinc-400 text-center mb-12">
//           Visualize your LeetCode journey and achievements
//         </p>

//         <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16">
//           <div className="flex gap-3">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
//               <Input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter LeetCode username"
//                 className="pl-9 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
//               />
//             </div>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Loading
//                 </>
//               ) : (
//                 "Get Stats"
//               )}
//             </Button>
//           </div>
//         </form>

//         {isLoading && (
//           <div className="text-center">
//             <Progress value={33} className="w-60 mx-auto mb-4" />
//             <p>Loading your LeetCode journey...</p>
//           </div>
//         )}

//         {error && (
//           <Card className="max-w-md mx-auto bg-red-500/10 border-red-500/20">
//             <CardContent className="pt-6">
//               <p className="text-red-400">Error: {(error as Error).message}</p>
//             </CardContent>
//           </Card>
//         )}

//         {data && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Trophy className="h-5 w-5 text-yellow-500" />
//                   Profile
//                 </CardTitle>
//                 <CardDescription className="text-zinc-400">
//                   Your LeetCode rankings and reputation
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <p className="flex justify-between">
//                     <span className="text-gray-400">Ranking</span>
//                     <span className="font-mono">
//                       {data.profile?.profile?.ranking || "N/A"}
//                     </span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-gray-400">Reputation</span>
//                     <span className="font-mono">
//                       {data.profile?.profile?.reputation || 0}
//                     </span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-gray-400">Star Rating</span>
//                     <span className="font-mono">
//                       {data.profile?.profile?.starRating || 0}
//                     </span>
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Star className="h-5 w-5 text-yellow-500" />
//                   Contest Stats
//                 </CardTitle>
//                 <CardDescription className="text-zinc-400">
//                   Your performance in LeetCode contests
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <p className="flex justify-between">
//                     <span className="text-gray-400">Contests</span>
//                     <span className="font-mono">
//                       {data.contest?.attendedContestsCount || 0}
//                     </span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-gray-400">Rating</span>
//                     <span className="font-mono">
//                       {data.contest?.rating || "N/A"}
//                     </span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-gray-400">Global Rank</span>
//                     <span className="font-mono">
//                       {data.contest?.globalRanking || "N/A"}
//                     </span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-gray-400">Top Percentage</span>
//                     <span className="font-mono">
//                       {data.contest?.topPercentage
//                         ? `${data.contest.topPercentage.toFixed(1)}%`
//                         : "N/A"}
//                     </span>
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Calendar className="h-5 w-5 text-yellow-500" />
//                   Streak
//                 </CardTitle>
//                 <CardDescription className="text-zinc-400">
//                   Your streak and active days on LeetCode
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <p className="flex justify-between">
//                     <span className="text-gray-400">Current Streak</span>
//                     <span className="font-mono">
//                       {data.calendar?.streak || 0}
//                     </span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-gray-400">Total Active Days</span>
//                     <span className="font-mono">
//                       {data.calendar?.totalActiveDays || 0}
//                     </span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-gray-400">Active Years</span>
//                     <span className="font-mono">
//                       {data.calendar?.activeYears?.length || 0}
//                     </span>
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Medal className="h-5 w-5 text-yellow-500" />
//                   Achievements
//                 </CardTitle>
//                 <CardDescription className="text-zinc-400">
//                   Your contest badge and submission stats
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <p className="flex justify-between">
//                     <span className="text-gray-400">Contest Badge</span>
//                     <span className="font-mono">
//                       {data.contest?.badge?.name || "None"}
//                     </span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-gray-400">Submissions</span>
//                     <span className="font-mono">
//                       {data.profile?.submitStats?.acSubmissionNum?.[0]
//                         ?.submissions || 0}
//                     </span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-gray-400">Problems Solved</span>
//                     <span className="font-mono">
//                       {data.profile?.submitStats?.acSubmissionNum?.[0]?.count ||
//                         0}
//                     </span>
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Code className="h-5 w-5 text-yellow-500" />
//                   Languages
//                 </CardTitle>
//                 <CardDescription className="text-zinc-400">
//                   Your top languages by problems solved
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   {data.profile?.languageProblemCount
//                     ?.sort(
//                       (a: LanguageStats, b: LanguageStats) =>
//                         (b.problemsSolved || 0) - (a.problemsSolved || 0)
//                     )
//                     ?.slice(0, 5)
//                     ?.map((lang: LanguageStats) => (
//                       <div
//                         key={lang.languageName}
//                         className="flex justify-between items-center"
//                       >
//                         <span className="text-gray-400">
//                           {lang.languageName || "Unknown"}
//                         </span>
//                         <div className="flex items-center gap-2">
//                           <Progress
//                             value={
//                               ((lang.problemsSolved || 0) /
//                                 (data.profile?.submitStats?.acSubmissionNum?.[0]
//                                   ?.count || 1)) *
//                               100
//                             }
//                             className="w-20"
//                           />
//                           <span className="font-mono w-12 text-right">
//                             {lang.problemsSolved || 0}
//                           </span>
//                         </div>
//                       </div>
//                     )) || (
//                     <p className="text-gray-400 text-center">
//                       No language data available
//                     </p>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//       <Toaster />
//     </div>
//   );
// }

export default function Page() {
  return (
    // <QueryClientProvider client={queryClient}>
    //   <LeetCodeWrapped />
    // </QueryClientProvider>
    <Home />
  );
}
