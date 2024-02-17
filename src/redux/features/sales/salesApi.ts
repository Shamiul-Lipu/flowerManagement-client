import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSales: builder.mutation({
      query: (sells) => ({
        url: "/flowerManagment/create-sales",
        method: "POST",
        body: sells,
      }),
      invalidatesTags: [
        "flowers",
        "purchesPoint",
        "getMyPurchesHistory",
        "todaysSalesHistory",
        "lastWeeksales",
        "monthAndYearlySalesHistory",
      ],
    }),
    memberPurchesPoints: builder.query({
      query: () => ({
        url: "/flowerManagment/memberPurchesPoints",
        method: "GET",
      }),
      providesTags: ["purchesPoint"],
    }),
    todaysSalesHistory: builder.query({
      query: () => ({
        url: "/flowerManagment/todaysSalesHistory",
        method: "GET",
      }),
      providesTags: ["todaysSalesHistory"],
    }),
    lastWeeksales: builder.query({
      query: () => ({
        url: "/flowerManagment/lastWeeksales",
        method: "GET",
      }),
      providesTags: ["lastWeeksales"],
    }),
    monthAndYearlySalesHistory: builder.query({
      query: (year) => ({
        url: `/flowerManagment/monthAndYearlySalesHistory/${year}`,
        method: "GET",
      }),
      providesTags: ["monthAndYearlySalesHistory"],
    }),
    createCoupon: builder.mutation({
      query: (data) => ({
        url: `/flowerManagment/create-coupon`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["discountCoupone"],
    }),
    getDiscountCoupon: builder.query({
      query: () => ({
        url: `/flowerManagment/get-coupon`,
        method: "GET",
      }),
      providesTags: ["discountCoupone"],
    }),
    getMyPurchesHistory: builder.query({
      query: () => ({
        url: `/flowerManagment/getMyPurchesHistory`,
        method: "GET",
      }),
      providesTags: ["getMyPurchesHistory"],
    }),
  }),
});

export const {
  useCreateSalesMutation,
  useTodaysSalesHistoryQuery,
  useLastWeeksalesQuery,
  useMonthAndYearlySalesHistoryQuery,
  useCreateCouponMutation,
  useGetDiscountCouponQuery,
  useMemberPurchesPointsQuery,
  useGetMyPurchesHistoryQuery,
} = salesApi;
