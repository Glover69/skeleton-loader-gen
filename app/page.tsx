/* eslint-disable */
"use client";

import Image from "next/image";
import CodeEditor from "./components/codeEditor";
import { useState } from "react";
import CodeBlock from "./components/codeblock";
import axios from 'axios';
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
import MyLottieComponent from "./components/lottieComponent";
import { Progress } from "@/components/ui/progress"


export default function Home() {
  const [response, setResponse] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState("");



  const sendCodeToAPI = async (formattedCode: string) => {
    setLoading(true);
    const res = await fetch("/api/ai/generate-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: formattedCode,
        application: "skeleton-loader",
        framework: value
      }),
    });

    const data = await res.json();
    const extractedCode = data.content.match(/```html\n([\s\S]*?)\n```/);
    // const extractedCode = extractCode(data.content)

    // Convert JSX-specific attributes to plain HTML attributes.
    // const normalizedCode = extractedCode.replace(/className=/g, "class=");
    setResponse(data.content); // Store response
    toast.success("Success! 🥳", {
      description: "Code generated successfully",
    });
    if (data.content) {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center py-12 px-20 xl:px-32 2xl:px-48 gap-12 h-screen bg-white">
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
          <Select onValueChange={(val) => setValue(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Frameworks</SelectLabel>
                <SelectItem value="NextJS">NextJS</SelectItem>
                <SelectItem value="Angular">Angular</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid-section w-full grid grid-cols-2 gap-x-12">
        <CodeEditor onSubmit={sendCodeToAPI} value={value} />

        {/* Tab Section for generated code */}
        <Tabs defaultValue="preview" className="w-full h-[30rem]">
          <TabsList className="grid w-2/4 grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent className="contents" value="preview">
            <div className="wrapper w-full overflow-scroll grow-0 border border-gray-200 rounded-lg h-full">
                {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <MyLottieComponent />
                  <span className="font-medium tracking-tighter text-lg">Hang on tight! We're almost there 🚀</span>
                  <Progress className="w-[40%] mt-2" value={33} />

                </div>
                ) : response ? (
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: response }}
                />
                ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="font-medium text-xl tracking-tighter">No code submitted yet.</span>
                  <span className="text-gray-500 tracking-tight">Submit your code to get started!</span>
                </div>
                )}

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
