// Comprehensive Data Module for "Classification in Machine Learning"
// Preserving all datasets, running examples, slides, parts, formulas, glossary, and citations.

export interface Email {
  id: string;
  links: number;
  suspiciousWords: number;
  label: 'spam' | 'not-spam';
  note?: string;
}

// 10-email running scatter plot dataset (for interactive playground & visualization)
export const emailDataset: Email[] = [
  { id: 'E1', links: 0, suspiciousWords: 1, label: 'not-spam' },
  { id: 'E2', links: 1, suspiciousWords: 0, label: 'not-spam' },
  { id: 'E3', links: 1, suspiciousWords: 2, label: 'not-spam' },
  { id: 'E4', links: 2, suspiciousWords: 1, label: 'not-spam' },
  { id: 'E5', links: 3, suspiciousWords: 1, label: 'not-spam' },
  { id: 'E6', links: 5, suspiciousWords: 6, label: 'spam' },
  { id: 'E7', links: 6, suspiciousWords: 4, label: 'spam' },
  { id: 'E8', links: 4, suspiciousWords: 7, label: 'spam' },
  { id: 'E9', links: 7, suspiciousWords: 7, label: 'spam' },
  { id: 'E10', links: 2, suspiciousWords: 2, label: 'spam', note: 'Intentionally placed noise point' },
];

export const newEmails = [
  { id: 'N1', links: 0, suspiciousWords: 0, label: null as null, note: 'Clearly Not Spam' },
  { id: 'N2', links: 6, suspiciousWords: 6, label: null as null, note: 'Clearly Spam' },
  { id: 'N3', links: 7, suspiciousWords: 5, label: null as null, note: 'Slide 11 Probe Point (Links: 7, Words: 5)' },
];

// Course Presentation Header Metadata
export const courseMetadata = {
  title: 'Classification in Machine Learning',
  subtitle: 'From understanding the problem to understanding how machines learn to assign categories.',
  presenter: 'Boudjira Imen Nour El Houda',
  level: 'Computer Science · Introductory level · Supervised learning',
  referenceTitle: 'Module 00: Introduction to Machine Learning | CMSC 173',
  referenceImageUrl:
    'https://images.openai.com/static-rsc-4/ml76Rrd24c1BEYRGDBobShWAPRgENPN1-_zcSOr4kM4prMmkafVNFsZ-N9r5isxaFts5DWsfH2U4k21nco5nCPazzzUpCBeciY8KNtkPGiyYi3cW28yWcVbQDZDfsM1-i0Cxh8ke854QY1OH0QozTkuosiwO6RW7pysC2AHU43Y?purpose=inline',
  referencePortalUrl:
    'https://portal.latarak.com/static/presentations/cmsc173/module-0/index.html?utm_source=chatgpt.com',
};

// 5 Parts Definition
export interface CoursePart {
  id: number;
  partNumber: string; // 'Part I', etc.
  title: string;
  subtitle: string;
  slidesRange: string;
  slidesCount: number;
  slideStart: number;
  slideEnd: number;
  color: string;
  description: string;
}

