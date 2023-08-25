/*global chrome*/
import React, { useContext, useEffect, useState } from "react";
import {
  Clipboard,
  Download,
  DownloadCloud,
  FileText,
  Pause,
  Volume2,
} from "react-feather";
import ReactMarkdown from "react-markdown";
import {
  MarkdownDataHandler,
  Prompt,
  markdownContent,
} from "../store/MarkdownDataHandler";
import copy from "copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  DEFAULT_CONTENT,
  DEFAULT_LOADING_CONTENT,
  ERROR_CONTENT_NOT_FOUND,
} from "../utils/contants";
import ThemeProvider from "../Context/ThemeProvider";
import { downloadMarkdownFile } from "../utils/utilFunctions";
import { generateAndDownloadPDF } from "../utils/pdfConverter";
import { convertAndSaveMarkdown } from "../utils/htmlConverter";
import { get_summary } from "../network/apiservices";
import { GetSummaryModel } from "../models/getSummaryModel";
interface DownloadProps {
  isPdfDownload: boolean;
  isMdDownload: boolean;
}
function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopying, setIsCopying] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<DownloadProps>({
    isPdfDownload: false,
    isMdDownload: false,
  });
  // New state to manage the synthesized speech
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  // Initialize the SpeechSynthesis instance
  useEffect(() => {
    //fetch url from the browser
    setSynthesis(window.speechSynthesis);
  }, []);

  const { mdContent, expected_response, prompt, saveMdContent } =
    MarkdownDataHandler();
  const { currentTab } = useContext(ThemeProvider);
  const handleSummarizeClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isLoading) {
      
      return; // Prevent multiple clicks while loading
    }
    setIsLoading(true);
    let requestModel: GetSummaryModel = {
      url: currentTab,
      expected_response: expected_response,
      prompt_type: prompt,
    };
    // get_summary(requestModel)
    //   .then((summary) => {
    //     saveMdContent(summary);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     saveMdContent(ERROR_CONTENT_NOT_FOUND);
    //     setIsLoading(false);
    //   });
    saveMdContent(markdownContent)
    setIsLoading(false)

  };

  const handlePdfDowloaded = () => {
    setIsDownloading((prev) => ({ ...prev, isPdfDownload: true }));
    convertAndSaveMarkdown(mdContent, "markdown-conversion");
    setTimeout(() => {
      setIsDownloading((prev) => ({ ...prev, isPdfDownload: false }));
    }, 3000);
  };

  const handleMdDownload = () => {
    setIsDownloading((prev) => ({ ...prev, isMdDownload: true }));
    downloadMarkdownFile(mdContent, "example.md");
    setTimeout(() => {
      setIsDownloading((prev) => ({ ...prev, isMdDownload: false }));
    }, 3000);
  };

  const handleCopytoClipboard = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    copy(mdContent);
    setIsCopying(true);
    setTimeout(() => {
      setIsCopying(false);
    }, 2000);
  };
  const handleIsSpeaking = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    if (mdContent.length < 5) {
      return;
    }
    if (synthesis) {
      if (synthesis.speaking) {
        synthesis.cancel(); // Stop speaking if already speaking
      } else {
        const utterance = new SpeechSynthesisUtterance(mdContent);
        synthesis.speak(utterance); // Start speaking
      }
      setIsSpeaking(!isSpeaking);
    }
  };

  return (
    <div className="bg-base-100 gap-5  flex flex-col h-screen w-screen">
      <div className="flex justify-center items-center">
        <button
          className="btn capitalize bg-neutral hover:bg-neutral-focus text-neutral-content"
          onClick={handleSummarizeClick}
        >
          {isLoading && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          summarize this
        </button>
      </div>
      <div className="flex-1   w-screen  bg-base-300 text-neutral-content flex gap-5  flex-col">
        <div className="flex justify-between">
          <label
            tabIndex={0}
            className="btn m-1  bg-neutral hover:bg-neutral-focus text-neutral-content"
          >
            {isCopying ? (
              <span>Copied!</span>
            ) : (
              <Clipboard
                onClick={handleCopytoClipboard}
                className="cursor-pointer h-8 w-8 flex-row-reverse sticky top-2 right-2"
              />
            )}
          </label>
          <div className="flex gap-2">
            <label
              tabIndex={0}
              className="btn m-1 bg-neutral hover:bg-neutral-focus text-neutral-content"
            >
              {isSpeaking ? (
                <Pause
                  onClick={handleIsSpeaking}
                  className="cursor-pointer h-8 w-8"
                />
              ) : (
                <Volume2
                  onClick={handleIsSpeaking}
                  className="cursor-pointer h-8 w-8"
                />
              )}
            </label>
            <div className="dropdown dropdown-end ">
              <label
                tabIndex={0}
                className="btn m-1 bg-neutral text-neutral-content hover:bg-neutral-focus"
              >
                <Download />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 capitalize"
              >
                <li>
                  <a onClick={handlePdfDowloaded}>
                    <FileText /> html file{" "}
                    {isDownloading.isPdfDownload && (
                      <span className="loading loading-spinner loading-md"></span>
                    )}
                  </a>
                </li>
                <li>
                  <a onClick={handleMdDownload}>
                    <DownloadCloud />
                    Md file{" "}
                    {isDownloading.isMdDownload && (
                      <span className="loading loading-spinner loading-md"></span>
                    )}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center">
            <span className="loading loading-spinner loading-lg text-6xl"></span>
            <p className="text-center text-base-content">
              {DEFAULT_LOADING_CONTENT}
            </p>
          </div>
        ) : (
          <div>
            {mdContent.length < 5 ? (
              <>
                <p className="text-center text-base-content">
                  {DEFAULT_CONTENT}
                </p>
              </>
            ) : (
              <ReactMarkdown
                children={mdContent}
                className="text-base-content px-8 !text-lg"
                components={{
                  code({ node, inline, className, lang, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, "")}
                        style={materialDark}
                        language={lang}
                        PreTag="div"
                      />
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
