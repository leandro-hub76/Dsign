import AsyncStorage from '@react-native-async-storage/async-storage';

export type Lesson = {
  id: string;
  title: string;
  topic: string;
  totalQuestions: number;
};

export type LessonResult = {
  id: string;
  lessonId: string;
  correct: number;
  total: number;
  date: string;
};

const LESSONS_KEY = 'lessons';
const RESULTS_KEY = 'lesson-results';

export async function loadLessons(): Promise<Lesson[]> {
  const saved = await AsyncStorage.getItem(LESSONS_KEY);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

export async function saveLessons(lessons: Lesson[]) {
  await AsyncStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
}

export async function loadResults(): Promise<LessonResult[]> {
  const saved = await AsyncStorage.getItem(RESULTS_KEY);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

export async function saveResults(results: LessonResult[]) {
  await AsyncStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

function formatDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return date.getFullYear() + '-' + month + '-' + day;
}

export function today() {
  return formatDate(new Date());
}

export function calculateStreak(results: LessonResult[]): number {
  const days = results.map((result) => result.date);
  const cursor = new Date();

  // If you haven't practiced today yet, the streak is still alive from yesterday
  if (!days.includes(formatDate(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (days.includes(formatDate(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

const USERS_KEY = 'users';
const SESSION_KEY = 'session';

export async function loadUsers(): Promise<User[]> {
  const saved = await AsyncStorage.getItem(USERS_KEY);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

export async function saveUsers(users: User[]) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function loadSession(): Promise<User | null> {
  const userId = await AsyncStorage.getItem(SESSION_KEY);
  if (userId === null) {
    return null;
  }
  const users = await loadUsers();
  return users.find((user) => user.id === userId) ?? null;
}

export async function saveSession(userId: string) {
  await AsyncStorage.setItem(SESSION_KEY, userId);
}

export async function clearSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}