export const courseParts: CoursePart[] = [
  {
    id: 1,
    partNumber: 'Part I',
    title: 'Understanding the classification problem',
    subtitle: 'From human decision making to formal mathematical representation and supervised learning.',
    slidesRange: 'Slides 1–11',
    slidesCount: 11,
    slideStart: 1,
    slideEnd: 11,
    color: '#FF2E7E',
    description: 'Covers decision intuition, traditional programming vs ML, mathematical formulation f: X -> C, supervised learning, applications, classification vs regression, problem types, feature matrix X, and training to prediction.',
  },
  {
    id: 2,
    partNumber: 'Part II',
    title: 'Understanding how classification decisions are made',
    subtitle: 'Geometric feature spaces, decision boundaries, class overlap, probabilities, and core algorithms.',
    slidesRange: 'Slides 12–17',
    slidesCount: 6,
    slideStart: 12,
    slideEnd: 17,
    color: '#8B5CF6',
    description: 'Covers decision boundaries in 2D, d-dimensional feature space, noise and class overlap, probability estimation P(y|x), introducing KNN, Decision Trees, Logistic Regression, and model suitability tradeoffs.',
  },
  {
    id: 3,
    partNumber: 'Part III',
    title: 'Understanding the complete learning workflow',
    subtitle: 'The 7-stage ML project lifecycle, overfitting, memorization vs generalization, and class imbalance.',
    slidesRange: 'Slides 18–21',
    slidesCount: 4,
    slideStart: 18,
    slideEnd: 21,
    color: '#10B981',
    description: 'Covers the end-to-end 7-stage ML pipeline, why training set evaluation fails, overfitting, baseline performance metrics, and the severe trap of imbalanced datasets.',
  },
  {
    id: 4,
    partNumber: 'Part IV',
    title: 'Making and evaluating classification decisions',
    subtitle: 'Classification thresholds, error types (TP, FP, FN, TN), the Confusion Matrix, and metrics calculation.',
    slidesRange: 'Slides 22–26',
    slidesCount: 5,
    slideStart: 22,
    slideEnd: 26,
    color: '#F59E0B',
    description: 'Covers decision thresholds t, error trade-offs, confusion matrix construction (100 emails), step-by-step calculation of Accuracy, Precision, Recall, and F1-score, and distribution drift over time.',
  },
  {
    id: 5,
    partNumber: 'Part V',
    title: 'Consolidating the knowledge',
    subtitle: 'End-to-end recap, 10 core terminology takeaways, and an interactive 10-question classroom challenge.',
    slidesRange: 'Slides 27–29',
    slidesCount: 3,
    slideStart: 27,
    slideEnd: 29,
    color: '#EC4899',
    description: 'Puts everything together through the complete spam classification life cycle, summarizes the 10 vital memory concepts, and presents the final interactive university student-support scenario.',
  },
];

// 29 Slides Structure
export interface SlideMetadata {
  id: number;
  partId: number;
  partName: string;
  slideNumber: number;
  title: string;
  subtitle?: string;
  hasInteractiveVisual: boolean;
  hasFormulas: boolean;
  hasExternalImage: boolean;
}

