import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRouteName } from "../../Features/Route/routeSlice";
import DataGrid, {
  Column,
  Pager,
  Paging,
  Editing,
  Texts,
  Popup,
  Form,
  Item,
  Button as GridButton,
  Lookup,
  RequiredRule,
  SearchPanel,
  ColumnFixing,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import {
  createCourse,
  createCourseInstructor,
  deleteCourse,
  getCourse,
  getInstructorsByCourseId,
  updateCourse,
} from "../../Features/Course/courseSlice";
import { Popup as InstructorPopup } from "devextreme-react/popup";
import { ScrollView } from "devextreme-react";
import List from "devextreme-react/list";
import { Button } from "devextreme-react/button";
import { getActiveInstructors } from "../../Features/Instructor/instructorSlice";

const Course = () => {
  const dispatch = useDispatch();

  const periodTypes = [
    {
      id: 1,
      period_type_name: "Days",
    },
    {
      id: 2,
      period_type_name: "Months",
    },
  ];

  const { courses, courseInstructors } = useSelector((state) => state.course);
  const { instructorsActive } = useSelector((state) => state.instructor);

  const [open, setOpen] = useState(false);

  const [selectedCourseId, setSelectedCourseId] = useState(0);

  const [intructorItems, setIntructorItems] = useState([]);
  const [newItems, setNewItems] = useState([]);

  const handleOpen = async (e) => {
    setIntructorItems([]);

    if (e?.row?.data?.id !== undefined) {
      setSelectedCourseId(e?.row?.data?.id);
      await dispatch(getInstructorsByCourseId(e?.row?.data?.id));
    }
    setOpen(!open);
  };

  const onSelectedItemKeysChange = (args) => {
    if (args.name === "selectedItemKeys") {
      setIntructorItems(args.value);
    }
  };

  const updateCourseInstructors = () => {
    if (selectedCourseId !== 0) {
      dispatch(
        createCourseInstructor({
          course_id: selectedCourseId,
          instructor_list: newItems,
        })
      );
    }
    setOpen(!open);
  };

  const dataSource = new CustomStore({
    key: "id",
    loadMode: "raw",
    keyExpr: "id",
    load: () => courses,
    insert: async (values) => {
      await dispatch(
        createCourse({
          course_name: values.course_name,
          course_code: values.course_code,
          course_description:
            values.course_description !== undefined
              ? values.course_description
              : null,
          duration: values.duration,
          period_id: values.period_id,
          course_amount: values.course_amount,
          is_active: values.is_active !== undefined ? values.is_active : true,
          is_deleted: false,
        })
      );
      await dispatch(getCourse());
    },
    remove: async (key) => {
      await dispatch(deleteCourse(key));
      await dispatch(getCourse());
    },
    update: async (key, values) => {
      await dispatch(
        updateCourse({
          courseId: key,
          course: {
            id: key,
            course_name: values.course_name,
            course_code: values.course_code,
            course_description:
              values.course_description !== undefined
                ? values.course_description
                : null,
            duration: values.duration,
            period_id: values.period_id,
            course_amount: values.course_amount,
            is_deleted: false,
          },
        })
      );
      await dispatch(getCourse());
    },
  });

  useEffect(() => {
    dispatch(changeRouteName("Courses"));
    dispatch(getCourse());
    dispatch(getActiveInstructors());
  }, [dispatch]);

  useEffect(() => {
    if (courseInstructors.data) {
      setIntructorItems(courseInstructors.data.map((x) => x.user_id));
    } else {
      setIntructorItems([]);
    }
  }, [courseInstructors]);

  useEffect(() => {
    setNewItems(intructorItems);
  }, [intructorItems]);

  return (
    <>
      <DataGrid
        id="gridContainer"
        width="100%"
        height="75vh"
        dataSource={dataSource}
        showBorders={true}
        repaintChangesOnly={true}
        useIcons={true}
        showColumnLines={true}
        showRowLines={true}
        rowAlternationEnabled={true}
        loadPanel={{ enabled: false }}
        onRowUpdating={(e) => {
          e.newData = Object.assign({}, e.oldData, e.newData);
        }}
      >
        <SearchPanel visible={true} placeholder="Search" />
        <Editing
          refreshMode="reshape"
          mode="popup"
          useIcons={false}
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
        >
          <Texts
            confirmDeleteMessage="Do you want to record?"
            saveRowChanges="Save"
            addRow="Add"
            cancelRowChanges="Cancel"
          />

          <Popup
            widget="dxButton"
            title="Course"
            showTitle={true}
            width={500}
            height={500}
          />
          <Form width={900}>
            <Item itemType="group" colCount={1} colSpan={1}>
              <Item dataField="course_code" />
              <Item dataField="course_name" />
              <Item dataField="course_description" />
              <Item dataField="duration" />
              <Item dataField="period_id" />
              <Item dataField="course_amount" />
              <Item dataField="is_active" />
            </Item>
          </Form>
        </Editing>
        <Column
          caption="id"
          dataField="id"
          //width={150}
          visible={false}
          dataType="int"
          allowSorting={false}
        />

        <Column
          caption="Course Code"
          dataField="course_code"
          dataType="string"
          allowSorting={false}
          alignment="left"
          editorOptions={{
            maxLength: 50,
          }}
        >
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Course Name"
          dataField="course_name"
          dataType="string"
          allowSorting={false}
          alignment="left"
          editorOptions={{
            maxLength: 50,
          }}
        >
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Description"
          dataField="course_description"
          dataType="string"
          allowSorting={false}
          alignment="left"
          editorOptions={{
            maxLength: 50,
          }}
        ></Column>

        <Column
          caption="Duration"
          dataField="duration"
          dataType="int"
          allowSorting={false}
          alignment="left"
          editorOptions={{
            maxLength: 50,
          }}
        >
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Period"
          dataField="period_id"
          dataType="int"
          allowSorting={false}
          alignment="left"
        >
          <Lookup
            dataSource={periodTypes}
            valueExpr="id"
            displayExpr="period_type_name"
          />
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Course Amount"
          dataField="course_amount"
          dataType="decimal"
          allowSorting={false}
          alignment="right"
          editorOptions={{
            maxLength: 50,
          }}
        >
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Is Active"
          dataField="is_active"
          dataType="boolean"
          allowSorting={false}
          alignment="center"
        />

        <Column type="buttons" width={280}>
          <GridButton name="edit" cssClass="dx-link-edit" text="Edit" />
          <GridButton
            text="Update Instructors"
            cssClass="dx-link-copy"
            onClick={handleOpen}
          />
          <GridButton name="delete" cssClass="dx-link-delete" text="Delete" />
        </Column>
        <ColumnFixing enabled={true} />

        <Pager
          allowedPageSizes={[10, 20, 30, 40, 50]}
          visible={true}
          showInfo={true}
          showPageSizeSelector={true}
          showNavigationButtons={true}
        />
        <Paging defaultPageSize={20} />
      </DataGrid>

      <InstructorPopup
        visible={open}
        hideOnOutsideClick={true}
        onHiding={handleOpen}
        dragEnabled={true}
        showCloseButton={true}
        showTitle={true}
        title="Update Instructors"
        width={400}
        height={400}
      >
        <ScrollView>
          <div>
            <div>
              <List
                dataSource={instructorsActive.data}
                keyExpr="id"
                displayExpr="first_name"
                // displayExpr={(item) =>
                //   item && item.first_name
                //     ? `${item.first_name} ${item.last_name}`
                //     : ""
                // }
                selectionMode="all"
                showSelectionControls={true}
                height={230}
                selectedItemKeys={newItems}
                onOptionChanged={onSelectedItemKeysChange}
              ></List>
            </div>
            <br />
            <div className="containerCommon">
              <Button
                id="btnUpdateCourseInstructors"
                text="Update"
                width="120"
                height={35}
                type="normal"
                stylingMode="contained"
                onClick={updateCourseInstructors}
              />
              &nbsp;&nbsp;&nbsp;
              <Button
                id="btnCancelCourseInstructors"
                onClick={() => setOpen(!open)}
                width="120"
                height={35}
                text="Cancel"
                type="normal"
                stylingMode="outlined"
              />
            </div>
          </div>
        </ScrollView>
      </InstructorPopup>
    </>
  );
};

export default Course;
