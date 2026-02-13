declare module 'react-katex' {
  import { ReactNode } from 'react';

  interface MathProps {
    math: string;
    block?: boolean;
    errorColor?: string;
    renderError?: (error: Error) => ReactNode;
    settings?: any;
    as?: any;
    [key: string]: any;
  }

  export const InlineMath: React.FC<MathProps>;
  export const BlockMath: React.FC<MathProps>;
}