export const courseSlides: SlideMetadata[] = [
  // Part 1
  { id: 1, partId: 1, partName: 'Part I', slideNumber: 1, title: 'Can computers make decisions?', hasInteractiveVisual: true, hasFormulas: false, hasExternalImage: false },
  { id: 2, partId: 1, partName: 'Part I', slideNumber: 2, title: 'What is Machine Learning?', hasInteractiveVisual: true, hasFormulas: false, hasExternalImage: false },
  { id: 3, partId: 1, partName: 'Part I', slideNumber: 3, title: 'What is classification?', hasInteractiveVisual: true, hasFormulas: true, hasExternalImage: false },
  { id: 4, partId: 1, partName: 'Part I', slideNumber: 4, title: 'Classification is a supervised learning task', hasInteractiveVisual: false, hasFormulas: false, hasExternalImage: false },
  { id: 5, partId: 1, partName: 'Part I', slideNumber: 5, title: 'Where is classification used?', hasInteractiveVisual: false, hasFormulas: false, hasExternalImage: true },
  { id: 6, partId: 1, partName: 'Part I', slideNumber: 6, title: 'Classification vs. Regression', hasInteractiveVisual: false, hasFormulas: true, hasExternalImage: false },
  { id: 7, partId: 1, partName: 'Part I', slideNumber: 7, title: 'Types of classification problems', hasInteractiveVisual: false, hasFormulas: true, hasExternalImage: true },
  { id: 8, partId: 1, partName: 'Part I', slideNumber: 8, title: 'What does a classification dataset look like?', hasInteractiveVisual: false, hasFormulas: true, hasExternalImage: false },
  { id: 9, partId: 1, partName: 'Part I', slideNumber: 9, title: 'Representing a dataset mathematically', hasInteractiveVisual: true, hasFormulas: true, hasExternalImage: false },
  { id: 10, partId: 1, partName: 'Part I', slideNumber: 10, title: 'What happens when we train a classifier?', hasInteractiveVisual: false, hasFormulas: true, hasExternalImage: false },
  { id: 11, partId: 1, partName: 'Part I', slideNumber: 11, title: 'From training to prediction', hasInteractiveVisual: false, hasFormulas: true, hasExternalImage: false },

  // Part 2
  { id: 12, partId: 2, partName: 'Part II', slideNumber: 12, title: 'How does a classifier distinguish between classes?', hasInteractiveVisual: true, hasFormulas: false, hasExternalImage: true },
  { id: 13, partId: 2, partName: 'Part II', slideNumber: 13, title: 'What is a feature space?', hasInteractiveVisual: true, hasFormulas: true, hasExternalImage: true },
  { id: 14, partId: 2, partName: 'Part II', slideNumber: 14, title: 'What happens when classes overlap?', hasInteractiveVisual: false, hasFormulas: false, hasExternalImage: true },
  { id: 15, partId: 2, partName: 'Part II', slideNumber: 15, title: 'Does a classifier always know its answer with certainty?', hasInteractiveVisual: false, hasFormulas: true, hasExternalImage: false },
  { id: 16, partId: 2, partName: 'Part II', slideNumber: 16, title: 'Introducing the classification algorithms', hasInteractiveVisual: false, hasFormulas: false, hasExternalImage: true },
  { id: 17, partId: 2, partName: 'Part II', slideNumber: 17, title: 'Are all classification models equally suitable?', hasInteractiveVisual: false, hasFormulas: false, hasExternalImage: false },

  // Part 3
  { id: 18, partId: 3, partName: 'Part III', slideNumber: 18, title: 'The end-to-end classification workflow', hasInteractiveVisual: true, hasFormulas: false, hasExternalImage: false },
  { id: 19, partId: 3, partName: 'Part III', slideNumber: 19, title: "Why can't we evaluate a model using only its training data?", hasInteractiveVisual: false, hasFormulas: false, hasExternalImage: true },
  { id: 20, partId: 3, partName: 'Part III', slideNumber: 20, title: 'How do we measure classification performance?', hasInteractiveVisual: false, hasFormulas: false, hasExternalImage: false },
  { id: 21, partId: 3, partName: 'Part III', slideNumber: 21, title: 'An important challenge: imbalanced datasets', hasInteractiveVisual: false, hasFormulas: true, hasExternalImage: false },

  // Part 4
  { id: 22, partId: 4, partName: 'Part IV', slideNumber: 22, title: 'What is a classification threshold?', hasInteractiveVisual: true, hasFormulas: true, hasExternalImage: false },
  { id: 23, partId: 4, partName: 'Part IV', slideNumber: 23, title: 'Understanding classification errors', hasInteractiveVisual: false, hasFormulas: false, hasExternalImage: true },
  { id: 24, partId: 4, partName: 'Part IV', slideNumber: 24, title: 'The confusion matrix', hasInteractiveVisual: true, hasFormulas: false, hasExternalImage: false },
  { id: 25, partId: 4, partName: 'Part IV', slideNumber: 25, title: 'Classification evaluation metrics', hasInteractiveVisual: true, hasFormulas: true, hasExternalImage: false },
  { id: 26, partId: 4, partName: 'Part IV', slideNumber: 26, title: 'Classification is not always perfect', hasInteractiveVisual: false, hasFormulas: false, hasExternalImage: false },

  // Part 5
  { id: 27, partId: 5, partName: 'Part V', slideNumber: 27, title: 'Putting everything together', hasInteractiveVisual: false, hasFormulas: false, hasExternalImage: false },
  { id: 28, partId: 5, partName: 'Part V', slideNumber: 28, title: 'What should you remember?', hasInteractiveVisual: false, hasFormulas: false, hasExternalImage: false },
  { id: 29, partId: 5, partName: 'Part V', slideNumber: 29, title: 'Final classroom challenge', hasInteractiveVisual: true, hasFormulas: false, hasExternalImage: false },
];

