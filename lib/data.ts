// The running datasets used throughout the Teacher's Guide 2 x 60-minute curriculum

export interface Email {
  id: string;
  links: number;
  suspiciousWords: number;
  label: 'spam' | 'not-spam';
  note?: string;
}

// 10-email running scatter plot dataset (Modules 3, 4, 7, 10)
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
  { id: 'E10', links: 2, suspiciousWords: 2, label: 'spam', note: 'Intentionally placed noise point' },
];

export const newEmails = [
  { id: 'N1', links: 0, suspiciousWords: 0, label: null as null, note: 'Clearly Not Spam' },
  { id: 'N2', links: 6, suspiciousWords: 6, label: null as null, note: 'Clearly Spam' },
  { id: 'N3', links: 2, suspiciousWords: 3, label: null as null, note: 'Point P (Probe point)' },
];

// Module 1: Introductory 4-email table
export interface IntroEmail {
  id: string;
  subject: string;
  body: string;
  category: 'Legitimate' | 'Spam';
}

export const module1Emails: IntroEmail[] = [
  {
    id: 'A',
    subject: 'Meeting tomorrow',
    body: 'Hello, our meeting is scheduled for 10 AM. See you there.',
    category: 'Legitimate',
  },
  {
    id: 'B',
    subject: 'YOU WON A PRIZE!!!',
    body: 'Claim your free reward now! Click this link immediately!',
    category: 'Spam',
  },
  {
    id: 'C',
    subject: 'Project update',
    body: 'Please find the updated project report attached.',
    category: 'Legitimate',
  },
  {
    id: 'D',
    subject: 'Limited offer!!!',
    body: 'Congratulations! Get your exclusive offer today.',
    category: 'Spam',
  },
];

// Module 2: 6-email feature matrix dataset (X in R^(6x3), y in {0,1}^6)
export interface FeatureEmail {
  id: string;
  containsLink: number; // x1
  suspiciousWords: number; // x2
  exclamationMarks: number; // x3
  label: 'Not Spam' | 'Spam'; // y
  encoded: 0 | 1;
}

export const module2Emails: FeatureEmail[] = [
  { id: 'A', containsLink: 0, suspiciousWords: 0, exclamationMarks: 0, label: 'Not Spam', encoded: 0 },
  { id: 'B', containsLink: 1, suspiciousWords: 1, exclamationMarks: 3, label: 'Spam', encoded: 1 },
  { id: 'C', containsLink: 0, suspiciousWords: 0, exclamationMarks: 1, label: 'Not Spam', encoded: 0 },
  { id: 'D', containsLink: 1, suspiciousWords: 2, exclamationMarks: 4, label: 'Spam', encoded: 1 },
  { id: 'E', containsLink: 0, suspiciousWords: 1, exclamationMarks: 0, label: 'Not Spam', encoded: 0 },
  { id: 'F', containsLink: 1, suspiciousWords: 3, exclamationMarks: 5, label: 'Spam', encoded: 1 },
];

// Module 3: 5 Nearest Neighbors table for query Point P = (1, 2)
export const module3Neighbors = [
  { neighbor: 'A', distance: 0.8, class: 'Spam' as const },
  { neighbor: 'B', distance: 1.2, class: 'Spam' as const },
  { neighbor: 'C', distance: 1.7, class: 'Not Spam' as const },
  { neighbor: 'D', distance: 2.1, class: 'Spam' as const },
  { neighbor: 'E', distance: 2.5, class: 'Not Spam' as const },
];

// Module 3.8: Held-out quick check emails
export const module3HeldOut = [
  { id: 'W', trueClass: 'Spam', predClass: 'Spam', correct: true },
  { id: 'X', trueClass: 'Not Spam', predClass: 'Not Spam', correct: true },
  { id: 'Y', trueClass: 'Spam', predClass: 'Not Spam', correct: false },
  { id: 'Z', trueClass: 'Not Spam', predClass: 'Not Spam', correct: true },
];

// Module 9: Threshold experiment 5-email dataset
export interface ThresholdEmail {
  id: string;
  pSpam: number;
  trueLabel: 'Spam' | 'Not Spam';
}

