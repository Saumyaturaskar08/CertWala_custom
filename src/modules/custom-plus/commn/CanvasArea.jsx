import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";

function CanvasArea({
  canvasRef,
  certificateImage,
  elements,
  updateElement,
  selectedElementId,
  setSelectedElementId,
  canvasWidth,
  canvasHeight,
  isPageLocked,
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resize = () => {
      const availableWidth = window.innerWidth - 300;
      const availableHeight = window.innerHeight - 180;

      const scaleX = availableWidth / canvasWidth;
      const scaleY = availableHeight / canvasHeight;

      setScale(Math.min(scaleX, scaleY, 1));
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [canvasWidth, canvasHeight]);

  return (
    <div className="flex-1 bg-[#eef1f5] overflow-hidden flex justify-center items-center">
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div
            ref={canvasRef}
            onClick={() => {
              if (!isPageLocked) setSelectedElementId(null);
            }}
            style={{
              width: canvasWidth,
              height: canvasHeight,
            }}
            className="relative bg-white overflow-hidden"
          >
            {certificateImage && (
              <img
                src={certificateImage}
                alt=""
                className="absolute inset-0 w-full h-full object-fill"
              />
            )}

            {elements.map((element) => (
              <Rnd
                key={element.id}
                size={{
                  width: element.width,
                  height: element.height,
                }}
                position={{
                  x: element.x,
                  y: element.y,
                }}
                bounds="parent"
                scale={scale}
                enableUserSelectHack={false}
                disableDragging={isPageLocked || element.locked}
                enableResizing={!isPageLocked && !element.locked}
                onDragStop={(e, d) => {
                  if (isPageLocked || element.locked) return;
                  updateElement(element.id, {
                    x: d.x,
                    y: d.y,
                  });
                }}
                onResizeStop={(e, dir, ref, delta, position) => {
                  if (isPageLocked || element.locked) return;
                  updateElement(element.id, {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    ...position,
                  });
                }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isPageLocked) setSelectedElementId(element.id);
                  }}
                  className={`
                    relative
                    w-full
                    h-full
                    cursor-move
                    ${selectedElementId === element.id ? "border-2 border-violet-500" : ""}
                    ${isPageLocked ? "cursor-not-allowed" : ""}
                    ${element.locked ? "opacity-90" : ""}
                  `}
                >
                  {element.type === "text" && (
                    <div
                      style={{
                        fontSize: element.fontSize,
                        color: element.color,
                        fontWeight: element.fontWeight,
                        fontStyle: element.fontStyle,
                      }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {element.value}
                    </div>
                  )}

                  {element.type === "image" && (
                    <img
                      src={element.src}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  )}

                  {element.type === "sticker" && (
                    <img
                      src={element.src}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </Rnd>
            ))}

            {isPageLocked && (
              <div className="absolute top-3 right-3 bg-black/70 text-white text-sm px-3 py-1 rounded-md">
                Page Locked
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CanvasArea;

// Without lock Unlock feature

// import { useEffect, useState } from "react";
// import { Rnd } from "react-rnd";
// import { Copy, Trash2 } from "lucide-react";

// function CanvasArea({
//   canvasRef,
//   certificateImage,
//   elements,
//   updateElement,
//   selectedElementId,
//   setSelectedElementId,
//   duplicateElement,
//   deleteElement,
//   canvasWidth,
//   canvasHeight,
// }) {
//   const [scale, setScale] = useState(1);

//   useEffect(() => {
//     const resize = () => {
//       const availableWidth = window.innerWidth - 300;
//       const availableHeight = window.innerHeight - 180;

//       const scaleX = availableWidth / canvasWidth;
//       const scaleY = availableHeight / canvasHeight;

//       setScale(Math.min(scaleX, scaleY, 1));
//     };

//     resize();

//     window.addEventListener("resize", resize);

//     return () => {
//       window.removeEventListener("resize", resize);
//     };
//   }, [canvasWidth, canvasHeight]);

//   return (
//     <div
//       className="
//       flex-1
//       bg-[#eef1f5]
//       overflow-hidden
//       flex
//       justify-center
//       items-center
//     "
//     >
//       <div
//         style={{
//           transform: `scale(${scale})`,
//           transformOrigin: "center",
//         }}
//       >
//         <div
//           className="
//           bg-white
//           rounded-xl
//           shadow-xl
//           overflow-hidden
//         "
//         >
//           <div
//             ref={canvasRef}
//             onClick={() => setSelectedElementId(null)}
//             style={{
//               width: canvasWidth,
//               height: canvasHeight,
//             }}
//             className="
//             relative
//             bg-white
//             overflow-hidden
//           "
//           >
//             {certificateImage && (
//               <img
//                 src={certificateImage}
//                 alt=""
//                 className="
//                 absolute
//                 inset-0
//                 w-full
//                 h-full
//                 object-fill
//               "
//               />
//             )}

//             {elements.map((element) => (
//               <Rnd
//                 key={element.id}
//                 size={{
//                   width: element.width,
//                   height: element.height,
//                 }}
//                 position={{
//                   x: element.x,
//                   y: element.y,
//                 }}
//                 bounds="parent"
//                 scale={scale}
//                 enableUserSelectHack={false}
//                 onDragStop={(e, d) => {
//                   updateElement(element.id, {
//                     x: d.x,
//                     y: d.y,
//                   });
//                 }}
//                 onResizeStop={(e, dir, ref, delta, position) => {
//                   updateElement(element.id, {
//                     width: parseInt(ref.style.width),
//                     height: parseInt(ref.style.height),
//                     ...position,
//                   });
//                 }}
//               >
//                 <div
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedElementId(element.id);
//                   }}
//                   className={`
//                   relative
//                   w-full
//                   h-full
//                   cursor-move
//                   ${
//                     selectedElementId === element.id
//                       ? "border-2 border-violet-500"
//                       : ""
//                   }
//                 `}
//                 >
//                   {selectedElementId === element.id && (
//                     <div
//                       className="
//                       absolute
//                       -top-12
//                       left-0
//                       bg-white
//                       border
//                       rounded-lg
//                       shadow
//                       flex
//                       gap-2
//                       px-2
//                       py-1
//                       z-50
//                     "
//                     >
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           duplicateElement(element);
//                         }}
//                       >
//                         <Copy size={16} />
//                       </button>

//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteElement(element.id);
//                         }}
//                       >
//                         <Trash2
//                           size={16}
//                           className="text-red-500"
//                         />
//                       </button>
//                     </div>
//                   )}

//                   {/* TEXT */}
//                   {element.type === "text" && (
//                     <div
//                       style={{
//                         fontSize: element.fontSize,
//                         color: element.color,
//                         fontWeight: element.fontWeight,
//                         fontStyle: element.fontStyle,
//                       }}
//                       className="
//                       w-full
//                       h-full
//                       flex
//                       items-center
//                       justify-center
//                     "
//                     >
//                       {element.value}
//                     </div>
//                   )}

//                   {/* IMAGE */}
//                   {element.type === "image" && (
//                     <img
//                       src={element.src}
//                       alt=""
//                       className="
//                       w-full
//                       h-full
//                       object-contain
//                     "
//                     />
//                   )}

//                   {/* STICKER */}
//                   {element.type === "sticker" && (
//                     <img
//                       src={element.src}
//                       alt=""
//                       className="
//                       w-full
//                       h-full
//                       object-contain
//                     "
//                     />
//                   )}
//                 </div>
//               </Rnd>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CanvasArea;



