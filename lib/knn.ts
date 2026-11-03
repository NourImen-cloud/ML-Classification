import { Email, emailDataset } from './data';

export function euclideanDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

export interface KNNResult {
  neighbors: Array<{ email: Email; distance: number; rank: number }>;
  prediction: 'spam' | 'not-spam' | 'tie';
  spamVotes: number;
  notSpamVotes: number;
}

export function knnPredict(
  x: number,
  y: number,
  k: number,
  dataset: Email[] = emailDataset
): KNNResult {
  const distances = dataset.map((email) => ({
    email,
    distance: parseFloat(euclideanDistance(x, y, email.links, email.suspiciousWords).toFixed(2)),
    rank: 0,
  }));

  distances.sort((a, b) => a.distance - b.distance);
  distances.forEach((d, i) => (d.rank = i + 1));

  const neighbors = distances.slice(0, k);
  const spamVotes = neighbors.filter((n) => n.email.label === 'spam').length;
  const notSpamVotes = neighbors.filter((n) => n.email.label === 'not-spam').length;

  let prediction: 'spam' | 'not-spam' | 'tie';
  if (spamVotes > notSpamVotes) prediction = 'spam';
  else if (notSpamVotes > spamVotes) prediction = 'not-spam';
  else prediction = 'tie';

  return { neighbors, prediction, spamVotes, notSpamVotes };
}

// Generate a decision boundary grid for visualization
export function generateDecisionBoundary(
  k: number,
  dataset: Email[] = emailDataset,
  resolution = 30
): Array<{ x: number; y: number; label: 'spam' | 'not-spam' | 'tie' }> {
  const grid = [];
  for (let xi = 0; xi <= resolution; xi++) {
    for (let yi = 0; yi <= resolution; yi++) {
      const x = (xi / resolution) * 8;
      const y = (yi / resolution) * 8;
      const result = knnPredict(x, y, k, dataset);
      grid.push({ x, y, label: result.prediction });
    }
  }
  return grid;
}
