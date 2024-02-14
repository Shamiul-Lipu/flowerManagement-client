import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSales: builder.mutation({
      query: (sells) => ({
        url: "/flowerManagment/create-sales",
        method: "POST",
        body: sells,
      }),
      invalidatesTags: ["flowers"],
    }),
    todaysSalesHistory: builder.query({
      query: () => ({
        url: "/flowerManagment/todaysSalesHistory",
        method: "GET",
      }),
    }),
    lastWeeksales: builder.query({
      query: () => ({
        url: "/flowerManagment/lastWeeksales",
        method: "GET",
      }),
    }),
    monthAndYearlySalesHistory: builder.query({
      query: (year) => ({
        url: `/flowerManagment/monthAndYearlySalesHistory/${year}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateSalesMutation,
  useTodaysSalesHistoryQuery,
  useLastWeeksalesQuery,
  useMonthAndYearlySalesHistoryQuery,
} = salesApi;
