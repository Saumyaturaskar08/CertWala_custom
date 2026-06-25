import { useRef, useState } from "react";
import { ArrowLeft, Lock, Unlock, Copy, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

import LeftToolbar from "../commn/LeftToolbar";
import CanvasArea from "../commn/CanvasArea";
import PageManager from "../commn/PageManager";

import SizeModal from "../commn/SizeModal";
import StickerModal from "../commn/StickerModal";
import TextModal from "../commn/TextModal";
import TextEditorModal from "../commn/TextEditorModal";
import PreviewModal from "../commn/PreviewModal";
import ExportModal from "../commn/ExportModal";

import Button from "../../../components/ui/Button";

function CustomPlus() {
  const canvasRef = useRef(null);  
  const navigate = useNavigate();

  const [pages, setPages] = useState([
    {
      id: 1,
      name: "Page 1",
      width: 1123,
      height: 794,
      certificateImage: null,
      elements: [],
      locked: false,
    },
  ]);

  const [activePage, setActivePage] = useState(0);
  const [selectedElementId, setSelectedElementId] = useState(null);

  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showStickerModal, setShowStickerModal] = useState(false);
  const [showTextMenu, setShowTextMenu] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const currentPage = pages[activePage];
  const elements = currentPage.elements || [];
  const selectedElement = elements.find((el) => el.id === selectedElementId);
  const isPageLocked = !!currentPage.locked;

  const certificateImage = currentPage.certificateImage;
  const canvasWidth = currentPage.width;
  const canvasHeight = currentPage.height;

  const updateCurrentPage = (updates) => {
    setPages((prev) =>
      prev.map((page, index) =>
        index === activePage ? { ...page, ...updates } : page
      )
    );
  };

  const togglePageLock = () => {
    updateCurrentPage({ locked: !isPageLocked });
    setSelectedElementId(null);
  };

  const addUploadedImage = (src) => {
    if (isPageLocked) return;

    const image = {
      id: Date.now(),
      type: "image",
      src,
      x: 150,
      y: 150,
      width: 200,
      height: 150,
    };

    updateCurrentPage({
      elements: [...elements, image],
    });

    setSelectedElementId(image.id);
  };

  const setCurrentPageImage = (image) => {
    if (isPageLocked) return;

    updateCurrentPage({
      certificateImage: image,
    });
  };

  const addText = (value = "{{Name}}") => {
    if (isPageLocked) return;

    const text = {
      id: Date.now(),
      type: "text",
      value,
      x: 150,
      y: 150,
      width: 220,
      height: 50,
      fontSize: 32,
      color: "#000",
      fontWeight: "normal",
      fontStyle: "normal",
    };

    updateCurrentPage({
      elements: [...elements, text],
    });

    setSelectedElementId(text.id);
  };

  const addSticker = (src) => {
    if (isPageLocked) return;

    const sticker = {
      id: Date.now(),
      type: "sticker",
      src,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    };

    updateCurrentPage({
      elements: [...elements, sticker],
    });

    setSelectedElementId(sticker.id);
  };

  const updateElement = (id, updates) => {
    if (isPageLocked) return;

    const updated = elements.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );

    updateCurrentPage({
      elements: updated,
    });
  };

  const deleteElement = (id) => {
    if (isPageLocked) return;

    updateCurrentPage({
      elements: elements.filter((item) => item.id !== id),
    });

    setSelectedElementId(null);
  };

  const duplicateElement = (element) => {
    if (isPageLocked) return;

    const copy = {
      ...element,
      id: Date.now(),
      x: element.x + 20,
      y: element.y + 20,
    };

    updateCurrentPage({
      elements: [...elements, copy],
    });
  };

  const addPage = () => {
    const newPage = {
      id: Date.now(),
      name: `Page ${pages.length + 1}`,
      width: 1123,
      height: 794,
      certificateImage: null,
      elements: [],
      locked: false,
    };

    setPages((prev) => [...prev, newPage]);
    setActivePage(pages.length);
    setSelectedElementId(null);
  };

  const prepareCanvasForExport = () => {
    if (!canvasRef.current) return null;

    const innerWrapper = canvasRef.current.parentElement;
    const grandParentWrapper = innerWrapper?.parentElement;
    const originalTransform = grandParentWrapper ? grandParentWrapper.style.transform : "";

    if (grandParentWrapper) {
      grandParentWrapper.style.transform = "none";
    }

    const currentSelectedId = selectedElementId;
    setSelectedElementId(null);

    return { grandParentWrapper, originalTransform, currentSelectedId };
  };

  const restoreCanvasAfterExport = (cleanupData) => {
    if (!cleanupData) return;
    const { grandParentWrapper, originalTransform, currentSelectedId } = cleanupData;

    if (grandParentWrapper) {
      grandParentWrapper.style.transform = originalTransform;
    }
    setSelectedElementId(currentSelectedId);
  };

  const downloadPNG = async () => {
    const cleanupData = prepareCanvasForExport();
    if (!cleanupData) return;

    await new Promise((resolve) => setTimeout(resolve, 60));

    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = "certificate.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("PNG Export Failed:", err);
    } finally {
      restoreCanvasAfterExport(cleanupData);
    }
  };

  const downloadJPEG = async () => {
    const cleanupData = prepareCanvasForExport();
    if (!cleanupData) return;

    await new Promise((resolve) => setTimeout(resolve, 60));

    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = "certificate.jpg";
      link.href = canvas.toDataURL("image/jpeg", 1.0);
      link.click();
    } catch (err) {
      console.error("JPEG Export Failed:", err);
    } finally {
      restoreCanvasAfterExport(cleanupData);
    }
  };

  const downloadPDF = async () => {
    const cleanupData = prepareCanvasForExport();
    if (!cleanupData) return;

    await new Promise((resolve) => setTimeout(resolve, 60));

    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        scale: 2,
      });

      const img = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvasWidth, canvasHeight],
      });

      pdf.addImage(img, "PNG", 0, 0, canvasWidth, canvasHeight);
      pdf.save("certificate.pdf");
    } catch (err) {
      console.error("PDF Export Failed:", err);
    } finally {
      restoreCanvasAfterExport(cleanupData);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-[#eef1f5]">
      <LeftToolbar
        setShowSizeModal={setShowSizeModal}
        setShowStickerModal={setShowStickerModal}
        setShowTextMenu={setShowTextMenu}
        setCertificateImage={setCurrentPageImage}
        downloadPNG={downloadPNG}
        addText={addText}
        addUploadedImage={addUploadedImage}
        setShowPreview={setShowPreview}
        setShowExportModal={setShowExportModal}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="h-14 bg-white border-b border-gray-200 px-5 flex items-center justify-between">
          <Button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </Button>

          <h2 className="font-semibold text-lg">Custom+</h2>

          <div className="flex items-center gap-2">
            <Button
              onClick={togglePageLock}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              {isPageLocked ? <Unlock size={18} /> : <Lock size={18} />}
              {isPageLocked ? "Unlock Page" : "Lock Page"}
            </Button>

            <Button
              onClick={downloadPNG}
              className="bg-[#20B2AA] text-white px-4 py-2 rounded-lg"
            >
              Download PNG
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-col flex-1 overflow-hidden">
            <CanvasArea
              canvasRef={canvasRef}
              certificateImage={certificateImage}
              elements={elements}
              updateElement={updateElement}
              selectedElementId={selectedElementId}
              setSelectedElementId={setSelectedElementId}
              duplicateElement={duplicateElement}
              deleteElement={deleteElement}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              isPageLocked={isPageLocked}
            />

            <PageManager
              pages={pages}
              activePage={activePage}
              setActivePage={(index) => {
                setActivePage(index);
                setSelectedElementId(null);
              }}
              addPage={addPage}
            />
          </div>
        </div>
      </div>

      <SizeModal
        show={showSizeModal}
        setShow={setShowSizeModal}
        changePageSize={(width, height) => {
          updateCurrentPage({ width, height });
        }}
      />

      <StickerModal
        show={showStickerModal}
        setShow={setShowStickerModal}
        addSticker={addSticker}
      />

      <TextModal
        show={showTextMenu}
        setShow={setShowTextMenu}
        addText={addText}
      />

      <PreviewModal
        show={showPreview}
        setShow={setShowPreview}
        certificateImage={certificateImage}
        elements={elements}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />

      <ExportModal
        show={showExportModal}
        setShow={setShowExportModal}
        exportPNG={downloadPNG}
        exportJPEG={downloadJPEG}
        exportPDF={downloadPDF}
      />

      {selectedElement?.type === "text" && !isPageLocked && (
        <TextEditorModal
          selectedElement={selectedElement}
          updateElement={updateElement}
        />
      )}
    </div>
  );
}

