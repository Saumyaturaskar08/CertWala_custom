import { stickers } from "../data/stickers";
import { X } from "lucide-react";

function StickerModal({
show,
setShow,
addSticker

}){


if(!show)

return null;
return(


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

w-[420px]

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

Choose Sticker

</h2>


<button

onClick={()=>{

setShow(false);

}}

>

 <X
    size={20}
    className="text-gray-600"
  />

</button>


</div>




<div

className="

grid

grid-cols-4

gap-4

"

>

{
stickers.map((item, index) => (

<div

key={index}

onClick={() => {

addSticker(item);

setShow(false);

}}

className="

cursor-pointer

rounded-lg

hover:bg-gray-100

p-2

transition

"

>

<img

src={item}

alt="sticker"

className="

w-16

h-16

object-contain

mx-auto

"

/>

</div>

))

}



</div>



</div>



</div>


);



}


export default StickerModal;