// Preserving legacy `lessons` array mapped to the 5 Parts so existing routes /lesson/[id] remain valid
export interface Lesson {
  id: number;
  part: number;
  module: number;
  session: 1 | 2;
  sessionTitle: string;
  stage: 1 | 2 | 3;
  stageName: string;
  stageQuestion: string;
  title: string;
  subtitle: string;
  timeRange: string;
  duration: number;
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
    sessionTitle: 'Part I · Understanding the classification problem',
    stage: 1,
    stageName: 'Understanding the problem',
    stageQuestion: 'Why can the same email have a feature vector but no label at prediction time?',
    title: 'Part I — Understanding the classification problem',
    subtitle: 'Slides 1–11: Decisions, Machine Learning, Mathematical Formulation, Datasets & Inference',
    timeRange: 'Slides 1–11',
    duration: 25,
    iconText: 'P1',
    color: '#FF2E7E',
    learningGoal: 'Students understand why computers make decisions via examples, define classification formally as f: X -> C, and represent data in matrix-vector format.',
  },
  {
    id: 2,
    part: 2,
    module: 2,
    session: 1,
    sessionTitle: 'Part II · How classification decisions are made',
    stage: 2,
    stageName: 'How classifiers decide',
    stageQuestion: 'Why is a decision boundary a geometric partition of the feature space rather than a physical line in the code?',
    title: 'Part II — Understanding how decisions are made',
    subtitle: 'Slides 12–17: Feature Space, Decision Boundaries, Class Overlap, Probabilities & Algorithms',
    timeRange: 'Slides 12–17',
    duration: 20,
    iconText: 'P2',
    color: '#8B5CF6',
    learningGoal: 'Students visualize decision boundaries in 2D and d-dimensional spaces, inspect class overlap and noise, understand probability scores, and compare KNN, Trees, and Logistic Regression.',
  },
  {
    id: 3,
    part: 3,
    module: 3,
    session: 1,
    sessionTitle: 'Part III · Complete learning workflow',
    stage: 2,
    stageName: 'The Machine Learning Lifecycle',
    stageQuestion: 'Why is 99% accuracy on an imbalanced dataset misleading?',
    title: 'Part III — The complete learning workflow',
    subtitle: 'Slides 18–21: 7-Stage End-to-End Pipeline, Overfitting, Generalization & Imbalanced Data',
    timeRange: 'Slides 18–21',
    duration: 15,
    iconText: 'P3',
    color: '#10B981',
    learningGoal: 'Students navigate the 7 stages of a classification project, explain why training data cannot measure generalization, and discover the pitfall of imbalanced classes.',
  },
  {
    id: 4,
    part: 4,
    module: 4,
    session: 2,
    sessionTitle: 'Part IV · Making & evaluating decisions',
    stage: 3,
    stageName: 'Evaluation & Metrics',
    stageQuestion: 'How does altering the decision threshold shift the trade-off between Precision and Recall?',
    title: 'Part IV — Making & evaluating decisions',
    subtitle: 'Slides 22–26: Thresholds, Errors (TP/FP/FN/TN), Confusion Matrix & Evaluation Metrics',
    timeRange: 'Slides 22–26',
    duration: 25,
    iconText: 'P4',
    color: '#F59E0B',
    learningGoal: 'Students set decision thresholds, map error types to real-world impacts, construct the confusion matrix, and compute Accuracy, Precision, Recall, and F1-score.',
  },
  {
    id: 5,
    part: 5,
    module: 5,
    session: 2,
    sessionTitle: 'Part V · Consolidating the knowledge',
    stage: 3,
    stageName: 'Capstone & Challenge',
    stageQuestion: 'How does the end-to-end classification pipeline apply to predicting student graduation outcomes?',
    title: 'Part V — Consolidating the knowledge',
    subtitle: 'Slides 27–29: End-to-End Summary, 10 Core Memory Concepts & Final Classroom Challenge',
    timeRange: 'Slides 27–29',
    duration: 15,
    iconText: 'P5',
    color: '#EC4899',
    learningGoal: 'Students synthesize all learning by walking through the complete spam system life cycle, memorizing the 10 fundamental concepts, and solving a 10-question university scenario challenge.',
  },
];