export default CustomPlus;


// without lock Unlock feature

// import { useRef, useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";

// import LeftToolbar from "../commn/LeftToolbar";
// import CanvasArea from "../commn/CanvasArea";
// import PageManager from "../commn/PageManager";

// import SizeModal from "../commn/SizeModal";
// import StickerModal from "../commn/StickerModal";
// import TextModal from "../commn/TextModal";
// import TextEditorModal from "../commn/TextEditorModal";
// import PreviewModal from "../commn/PreviewModal";
// import ExportModal from "../commn/ExportModal";

// import Button from "../../../components/ui/Button";

// function CustomPlus() {
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();

//   const [pages, setPages] = useState([
//     {
//       id: 1,
//       name: "Page 1",
//       width: 1123,
//       height: 794,
//       certificateImage: null,
//       elements: [],
//     },
//   ]);

//   const [activePage, setActivePage] = useState(0);
//   const [selectedElementId, setSelectedElementId] = useState(null);

//   const [showSizeModal, setShowSizeModal] = useState(false);
//   const [showStickerModal, setShowStickerModal] = useState(false);
//   const [showTextMenu, setShowTextMenu] = useState(false);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [showPreview, setShowPreview] = useState(false);
//   const [showExportModal, setShowExportModal] = useState(false);

//   const currentPage = pages[activePage];
//   const elements = currentPage.elements || [];
//   const selectedElement = elements.find((el) => el.id === selectedElementId);

