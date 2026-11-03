// The running spam email dataset used throughout the lecture
export interface Email {
  id: string;
  links: number;
  suspiciousWords: number;
  label: 'spam' | 'not-spam';
  note?: string;
}

export const emailDataset: Email[] = [
  { id: 'E1',  links: 0, suspiciousWords: 1, label: 'not-spam' },
  { id: 'E2',  links: 1, suspiciousWords: 0, label: 'not-spam' },
  { id: 'E3',  links: 1, suspiciousWords: 2, label: 'not-spam' },
  { id: 'E4',  links: 2, suspiciousWords: 1, label: 'not-spam' },
  { id: 'E5',  links: 3, suspiciousWords: 1, label: 'not-spam' },
  { id: 'E6',  links: 5, suspiciousWords: 6, label: 'spam' },
  { id: 'E7',  links: 6, suspiciousWords: 4, label: 'spam' },
  { id: 'E8',  links: 4, suspiciousWords: 7, label: 'spam' },
  { id: 'E9',  links: 7, suspiciousWords: 7, label: 'spam' },
  { id: 'E10', links: 2, suspiciousWords: 2, label: 'spam', note: 'Intentionally placed noise — looks almost normal' },
];

export const newEmails = [
  { id: 'N1', links: 0, suspiciousWords: 0, label: null as null, note: 'Clearly Not Spam' },
  { id: 'N2', links: 6, suspiciousWords: 6, label: null as null, note: 'Clearly Spam' },
  { id: 'N3', links: 2, suspiciousWords: 3, label: null as null, note: 'The Tricky Point — close to noise point E10' },
];

// Student pass/fail dataset for Part 8
export interface Student {
  id: string;
  studyHours: number;
  classesAttended: number;
  result: 'pass' | 'fail';
}

export const studentDataset: Student[] = [
  { id: 'S1', studyHours: 1, classesAttended: 3, result: 'fail' },
  { id: 'S2', studyHours: 2, classesAttended: 5, result: 'fail' },
  { id: 'S3', studyHours: 2, classesAttended: 2, result: 'fail' },
  { id: 'S4', studyHours: 3, classesAttended: 4, result: 'fail' },
  { id: 'S5', studyHours: 6, classesAttended: 8, result: 'pass' },
  { id: 'S6', studyHours: 7, classesAttended: 9, result: 'pass' },
  { id: 'S7', studyHours: 8, classesAttended: 6, result: 'pass' },
  { id: 'S8', studyHours: 5, classesAttended: 9, result: 'pass' },
];

export const newStudents = [
  { id: 'N1', studyHours: 7, classesAttended: 8, note: 'N1' },
  { id: 'N2', studyHours: 1, classesAttended: 9, note: 'N2 — Low study, high attendance' },
  { id: 'N3', studyHours: 6, classesAttended: 3, note: 'N3 — Attendance matters here' },
  { id: 'N4', studyHours: 4, classesAttended: 6, note: 'N4 — Borderline' },
];

// Lesson definitions
export interface Lesson {
  id: number;
  part: number;
  title: string;
  subtitle: string;
  timeRange: string;
  duration: number; // minutes
  iconText: string;
  color: string;
}

export const lessons: Lesson[] = [
  { id: 1, part: 1, title: 'Introduction to ML', subtitle: 'Traditional Programming vs Machine Learning', timeRange: '0–15 min', duration: 15, iconText: '01', color: '#FF2E7E' },
  { id: 2, part: 2, title: 'What is Classification?', subtitle: 'Features, Labels, Datasets & Supervised Learning', timeRange: '15–35 min', duration: 20, iconText: '02', color: '#E31666' },
  { id: 3, part: 3, title: 'K-Nearest Neighbors', subtitle: 'Predicting through local similarity voting', timeRange: '35–55 min', duration: 20, iconText: '03', color: '#10B981' },
  { id: 4, part: 4, title: 'Decision Trees', subtitle: 'Optimal yes/no orthogonal splits and impurity', timeRange: '60–75 min', duration: 15, iconText: '04', color: '#F59E0B' },
  { id: 5, part: 5, title: 'More Algorithms', subtitle: 'Logistic Regression, Naive Bayes & SVM', timeRange: '75–85 min', duration: 10, iconText: '05', color: '#8B5CF6' },
  { id: 6, part: 6, title: 'Model Evaluation', subtitle: 'Accuracy, Precision, Recall & Confusion Matrix', timeRange: '85–103 min', duration: 18, iconText: '06', color: '#EC4899' },
  { id: 7, part: 7, title: 'Overfitting', subtitle: 'Generalization and held-out validation sets', timeRange: '103–110 min', duration: 7, iconText: '07', color: '#FF3B30' },
  { id: 8, part: 8, title: 'Real-World Applications', subtitle: 'Hands-on dataset classification & conclusion', timeRange: '110–120 min', duration: 10, iconText: '08', color: '#FF2E7E' },
];