// Preserving stages for UI compatibility
export const stages = [
  {
    number: 1,
    title: 'Stage 1 · Understanding the classification problem',
    session: 'Part I (Slides 1–11)',
    modules: [1],
    description: 'Can computers make decisions · Traditional programming vs ML · Supervised formulation f: X -> C · Applications · Classification vs Regression · Feature matrix X and labels y.',
    checkpointQuestion: 'Why can the same email have a feature vector but no label at prediction time?',
    checkpointAnswer: 'During training, both the features X and true ground-truth label y are provided to learn pattern f. At prediction time, we receive a fresh unclassified email with measured features X, but its true class label y is unknown — that is the exact value the trained classifier f(x) must predict.',
  },
  {
    number: 2,
    title: 'Stage 2 · How classification decisions are made & The Workflow',
    session: 'Parts II & III (Slides 12–21)',
    modules: [2, 3],
    description: 'Decision boundaries · Feature spaces · Class overlap · Probabilities · Introducing KNN, Decision Trees, Logistic Regression · The 7-stage ML workflow · Overfitting & Imbalance.',
    checkpointQuestion: 'Why could a new observation receive a different prediction when we change the decision threshold or boundary, even though the trained model has not changed?',
    checkpointAnswer: 'The trained model outputs a conditional probability P(y=1|x). The final class decision is governed by the threshold t: if P >= t predict positive, else negative. Moving t shifts the decision boundary without modifying model parameters.',
  },
  {
    number: 3,
    title: 'Stage 3 · Evaluation, Metrics & Classroom Challenge',
    session: 'Parts IV & V (Slides 22–29)',
    modules: [4, 5],
    description: 'Decision thresholds · TP, FP, FN, TN · Confusion matrix · Accuracy, Precision, Recall, F1 formulas · Data distribution shift · 10 core concepts · Capstone university challenge.',
    checkpointQuestion: 'A model has 99% accuracy on a dataset with 1% fraud. Is it good? What would you check next?',
    checkpointAnswer: 'No! A naive "dummy baseline" predicting every transaction as Legitimate scores 99% accuracy while catching 0% of fraud (Recall = 0%). Inspect the Confusion Matrix, calculate Fraud Recall and Precision, and evaluate cost-weighted errors.',
  },
];

