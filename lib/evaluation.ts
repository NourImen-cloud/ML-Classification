export interface ConfusionMatrix {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
}

export function accuracy(cm: ConfusionMatrix): number {
  const total = cm.tp + cm.fp + cm.fn + cm.tn;
  return total === 0 ? 0 : (cm.tp + cm.tn) / total;
}

export function precision(cm: ConfusionMatrix): number {
  const denom = cm.tp + cm.fp;
  return denom === 0 ? 0 : cm.tp / denom;
}

export function recall(cm: ConfusionMatrix): number {
  const denom = cm.tp + cm.fn;
  return denom === 0 ? 0 : cm.tp / denom;
}

export function f1Score(cm: ConfusionMatrix): number {
  const p = precision(cm);
  const r = recall(cm);
  return p + r === 0 ? 0 : (2 * p * r) / (p + r);
}

// Model A (threshold 0.5) on 1000 emails
export const modelA: ConfusionMatrix = { tp: 40, fp: 20, fn: 10, tn: 930 };
// Model B (threshold 0.8) on same 1000 emails
export const modelB: ConfusionMatrix = { tp: 30, fp: 3,  fn: 20, tn: 947 };
// "Always Not Spam" baseline
export const baseline: ConfusionMatrix = { tp: 0, fp: 0, fn: 50, tn: 950 };

// Overfitting experiment data
export const overfittingData = [
  { k: 1,   trainAcc: 1.00, testAcc: 0.80, label: 'K=1 (Overfit)', status: 'overfit' },
  { k: 3,   trainAcc: 0.90, testAcc: 0.89, label: 'K=3 (Good)',    status: 'good' },
  { k: 15,  trainAcc: 0.87, testAcc: 0.89, label: 'K=15 (Good)',   status: 'good' },
  { k: 141, trainAcc: 0.76, testAcc: 0.76, label: 'K=141 (Underfit)', status: 'underfit' },
];

export const treeOverfitting = [
  { label: 'Tree depth=2', trainAcc: 0.87, testAcc: 0.89, status: 'good' },
  { label: 'Tree unlimited', trainAcc: 1.00, testAcc: 0.79, status: 'overfit' },
];
