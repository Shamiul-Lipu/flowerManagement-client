import { baseApi } from "../../api/baseApi";

const flowerCrudApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFlowers: builder.query({
      query: (arg) => ({
        url: "/flowers",
        method: "GET",
        params: arg,
      }),
      providesTags: ["flowers"],
    }),
    addFlower: builder.mutation({
      query: (data) => ({
        url: "/flowers/add-flower",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["flowers"],
    }),
    updateFlower: builder.mutation({
      query: (data) => ({
        url: `/flowers/update-flower/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["flowers"],
    }),
    deleteFlower: builder.mutation({
      query: (data) => ({
        url: `/flowers/delete-flower/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["flowers"],
    }),
    bulkDeleteFlowerflower: builder.mutation({
      query: (data) => ({
        url: `/flowers/bulkDeleteFlowerflower`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["flowers"],
    }),
  }),
});

export const {
  useGetAllFlowersQuery,
  useAddFlowerMutation,
  useUpdateFlowerMutation,
  useDeleteFlowerMutation,
  useBulkDeleteFlowerflowerMutation,
} = flowerCrudApi;
