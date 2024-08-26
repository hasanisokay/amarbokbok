import CustomSVG from "@/animation/CustomSVG";
import Counter from "@/components/Counter";
import HomeMenu from "@/components/HomeMenu";
export default function Home() {
  return (
    <section>
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
      <Counter />
      <HomeMenu />
    </section>
  );
}
