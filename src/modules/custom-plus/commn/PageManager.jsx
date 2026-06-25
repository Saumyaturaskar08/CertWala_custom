function PageManager({

pages,

activePage,

setActivePage,

addPage

}) {


return (

<div

className="

h-28

bg-white

border-t

border-gray-200


flex

items-center

gap-4


px-4


overflow-x-auto


shrink-0

"

>


{

pages.map(

(page,index)=>(


<div

key={page.id}

onClick={()=>{

setActivePage(

index

);

}}


className={`


min-w-[110px]


h-20


rounded-xl


border-2


cursor-pointer


flex


flex-col


items-center


justify-center


transition


${

activePage===index


?

"border-[#20B2AA] bg-[#20B2AA]/10"


:

"border-gray-300 bg-white"

}


`}


>



<div


className="

w-16

h-10


bg-gray-100


rounded


mb-2

"


/>



<p


className="

text-xs


font-medium

"

>


{page.name}


</p>


</div>


)

)

}



<button


onClick={

addPage

}


className="


min-w-[110px]


h-20


rounded-xl


bg-[#20B2AA]


text-white


font-semibold


hover:opacity-90


transition


"


>


+ Add Page


</button>



</div>


);



}



export default PageManager;


