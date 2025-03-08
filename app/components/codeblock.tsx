"use client";

import React, { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import "highlight.js/styles/github-dark.css"; // Choose a theme


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
    hljs.highlightAll(); // Apply syntax highlighting after rendering
  }, [code]);

  return (
    <pre>
      <code className="language-html">{code}</code>
    </pre>
  );
};

export default CodeBlock;