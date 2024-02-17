import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [
        "flowers",
        "getMyPurchesHistory",
        "purchesPoint",
        "discountCoupone",
      ],
    }),

    registerMember: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/registerMember",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [
        "flowers",
        "getMyPurchesHistory",
        "purchesPoint",
        "discountCoupone",
      ],
    }),

    createSalesmanOrManager: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/create-salesmanOrManager",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["flowers"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMemberMutation,
  useCreateSalesmanOrManagerMutation,
} = authApi;
