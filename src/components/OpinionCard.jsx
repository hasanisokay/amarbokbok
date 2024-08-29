'use client'
import useTheme from "@/hooks/useTheme.mjs";
import femaleSVG from "@/svg/femaleSVG.mjs";
import maleSVG from "@/svg/maleSVG.mjs";
import getTimeWithHours from "@/utils/getTimeWithHours.mjs";

const OpinionCard = ({ opinion }) => {
    const {theme } = useTheme()
    //  h-fit  rounded-md py-1 lg:w-[500px] md:w-[400px] w-fit
    return (
        <div className="px-2  h-fit  rounded-md py-1 bg-[#b6d7a0] dark:bg-[#333333] lg:hover:shadow-lg active:shadow-lg lg:active:shadow-none">
            <div className="flex items-center ">
                <span className="block">{opinion?.gender === "male" ? maleSVG(theme) : femaleSVG(theme)}</span>
            </div>
            <p><span>&#34;</span>{opinion?.message}<span>&#34;</span></p>
            <p><span className="text-sm text-gray">{opinion?.name || "Anonymous"}</span></p>
            <p className="text-xs text-gray"><span>{getTimeWithHours(opinion?.submittedOn)}</span> </p>
            {opinion?.replies.map(r => <div key={r?._id} className="my-1">
                <div className="flex items-center justify-end">
                    <span className="block">{maleSVG(theme)}</span>
                </div>
                <div className="justify-end items-end flex flex-col">
                    <p>{r?.reply}</p>
                    <p><span className="text-gray text-xs">Ahmmad Robin</span></p>
                    <p className="text-sm text-gray"><span>{getTimeWithHours(r?.submittedOn)}</span> </p>
                </div>
            </div>)}
        </div>
    );
};

export default OpinionCard;