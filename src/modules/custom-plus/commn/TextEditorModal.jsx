function TextEditorModal({

  selectedElement,

  updateElement

}) {

  if (!selectedElement) return null;

  return (

    <div
      className="
      w-80
      bg-white
      border-l
      border-gray-200
      p-6
      overflow-y-auto
      shrink-0
    "
    >

      {/* Header */}

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
      "
      >

        <h2
          className="
          text-2xl
          font-semibold
        "
        >
          Text Settings
        </h2>

      </div>


      {/* Text */}

      <div className="mb-5">

        <p className="mb-2 text-gray-600">
          Text
        </p>

        <input

          value={
            selectedElement.value
          }

          onChange={(e) => {

            updateElement(

              selectedElement.id,

              {

                value:
                  e.target.value

              }

            );

          }}

          className="
            w-full
            border
            rounded-lg
            p-3
          "

        />

      </div>



      {/* Font Size */}

      <div className="mb-5">

        <p className="mb-2 text-gray-600">

          Font Size

        </p>

        <input

          type="number"

          value={
            selectedElement.fontSize
          }

          onChange={(e) => {

            updateElement(

              selectedElement.id,

              {

                fontSize:

                  Number(

                    e.target.value

                  )

              }

            );

          }}

          className="
            w-full
            border
            rounded-lg
            p-3
          "

        />

      </div>



      {/* Color */}

      <div className="mb-5">

        <p className="mb-2 text-gray-600">

          Text Color

        </p>


        <input

          type="color"

          value={

            selectedElement.color

          }


          onChange={(e) => {

            updateElement(

              selectedElement.id,

              {

                color:

                  e.target.value

              }

            );

          }}


          className="
            w-full
            h-12
            border
            rounded-lg
          "

        />

      </div>




      {/* Bold */}

      <div className="mb-4">

        <button

          onClick={() => {

            updateElement(

              selectedElement.id,

              {

                fontWeight:

                  selectedElement.fontWeight ===

                  "bold"

                    ?

                    "normal"

                    :

                    "bold"

              }

            );

          }}


          className="

            w-full

            bg-gray-100

            rounded-lg

            py-3

            font-bold

          "

        >

          B

        </button>

      </div>




      {/* Italic */}

      <div>

        <button

          onClick={() => {

            updateElement(

              selectedElement.id,

              {

                fontStyle:

                  selectedElement.fontStyle ===

                  "italic"

                    ?

                    "normal"

                    :

                    "italic"

              }

            );

          }}


          className="

            w-full

            bg-gray-100

            rounded-lg

            py-3

            italic

          "

        >

          I

        </button>

      </div>


    </div>

  );

}

export default TextEditorModal;