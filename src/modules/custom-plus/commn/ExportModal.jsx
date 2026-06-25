import { useState } from "react";
import { X, Image, FileText } from "lucide-react";

function ExportModal({
  show,
  setShow,
  exportPNG,
  exportJPEG,
  exportPDF,
}) {
  const [format, setFormat] = useState("png");

  if (!show) return null;

  const handleExport = () => {
    if (format === "png") exportPNG();
    if (format === "jpeg") exportJPEG();
    if (format === "pdf") exportPDF();

    setShow(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[420px] p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            Export Design
          </h2>

          <button onClick={() => setShow(false)}>
            <X size={22} />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Select Format
        </p>

        <div className="space-y-3">

          {/* PNG */}
          <div
            onClick={() => setFormat("png")}
            className={`border rounded-xl p-4 cursor-pointer transition
              ${
                format === "png"
                  ? "border-[#20B2AA] bg-[#20B2AA]/10"
                  : "border-gray-200"
              }`}
          >
            <div className="flex gap-3">
              <Image size={22} />
              <div>
                <h3 className="font-medium">PNG</h3>
                <p className="text-sm text-gray-500">
                  High quality image
                </p>
              </div>
            </div>
          </div>

          {/* JPEG */}
          <div
            onClick={() => setFormat("jpeg")}
            className={`border rounded-xl p-4 cursor-pointer transition
              ${
                format === "jpeg"
                  ? "border-[#20B2AA] bg-[#20B2AA]/10"
                  : "border-gray-200"
              }`}
          >
            <div className="flex gap-3">
              <Image size={22} />
              <div>
                <h3 className="font-medium">JPEG</h3>
                <p className="text-sm text-gray-500">
                  Smaller file size
                </p>
              </div>
            </div>
          </div>

          {/* PDF */}
          <div
            onClick={() => setFormat("pdf")}
            className={`border rounded-xl p-4 cursor-pointer transition
              ${
                format === "pdf"
                  ? "border-[#20B2AA] bg-[#20B2AA]/10"
                  : "border-gray-200"
              }`}
          >
            <div className="flex gap-3">
              <FileText size={22} />
              <div>
                <h3 className="font-medium">PDF</h3>
                <p className="text-sm text-gray-500">
                  Best for printing
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setShow(false)}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleExport}
            className="px-4 py-2 bg-[#20B2AA] text-white rounded-lg"
          >
            Export
          </button>
        </div>

      </div>
    </div>
  );
}

export default ExportModal;