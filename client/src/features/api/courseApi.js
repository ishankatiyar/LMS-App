import EditCourse from "@/pages/admin/course/EditCourse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["refetch"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "",
        method: "POST",
        body: { courseTitle, category },
        // headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["refetch"],
    }),
    getCreatorCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
        // body: {courseTitle, category}
      }),
      invalidatesTags: ["refetch"],
    }),
    editCourse: builder.mutation({
      query: ({formdata, courseId}) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formdata,
      }),
      invalidatesTags: ["refetch"]
    }),
    getCourseById : builder.query({
        query: (courseId) => ({
            url: `/${courseId}`,
            method: "GET"
        }) ,
        invalidatesTags: ["refetch"]
    })
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery
} = courseApi;
