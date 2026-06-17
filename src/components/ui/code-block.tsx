"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useTheme } from "@/hooks/useTheme";

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const { theme } = useTheme();

  const tabsExist = tabs.length > 0;
  const isLight = theme === "light";

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  return (
    <div className={`relative w-full rounded-lg p-4 font-mono text-sm ${isLight ? "bg-neutral-100" : "bg-slate-900"}`}>
      <div className="flex flex-col gap-2">
        {tabsExist && (
          <div className="flex overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-3 !py-2 text-xs transition-colors font-sans ${
                  activeTab === index
                    ? isLight ? "text-black" : "text-white"
                    : isLight ? "text-neutral-400 hover:text-neutral-700" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        {!tabsExist && filename && (
          <div className="flex justify-between items-center py-2">
            <div className={`text-xs ${isLight ? "text-neutral-500" : "text-zinc-400"}`}>{filename}</div>
            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-1 text-xs transition-colors font-sans ${isLight ? "text-neutral-400 hover:text-neutral-700" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
            </button>
          </div>
        )}
      </div>
      <SyntaxHighlighter
        language={activeLanguage}
        style={isLight ? oneLight : atomDark}
        customStyle={{
          margin: 0,
          padding: 0,
          background: "transparent",
          fontSize: "0.875rem",
        }}
        wrapLines={true}
        showLineNumbers={true}
        lineProps={(lineNumber) => ({
          style: {
            backgroundColor: activeHighlightLines.includes(lineNumber)
              ? isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.1)"
              : "transparent",
            display: "block",
            width: "100%",
          },
        })}
        PreTag="div"
      >
        {String(activeCode)}
      </SyntaxHighlighter>
    </div>
  );
};
