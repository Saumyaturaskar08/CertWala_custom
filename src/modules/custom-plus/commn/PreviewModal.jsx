import { X } from "lucide-react";

function PreviewModal({
  show,
  setShow,
  certificateImage,
  elements,
  canvasWidth,
  canvasHeight,
}) {
  if (!show) return null;

  const scale = Math.min(
    (window.innerWidth - 100) / canvasWidth,
    (window.innerHeight - 100) / canvasHeight,
    1
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">

      <div className="bg-white w-[95vw] h-[95vh] rounded-xl shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex justify-end p-3 border-b">
          <button
            onClick={() => setShow(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Preview */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">

          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center",
            }}
          >
            <div
              style={{
                width: canvasWidth,
                height: canvasHeight,
              }}
              className="relative bg-white"
            >

              {certificateImage && (
                <img
                  src={certificateImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-fill"
                />
              )}

              {elements.map((element) => {

                if (
                  element.type === "image" ||
                  element.type === "sticker"
                ) {
                  return (
                    <img
                      key={element.id}
                      src={element.src}
                      alt=""
                      style={{
                        position: "absolute",
                        left: element.x,
                        top: element.y,
                        width: element.width,
                        height: element.height,
                      }}
                    />
                  );
                }

                return (
                  <div
                    key={element.id}
                    style={{
                      position: "absolute",
                      left: element.x,
                      top: element.y,
                      width: element.width,
                      height: element.height,
                      fontSize: element.fontSize,
                      color: element.color,
                      fontWeight: element.fontWeight,
                      fontStyle: element.fontStyle,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {element.value}
                  </div>
                );

              })}

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default PreviewModal;