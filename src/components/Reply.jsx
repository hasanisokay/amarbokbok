import getTime from "@/utils/getTime.mjs";

const Reply = ({r}) => {
    console.log(r)
    return (
        <div className="lg:pl-10 md:pl-6 pl-4 my-4">
            <p className='font-semibold'>{r?.name}</p>
            <span className='text-gray text-xs'>{getTime(r?.submittedOn)}</span>
            <p>{r?.reply}</p>
        </div>
    );
};

export default Reply;

 