export const module9Emails: ThresholdEmail[] = [
  { id: 'A', pSpam: 0.95, trueLabel: 'Spam' },
  { id: 'B', pSpam: 0.83, trueLabel: 'Spam' },
  { id: 'C', pSpam: 0.62, trueLabel: 'Not Spam' },
  { id: 'D', pSpam: 0.48, trueLabel: 'Spam' },
  { id: 'E', pSpam: 0.20, trueLabel: 'Not Spam' },
];

// Lesson definitions matching the 11 modules across 2 sessions and 3 stages
export interface Lesson {
  id: number;
  part: number; // 1 to 11
  module: number;
  session: 1 | 2;
  sessionTitle: string;
  stage: 1 | 2 | 3;
  stageName: string;
  stageQuestion: string;
  title: string;
  subtitle: string;
  timeRange: string;
  duration: number; // minutes
  iconText: string;
  color: string;
  learningGoal: string;
}

export const lessons: Lesson[] = [
  {
    id: 1,
    part: 1,
    module: 1,
    session: 1,
    sessionTitle: 'Understand the problem and how classifiers decide',
    stage: 1,
    stageName: 'Understand the problem',
    stageQuestion: 'Why can the same email have a feature vector but no label at prediction time?',
    title: 'Discovering Classification',
    subtitle: 'From Human Intuition to Formal ML Problem Definition',
    timeRange: '0–8 min',
    duration: 8,
    iconText: '01',
    color: '#FF2E7E',
    learningGoal: 'Students see that classification is a natural, human task and can describe it formally.',
  },
  {
    id: 2,
    part: 2,
    module: 2,
    session: 1,
    sessionTitle: 'Understand the problem and how classifiers decide',
    stage: 1,
    stageName: 'Understand the problem',
    stageQuestion: 'Why can the same email have a feature vector but no label at prediction time?',
    title: 'Understanding the Data',
    subtitle: 'Features, Labels, Supervised Learning & The ML Workflow',
    timeRange: '8–18 min',
    duration: 10,
    iconText: '02',
    color: '#E31666',
    learningGoal: 'Students understand exactly what an algorithm receives before learning how it works.',
  },
  {
    id: 3,
    part: 3,
    module: 3,
    session: 1,
    sessionTitle: 'Understand the problem and how classifiers decide',
    stage: 2,
    stageName: 'Understand how classifiers work',
    stageQuestion: 'Why could a new observation receive a different prediction when we change K, even though the training data has not changed?',
    title: 'K-Nearest Neighbors (KNN)',
    subtitle: 'Distance Metrics, Voting, Feature Scaling & First Accuracy Check',
    timeRange: '18–38 min',
    duration: 20,
    iconText: '03',
    color: '#10B981',
    learningGoal: 'Students predict a class from nearby labeled points, explain how K, distance and scaling change the result, and run a first accuracy check.',
  },
  {
    id: 4,
    part: 4,
    module: 4,
    session: 1,
    sessionTitle: 'Understand the problem and how classifiers decide',
    stage: 2,
    stageName: 'Understand how classifiers work',
    stageQuestion: 'Why could a new observation receive a different prediction when we change K, even though the training data has not changed?',
    title: 'Decision Trees',
    subtitle: 'Hierarchical Splits, Gini Impurity, Entropy & Overfitting',
    timeRange: '38–50 min',
    duration: 12,
    iconText: '04',
    color: '#F59E0B',
    learningGoal: 'Students explain how a tree chooses its questions using impurity, and relate depth to overfitting.',
  },
  {
    id: 5,
    part: 5,
    module: 5,
    session: 1,
    sessionTitle: 'Understand the problem and how classifiers decide',
    stage: 2,
    stageName: 'Understand how classifiers work',
    stageQuestion: 'Why could a new observation receive a different prediction when we change K, even though the training data has not changed?',
    title: 'Logistic Regression',
    subtitle: 'Linear Scores, Sigmoid Function & Classification Thresholds',
    timeRange: '50–60 min',
    duration: 10,
    iconText: '05',
    color: '#8B5CF6',
    learningGoal: 'Students distinguish a predicted probability from a predicted class and explain the role of the threshold.',
  },
  {
    id: 6,
    part: 6,
    module: 6,
    session: 2,
    sessionTitle: 'Understand whether a classifier works',
    stage: 3,
    stageName: 'Understand whether a classifier works',
    stageQuestion: 'A model has 98% accuracy on a dataset with 2% spam. Is it good? What would you check next?',
    title: 'How Do We Know a Classifier Is Good?',
    subtitle: 'Train / Validation / Test Sets and the Confusion Matrix',
    timeRange: '0–10 min',
    duration: 10,
    iconText: '06',
    color: '#EC4899',
    learningGoal: 'Students separate training from evaluation and read a confusion matrix.',
  },
  {
    id: 7,
    part: 7,
    module: 7,
    session: 2,
    sessionTitle: 'Understand whether a classifier works',
    stage: 3,
    stageName: 'Understand whether a classifier works',
    stageQuestion: 'A model has 98% accuracy on a dataset with 2% spam. Is it good? What would you check next?',
    title: 'Overfitting and Generalization',
    subtitle: 'Memorization vs. Learning, Diagnostic Curves & Prevention',
    timeRange: '10–20 min',
    duration: 10,
    iconText: '07',
    color: '#FF3B30',
    learningGoal: 'Students distinguish memorizing from learning and know how to detect and reduce overfitting.',
  },
  {
    id: 8,
    part: 8,
    module: 8,
    session: 2,
    sessionTitle: 'Understand whether a classifier works',
    stage: 3,
    stageName: 'Understand whether a classifier works',
    stageQuestion: 'A model has 98% accuracy on a dataset with 2% spam. Is it good? What would you check next?',
    title: 'Understanding Evaluation Metrics',
    subtitle: 'Accuracy, Precision, Recall, F1 & The Imbalanced Data Trap',
    timeRange: '20–32 min',
    duration: 12,
    iconText: '08',
    color: '#3B82F6',
    learningGoal: 'Students compute the four core metrics and explain why accuracy alone is insufficient.',
  },
  {
    id: 9,
    part: 9,
    module: 9,
    session: 2,
    sessionTitle: 'Understand whether a classifier works',
    stage: 3,
    stageName: 'Understand whether a classifier works',
    stageQuestion: 'A model has 98% accuracy on a dataset with 2% spam. Is it good? What would you check next?',
    title: 'Thresholds and Their Effect',
    subtitle: 'Trading Precision Against Recall Without Retraining & ROC/PR Curves',
    timeRange: '32–42 min',
    duration: 10,
    iconText: '09',
    color: '#14B8A6',
    learningGoal: 'Students predict and explain how moving the threshold trades precision against recall without retraining.',
  },
  {
    id: 10,
    part: 10,
    module: 10,
    session: 2,
    sessionTitle: 'Understand whether a classifier works',
    stage: 3,
    stageName: 'Understand whether a classifier works',
    stageQuestion: 'A model has 98% accuracy on a dataset with 2% spam. Is it good? What would you check next?',
    title: 'Comparing Classification Algorithms',
    subtitle: 'KNN, Trees, Logistic Regression, Naive Bayes & Support Vector Machines',
    timeRange: '42–50 min',
    duration: 8,
    iconText: '10',
    color: '#6366F1',
    learningGoal: 'Students compare the algorithms they have learned using evaluation tools, and see that there is no universally best choice.',
  },
  {
    id: 11,
    part: 11,
    module: 11,
    session: 2,
    sessionTitle: 'Understand whether a classifier works',
    stage: 3,
    stageName: 'Understand whether a classifier works',
    stageQuestion: 'A model has 98% accuracy on a dataset with 2% spam. Is it good? What would you check next?',
    title: 'Final Challenge',
    subtitle: 'End-to-End System Design, Rubric Assessment & Capstone Synthesis',
    timeRange: '50–60 min',
    duration: 10,
    iconText: '11',
    color: '#FF2E7E',
    learningGoal: 'Students integrate the whole lesson in one comprehensive real-world design problem.',
  },
];