//   const certificateImage = currentPage.certificateImage;
//   const canvasWidth = currentPage.width;
//   const canvasHeight = currentPage.height;

//   const updateCurrentPage = (updates) => {
//     setPages((prev) =>
//       prev.map((page, index) =>
//         index === activePage ? { ...page, ...updates } : page
//       )
//     );
//   };

//   const addUploadedImage = (src) => {
//     const image = {
//       id: Date.now(),
//       type: "image",
//       src,
//       x: 150,
//       y: 150,
//       width: 200,
//       height: 150,
//     };

//     updateCurrentPage({
//       elements: [...elements, image],
//     });

//     setSelectedElementId(image.id);
//   };

//   const setCurrentPageImage = (image) => {
//     updateCurrentPage({
//       certificateImage: image,
//     });
//   };

//   const addText = (value = "{{Name}}") => {
//     const text = {
//       id: Date.now(),
//       type: "text",
//       value,
//       x: 150,
//       y: 150,
//       width: 220,
//       height: 50,
//       fontSize: 32,
//       color: "#000",
//       fontWeight: "normal",
//       fontStyle: "normal",
//     };

//     updateCurrentPage({
//       elements: [...elements, text],
//     });

//     setSelectedElementId(text.id);
//   };

//   const addSticker = (src) => {
//     const sticker = {
//       id: Date.now(),
//       type: "sticker",
//       src,
//       x: 200,
//       y: 200,
//       width: 100,
//       height: 100,
//     };

//     updateCurrentPage({
//       elements: [...elements, sticker],
//     });

