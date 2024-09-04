// import CustomSVG from "@/animation/CustomSVG";
// import Counter from "@/components/Counter";
// import MarqueTexts from "@/components/MarqueTexts";
// import CategoryPage from "@/components/CategoryPage";
// import HomeCategoryCard from "@/components/HomeCategoryCard";
import HomeMenu from "@/components/HomeMenu";
import dynamic from "next/dynamic";

const CustomSVG = dynamic(() => import("@/animation/CustomSVG"));
const Counter = dynamic(() => import("@/components/Counter"));
const MarqueTexts = dynamic(() => import("@/components/MarqueTexts"));

export default async function Home() {
  return (
    <section>
      <MarqueTexts />
      <div className="flex items-center justify-center relative mt-10">
        <div className="w-[100px] h-[100px] absolute top-1">
          <CustomSVG width={100} height={100} />
        </div>
        <h1 className="text-center">
          Don&#39;t follow{" "}
          <span className="underline underline-offset-4 decoration-[#b8dabb] dark:decoration-[#8edb95]">
            {" "}
            me
          </span>
          . Follow what I say.{" "}
        </h1>
      </div>
      <div className="lg:min-h-[130px] md:min-h-[276px] mih-h-[422px] mt-10">
        <Counter />
      </div>
      <div className="min-h-[1199px] md:min-h-[713px] lg:min-h-[470px]">
        <HomeMenu />
      </div>
    </section>
  );
}
