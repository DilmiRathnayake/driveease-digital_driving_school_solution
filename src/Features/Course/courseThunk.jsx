import customFetch, { checkForUnauthorizedResponse } from "../../Utils/axios";

export const getCourseThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/courses");
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getActiveCourseThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/courses/active");
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getCourseByIdThunk = async (courseId, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/api/courses/${courseId}`);
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const createCourseThunk = async (course, thunkAPI) => {
  try {
    const resp = await customFetch.post("/api/courses", course);
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateCourseThunk = async ({ courseId, course }, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/api/courses/${courseId}`, course);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteCourseThunk = async (courseId, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/courses/${courseId}`);
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getInstructorsByCourseIdThunk = async (
  courseId,
  thunkAPI
) => {
  try {
    const resp = await customFetch.get(
      `/api/courseinstructors/${courseId}`
    );
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const createCourseInstructorThunk = async (
  courseInstructor,
  thunkAPI
) => {
  try {
    const resp = await customFetch.post(
      "/api/courseinstructors",
      courseInstructor
    );
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
