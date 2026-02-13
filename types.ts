export interface Proof {
  id: string;
  title: string;
  abstract: string;
  content: string; // LaTeX content
  author: string;
  tags: string[];
  createdAt: number;
}
