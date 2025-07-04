import { configureStore } from "@reduxjs/toolkit";
import routeSlice from "./Features/Route/routeSlice";
import userlevelSlice from "./Features/UserLevel/userlevelSlice";
import userSlice from "./Features/User/userSlice";
import vehicletypeSlice from "./Features/VehicleType/vehicletypeSlice";
import vehiclemodelSlice from "./Features/VehicleModel/vehiclemodelSlice";
import vehicleSlice from "./Features/Vehicle/vehicleSlice";
import instructorSlice from "./Features/Instructor/instructorSlice";
import courseSlice from "./Features/Course/courseSlice";
import schooldetailSlice from "./Features/SchoolDetail/schooldetailSlice";
import studentSlice from "./Features/Student/studentSlice";
import appointmentSlice from "./Features/Appointment/appointmentSlice";

export const store = configureStore({
  reducer: {
    route: routeSlice,
    user: userSlice,
    userlevel: userlevelSlice,
    vehicletype: vehicletypeSlice,
    vehiclemodel: vehiclemodelSlice,
    vehicle: vehicleSlice,
    instructor: instructorSlice,
    course: courseSlice,
    schooldetail: schooldetailSlice,
    student: studentSlice,
    appointment: appointmentSlice,
  },
});
