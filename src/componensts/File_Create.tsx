import { useFileReader, usePdfReader, useWordReader, useHtmlReader } from "../utils";


export default function File_Create() {

    const { file: txtFile, handleTxtChange } = useFileReader();
    const { file: wordFile, handleWordChange } = useWordReader();
    const { file: pdfFile, handlePdfChange } = usePdfReader()
    const { file: htmlFile, handleHtmlChange } = useHtmlReader()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        if (selectedFile.name.endsWith(".txt")) {
            handleTxtChange(e);
        } else if (selectedFile.name.endsWith(".docx")) {
            handleWordChange(e);
        } else if (selectedFile.name.endsWith(".pdf")) {
            handlePdfChange(e)
        } else if (selectedFile.name.endsWith(".html")) {
            handleHtmlChange(e)
        }
        else {
            alert("sorry your type file not supporting");
        }
    };

    const file = txtFile || wordFile || pdfFile || htmlFile

    console.log(file?.name, file?.content)

    return (
        <div className="body_select_file">
            <h1>hello from app</h1>
            <div className="upload_box">
                <input className="file_added" type="file" onChange={handleFileChange} />
                <p className={`status_bar ${file ? `active` : `empty`}`}>{file ? `${file.name}` : `файл не выбран`}</p>
            </div>

            {file && <div className="content_file">
                {file && file.content && (
                    <pre>{file.content}</pre>
                )}
            </div>}
        </div>
    )
}