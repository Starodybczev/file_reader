import { useFileReader } from "../utils/hooks/useFileReader"
import { usePdfReader } from "../utils/hooks/usePdfReader";
import { useWordReader } from "../utils/hooks/useWordReader"





export default function File_Create() {

  const { file: txtFile, handleTxtChange } = useFileReader();
  const { file: wordFile, handleWordChange } = useWordReader();
  const {file: pdfFile, handlePdfChange} = usePdfReader()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.name.endsWith(".txt")) {
      handleTxtChange(e);
    } else if (selectedFile.name.endsWith(".docx")) {
      handleWordChange(e);
    }else if(selectedFile.name.endsWith(".pdf")){
        handlePdfChange(e)
    }
     else {
      alert("sorry your type file not supporting");
    }
  };   

  const file = txtFile || wordFile || pdfFile

  console.log(file?.name, file?.content)

    return (
        <div>
            <h1>hello from app</h1>
            <input type="file" onChange={handleFileChange} />

      <div>Имя файла: {file?.name || "file not found"}</div>
      <div>Содержимое файла: <pre>{file?.content || "file exsist"}</pre></div>
        </div>
    )
}