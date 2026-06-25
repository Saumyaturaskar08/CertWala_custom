import {
  Type,
  Upload,
  Calendar,
  Eye,
  Download,
  Sticker,
  Frame,
} from "lucide-react";

function LeftToolbar({
  setShowSizeModal,
  setShowStickerModal,
  setShowTextMenu,
  setCertificateImage,
  downloadPNG,
  addText, 
  addUploadedImage,
  setShowPreview,
  setShowExportModal,

}) {
  const handleUpload = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/png,image/jpeg,image/jpg";

    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const imageUrl = URL.createObjectURL(file);
      setCertificateImage(imageUrl);
    };

    input.click();
  };

  const handleUploadImage = () => {
  const input = document.createElement("input");

  input.type = "file";
  input.accept = "image/*";

  input.onchange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    addUploadedImage(imageUrl);
  };

  input.click();
};


  const tools = [
    {
      icon: Frame,
      label: "Size",
      action: () => {
        setShowSizeModal(true);
      },
    },
    {
      icon: Upload,
      label: "Upload Design",
      action: handleUpload,
    },
    {
      icon: Type,
      label: "Text",
      action: () => {
        setShowTextMenu((prev) => !prev);
      },
    },
    {
      icon: Sticker,
      label: "Sticker",
      action: () => {
        setShowStickerModal(true);
      },
    },
    {
      icon: Calendar,
      label: "Date",
      action: () => {
        addText("{{Date}}");
      },
    },

    {
  icon: Upload,
  label: "Upload Images",
  action: handleUploadImage,
     },
    {
  icon: Eye,
  label: "Preview",
  action: () => {
    setShowPreview(true);
  },
},
    // {
    //   icon: Download,
    //   label: "Export",
    //   action: downloadPNG,
    // },
    {
  icon: Download,
  label: "Export",
  action: () => {
    setShowExportModal(true);
  },
},

  ];

  return (
    <div
      className="
        w-20
        md:w-24
        bg-white
        border-r
        border-gray-200
        flex
        flex-col
        items-center
        py-4
        gap-3
        shrink-0
      "
    >
      {tools.map((tool, index) => (
        <button
          key={index}
          onClick={tool.action}
          className="
            w-14
            h-14
            md:w-16
            md:h-16
            rounded-xl
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
          <tool.icon size={18} />
          <span
            className="
              text-[9px]
              md:text-[10px]
              font-medium
            "
          >
            {tool.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default LeftToolbar;


