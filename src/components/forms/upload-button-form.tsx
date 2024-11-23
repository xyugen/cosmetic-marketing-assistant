import React from "react";
import { Button } from "../ui/button";
import { Import } from "lucide-react";
import { Input } from "../ui/input";

const UploadButtonForm = () => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("selected file:", file);
    }
  };

  return (
    <form>
      <Input ref={fileInputRef} type="file" name="file" accept=".csv" onChange={handleFileChange} hidden />
      <Button
        type="button"
        variant={"outline"}
        size={"sm"}
        className="ml-auto h-8 lg:flex"
        onClick={handleButtonClick}
      >
        <Import />
        Import
      </Button>
    </form>
  );
};

export default UploadButtonForm;