//     setSelectedElementId(sticker.id);
//   };

//   const updateElement = (id, updates) => {
//     const updated = elements.map((item) =>
//       item.id === id ? { ...item, ...updates } : item
//     );

//     updateCurrentPage({
//       elements: updated,
//     });
//   };

//   const deleteElement = (id) => {
//     updateCurrentPage({
//       elements: elements.filter((item) => item.id !== id),
//     });

//     setSelectedElementId(null);
//   };

//   const duplicateElement = (element) => {
//     const copy = {
//       ...element,
//       id: Date.now(),
//       x: element.x + 20,
//       y: element.y + 20,
//     };

//     updateCurrentPage({
//       elements: [...elements, copy],
//     });
//   };

//   const addPage = () => {
//     const newPage = {
//       id: Date.now(),
//       name: `Page ${pages.length + 1}`,
//       width: 1123,
//       height: 794,
//       certificateImage: null,
//       elements: [],
//     };

//     setPages((prev) => [...prev, newPage]);
//     setActivePage(pages.length);
//     setSelectedElementId(null);
//   };

//   // Helper function to handle scaling reset and UI-cleanup before layout rendering
//   const prepareCanvasForExport = () => {
//     if (!canvasRef.current) return null;

//     // CanvasArea hierarchy: canvasRef -> innerWrapper -> scaledWrapper (grandParent)
//     const innerWrapper = canvasRef.current.parentElement;
//     const grandParentWrapper = innerWrapper?.parentElement;
//     const originalTransform = grandParentWrapper ? grandParentWrapper.style.transform : "";

//     if (grandParentWrapper) {
//       grandParentWrapper.style.transform = "none";
//     }

//     const currentSelectedId = selectedElementId;
//     setSelectedElementId(null);

//     return { grandParentWrapper, originalTransform, currentSelectedId };
//   };

//   // Helper function to restore scale and selections back to normal UI view
//   const restoreCanvasAfterExport = (cleanupData) => {
//     if (!cleanupData) return;
//     const { grandParentWrapper, originalTransform, currentSelectedId } = cleanupData;

//     if (grandParentWrapper) {
//       grandParentWrapper.style.transform = originalTransform;
//     }
//     setSelectedElementId(currentSelectedId);
//   };

//   const downloadPNG = async () => {
//     const cleanupData = prepareCanvasForExport();
//     if (!cleanupData) return;

//     // Small delay to allow browser layout engine to catch up with transform removal
//     await new Promise((resolve) => setTimeout(resolve, 60));

//     try {
//       const canvas = await html2canvas(canvasRef.current, {
//         backgroundColor: "#ffffff",
//         useCORS: true,
//         allowTaint: true,
//         scale: 2, // High resolution crisp exports
//       });

//       const link = document.createElement("a");
//       link.download = "certificate.png";
//       link.href = canvas.toDataURL("image/png");
//       link.click();
//     } catch (err) {
//       console.error("PNG Export Failed:", err);
//     } finally {
//       restoreCanvasAfterExport(cleanupData);
//     }
//   };

//   const downloadJPEG = async () => {
//     const cleanupData = prepareCanvasForExport();
//     if (!cleanupData) return;

//     await new Promise((resolve) => setTimeout(resolve, 60));

//     try {
//       const canvas = await html2canvas(canvasRef.current, {
//         backgroundColor: "#ffffff",
//         useCORS: true,
//         allowTaint: true,
//         scale: 2,
//       });

//       const link = document.createElement("a");
//       link.download = "certificate.jpg";
//       link.href = canvas.toDataURL("image/jpeg", 1.0);
//       link.click();
//     } catch (err) {
//       console.error("JPEG Export Failed:", err);
//     } finally {
//       restoreCanvasAfterExport(cleanupData);
//     }
//   };

//   const downloadPDF = async () => {
//     const cleanupData = prepareCanvasForExport();
//     if (!cleanupData) return;

