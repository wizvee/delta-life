import { useRef } from "react";
import { Button } from "./ui/button";
import { CloudUpload } from "lucide-react";

export default function FileUploader({
  onFilesSelected,
}: {
  onFilesSelected: (files: FileList) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <>
      <Button size="sm" onClick={handleButtonClick}>
        <CloudUpload />
      </Button>
      <input
        type="file"
        multiple
        hidden
        ref={inputRef}
        onChange={handleChange}
      />
    </>
  );
}
