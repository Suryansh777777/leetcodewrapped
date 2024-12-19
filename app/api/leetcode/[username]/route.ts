import { GraphQLClient } from 'graphql-request';
import { NextResponse } from 'next/server';
import type { LeetCodeUserProfile, LeetCodeContestInfo, LeetCodeCalendar } from '@/lib/types/leetcode';

const LEETCODE_API_URL = 'https://leetcode.com/graphql';

const client = new GraphQLClient(LEETCODE_API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});

const GET_USER_PROFILE = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      languageProblemCount {
        languageName
        problemsSolved
      }
      profile {
        ranking
        reputation
        starRating
      }
    }
  }
`;

const GET_CONTEST_INFO = `
  query userContestRanking($username: String!) {
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
        name
      }
    }
  }
`;

const GET_CALENDAR_INFO = `
  query userCalendar($username: String!) {
    matchedUser(username: $username) {
      userCalendar {
        activeYears
        streak
        totalActiveDays
        submissionCalendar
      }
    }
  }
`;

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const username = (await params).username;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const [profileData, contestData, calendarData] = await Promise.all([
      client.request<LeetCodeUserProfile>(GET_USER_PROFILE, { username }),
      client.request<LeetCodeContestInfo>(GET_CONTEST_INFO, { username }),
      client.request<LeetCodeCalendar>(GET_CALENDAR_INFO, { username })
    ]);

    console.log('Language Data:', profileData.matchedUser.languageProblemCount);

    return NextResponse.json({
      profile: profileData.matchedUser,
      contest: contestData.userContestRanking,
      calendar: calendarData.matchedUser.userCalendar,
    });
  } catch (error) {
    console.error('LeetCode API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch LeetCode data' },
      { status: 500 }
    );
  }
} 