//     await new Promise((resolve) => setTimeout(resolve, 60));

//     try {
//       const canvas = await html2canvas(canvasRef.current, {
//         backgroundColor: "#ffffff",
//         useCORS: true,
//         allowTaint: true,
//         scale: 2,
//       });

//       const img = canvas.toDataURL("image/png");

//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "px",
//         format: [canvasWidth, canvasHeight],
//       });

//       pdf.addImage(img, "PNG", 0, 0, canvasWidth, canvasHeight);
//       pdf.save("certificate.pdf");
//     } catch (err) {
//       console.error("PDF Export Failed:", err);
//     } finally {
//       restoreCanvasAfterExport(cleanupData);
//     }
//   };

//   return (
//     <div className="h-screen flex overflow-hidden bg-[#eef1f5]">
//       <LeftToolbar
//         setShowSizeModal={setShowSizeModal}
//         setShowStickerModal={setShowStickerModal}
//         setShowTextMenu={setShowTextMenu}
//         setCertificateImage={setCurrentPageImage}
//         downloadPNG={downloadPNG}
//         addText={addText}
//         addUploadedImage={addUploadedImage}
//         setShowPreview={setShowPreview}
//         setShowExportModal={setShowExportModal}
//       />

//       <div className="flex flex-col flex-1 overflow-hidden">
//         {/* Top Header */}
//         <div className="h-14 bg-white border-b border-gray-200 px-5 flex items-center justify-between">
//           <Button
//             onClick={() => {
//               navigate("/");
//             }}
//             className="flex items-center gap-2"
//           >
//             <ArrowLeft size={18} />
//             Back
//           </Button>

//           <h2 className="font-semibold text-lg">Custom+</h2>

//           <Button
//             onClick={downloadPNG}
//             className="bg-[#20B2AA] text-white px-4 py-2 rounded-lg"
//           >
//             Download PNG
//           </Button>
//         </div>

//         {/* Canvas + Pages */}
//         <div className="flex flex-1 overflow-hidden">
//           <div className="flex flex-col flex-1 overflow-hidden">
//             <CanvasArea
//               canvasRef={canvasRef}
//               certificateImage={certificateImage}
//               elements={elements}
//               updateElement={updateElement}
//               selectedElementId={selectedElementId}
//               setSelectedElementId={setSelectedElementId}
//               duplicateElement={duplicateElement}
//               deleteElement={deleteElement}
//               canvasWidth={canvasWidth}
//               canvasHeight={canvasHeight}
//               uploadedImages={uploadedImages}
//             />

//             <PageManager
//               pages={pages}
//               activePage={activePage}
//               setActivePage={(index) => {
//                 setActivePage(index);
//                 setSelectedElementId(null);
//               }}
//               addPage={addPage}
//             />
//           </div>
//         </div>
//       </div>

//       <SizeModal
//         show={showSizeModal}
//         setShow={setShowSizeModal}
//         changePageSize={(width, height) => {
//           updateCurrentPage({ width, height });
//         }}
//       />

//       <StickerModal
//         show={showStickerModal}
//         setShow={setShowStickerModal}
//         addSticker={addSticker}
//       />

//       <TextModal
//         show={showTextMenu}
//         setShow={setShowTextMenu}
//         addText={addText}
//       />

//       <PreviewModal
//         show={showPreview}
//         setShow={setShowPreview}
//         certificateImage={certificateImage}
//         elements={elements}
//         canvasWidth={canvasWidth}
//         canvasHeight={canvasHeight}
//       />

//       <ExportModal
//         show={showExportModal}
//         setShow={setShowExportModal}
//         exportPNG={downloadPNG}
//         exportJPEG={downloadJPEG}
//         exportPDF={downloadPDF}
//       />

//       {selectedElement?.type === "text" && (
//         <TextEditorModal
//           selectedElement={selectedElement}
//           updateElement={updateElement}
//         />
//       )}
//     </div>
//   );
// }

// export default CustomPlus;