import { useState } from "react";
import mammoth from "mammoth";

type FileType = {
  name: string;
  content?: string;
};

export function useWordReader() {
  const [file, setFile] = useState<FileType | null>(null);

  const handleWordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".docx")) return;

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      setFile({
        name: selectedFile.name,
        content: result.value,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return { file, handleWordChange };
}