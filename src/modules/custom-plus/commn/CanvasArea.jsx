import { Rnd } from "react-rnd";

import {
  Copy,
  Trash2,
  Layers3,
} from "lucide-react";

function CanvasArea({
  canvasRef,
  certificateImage,
  elements,
  updateElement,
  selectedElementId,
  setSelectedElementId,
  duplicateElement,
  deleteElement,
}) {
  return (
    <div
      className="
        flex-1
        overflow-auto
        p-6
        bg-[#eef1f5]
      "
    >
      <div
        className="
          flex
          justify-center
          min-w-max
        "
      >
        <div
          className="
            bg-white
            rounded-2xl
            shadow-xl
            border
            border-gray-200
            overflow-hidden
          "
        >
          {/* Header */}
          <div
            className="
              h-14
              px-5
              border-b
              flex
              items-center
              justify-between
              bg-white
            "
          >
            <h2
              className="
                text-lg
                font-semibold
              "
            >
              Certificate Canvas
            </h2>

            <span
              className="
                text-sm
                text-gray-500
              "
            >
              Drag & Resize Enabled
            </span>
          </div>

          {/* Canvas */}
          <div
            ref={canvasRef}
            className="
              relative
              w-[1000px]
              h-[700px]
              bg-white
              overflow-hidden
            "
          >
            {/* Certificate */}
            {certificateImage ? (
              <img
                src={
                  certificateImage
                }
                alt="certificate"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-contain
                "
              />
            ) : (
              <div
                className="
                  w-full
                  h-full
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  text-xl
                "
              >
                Upload Certificate
              </div>
            )}

            {/* Elements */}
            {elements.map(
              (element) => (
                <Rnd
                  key={element.id}
                  size={{
                    width:
                      element.width,
                    height:
                      element.height,
                  }}
                  position={{
                    x: element.x,
                    y: element.y,
                  }}
                  onDragStop={(
                    e,
                    d
                  ) => {
                    updateElement(
                      element.id,
                      {
                        x: d.x,
                        y: d.y,
                      }
                    );
                  }}
                  onResizeStop={(
                    e,
                    dir,
                    ref,
                    delta,
                    position
                  ) => {
                    updateElement(
                      element.id,
                      {
                        width:
                          parseInt(
                            ref.style
                              .width
                          ),
                        height:
                          parseInt(
                            ref.style
                              .height
                          ),
                        ...position,
                      }
                    );
                  }}
                  bounds="parent"
                >
                  <div
                    onClick={() =>
                      setSelectedElementId(
                        element.id
                      )
                    }
                    className={`
                      relative
                      w-full
                      h-full
                      cursor-move
                      flex
                      items-center
                      justify-center

                      ${
                        selectedElementId ===
                        element.id
                          ? "border-2 border-blue-500"
                          : ""
                      }
                    `}
                  >
                    {/* Floating Toolbar */}
                    {selectedElementId ===
                      element.id && (
                      <div
                        className="
                          absolute
                          -top-12
                          left-0
                          flex
                          items-center
                          gap-2
                          bg-white
                          border
                          rounded-lg
                          shadow-md
                          px-2
                          py-1
                          z-50
                        "
                      >
                        <button
                          onClick={() =>
                            duplicateElement(
                              element
                            )
                          }
                        >
                          <Copy
                            size={16}
                          />
                        </button>

                        <button
                          onClick={() =>
                            duplicateElement(
                              element
                            )
                          }
                        >
                          <Layers3
                            size={16}
                          />
                        </button>

                        <button
                          onClick={() =>
                            deleteElement(
                              element.id
                            )
                          }
                        >
                          <Trash2
                            size={16}
                            className="
                              text-red-500
                            "
                          />
                        </button>
                      </div>
                    )}

                    <div
                      style={{
                        color:
                          element.color,
                        fontSize:
                          element.fontSize,
                        fontFamily:
                          element.fontFamily,
                        fontWeight:
                          element.fontWeight,
                        fontStyle:
                          element.fontStyle,
                        textAlign:
                          element.textAlign,
                      }}
                      className="
                        w-full
                        h-full
                        flex
                        items-center
                        justify-center
                        select-none
                      "
                    >
                      {element.value}
                    </div>
                  </div>
                </Rnd>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CanvasArea;