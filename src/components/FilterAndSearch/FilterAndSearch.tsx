import FilterFlower from "./FilterFlower";
import SearchFlower from "./SearchFlower";

interface FilterAndSearchProps {
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryParams: any;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResetQueryParams: () => void;
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterAndSearch: React.FC<FilterAndSearchProps> = ({
  queryParams,
  handleSelectChange,
  handleOnChange,
  onResetQueryParams,
  showFilter,
  setShowFilter,
}) => {
  return (
    <div>
      <SearchFlower handleOnChange={handleOnChange} queryParams={queryParams} />
      {showFilter && (
        <FilterFlower
          handleSelectChange={handleSelectChange}
          handleOnChange={handleOnChange}
          queryParams={queryParams}
          onResetQueryParams={onResetQueryParams}
          setShowFilter={setShowFilter}
        />
      )}
    </div>
  );
};

export default FilterAndSearch;
