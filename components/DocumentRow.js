import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";

function DocumentRow({id, documentName, date}) {
    const router = useRouter();
    return (
        <div onClick={()=> router.push(`/doc/${id}`)} className="flex justify-center items-center max-w-3xl mx-auto hover:bg-gray-100 py-2 px-5 text-gray-700 rounded-lg cursor-pointer ">
            <Icon name='article' size="3xl" color="blue" />
            <p className="flex-grow pl-5 pr-10 w-10 truncate">{documentName}</p>
            <p className='pr-5 text-sm'>{date?.toDate().toLocaleDateString()}</p>
            <Button className="border-0" color='gray' buttonType="outline" rounded={true} iconOnly={true} ripple="dark">
               <Icon name="more_vert" size="3xl" /> 
            </Button>
            
        </div>
    )
}

export default DocumentRow
