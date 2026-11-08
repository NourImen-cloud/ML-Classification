export interface TreeNode {
  question?: string;
  feature?: string;
  threshold?: number;
  label?: 'spam' | 'not-spam';
  left?: TreeNode;  // <= threshold or 'No'
  right?: TreeNode; // > threshold or 'Yes'
  emails?: string[];
  gini?: number;
}

// Module 4 Figure 2: The small conceptual spam tree
// Root: "Suspicious link?" -> No -> NOT SPAM, Yes -> "Unknown sender?" -> No -> NOT SPAM, Yes -> SPAM
export const figure2SpamTree: TreeNode = {
  question: 'Suspicious link?',
  feature: 'suspiciousLink',
  left: {
    label: 'not-spam',
  },
  right: {
    question: 'Unknown sender?',
    feature: 'unknownSender',
    left: {
      label: 'not-spam',
    },
    right: {
      label: 'spam',
    },
  },
};

// Numeric decision tree learned from the 10-email dataset
export const decisionTree: TreeNode = {
  question: 'Links <= 3.5?',
  feature: 'links',
  threshold: 3.5,
  emails: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'],
  gini: 0.50,
  left: {
    // Links <= 3.5
    question: 'Links <= 1.5?',
    feature: 'links',
    threshold: 1.5,
    emails: ['E1', 'E2', 'E3', 'E4', 'E5', 'E10'],
    gini: 0.28,
    left: {
      label: 'not-spam',
      emails: ['E1', 'E2', 'E3'],
      gini: 0,
    },
    right: {
      question: 'Suspicious Words <= 1.5?',
      feature: 'suspiciousWords',
      threshold: 1.5,
      emails: ['E4', 'E5', 'E10'],
      gini: 0.44,
      left: {
        label: 'not-spam',
        emails: ['E4', 'E5'],
        gini: 0,
      },
      right: {
        label: 'spam',
        emails: ['E10'],
        gini: 0,
      },
    },
  },
  right: {
    label: 'spam',
    emails: ['E6', 'E7', 'E8', 'E9'],
    gini: 0,
  },
};

export interface TraversalStep {
  node: TreeNode;
  answer: boolean | null; // true = yes (right/left depending on tree), false = no, null = leaf
  path: string;
}

export function traverseTree(
  links: number,
  suspiciousWords: number,
  node: TreeNode = decisionTree,
  steps: TraversalStep[] = []
): { steps: TraversalStep[]; prediction: 'spam' | 'not-spam' } {
  if (node.label) {
    steps.push({ node, answer: null, path: `→ ${node.label.toUpperCase()}` });
    return { steps, prediction: node.label };
  }

  const value = node.feature === 'links' ? links : suspiciousWords;
  const goLeft = value <= node.threshold!;
  steps.push({ node, answer: goLeft, path: goLeft ? 'Yes (<= thresh) →' : 'No (> thresh) →' });

  return traverseTree(links, suspiciousWords, goLeft ? node.left! : node.right!, steps);
}

// Shallow tree (depth 1) for comparison
export const shallowTree: TreeNode = {
  question: 'Links <= 3.5?',
  feature: 'links',
  threshold: 3.5,
  emails: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10'],
  left: { label: 'not-spam', emails: ['E1', 'E2', 'E3', 'E4', 'E5', 'E10'] },
  right: { label: 'spam', emails: ['E6', 'E7', 'E8', 'E9'] },
};
