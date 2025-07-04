import customFetch, { checkForUnauthorizedResponse } from "../../Utils/axios";

export const getAppointmentThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/appointments");
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getActiveAppointmentThunk = async (thunkAPI) => {
  try {
    const resp = await customFetch.get("/api/appointments/active");
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getActiveAppointmentByStudentIdThunk = async (studentId, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/api/appointments/student/active/${studentId}`);
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getActiveAppointmentByInstructorIdThunk = async (instructorId, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/api/appointments/instructor/active/${instructorId}`);
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getAppointmentByIdThunk = async (appointmentId, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/api/appointments/${appointmentId}`);
    return resp.data.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const createAppointmentThunk = async (appointment, thunkAPI) => {
  try {
    const resp = await customFetch.post("/api/appointments", appointment);
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateAppointmentThunk = async (
  { appointmentId, appointment },
  thunkAPI
) => {
  try {
    const resp = await customFetch.put(
      `/api/appointments/${appointmentId}`,
      appointment
    );
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteAppointmentThunk = async (appointmentId, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/api/appointments/${appointmentId}`);
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
