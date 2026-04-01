import { useState } from "react";

import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
// Импортируем путь к воркеру через специальный суффикс Vite
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorker;

export function usePdfReader() {
  const [file, setFile] = useState<{ name: string; content?: string } | null>(null);

  const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile || !selectedFile.name.endsWith(".pdf")) return;

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();

      // Здесь главное: отключаем воркер
      // @ts-ignore
      const pdf = await getDocument({ data: arrayBuffer, useWorker: false }).promise;

      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ") + "\n";
      }

      setFile({ name: selectedFile.name, content: text });
    } catch (err) {
      console.error("Ошибка чтения PDF:", err);
    }
  };

  return { file, handlePdfChange };
}