// Formula Sheet with KaTeX-compatible strings
export const formulaSheet = [
  {
    concept: 'Classification Function',
    formula: 'f: X \\rightarrow C',
    desc: 'The model learns a mapping from the input feature space X to discrete categorical classes C.',
  },
  {
    concept: 'Binary Classes Set',
    formula: 'C = \\{\\text{Spam}, \\text{Not Spam}\\}',
    desc: 'For binary spam classification, C contains exactly two mutually exclusive categories.',
  },
  {
    concept: 'Prediction (y-hat)',
    formula: '\\hat{y} = f(x)',
    desc: 'The predicted category y-hat produced when the learned model f receives feature vector x.',
  },
  {
    concept: 'Regression Function',
    formula: 'f: X \\rightarrow \\mathbb{R}',
    desc: 'In contrast to classification, regression maps feature space X to continuous real numbers.',
  },
  {
    concept: 'Binary Classes Formulation',
    formula: 'C = \\{c_0, c_1\\}',
    desc: 'Binary classification with class encodings typically represented as 0 and 1.',
  },
  {
    concept: 'Multiclass Formulation',
    formula: 'C = \\{c_1, c_2, \\dots, c_k\\}, \\quad k > 2',
    desc: 'Multiclass classification where each observation is assigned to exactly one of k categories.',
  },
  {
    concept: 'Multilabel Formulation',
    formula: 'Y = \\{\\text{Beach}, \\text{Person}, \\text{Dog}\\}',
    desc: 'Multilabel classification where multiple labels can simultaneously apply to one observation.',
  },
  {
    concept: 'Feature Vector',
    formula: 'x_1 = \\begin{bmatrix} 5 \\\\ 4 \\end{bmatrix}',
    desc: 'Numerical representation of an observation’s measured properties (e.g. links and words).',
  },
  {
    concept: 'Feature Matrix X',
    formula: 'X = \\begin{bmatrix} x_{11} & x_{12} & \\cdots & x_{1d} \\\\ x_{21} & x_{22} & \\cdots & x_{2d} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ x_{n1} & x_{n2} & \\cdots & x_{nd} \\end{bmatrix} \\in \\mathbb{R}^{n \\times d}',
    desc: 'Matrix holding n observations across d measurable feature dimensions.',
  },
  {
    concept: 'Supervised Dataset Pair',
    formula: 'D = \\{(x_i, y_i)\\}_{i=1}^{n}',
    desc: 'Supervised classification dataset composed of input feature vectors x_i and verified labels y_i.',
  },
  {
    concept: 'Conditional Probability',
    formula: 'P(\\text{Spam} \\mid x) = 0.85, \\quad P(\\text{Not Spam} \\mid x) = 0.15',
    desc: 'Estimated probabilities conditioned on observation characteristics x.',
  },
  {
    concept: 'Decision Threshold Rule',
    formula: '\\hat{y} = \\begin{cases} 1 & \\text{if } P(y=1 \\mid x) \\ge t \\\\ 0 & \\text{otherwise} \\end{cases}',
    desc: 'Converts a continuous predicted probability score into a discrete class prediction using cutoff t.',
  },
  {
    concept: 'Classification Accuracy',
    formula: 'Accuracy = \\frac{TP + TN}{TP + TN + FP + FN} = \\frac{15 + 70}{100} = 85\\%',
    desc: 'Proportion of all predictions that were correct across both positive and negative classes.',
  },
  {
    concept: 'Precision',
    formula: 'Precision = \\frac{TP}{TP + FP} = \\frac{15}{15 + 10} = 60\\%',
    desc: 'Among observations predicted as positive, the proportion that are genuinely positive.',
  },
  {
    concept: 'Recall (Sensitivity)',
    formula: 'Recall = \\frac{TP}{TP + FN} = \\frac{15}{15 + 5} = 75\\%',
    desc: 'Among actual positive observations in the data, the proportion successfully identified.',
  },
  {
    concept: 'F1-Score',
    formula: 'F_1 = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}} = 2 \\times \\frac{0.60 \\times 0.75}{0.60 + 0.75} \\approx 66.67\\%',
    desc: 'Harmonic mean balancing precision and recall without being inflated by extreme values.',
  },
];

// 10 Core Terminology Concepts from Slide 28
export const glossary = [
  {
    term: 'Observation (Instance / Sample)',
    meaning: 'An individual example in a dataset (e.g. one specific email or one transaction).',
  },
  {
    term: 'Feature',
    meaning: 'An individual measurable property or characteristic describing an observation (e.g. number of links).',
  },
  {
    term: 'Feature Vector',
    meaning: 'The numerical representation of the features describing one observation, written as vector x = [x1, x2, ...].',
  },
  {
    term: 'Label (Target)',
    meaning: 'The correct category or ground-truth class associated with an observation in supervised learning.',
  },
  {
    term: 'Training',
    meaning: 'The process through which a learning algorithm uses labeled examples to determine model parameters or decision rules.',
  },
  {
    term: 'Classifier',
    meaning: 'A learned model f that maps feature vectors x to predicted discrete class categories y.',
  },
  {
    term: 'Decision Boundary',
    meaning: 'The geometric boundary or surface in feature space that separates regions assigned to different predicted classes.',
  },
  {
    term: 'Prediction (y-hat)',
    meaning: 'The discrete class assigned to a new observation by the trained model when given its feature vector.',
  },
  {
    term: 'Generalization',
    meaning: 'The essential ability of a trained model to make accurate predictions on new, previously unseen observations.',
  },
  {
    term: 'Evaluation',
    meaning: 'The process of measuring how well a classifier performs using held-out data and metrics like Accuracy, Precision, Recall, and F1.',
  },
];

