import React from "react";
import { useFileReader, usePdfReader, useWordReader, useHtmlReader, useFileEvaluator } from "../utils";


export default function File_Create() {
    const { file: txtFile, handleTxtChange } = useFileReader();
    const { file: wordFile, handleWordChange } = useWordReader();
    const { file: pdfFile, handlePdfChange } = usePdfReader();
    const { file: htmlFile, handleHtmlChange } = useHtmlReader();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        if (selectedFile.name.endsWith(".txt")) handleTxtChange(e);
        else if (selectedFile.name.endsWith(".docx")) handleWordChange(e);
        else if (selectedFile.name.endsWith(".pdf")) handlePdfChange(e);
        else if (selectedFile.name.endsWith(".html")) handleHtmlChange(e);
        else alert("Тип файла не поддерживается");
    };

    const file = txtFile || wordFile || pdfFile || htmlFile;


    const evaluation = useFileEvaluator(file?.content);

    return (
        <div className="check-container">
            <div className="upload_box">
                <h1>Проверка практических работ</h1>
                <input className="file_added" type="file" onChange={handleFileChange} />
                <p className={`status_bar ${file ? `active` : `empty`}`}>{file ? `${file.name}` : `файл не выбран`}</p>
            </div>

            {file && (
                <div className="check-layout">

                    <div className="file-viewer">
                        <h3 className="file-title">Файл: {file.name}</h3>
                        <div className="content-box">
                            <pre className="content-text">
                                {file.content || "Идет обработка содержимого..."}
                            </pre>
                        </div>
                    </div>

                    <div
                        className="score-card"
                        style={{ borderTopColor: evaluation?.color || '#ccc' }}
                    >
                        {evaluation ? (
                            <>
                                <div className="grade-text" style={{ color: evaluation.color }}>
                                    {evaluation.grade}
                                </div>
                                <div className="percentage-text">
                                    Выполнено: <b>{evaluation.score}%</b>
                                </div>

                                <div className="progress-container">
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: `${evaluation.score}%`,
                                            backgroundColor: evaluation.color
                                        }}
                                    />
                                </div>

                                <div className="criteria-list">
                                    <h4>Результаты по темам:</h4>
                                    {evaluation.details.map((item, idx) => (
                                        <div key={idx} className="criterion-item">
                                            <span className="criterion-icon">
                                                {item.passed ? '✅' : '❌'}
                                            </span>
                                            <span className="criterion-label" style={{ color: item.passed ? '#333' : '#999' }}>
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p>Загрузите файл для начала анализа...</p>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}