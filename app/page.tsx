/* eslint-disable */


"use client";

import Image from "next/image";
import CodeEditor from "./components/codeEditor";
import { useState } from "react";
import CodeBlock from "./components/codeblock";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const extractCode = (response: string): string => {
  const match = response.match(/```html\n([\s\S]*?)\n```/);
  return match ? match[1] : "No code found";
};

export default function Home() {
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const sendCodeToAPI = async (formattedCode: string) => {
    const res = await fetch("/api/ai/generate-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: formattedCode, application: "skeleton-loader" }),
    });

    const data = await res.json();
    const extractedCode = data.content.match(/```html\n([\s\S]*?)\n```/);
    // const extractedCode = extractCode(data.content)

    // Convert JSX-specific attributes to plain HTML attributes.
    // const normalizedCode = extractedCode.replace(/className=/g, "class=");
    setResponse(data.content); // Store response
    toast.success('Success! 🥳', {
      description: "Code generated successfully"
    })
  };

  return (
    <main className="flex flex-col items-center justify-center py-12 px-20 gap-12 h-screen bg-white">
      <div className="header flex flex-col items-center gap-2">
        <Image src={"/logo.png"} width={100} height={100} alt="logo" />

        <span className="title text-5xl font-bold text-center tracking-tighter">
          Skeleton Loader Generator 🦴
        </span>
        <span className="subtitle font-medium text-center tracking-tighter">
          A simple tool to help developers generate skeleton loaders for <br />{" "}
          their blocks of code!
        </span>

        {/* Framework Selection */}
        <div className="group flex flex-col items-center mt-12 gap-2">
          <span className="font-normal tracking-tighter">
            What framework are you working with?
          </span>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Frameworks</SelectLabel>
                <SelectItem value="apple">NextJS</SelectItem>
                <SelectItem value="banana">Angular</SelectItem>
                <SelectItem value="blueberry">Vue.js</SelectItem>
                <SelectItem value="grapes">Svelte</SelectItem>
                {/* <SelectItem value="pineapple">Pineapple</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid-section w-full grid grid-cols-2 gap-x-12">
        <CodeEditor onSubmit={sendCodeToAPI} />


        {/* Tab Section for generated code */}
        <Tabs defaultValue="preview" className="w-full h-[30rem]">
          <TabsList className="grid w-2/4 grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent className="contents" value="preview">
            <div className="wrapper w-full overflow-scroll grow-0 border border-gray-200 rounded-lg h-full">
            <div className="w-full" dangerouslySetInnerHTML={{ __html: response }} />

            </div>
          </TabsContent>
          <TabsContent className="contents" value="code">
            <div className="w-full h-full">
              <CodeBlock apiResponse={response} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
