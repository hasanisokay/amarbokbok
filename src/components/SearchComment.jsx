
const SearchComment = ({searchText, type, onChange}) => {

    return (
        <div className="flex gap-4 flex-wrap mx-2">
            <div className="relative w-fit">
                <input
                    value={searchText}
                    onChange={(e) => onChange(e.target.value)}
                    className="peer h-[40px] border-secondary px-2 text-sm pt-2 focus:outline-none bg-slate-200 w-full text-black"
                    type="text"
                    id="search-box"
                    placeholder=""
                />
                <label
                    className="absolute left-2 top-0.5 text-xs text-secondary duration-300 peer-placeholder-shown:left-2 peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-2 peer-focus:top-0.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-secondary"
                    htmlFor="search-box"
                >
                    Search {type}
                </label>
            </div>
            <button type="submit" className="h-[40px] btn-green">
                Search
            </button>
        </div>
    );
};

export default SearchComment;