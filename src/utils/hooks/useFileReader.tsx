import { useState } from "react";

type FileType = {
  name: string;
  content?: string;
};

export function useFileReader() {
  const [file, setFile] = useState<FileType | null>(null);

  const handleTxtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {

      setFile({
        name: selectedFile.name,
        content: event.target?.result as string,
      });
    };
    reader.readAsText(selectedFile);
  };

  return { file, handleTxtChange };
}   