// Stages definition for Part 4
export const stages = [
  {
    number: 1,
    title: 'Stage 1 · Understand the problem',
    session: 'Session 1 (0–18 min)',
    modules: [1, 2],
    description: 'What is classification · Supervised learning · Features and labels · Binary vs Multiclass vs Multilabel · Training vs Prediction',
    checkpointQuestion: 'Why can the same email have a feature vector but no label at prediction time?',
    checkpointAnswer: 'During training, both the features X and true ground-truth label y are provided to learn pattern f. At prediction time, we receive a fresh unclassified email with measured features X, but its true class label y is unknown — that is the exact value the trained classifier f(x) must predict.',
  },
  {
    number: 2,
    title: 'Stage 2 · Understand how classifiers work',
    session: 'Session 1 (18–60 min)',
    modules: [3, 4, 5],
    description: 'KNN (with first accuracy check) · Decision Trees (Gini impurity) · Logistic Regression (linear scores, sigmoid, threshold)',
    checkpointQuestion: 'Why could a new observation receive a different prediction when we change K, even though the training data has not changed?',
    checkpointAnswer: 'With small K (e.g. K=1), prediction relies solely on the single closest point, which may be an outlier or noise. Increasing K expands the local neighborhood radius to include more surrounding points, allowing broader neighborhood votes to overrule a local noise point.',
  },
  {
    number: 3,
    title: 'Stage 3 · Understand whether a classifier works',
    session: 'Session 2 (0–60 min)',
    modules: [6, 7, 8, 9, 10, 11],
    description: 'Train/Val/Test splits · Confusion Matrix · Overfitting curves · Precision, Recall, F1 · Threshold sweeps · Algorithm Comparison · Final Challenge',
    checkpointQuestion: 'A model has 98% accuracy on a dataset with 2% spam. Is it good? What would you check next?',
    checkpointAnswer: 'Not necessarily! A naive "dummy baseline" that predicts every email is Legitimate scores 98% accuracy while catching 0% of spam (Recall = 0%). Next, inspect the Confusion Matrix, calculate Spam Recall and Precision, and compare against the majority-class baseline.',
  },
];

