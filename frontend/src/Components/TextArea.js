import React from "react";
import { Textarea } from "@nextui-org/react";

export default function TextArea({ placeholder, label, onChange, value }) {
  return (
    <Textarea
      label={label}
      variant="bordered"
      placeholder={placeholder}
      onChange={onChange}
      disableAnimation
      disableAutosize
      value={value}
      classNames={{
        base: "max-w-lg max-h-lg",
        input: "resize-y min-h-[40px] max-h-[400px] h-[400px]",
        label: "text-xl font-bold",
      }}
    />
  );
}
