import { sizes } from "../data/sizes";
import { X } from "lucide-react";

function SizeModal({
show,
setShow,
changePageSize
}) {

  if (!show)

    return null;


  return (

    <div

      className="

      fixed

      inset-0

      bg-black/40

      flex

      justify-center

      items-center

      z-50

    "

    >

      <div

        className="

        bg-white

        w-[500px]

        rounded-xl

        shadow-xl

        p-5

      "

      >

        <div

          className="

          flex

          justify-between

          items-center

          mb-5

        "

        >

          <h2

            className="

            text-xl

            font-semibold

          "

          >

            Choose a size

          </h2>


          <button

            onClick={() =>

              setShow(

                false

              )

            }

          >

             <X
    size={20}
    className="text-gray-600"
  />

          </button>

        </div>



        <input

          placeholder="Search sizes..."

          className="

          w-full

          border

          rounded-lg

          px-3

          py-2

          mb-5

        "

        />



        <div

          className="

          grid

          grid-cols-2

          gap-4

        "

        >

          {

            sizes.map(

              (size) => (

                <div

                  key={

                    size.name

                  }


                  onClick={() => {

                    changePageSize(

                      size.width,

                      size.height

                    );


                    setShow(

                      false

                    );

                  }}


                  className="

                  border

                  rounded-xl

                  p-4

                  cursor-pointer

                  hover:border-[#20B2AA]

                  hover:bg-[#20B2AA]/10

                  transition

                "

                >

                  <h3

                    className="

                    font-semibold

                  "

                  >

                    {

                      size.name

                    }

                  </h3>


                  <p

                    className="

                    text-sm

                    text-gray-500

                  "

                  >

                    {

                      size.width

                    }

                    ×

                    {

                      size.height

                    }

                    px

                  </p>

                </div>

              )

            )

          }

        </div>

      </div>

    </div>

  );

}

export default SizeModal;