// Appendices data
export const formulaSheet = [
  { concept: 'Euclidean distance', formula: 'd(A, B) = \\sqrt{\\sum_{j=1}^d (A_j - B_j)^2}', desc: 'Geometric straight-line distance in d-dimensional feature space' },
  { concept: 'Standardization', formula: 'z = \\frac{x - \\mu}{\\sigma}', desc: 'Rescales features to zero mean and unit variance using training statistics' },
  { concept: 'KNN prediction', formula: '\\hat{y} = \\text{mode}(y_1, y_2, \\dots, y_K)', desc: 'Majority class among the K nearest training observations' },
  { concept: 'Gini impurity', formula: '\\text{Gini} = 1 - \\sum_{k=1}^C p_k^2', desc: 'Measures class heterogeneity in a split (0 = pure, 0.5 = 50/50 mix)' },
  { concept: 'Entropy', formula: 'H = -\\sum_{k=1}^C p_k \\log_2 p_k', desc: 'Information theoretic disorder (0 = pure, 1 = 50/50 mix)' },
  { concept: 'Sigmoid activation', formula: '\\sigma(z) = \\frac{1}{1 + e^{-z}}', desc: 'Squeezes linear score z into a calibrated probability in (0, 1)' },
  { concept: 'Linear score', formula: 'z = w_0 + w_1 x_1 + w_2 x_2 + \\dots + w_d x_d', desc: 'Dot product of feature weights and observation attributes plus bias' },
  { concept: "Bayes' theorem", formula: 'P(y \\mid X) = \\frac{P(X \\mid y) P(y)}{P(X)}', desc: 'Posterior probability given class prior and feature likelihoods' },
  { concept: 'Accuracy', formula: '\\frac{TP + TN}{TP + TN + FP + FN}', desc: 'Fraction of total predictions that were correct' },
  { concept: 'Precision', formula: '\\frac{TP}{TP + FP}', desc: 'Of all predicted positives, what fraction was actually positive?' },
  { concept: 'Recall (Sensitivity)', formula: '\\frac{TP}{TP + FN}', desc: 'Of all actual positive instances, what fraction did the model find?' },
  { concept: 'F1-score', formula: '2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2TP}{2TP + FP + FN}', desc: 'Harmonic mean balancing precision and recall' },
];

