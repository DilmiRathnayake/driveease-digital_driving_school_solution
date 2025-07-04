import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRouteName } from "../../Features/Route/routeSlice";
import Scheduler, { Editing } from "devextreme-react/scheduler";
import CustomStore from "devextreme/data/custom_store";
import { getActiveCourse } from "../../Features/Course/courseSlice";
import { getActiveStudents } from "../../Features/Student/studentSlice";
import { getActiveInstructors } from "../../Features/Instructor/instructorSlice";
import {
  createAppointment,
  deleteAppointment,
  getActiveAppointment,
  getActiveAppointmentByInstructorId,
  getActiveAppointmentByStudentId,
  updateAppointment,
} from "../../Features/Appointment/appointmentSlice";
import moment from "moment";

const Schedule = () => {
  const dispatch = useDispatch();

  const currentDate = new Date();
  const views = ["day", "week", "month"];

  const { coursesActive } = useSelector((state) => state.course);
  const { studentsActive } = useSelector((state) => state.student);
  const { instructorsActive } = useSelector((state) => state.instructor);
  const { appointmentsActive, appointmentsStudentActive, appointmentsInstructorActive } = useSelector((state) => state.appointment);

  const { user } = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  const dataSource = new CustomStore({
    key: "id",
    loadMode: "raw",
    keyExpr: "id",
    load: () => data,
    insert: async (values) => {
      await dispatch(
        createAppointment({
          text: values.text,
          startDate: moment(values.startDate).format("YYYY-MM-DD HH:mm:ss"),
          endDate: moment(values.endDate).format("YYYY-MM-DD HH:mm:ss"),
          course_id: values.course_id,
          student_id: values.student_id,
          instructor_id: values.instructor_id,
          description: values.description,
          is_active: true,
          is_deleted: false,
        })
      );
      await dispatch(getActiveAppointment());
    },
    remove: async (key) => {
      await dispatch(deleteAppointment(key));
      await dispatch(getActiveAppointment());
    },
    update: async (key, values) => {
      await dispatch(
        updateAppointment({
          appointmentId: key,
          appointment: {
            id: key,
            text: values.text,
            startDate: moment(values.startDate).format("YYYY-MM-DD HH:mm:ss"),
            endDate: moment(values.endDate).format("YYYY-MM-DD HH:mm:ss"),
            course_id: values.course_id,
            student_id: values.student_id,
            instructor_id: values.instructor_id,
            description: values.description,
            is_active: true,
            is_deleted: false,
          },
        })
      );
      await dispatch(getActiveAppointment());
    },
  });

  const onAppointmentFormOpening = (e) => {
    const { form } = e;

    form.option("items", [
      {
        itemType: "group",
        colCount: 2,
        colSpan: 2,
        items: [
          {
            dataField: "text",
            editorType: "dxTextBox",
            label: { text: "Title" },
            colSpan: 2,
            validationRules: [
              { type: "required", message: "Title is required" },
            ],
          },
          {
            dataField: "startDate",
            editorType: "dxDateBox",
            editorOptions: {
              type: "datetime",
            },
            label: { text: "DateTime From" },
            colSpan: 2,
            validationRules: [
              { type: "required", message: "Start date is required" },
            ],
          },
          {
            dataField: "endDate",
            editorType: "dxDateBox",
            editorOptions: {
              type: "datetime",
            },
            label: { text: "DateTime To" },
            colSpan: 2,
            validationRules: [
              { type: "required", message: "End date is required" },
            ],
          },
          {
            dataField: "course_id",
            editorType: "dxSelectBox",
            editorOptions: {
              items: coursesActive,
              displayExpr: "course_name",
              valueExpr: "id",
              searchEnabled: true,
            },
            label: { text: "Courses" },
            colSpan: 2,
            validationRules: [
              { type: "required", message: "Course selection is required" },
            ],
          },
          {
            dataField: "student_id",
            editorType: "dxSelectBox",
            editorOptions: {
              items: studentsActive,
              displayExpr: "first_name",
              valueExpr: "id",
              searchEnabled: true,
            },
            label: { text: "Student" },
            colSpan: 2,
            validationRules: [
              { type: "required", message: "Student selection is required" },
            ],
          },
          {
            dataField: "instructor_id",
            editorType: "dxSelectBox",
            editorOptions: {
              items: instructorsActive,
              displayExpr: "first_name",
              valueExpr: "id",
              searchEnabled: true,
            },
            label: { text: "Instructor" },
            colSpan: 2,
            validationRules: [
              { type: "required", message: "Instructor selection is required" },
            ],
          },
          {
            dataField: "description",
            editorType: "dxTextArea",
            editorOptions: {
              height: 90,
            },
            label: { text: "Description" },
            colSpan: 2,
          },
        ],
      },
    ]);
  };

  const printBill = (appointment) => {
    const course = coursesActive.find((c) => c.id === appointment.course_id);
    const student = studentsActive.data.find((s) => s.id === appointment.student_id);
    const instructor = instructorsActive.data.find(
      (i) => i.id === appointment.instructor_id
    );

    const billWindow = window.open("", "PRINT", "height=650,width=900,top=100,left=150");

    billWindow.document.write(`
      <html>
        <head>
          <title>Driving School Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            td, th { padding: 8px; border: 1px solid #ccc; }
          </style>
        </head>
        <body>
          <h1>Driving School Invoice</h1>
          <table>
            <tr><th>Title</th><td>${appointment.text}</td></tr>
            <tr><th>Course</th><td>${course?.course_name || "N/A"}</td></tr>
            <tr><th>Student</th><td>${student?.first_name || "N/A"}</td></tr>
            <tr><th>Instructor</th><td>${instructor?.first_name || "N/A"}</td></tr>
            <tr><th>Start Time</th><td>${moment(appointment.startDate).format("LLLL")}</td></tr>
            <tr><th>End Time</th><td>${moment(appointment.endDate).format("LLLL")}</td></tr>
            <tr><th>Description</th><td>${appointment.description || "N/A"}</td></tr>
            <tr><th>Price</th><td>Rs. ${course?.course_amount || "0"}</td></tr>
          </table>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = window.close;
            };
          </script>
        </body>
      </html>
    `);

    billWindow.document.close();
    billWindow.focus();
  };

  useEffect(() => {
    dispatch(changeRouteName("Schedule"));
    dispatch(getActiveCourse());
    dispatch(getActiveStudents());
    dispatch(getActiveInstructors());
  }, [dispatch]);

  useEffect(() => {
    if (user.user.user_type === "user") {
      dispatch(getActiveAppointment());
    }
    else if(user.user.user_type === "student"){
      dispatch(getActiveAppointmentByStudentId(user.user.id));
    }
    else if(user.user.user_type === "instructor"){
      dispatch(getActiveAppointmentByInstructorId(user.user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (appointmentsActive) {
      if (user.user.user_type === "user") {
        setData(appointmentsActive);
        setIsEditable(true);
      } else {
        setData([]);
        setIsEditable(false);
      }
    }
  }, [dispatch, appointmentsActive, user]);

  useEffect(() => {
    if (appointmentsStudentActive) {
      if (user.user.user_type === "student") {
        setData(appointmentsStudentActive);
        setIsEditable(false);
      } else {
        setData([]);
      }
    }
  }, [dispatch, appointmentsStudentActive, user]);
  
  useEffect(() => {
    if (appointmentsInstructorActive) {
      if (user.user.user_type === "instructor") {
        setData(appointmentsInstructorActive);
        setIsEditable(false);
      } else {
        setData([]);
      }
    }
  }, [dispatch, appointmentsInstructorActive, user]);

  return (
    <>
      <Scheduler
        timeZone="Asia/Colombo"
        dataSource={dataSource}
        views={views}
        defaultCurrentView="week"
        defaultCurrentDate={currentDate}
        height={730}
        startDayHour={9}
        endDayHour={19}
        onAppointmentFormOpening={onAppointmentFormOpening}
        onAppointmentClick={(e) => {
          e.cancel = true; // Prevent default popup
          printBill(e.appointmentData); // Call print function
        }}
      >
        <Editing
          allowAdding={isEditable}
          allowDeleting={isEditable}
          allowResizing={false}
          allowDragging={false}
          allowUpdating={isEditable}
        />
      </Scheduler>
    </>
  );
};

export default Schedule;
