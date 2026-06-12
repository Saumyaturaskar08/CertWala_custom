import {
  Type,
  Upload,
  Calendar,
   Eye,
  Download,
} from "lucide-react";

function LeftToolbar({
  addText,
  setCertificateImage,
  downloadPNG,
}) {
  const handleUpload = () => {
    const input =
      document.createElement(
        "input"
      );

    input.type = "file";

    input.accept =
      "image/png,image/jpeg,image/jpg";

    input.onchange = (e) => {
      const file =
        e.target.files?.[0];

      if (!file) return;

      const imageUrl =
        URL.createObjectURL(
          file
        );

      setCertificateImage(
        imageUrl
      );
    };

    input.click();
  };

  const tools = [
    {
      icon: Upload,
      label: "Upload",
      action:
        handleUpload,
    },

    {
      icon: Type,
      label: "Text",
      action: addText,
    },

    {
      icon: Calendar,
      label: "Date",
      action: () =>
        addText(
          "{{Date}}"
        ),
    },

    

    {
      icon: Eye,
      label: "Preview",
      action: () =>
        alert(
          "Preview Mode"
        ),
    },

    {
      icon: Download,
      label: "Export",
      action:
        downloadPNG,
    },
  ];

  return (
    <div
      className="
        w-24
        bg-white
        border-r
        border-gray-200
        flex
        flex-col
        items-center
        py-4
        gap-3
        flex-shrink-0
      "
    >
      {tools.map(
        (tool, index) => {
          const Icon =
            tool.icon;

          return (
            <button
              key={index}
              onClick={
                tool.action
              }
              className="
                w-16
                h-16
                rounded-2xl
                bg-gray-100
                hover:bg-[#20B2AA]
                hover:text-white
                transition
                flex
                flex-col
                items-center
                justify-center
                gap-1
              "
            >
              <Icon
                size={18}
              />

              <span
                className="
                  text-[10px]
                  font-medium
                "
              >
                {tool.label}
              </span>
            </button>
          );
        }
      )}
    </div>
  );
}

export default LeftToolbar;