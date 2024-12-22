  'use client';
  import { useEffect, useState } from "react";
  import { BuilderPage } from "@/components/builder/code-preview-component";
  import { useSearchParams } from 'next/navigation';
  import { API_URL } from "@/utils/config";
  import { parseXml } from "@/utils/xml-parser";
  import { Step, StepType } from "@/types/step";
  import axios from "axios";
  import { FileItem } from "@/types/file";
  import { useWebContainer } from "@/hooks/useWebContaner"; // Ensure this hook exists or replace with actual logic.

  export default function Page() {
    const [prompt, setPrompt] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const [templateSet, setTemplateSet] = useState(false);
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentStep, setCurrentStep] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [llmMessages, setLlmMessages] = useState<any[]>([]);
    const [files, setFiles] = useState<FileItem[]>([]);
    const webContainer = useWebContainer();
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

    useEffect(() => {
      const promptValue = searchParams.get("prompt");
      setPrompt(promptValue);
      console.log("Prompt:", promptValue);
    }, [searchParams]);

    useEffect(() => {
      const createMountStructure = (files: FileItem[]): Record<string, any> => {
        const mountStructure: Record<string, any> = {};
        files.forEach((file) => {
          const processFile = (file: FileItem, isRootFolder: boolean) => {
            if (file.type === 'folder') {
              mountStructure[file.name] = {
                directory: file.children
                  ? Object.fromEntries(
                      file.children.map((child) => [
                        child.name,
                        processFile(child, false),
                      ])
                    )
                  : {},
              };
            } else if (file.type === 'file') {
              if (isRootFolder) {
                mountStructure[file.name] = {
                  file: {
                    contents: file.content || '',
                  },
                };
              } else {
                return {
                  file: {
                    contents: file.content || '',
                  },
                };
              }
            }
            return mountStructure[file.name];
          };
          processFile(file, true);
        });
        return mountStructure;
      };

      const mountStructure = createMountStructure(files);
      console.log("Mount Structure:", mountStructure);
      webContainer?.mount(mountStructure);
    }, [files, webContainer]);

    useEffect(() => {
      const updatedFiles = [...files];
      let updateOccurred = false;

      steps
        .filter(({ status }) => status === "pending")
        .forEach((step) => {
          if (step.type === StepType.CreateFile) {
            updateOccurred = true;
            const parsedPath = step.path?.split("/") || [];
            let currentFileStructure = updatedFiles;

            parsedPath.reduce((currentPath, segment, index) => {
              const nextPath = `${currentPath}/${segment}`;
              if (index === parsedPath.length - 1) {
                const file = currentFileStructure.find(
                  (file) => file.path === nextPath
                );
                if (!file) {
                  currentFileStructure.push({
                    name: segment,
                    type: "file",
                    path: nextPath,
                    content: step.code || "",
                  });
                } else {
                  file.content = step.code || "";
                }
              } else {
                let folder = currentFileStructure.find(
                  (file) => file.path === nextPath
                );
                if (!folder) {
                  folder = {
                    name: segment,
                    type: "folder",
                    path: nextPath,
                    children: [],
                  };
                  currentFileStructure.push(folder);
                }
                currentFileStructure = folder.children!;
              }
              return nextPath;
            }, "");
          }
        });

      if (updateOccurred) {
        setFiles(updatedFiles);
        setSteps((prevSteps) =>
          prevSteps.map((step) => ({ ...step, status: "completed" }))
        );
      }
    }, [steps, files]);

    const initialize = async () => {
      if (prompt) {
        const res = await axios.post(`${API_URL}/template`, {
          prompt: prompt.trim(),
        });
        setTemplateSet(true);
        const { prompt: responsePrompt, uiPrompts } = res.data;

        setSteps(
          parseXml(uiPrompts[0]).map((step) => ({
            ...step,
            status: "pending",
          }))
        );

        setLoading(true);
        const stepsResponse = await axios.post(`${API_URL}/chat`, {
          messages: [...responsePrompt, prompt].map((content) => ({
            role: "user",
            content,
          })),
        });

        setLoading(false);

        setSteps((prevSteps) => [
          ...prevSteps,
          ...parseXml(stepsResponse.data.response).map((step) => ({
            ...step,
            status: "pending",
          })),
        ]);

        setLlmMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: stepsResponse.data.response },
        ]);
      }
    };

    useEffect(() => {
      initialize();
    }, []);

    return (
      <div>
        <BuilderPage
          webContainer={webContainer}
          files={files}
          selectedFile={selectedFile}
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          setSelectedFile={setSelectedFile}
        />
        {prompt && <p>Prompt: {prompt}</p>}
      </div>
    );
  }
