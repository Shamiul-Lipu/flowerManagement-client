import { useGetMyPurchesHistoryQuery } from "../../redux/features/sales/salesApi";
import { formatDate } from "../../utils/formateDate";

export interface Root {
  _id: string;
  sellerUserId: string;
  productId: ProductId;
  buyer: string;
  saleDate: string;
  quantitySold: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductId {
  _id: string;
  name: string;
  description: string;
  uses: string;
  price: number;
  quantity: number;
  bloomDate: string;
  color: string;
  category: string;
  fragrance: string;
  size: number;
  bloomingSeason: string;
  rating: number;
  isSelectedForDelete: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const PurchesHistory = () => {
  const { data: purchesHistory, isLoading } =
    useGetMyPurchesHistoryQuery(undefined);

  if (isLoading) {
    return <p className="text-center font-semibold">loading...</p>;
  }

  // console.log(purchesHistory?.data);
  return (
    <div className="py-4">
      <h3 className="text-center font-bold py-2 text-2xl">Purches History</h3>
      <div className="overflow-x-auto">
        {purchesHistory?.data?.length > 0 ? (
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Flower Name</th>
                <th>Sales Time</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {purchesHistory?.data?.map((item: Root, i: number) => (
                <tr key={i} className="border-b">
                  <th>{i + 1}</th>
                  <td>{item?.productId?.name}</td>
                  <td>{`${formatDate(item?.saleDate)}`}</td>
                  <td>{item?.totalAmount}$</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h4 className="text-center font-semibold">No Purches Made Yet!</h4>
        )}
      </div>
    </div>
  );
};

export default PurchesHistory;
