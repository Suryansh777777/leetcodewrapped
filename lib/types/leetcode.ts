export interface LeetCodeUserProfile {
  matchedUser: {
    username: string;
    submitStats: {
      acSubmissionNum: {
        difficulty: string;
        count: number;
        submissions: number;
      }[];
      totalSubmissionNum: {
        difficulty: string;
        count: number;
        submissions: number;
      }[];
    };
    languageProblemCount?: Array<{
      languageName: string;
      problemsSolved: number;
    }>;
    profile: {
      ranking: number;
      reputation: number;
      starRating: number;
    };
  };
}

export interface LeetCodeContestInfo {
  userContestRanking: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
    badge: {
      name: string;
    };
  };
}

export interface LeetCodeCalendar {
  matchedUser: {
    userCalendar: {
      activeYears: number[];
      streak: number;
      totalActiveDays: number;
      submissionCalendar: string;
    };
  };
} 