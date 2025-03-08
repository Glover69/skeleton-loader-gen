"use client";

import React, { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import "highlight.js/styles/github-dark.css"; // Choose a theme

// Register languages
hljs.registerLanguage('html', xml);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
// For JSX and TSX, you can re-use the configurations for JS and TS
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('tsx', typescript);

// Configure Highlight.js (optional if you want to limit detection to these languages)
hljs.configure({ languages: ['html', 'javascript', 'typescript', 'jsx', 'tsx'] });

interface Props {
    apiResponse: string;
}

const extractCode = (response: string): string => {
    const match = response.match(/```html\n([\s\S]*?)\n```/);
    return match ? match[1] : "No code found";
};

const CodeBlock: React.FC<Props> = ({ apiResponse }) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    const extractedCode = extractCode(apiResponse);
    setCode(extractedCode);
  }, [apiResponse]);

  useEffect(() => {
    const codeElements = document.querySelectorAll('pre code');
    codeElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.removeAttribute('data-highlighted');
      hljs.highlightElement(htmlEl);
    });
  }, [code]);

  return (
    <pre className='h-full'>
      <code className="language-html rounded-lg !px-5 h-full !pt-5">{code}</code>
    </pre>
  );
};

export default CodeBlock;