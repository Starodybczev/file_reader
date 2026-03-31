import { useState } from "react";

export function useHtmlReader() {
    const [file, setFile] = useState<{ name: string; content: string } | null>(null);

    const handleHtmlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        const fileName = selectedFile.name.toLowerCase();
        if (!fileName.endsWith(".html") && !fileName.endsWith(".htm")) {
            console.warn("Это не HTML файл");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setFile({ name: selectedFile.name, content: reader.result as string });
        };
        reader.onerror = () => {
            console.error("Ошибка чтения HTML файла");
        };

        reader.readAsText(selectedFile);
    };

    return { file, handleHtmlChange };
}