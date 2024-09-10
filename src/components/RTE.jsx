import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../conf/config";

export default function RTE({ name, control, label, defaultValue ="" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block pl-1">{label}</label>}

      <Controller
        api=""
        name={name || "content"}
        className="mt-4"
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey={config.tinyMCEId}
            init={{
              initialValue: defaultValue,
              height: 400,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | outdent indent",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}",
              content_css: "dark",
              skin: "oxide-dark",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
