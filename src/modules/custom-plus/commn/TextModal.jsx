import { X } from "lucide-react";
function TextModal({
show,
setShow,
addText

}){


if(!show)

return null;


const texts=[

"{{Name}}",

"{{Text1}}",

"{{Text2}}",

"{{Text3}}"

];


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

w-[350px]

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

Your Text

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




{

texts.map(

(item)=>(


<button


key={item}


onClick={()=>{


addText(

item

);


setShow(

false

);


}}


className="

w-full

mb-3

border

rounded-lg

py-3

hover:bg-gray-100

"


>


{item}


</button>


)

)


}


</div>

</div>

);


}


export default TextModal;