'use client'
import { Suspense } from "react";
import Pagination from "./Pagination";
import SuspenseFallback from "./SuspenseFallback";
import SelectInBlogs from "./SelectInBlogs";
import AudioList from "./AudioList";

const AudioPage = ({ audios, totalCount, sort, limit, page }) => {

    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, totalCount);
    return (
        <Suspense fallback={<SuspenseFallback />}>
            {audios.length > 0 && <>
                <section>
                    <div className="ml-[20px]">
                    <p className="my-1">
                            Showing {start} - {end} of {totalCount}
                        </p>
                        <SelectInBlogs sort={sort} limit={limit} page={page} />

                    </div>
                                            <AudioList audios={audios} />
                    {audios?.totalCount > limit && (
                        <Pagination
                            currentPage={page}
                            total={totalCount}
                            limit={limit}
                        />
                    )}
                </section>
            </>}
        </Suspense>
    );

};

export default AudioPage;