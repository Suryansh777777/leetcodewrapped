export interface LeetCodeUserProfile {
  matchedUser: {
    username: string;
    submitStats: {
      acSubmissionNum: {
        difficulty: string;
        count: number;
        submissions: number;
      }[];
    };
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

interface CalendarBadge {
  id: string;
  name: string;
  icon: string;
}

export interface LeetCodeCalendar {
  matchedUser: {
    userCalendar: {
      activeYears: number[];
      streak: number;
      totalActiveDays: number;
      dccBadges: CalendarBadge[];
      submissionCalendar: string;
    };
  };
} 