export const glossary = [
  { term: 'Classifier', meaning: 'A learned function f that maps feature vectors x to a discrete class category y.' },
  { term: 'Feature', meaning: 'An input variable or numeric property describing an observation (e.g. link count, email length).' },
  { term: 'Label / Target', meaning: 'The ground-truth class outcome we want the model to learn to predict (e.g. Spam / Not Spam).' },
  { term: 'Hyperparameter', meaning: 'A configuration setting chosen before training begins (e.g. K in KNN, max depth in trees, decision threshold).' },
  { term: 'Decision Boundary', meaning: 'The geometric boundary or surface in feature space where the predicted class flips from one category to another.' },
  { term: 'Classification Threshold', meaning: 'The numerical cutoff probability that turns a continuous predicted probability score into a discrete class prediction.' },
  { term: 'Overfitting', meaning: 'When a model fits training data too closely, including accidental noise, leading to poor generalization on unseen data.' },
  { term: 'Generalization', meaning: 'The critical ability of a model to make accurate predictions on new, unseen observations from the true data distribution.' },
  { term: 'Data Leakage', meaning: 'When information outside the training set (e.g. test set statistics, target values) inadvertently influences training.' },
  { term: 'Baseline', meaning: 'A simple trivial benchmark (e.g. always predict majority class) that any useful ML model must comfortably outperform.' },
  { term: 'Class Imbalance', meaning: 'A scenario where one class is dramatically more frequent than another (e.g. 99% legitimate, 1% fraudulent transactions).' },
  { term: 'Stratified Splitting', meaning: 'Partitioning data such that the train, validation, and test subsets maintain the identical class proportions as the overall dataset.' },
];

export const misconceptions = [
  { myth: 'High accuracy means a good model.', correction: 'Accuracy is only informative relative to class balance. On 99:1 imbalanced data, a dummy model achieves 99% accuracy while doing nothing useful. Always compare with a baseline and evaluate Precision & Recall.' },
  { myth: 'A more complex decision boundary is always better.', correction: 'A boundary that bends around individual noisy data points memorizes noise and suffers from severe overfitting. Smoother, simpler boundaries often generalize far better.' },
  { myth: 'Logistic regression predicts numbers, so it is regression.', correction: 'Logistic regression models a continuous probability and applies a threshold to classify discrete categories; it is strictly a classification algorithm.' },
  { myth: "The model's probability is the final answer.", correction: 'The raw output is only a score or probability. The final class assignment depends entirely on the chosen decision threshold.' },
  { myth: 'KNN learns a mathematical formula.', correction: 'KNN is a lazy learner: it stores raw training data points in memory and computes distance queries on-the-fly at prediction time.' },
  { myth: 'I can tune hyperparameters on the test set a little bit.', correction: 'Every time you inspect test set performance to make decisions, you contaminate the test set with indirect leakage. Hyperparameters must only be tuned on validation data.' },
  { myth: 'Scale the whole dataset first, then split into train and test.', correction: 'Fitting a scaler on the entire dataset leaks test set distribution parameters into training. Always fit scalers on training data only!' },
  { myth: 'Positive always means a "good" or desirable outcome.', correction: 'In machine learning evaluation, "positive" simply denotes the primary class event we are attempting to detect (e.g. Spam, Fraud, Disease).' },
];

export const scikitLearnCode = `from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, classification_report

# 1. Stratified split keeps the Spam / Not Spam proportions identical
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# 2. Scaler is fitted on training data only (inside pipeline to prevent leakage)
knn = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5))
knn.fit(X_train, y_train)
y_pred = knn.predict(X_test)

print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\\nClassification Report:")
print(classification_report(y_test, y_pred))

# 3. Threshold experiment with Logistic Regression
logreg = make_pipeline(StandardScaler(), LogisticRegression()).fit(X_train, y_train)
proba = logreg.predict_proba(X_test)[:, 1]  # P(Spam | x)
y_pred_08 = (proba >= 0.8).astype(int)      # New decision rule, same underlying model
`;
