import { Proof } from './types';

const STORAGE_KEY = 'math_proofs_db';

const INITIAL_PROOFS: Proof[] = [
  {
    id: '1',
    title: 'The Infinity of Primes',
    abstract: 'A classic proof by Euclid demonstrating that there are infinitely many prime numbers.',
    content: `
## Theorem
There are infinitely many prime numbers.

## Proof
Suppose that there are only a finite number of primes $p_1, p_2, \\dots, p_n$.
Consider the integer
$$ N = p_1 p_2 \\dots p_n + 1 $$
Since $N > 1$, by the fundamental theorem of arithmetic, $N$ has at least one prime factor $q$.
If $q$ were one of the primes $p_i$, then $q$ would divide $N - p_1 p_2 \\dots p_n = 1$, which is impossible.
Therefore, $q$ is a prime distinct from all $p_i$, contradicting the assumption that we have listed all primes.
$\\blacksquare$
    `,
    author: 'Euclid',
    tags: ['Number Theory', 'Classics'],
    createdAt: Date.now() - 10000000,
  },
  {
    id: '2',
    title: 'Euler\'s Identity',
    abstract: 'The most beautiful equation in mathematics, connecting five fundamental constants.',
    content: `
## Statement
$$ e^{i\\pi} + 1 = 0 $$

## Derivation
Recall Euler's formula for any real number $x$:
$$ e^{ix} = \\cos(x) + i\\sin(x) $$
Substituting $x = \\pi$:
$$ e^{i\\pi} = \\cos(\\pi) + i\\sin(\\pi) $$
Since $\\cos(\\pi) = -1$ and $\\sin(\\pi) = 0$, we have:
$$ e^{i\\pi} = -1 $$
$$ e^{i\\pi} + 1 = 0 $$
$\\blacksquare$
    `,
    author: 'Leonhard Euler',
    tags: ['Analysis', 'Complex Numbers'],
    createdAt: Date.now(),
  }
];

export const getProofs = (): Proof[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROOFS));
    return INITIAL_PROOFS;
  }
  return JSON.parse(data);
};

export const getProofById = (id: string): Proof | undefined => {
  const proofs = getProofs();
  return proofs.find((p) => p.id === id);
};

export const addProof = (proof: Omit<Proof, 'id' | 'createdAt'>): Proof => {
  const proofs = getProofs();
  const newProof: Proof = {
    ...proof,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: Date.now(),
  };
  proofs.unshift(newProof);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(proofs));
  return newProof;
};

export const updateProof = (id: string, updates: Partial<Omit<Proof, 'id' | 'createdAt'>>): Proof | undefined => {
  const proofs = getProofs();
  const index = proofs.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  proofs[index] = { ...proofs[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(proofs));
  return proofs[index];
};

export const deleteProof = (id: string): boolean => {
  const proofs = getProofs();
  const filtered = proofs.filter((p) => p.id !== id);
  if (filtered.length === proofs.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};
