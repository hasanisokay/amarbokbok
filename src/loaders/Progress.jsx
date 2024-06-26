export const Progress = ({ number }) => {
    return (
        <div className="flex flex-col w-[500px] mx-auto gap-2">
        <div className={`flex h-7 w-full  items-center justify-center rounded-full bg-sky-300`}>
            <div style={{ width: `${number}%` }} className={`transition-width flex justify-center items-center mr-auto h-full w-0 rounded-full  bg-sky-600 duration-500`} >
            <span className="font-medium  text-center ">{number ===100 ?"Image Uploaded":"Image Uploading"} {number !==100 && (number + "%")}</span>
            </div>
        </div>
    </div>)
};