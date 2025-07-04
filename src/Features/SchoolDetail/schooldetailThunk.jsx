import customFetch, { checkForUnauthorizedResponse } from "../../Utils/axios";

export const getSchoolDetailThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/schooldetails");
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateSchoolDetailThunk = async (
  { schooldetailId, schooldetail },
  thunkAPI
) => {
  try {
    const resp = await customFetch.post(
      `/api/schooldetails/${schooldetailId}`,
      schooldetail
    );
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