// Legacy exports for auxiliary components
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

export interface IntroEmail {
  id: string;
  subject: string;
  body: string;
  category: 'Legitimate' | 'Spam';
}

export const module1Emails: IntroEmail[] = [
  { id: 'A', subject: 'Meeting tomorrow', body: 'Hello, our meeting is scheduled for 10 AM. See you there.', category: 'Legitimate' },
  { id: 'B', subject: 'YOU WON A PRIZE!!!', body: 'Claim your free reward now! Click this link immediately!', category: 'Spam' },
  { id: 'C', subject: 'Project update', body: 'Please find the updated project report attached.', category: 'Legitimate' },
  { id: 'D', subject: 'Limited offer!!!', body: 'Congratulations! Get your exclusive offer today.', category: 'Spam' },
];

export interface FeatureEmail {
  id: string;
  containsLink: number;
  suspiciousWords: number;
  exclamationMarks: number;
  label: 'Not Spam' | 'Spam';
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

export const module3Neighbors = [
  { neighbor: 'A', distance: 0.8, class: 'Spam' as const },
  { neighbor: 'B', distance: 1.2, class: 'Spam' as const },
  { neighbor: 'C', distance: 1.7, class: 'Not Spam' as const },
  { neighbor: 'D', distance: 2.1, class: 'Spam' as const },
  { neighbor: 'E', distance: 2.5, class: 'Not Spam' as const },
];

export const module3HeldOut = [
  { id: 'W', trueClass: 'Spam', predClass: 'Spam', correct: true },
  { id: 'X', trueClass: 'Not Spam', predClass: 'Not Spam', correct: true },
  { id: 'Y', trueClass: 'Spam', predClass: 'Not Spam', correct: false },
  { id: 'Z', trueClass: 'Not Spam', predClass: 'Not Spam', correct: true },
];

export const misconceptions = [
  {
    myth: 'High accuracy means a good model.',
    correction:
      'Accuracy is highly misleading on imbalanced datasets. On 99% legitimate / 1% fraud data, a trivial model predicting everything as Legitimate achieves 99% accuracy but catches 0 fraud cases. Always check Precision and Recall.',
  },
  {
    myth: 'A decision boundary is a physical line written in the model code.',
    correction:
      'A decision boundary is a mathematical and geometric concept representing where the model’s predicted class flips across the feature space, not hard-coded if-else statements.',
  },
  {
    myth: 'A model with 0.85 probability is always right 85% of the time.',
    correction:
      'Confidence is not accuracy. A model can be extremely confident and still be completely wrong. Interpreting 0.85 as a true frequency requires calibrated probabilities.',
  },
  {
    myth: 'Evaluating a model on its training data proves it will work in real life.',
    correction:
      'Evaluating on training data checks memorization, not learning. A model can overfit the training examples perfectly (100% training accuracy) and fail completely on unseen observations.',
  },
];

export const scikitLearnCode = `# End-to-End Classification in Scikit-Learn
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score

# 1. Feature matrix X and target labels y
# X: [n_samples, n_features]
# y: [n_samples]

# 2. Split dataset into train and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# 3. Train models
knn = KNeighborsClassifier(n_neighbors=3).fit(X_train, y_train)
tree = DecisionTreeClassifier(max_depth=3).fit(X_train, y_train)
logreg = LogisticRegression().fit(X_train, y_train)

# 4. Predict on new unseen email x_new = [7, 5]
y_pred = logreg.predict(X_test)

# 5. Evaluate with Confusion Matrix and Metrics
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print(f"Accuracy:  {accuracy_score(y_test, y_pred):.2%}")
print(f"Precision: {precision_score(y_test, y_pred):.2%}")
print(f"Recall:    {recall_score(y_test, y_pred):.2%}")
print(f"F1-Score:  {f1_score(y_test, y_pred):.2%}")
`;
