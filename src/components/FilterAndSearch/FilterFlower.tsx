interface FilterFlowerProps {
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  queryParams: { [key: string]: string };
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResetQueryParams: () => void;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterFlower: React.FC<FilterFlowerProps> = ({
  handleSelectChange,
  queryParams,
  handleOnChange,
  onResetQueryParams,
  setShowFilter,
}) => {
  return (
    <div className="card w-full bg-white border-black border-2 text-neutral-content py-4 my-12">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-gray-600">Filters !</h2>
        <div className="card-actions justify-end">
          <div className="flex justify-center items-center">
            <form
              // onSubmit={(e) => {
              //   e.preventDefault(), onSubmit();
              // }}
              className="w-1/2 mx-auto text-gray-600"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-3 px-1">
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-semibold">Color:</span>
                    </div>
                    <input
                      name="color"
                      value={queryParams.color}
                      onChange={handleOnChange}
                      type="text"
                      placeholder="color"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-semibold">MinSize:</span>
                    </div>
                    <input
                      name="minSize"
                      value={queryParams.minSize}
                      onChange={handleOnChange}
                      type="minSize"
                      placeholder="minSize"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-semibold">MaxSize:</span>
                    </div>
                    <input
                      name="maxSize"
                      value={queryParams.maxSize}
                      onChange={handleOnChange}
                      type="maxSize"
                      placeholder="maxSize"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Min Price:
                      </span>
                    </div>
                    <input
                      name="minPrice"
                      value={queryParams.minPrice}
                      onChange={handleOnChange}
                      type="number"
                      step="any"
                      placeholder="minPrice"
                      className="input input-bordered w-full max-w-xs"
                      min="1"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Max Price:
                      </span>
                    </div>
                    <input
                      name="maxPrice"
                      value={queryParams.maxPrice}
                      onChange={handleOnChange}
                      type="number"
                      placeholder="maxPrice"
                      className="input input-bordered w-full max-w-xs"
                      min="1"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-semibold">
                        BloomDate:
                      </span>
                    </div>
                    <input
                      name="bloomDate"
                      value={queryParams.bloomDate}
                      pattern="\d{4}-\d{2}-\d{2}"
                      placeholder="YYYY-MM-DD 2023-01-28"
                      onChange={handleOnChange}
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-semibold">Rating:</span>
                    </div>
                    <input
                      name="rating"
                      value={queryParams.rating}
                      onChange={handleOnChange}
                      type="number"
                      placeholder="rating"
                      min="1"
                      max="5"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>

                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Category:
                      </span>
                    </div>
                    <select
                      className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                      name="category"
                      value={queryParams.category}
                      onChange={handleSelectChange}
                    >
                      <option value="">Category</option>
                      <option value="Rosaceae">Rosaceae</option>
                      <option value="Orchidaceae">Orchidaceae</option>
                      <option value="Asteraceae">Asteraceae</option>
                      <option value="Gesneriaceae">Gesneriaceae</option>
                      <option value="Nyctaginaceae">Nyctaginaceae</option>
                      <option value="Iridaceae">Iridaceae</option>
                      <option value="Apocynaceae">Apocynaceae</option>
                      <option value="Malvaceae">Malvaceae</option>
                      <option value="Cactaceae">Cactaceae</option>
                      <option value="Scrophulariaceae">Scrophulariaceae</option>
                      <option value="Plantaginaceae">Plantaginaceae</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Fragrance:
                      </span>
                    </div>
                    <select
                      className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                      name="fragrance"
                      value={queryParams.fragrance}
                      onChange={handleSelectChange}
                    >
                      <option value="">Fragrance</option>
                      <option value="Sweet">Sweet</option>
                      <option value="Floral">Floral</option>
                      <option value="Citrusy">Citrusy</option>
                      <option value="Fruity">Fruity</option>
                      <option value="Spicy">Spicy</option>
                      <option value="Minty">Minty</option>
                      <option value="Herbal">Herbal</option>
                      <option value="Woody">Woody</option>
                      <option value="Earthy">Earthy</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Bloom Season:
                      </span>
                    </div>
                    <select
                      className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                      name="bloomingSeason"
                      value={queryParams.bloomingSeason}
                      onChange={handleSelectChange}
                    >
                      <option value="">Select Season</option>
                      <option value="Spring">Spring</option>
                      <option value="Spring-to-Summer">Spring-to-Summer</option>
                      <option value="Summer">Summer</option>
                      <option value="Autumn">Autumn</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-semibold">Sort By:</span>
                    </div>
                    <select
                      className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                      name="sortBy"
                      value={queryParams.sortBy}
                      onChange={handleSelectChange}
                    >
                      <option value="">Select Order</option>
                      <option value="name">Name</option>
                      <option value="price">price</option>
                    </select>
                  </label>
                </div>
                <div
                  title="Select sort by first"
                  className="tooltip"
                  data-tip="Select sort by first"
                >
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text font-semibold">
                        Sort Order:
                      </span>
                    </div>
                    <select
                      className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                      name="sortOrder"
                      value={queryParams.sortOrder}
                      onChange={handleSelectChange}
                    >
                      <option value="">Select Order</option>
                      <option value=" ">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </label>
                </div>
              </div>
              {/* button */}
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={onResetQueryParams}
                  className="text-sm px-3 py-2 text-gray-200 bg-black rounded-md my-5 w-full hover:bg-slate-800"
                >
                  Reset
                </button>
                <button
                  data-tip="Reset before close!"
                  onClick={() => setShowFilter(false)}
                  className="text-sm px-3 py-2 text-gray-200 bg-gray-700 rounded-md my-5 w-full hover:bg-slate-800 tooltip"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterFlower;
