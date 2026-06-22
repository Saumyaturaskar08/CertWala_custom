import { useRef, useState } from "react";
// import html2canvas from "html2canvas";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas-pro";

import LeftToolbar from "../commn/LeftToolbar";
import CanvasArea from "../commn/CanvasArea";
import PropertiesPanel from "../commn/PropertiesPanel";
import PageManager from "../commn/PageManager";
import Button from "../../../components/ui/Button"

function CustomPlus() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [
    certificateImage,
    setCertificateImage,
  ] = useState(null);

  const [pages, setPages] = useState([
    {
      id: 1,
      name: "Page 1",
    },
  ]);

  const [
    activePage,
    setActivePage,
  ] = useState(0);

  const [elements, setElements] =
    useState([
      {
        id: Date.now(),
        type: "text",
        value: "{{Name}}",
        x: 250,
        y: 180,
        width: 220,
        height: 50,
        fontSize: 32,
        color: "#BB860B",
        fontFamily: "Poppins",
        fontWeight: "bold",
        fontStyle: "normal",
        textAlign: "center",
      },
    ]);

  const [
    selectedElementId,
    setSelectedElementId,
  ] = useState(null);

  const selectedElement =
    elements.find(
      (el) =>
        el.id ===
        selectedElementId
    );

  const addText = () => {
    const newText = {
      id: Date.now(),
      type: "text",
      value: "New Text",
      x: 150,
      y: 150,
      width: 220,
      height: 50,
      fontSize: 28,
      color: "#000000",
      fontFamily: "Poppins",
      fontWeight: "normal",
      fontStyle: "normal",
      textAlign: "center",
    };

    setElements((prev) => [
      ...prev,
      newText,
    ]);

    setSelectedElementId(
      newText.id
    );
  };

  const updateElement = (
    id,
    updates
  ) => {
    setElements((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
            }
          : item
      )
    );
  };

  const deleteElement = (
    id
  ) => {
    setElements((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );

    setSelectedElementId(null);
  };

  const duplicateElement = (
    element
  ) => {
    const copy = {
      ...element,
      id: Date.now(),
      x: element.x + 20,
      y: element.y + 20,
    };

    setElements((prev) => [
      ...prev,
      copy,
    ]);
  };

  const addPage = () => {
    setPages((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: `Page ${
          prev.length + 1
        }`,
      },
    ]);
  };

  // const downloadPNG =
  //   async () => {
  //     if (!canvasRef.current)
  //       return;

  //     const canvas =
  //       await html2canvas(
  //         canvasRef.current
  //       );
     

  //     const link =
  //       document.createElement(
  //         "a"
  //       );

  //     link.download =
  //       "certificate.png";

  //     link.href =
  //       canvas.toDataURL(
  //         "image/png"
  //       );

  //     link.click();
  //   };
  const downloadPNG = async () => {
  if (!canvasRef.current) return;

  const canvas = await html2canvas(canvasRef.current, {
    backgroundColor: "#ffffff",
    useCORS: true,
  });

  const link = document.createElement("a");
  link.download = "certificate.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};

  return (
   
    <div
className="
h-screen
flex
overflow-hidden
bg-[#eef1f5]

min-w-0
"
>

      {/* Left Toolbar */}
      <LeftToolbar
        addText={addText}
        setCertificateImage={
          setCertificateImage
        }
        downloadPNG={
          downloadPNG
        }
      />

      {/* Main Content */}
      {/* <div className="flex flex-col flex-1 overflow-hidden"> */}
      <div
className="
flex
flex-col

flex-1

min-w-0

overflow-hidden
"
>

        {/* Top Header */}
       
        <div
className="
h-14

bg-white

border-b
border-gray-200

px-2
md:px-6

flex
items-center

justify-between

gap-2

flex-shrink-0
"
>

          <Button
      onClick={() => navigate("/")}
     
      className="
flex
items-center

gap-1

px-2
md:px-3

py-2

text-xs
md:text-sm
"
    >
      <ArrowLeft size={18} />
      Back
    </Button>
    
         
          <h2
className="
text-sm
md:text-lg

font-semibold

text-gray-800

truncate
"
>
Custom+
</h2>

          <Button
            onClick={
              downloadPNG
            }
            
            className="
px-2
md:px-4

py-2

text-xs
md:text-sm

bg-[#20B2AA]

text-white

rounded-lg
"
          >
            Download PNG
          </Button>
        </div>

        {/* Canvas + Pages */}
        <div className="flex flex-1 overflow-hidden">

          {/* Canvas Section */}
          <div className="flex flex-col flex-1 overflow-hidden">

            <CanvasArea
              canvasRef={
                canvasRef
              }
              certificateImage={
                certificateImage
              }
              elements={
                elements
              }
              updateElement={
                updateElement
              }
              selectedElementId={
                selectedElementId
              }
              setSelectedElementId={
                setSelectedElementId
              }
              duplicateElement={
                duplicateElement
              }
              deleteElement={
                deleteElement
              }
            />

            {/* <PageManager
              pages={pages}
              activePage={
                activePage
              }
              setActivePage={
                setActivePage
              }
              addPage={
                addPage
              }
            /> */}
            <div className="hidden md:block">

  <PageManager
    pages={pages}
    activePage={
      activePage
    }
    setActivePage={
      setActivePage
    }
    addPage={
      addPage
    }
  />

</div>

          </div>

          {/* Properties */}
          {/* <PropertiesPanel
            selectedElement={
              selectedElement
            }
            updateElement={
              updateElement
            }
          /> */}
          <div className="hidden md:block">

  <PropertiesPanel
    selectedElement={
      selectedElement
    }
    updateElement={
      updateElement
    }
  />

</div>

        </div>

      </div>

    </div>
  );
}

export default CustomPlus;