import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette,
} from "lucide-react";

import Button from "../../../components/ui/Button"

function PropertiesPanel({
  selectedElement,
  updateElement,
}) {
  if (!selectedElement) {
    return (
      <div
        className="
          w-80
          bg-white
          border-l
          border-gray-200
          flex
          items-center
          justify-center
          text-gray-400
        "
      >
        Select Element
      </div>
    );
  }

  return (
    <div
      className="
        w-80
        bg-white
        border-l
        border-gray-200
        overflow-y-auto
      "
    >
      {/* Header */}
      <div
        className="
          p-5
          border-b
        "
      >
        <h2
          className="
            text-lg
            font-semibold
          "
        >
          Properties
        </h2>

        <p
          className="
            text-sm
            text-gray-500
          "
        >
          Edit selected text
        </p>
      </div>

      <div className="p-5 space-y-5">

        {/* Text */}
        <div>
          <label
            className="
              flex
              items-center
              gap-2
              text-sm
              mb-2
            "
          >
            <Type size={16} />
            Text
          </label>

          <textarea
            rows="3"
            value={
              selectedElement.value
            }
            onChange={(e) =>
              updateElement(
                selectedElement.id,
                {
                  value:
                    e.target.value,
                }
              )
            }
            className="
              w-full
              border
              rounded-lg
              p-3
              resize-none
            "
          />
        </div>

        {/* Font Size */}
        <div>
          <label
            className="
              text-sm
              mb-2
              block
            "
          >
            Font Size
          </label>

          <input
            type="number"
            value={
              selectedElement.fontSize
            }
            onChange={(e) =>
              updateElement(
                selectedElement.id,
                {
                  fontSize:
                    Number(
                      e.target.value
                    ),
                }
              )
            }
            className="
              w-full
              border
              rounded-lg
              p-3
            "
          />
        </div>

        {/* Font Family */}
        <div>
          <label
            className="
              text-sm
              mb-2
              block
            "
          >
            Font Family
          </label>

          <select
            value={
              selectedElement.fontFamily
            }
            onChange={(e) =>
              updateElement(
                selectedElement.id,
                {
                  fontFamily:
                    e.target.value,
                }
              )
            }
            className="
              w-full
              border
              rounded-lg
              p-3
            "
          >
            <option>
              Poppins
            </option>

            <option>
              Roboto
            </option>

            <option>
              Montserrat
            </option>

            <option>
              Open Sans
            </option>

            <option>
              Lato
            </option>
          </select>
        </div>

        {/* Color */}
        <div>
          <label
            className="
              flex
              items-center
              gap-2
              text-sm
              mb-2
            "
          >
            <Palette size={16} />
            Text Color
          </label>

          <input
            type="color"
            value={
              selectedElement.color
            }
            onChange={(e) =>
              updateElement(
                selectedElement.id,
                {
                  color:
                    e.target.value,
                }
              )
            }
            className="
              w-full
              h-12
            "
          />
        </div>

        {/* Style */}
        <div>
          <label
            className="
              text-sm
              mb-2
              block
            "
          >
            Style
          </label>

          <div className="flex gap-2">

            <button
              onClick={() =>
                updateElement(
                  selectedElement.id,
                  {
                    fontWeight:
                      selectedElement.fontWeight ===
                      "bold"
                        ? "normal"
                        : "bold",
                  }
                )
              }
              className="
                flex-1
                border
                rounded-lg
                p-3
              "
            >
              <Bold
                size={18}
                className="mx-auto"
              />
            </button>

            <button
              onClick={() =>
                updateElement(
                  selectedElement.id,
                  {
                    fontStyle:
                      selectedElement.fontStyle ===
                      "italic"
                        ? "normal"
                        : "italic",
                  }
                )
              }
              className="
                flex-1
                border
                rounded-lg
                p-3
              "
            >
              <Italic
                size={18}
                className="mx-auto"
              />
            </button>

          </div>
        </div>

        {/* Alignment */}
        <div>
          <label
            className="
              text-sm
              mb-2
              block
            "
          >
            Alignment
          </label>

          <div className="flex gap-2">

            <button
              onClick={() =>
                updateElement(
                  selectedElement.id,
                  {
                    textAlign:
                      "left",
                  }
                )
              }
              className="
                flex-1
                border
                rounded-lg
                p-3
              "
            >
              <AlignLeft
                size={18}
                className="mx-auto"
              />
            </button>

            <button
              onClick={() =>
                updateElement(
                  selectedElement.id,
                  {
                    textAlign:
                      "center",
                  }
                )
              }
              className="
                flex-1
                border
                rounded-lg
                p-3
              "
            >
              <AlignCenter
                size={18}
                className="mx-auto"
              />
            </button>

            <button
              onClick={() =>
                updateElement(
                  selectedElement.id,
                  {
                    textAlign:
                      "right",
                  }
                )
              }
              className="
                flex-1
                border
                rounded-lg
                p-3
              "
            >
              <AlignRight
                size={18}
                className="mx-auto"
              />
            </button>
            </div>
               {/* Save Changes */}
               <div >
<Button
  onClick={() => {
    alert("Changes Saved Successfully");
  }}
  className="
    w-full
    bg-[#20B2AA]
    text-white
    py-3
    rounded-xl
    font-medium
    hover:bg-[#1b9c95]
    transition-all
    duration-200
    shadow-sm
  "
>
  Save Changes
</Button>
</div>
        </div>

      </div>
    </div>
  );
}

export default PropertiesPanel;