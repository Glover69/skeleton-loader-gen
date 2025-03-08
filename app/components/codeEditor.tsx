/* eslint-disable */

"use client";

import React, { useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { angular } from "@codemirror/lang-angular";
import {
  xcodeDark,
  xcodeDarkInit,
  xcodeDarkStyle,
} from "@uiw/codemirror-theme-xcode";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import { vscodeDark, vscodeDarkInit } from "@uiw/codemirror-theme-vscode";
import { vscodeLight, vscodeLightInit } from "@uiw/codemirror-theme-vscode";

export default function CodeEditor({
  onSubmit,
}: {
  onSubmit: (code: string) => void;
}) {
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    const formattedCode = `\`\`\`html\n${code}\n\`\`\``; // Wrapping in backticks for API
    onSubmit(formattedCode);
  };

  //   const handleFormat = () => {
  //     try {
  //       const formatted = prettier.format(code, {
  //         parser: "babel",
  //         plugins: [parserBabel],
  //         singleQuote: true,
  //       });
  //       setCode(formatted);
  //     } catch (error) {
  //       console.error("Formatting Error:", error);
  //     }
  //   };

  return (
    <div className="flex flex-col items-start gap-4 w-full h-[30rem]">
      <div className="flex items-center w-full justify-between">
        <span className="font-medium text-lg tracking-tighter">
          Your code goes here
        </span>
        <Button onClick={handleSubmit} variant="outline">
          Submit Code
        </Button>
      </div>

      <div className="w-full h-full">
        <div className="p-5 w-full bg-[#011627] rounded-lg flex flex-col items-end">
          {/* Codemirror Editor */}
          <CodeMirror
            className="w-full"
            value={code}
            style={{ backgroundColor: "#011627", fontSize: "0.75rem" }}
            theme={vscodeDarkInit({
              settings: {
                background: "#011627",
                gutterBackground: "#011627",
              },
            })}
            height="100%"
            extensions={[html(), angular()]}
            onChange={(value) => setCode(value)}
          />
        </div>
      </div>
    </div>
  );
}
