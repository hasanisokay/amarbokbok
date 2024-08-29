import getSOS from "@/utils/getSOS.mjs";
import Marquee from "react-fast-marquee";
const MarqueTexts = async () => {
    const message = await getSOS("active");
    return (
        <>
            {message && (
                <Marquee
                    style={{ fontSize: "20px", padding: "10px" }}
                    pauseOnHover={true}
                >
                    {message?.map((m) => (
                        <p key={m?._id} className="mr-2 text-red-500 dark:text-white">
                            {m?.message}
                        </p>
                    ))}
                </Marquee>
            )}
        </>
    );
};

export default MarqueTexts;