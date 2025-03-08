"use client";

import React, { useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { angular } from "@codemirror/lang-angular";
import { xcodeDark } from "@uiw/codemirror-theme-xcode";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

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
    <div className="p-5 bg-[#292A2F] rounded-lg flex flex-col items-end">
      {/* Codemirror Editor */}
      <CodeMirror
        className="w-full"
        value={code}
        theme={xcodeDark}
        height="20rem"
        style={{ backgroundColor: "#011627" }}
        extensions={[javascript({ typescript: true, jsx: true }), angular()]}
        onChange={(value) => setCode(value)}
      />

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        {/* <Button onClick={handleFormat} variant="outline">
          Format Code
        </Button> */}
        <Button onClick={handleSubmit} variant="outline">
          Submit Code
        </Button>
      </div>
    </div>
  );
}
