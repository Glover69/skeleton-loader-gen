"use client";

import Image from "next/image";
import CodeEditor from "./components/codeEditor";
import { useState } from "react";
import CodeBlock from "./components/codeblock";

export default function Home() {
  const [response, setResponse] = useState("");

  const sendCodeToAPI = async (formattedCode: string) => {
    const res = await fetch("http://localhost:2005/api/ai/generate-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: formattedCode }),
    });

    const data = await res.json();
    setResponse(data.content); // Store response
  };

  return (
    <main className="flex flex-col items-center justify-center py-12 px-20 gap-12 h-screen bg-[#011627]">
      <div className="header flex flex-col items-center gap-2">
        <Image src={'/logo.png'} width={100} height={100} alt="logo"/>
          
        <span className="title text-5xl font-bold text-white text-center tracking-tighter">Skeleton Loader Generator</span>
        <span className="subtitle text-white font-medium text-center tracking-tighter">A simple tool to help developers generate skeleton loaders for <br /> their blocks of code!</span>
      </div>

      <div className="grid-section w-full grid grid-cols-2">
      <CodeEditor onSubmit={sendCodeToAPI} />
      <div className="p-6">
      <h1 className="text-xl font-bold tracking-tighter text-white mb-4">Generated Code</h1>
      {response ? <CodeBlock apiResponse={response} /> : <p>Loading...</p>}
    </div>
      </div>
    </main>
  );
}
