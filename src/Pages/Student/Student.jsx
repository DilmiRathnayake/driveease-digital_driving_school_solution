import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "devextreme-react/button";
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
  EmailRule,
  PatternRule,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import { Popup as PopupPassword } from "devextreme-react/popup";
import { ScrollView, TextBox } from "devextreme-react";
import {
  deleteSystemUser,
  updateSystemUserPassword,
  checkEmailExists,
} from "../../Features/User/userSlice";
import { Typography } from "@mui/material";
import { Warning } from "../../Components/Notification/Notification";
import { getActiveUserLevel } from "../../Features/UserLevel/userlevelSlice";
import {
  createStudent,
  getStudents,
  updateStudent,
} from "../../Features/Student/studentSlice";
import moment from 'moment';
import { changeRouteName } from "../../Features/Route/routeSlice";

const Student = () => {
  const dispatch = useDispatch();

  const { students } = useSelector((state) => state.student);

  const [selectedUserId, setSelectedUserId] = useState(0);

  const [openPassword, setOpenPassword] = useState(false);

  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [isAdding, setIsAdding] = useState(true);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const genderTypes = [
    {
      id: 1,
      gender_type_name: "Male",
    },
    {
      id: 2,
      gender_type_name: "Female",
    },
  ];

  const statusTypes = [
    {
      id: 1,
      status_type_name: "Not Started",
    },
    {
      id: 2,
      status_type_name: "In Progress",
    },
    {
      id: 3,
      status_type_name: "Pending",
    },
    {
      id: 3,
      status_type_name: "Completed",
    },
  ];

  const handleEditPopup = (e) => {
    if (e.data) {
      setIsAdding(false);
    }
  };

  const handleAddingPopup = (e) => {
    setIsAdding(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const dataSource = new CustomStore({
    key: "id",
    loadMode: "raw",
    keyExpr: "id",
    load: () => students?.data,
    insert: async (values) => {
      var data = await dispatch(
        checkEmailExists({
          email: values.email,
        })
      );

      if (data.payload.data === false) {
        await dispatch(
          createStudent({
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            mobile: values.mobile,
            badge_no: values.badge_no,
            address: values.address,
            gender_id: values.gender_id,
            date_of_birth:
              values.date_of_birth !== undefined ? moment(values.date_of_birth).format('YYYY/MM/DD') : null,
            nic: values.nic,
            status_id: values.status_id,
            is_active: true,
            is_deleted: false,
          })
        );
        await dispatch(getStudents());
      } else {
        Warning("Email already exits");
      }
    },
    remove: async (key) => {
      await dispatch(deleteSystemUser(key));
      await dispatch(getStudents());
    },
    update: async (key, values) => {
      await dispatch(
        updateStudent({
          id: key,
          student: {
            id: key,
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            mobile: values.mobile,
            badge_no: values.badge_no,
            address: values.address,
            gender_id: values.gender_id,
            date_of_birth:
              values.date_of_birth !== undefined ? moment(values.date_of_birth).format('YYYY/MM/DD') : null,
            nic: values.nic,
            status_id: values.status_id,
            is_active: values.is_active,
            is_deleted: false,
          },
        })
      );
      await dispatch(getStudents());
    },
  });

  const handleOpenPassword = (e) => {
    setPassword(null);
    setConfirmPassword(null);
    if (e?.row?.data?.id !== undefined) {
      setSelectedUserId(e?.row?.data?.id);
      setOpenPassword(!openPassword);
    }
    setOpenPassword(!openPassword);
  };

  const updateUserPassword = async (e) => {
    if (password !== confirmPassword) {
      Warning("Passwords are not matching");
    } else if (password === "" || password === null) {
      Warning("Passwords fields are empty");
    } else if (confirmPassword === "" || confirmPassword === null) {
      Warning("Passwords fields are empty");
    } else {
      if (selectedUserId !== 0) {
        await dispatch(
          updateSystemUserPassword({
            systemUserId: selectedUserId,
            systemUser: {
              id: selectedUserId,
              password: password,
            },
          })
        );
        await dispatch(getStudents());
        setOpenPassword(!openPassword);
      }
    }
  };

  useEffect(() => {
    dispatch(changeRouteName("Students"));
    dispatch(getStudents());
    dispatch(getActiveUserLevel());
  }, [dispatch]);

  return (
    <div className="div-class">
      <DataGrid
        id="gridContainer"
        width="100%"
        height="80vh"
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
        onEditingStart={handleEditPopup}
        onInitNewRow={handleAddingPopup}
      >
        <SearchPanel visible={true} placeholder="Search" />
        <Editing
          mode="popup"
          useIcons={false}
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
          popup={{
            title: "Student",
            visible: isPopupVisible,
            onHiding: handleClosePopup,
            width: 500,
            height: 760,
            showTitle: true,
          }}
        >
          <Texts
            confirmDeleteMessage="Do you want to delete the user?"
            saveRowChanges="Save"
            addRow="Add"
            cancelRowChanges="Cancel"
          />

          <Popup
            widget="dxButton"
            title="Student"
            showTitle={true}
            width={500}
            height={850}
            className="custom-popup"
          />
          <Form width={900}>
            <Item itemType="group" colCount={1} colSpan={1}>
              <Item dataField="first_name" />
              <Item dataField="last_name" />
              <Item dataField="email" />
              {isAdding && <Item dataField="password" />}
              <Item dataField="mobile" />
              <Item dataField="badge_no" />
              <Item dataField="address" />
              <Item dataField="gender_id" />
              <Item dataField="nic" />
              <Item dataField="date_of_birth" />
              <Item dataField="status_id" />
              <Item dataField="is_active" />
            </Item>
          </Form>
        </Editing>
        <Column
          caption="id"
          dataField="id"
          visible={false}
          dataType="int"
          allowSorting={false}
          showInEditPopup={false}
        />

        <Column
          caption="First Name"
          dataField="first_name"
          dataType="string"
          allowSorting={false}
          alignment="left"
          showInEditPopup={false}
          editorOptions={{
            maxLength: 30,
          }}
        >
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Last Name"
          dataField="last_name"
          dataType="string"
          allowSorting={false}
          alignment="left"
          showInEditPopup={false}
          editorOptions={{
            maxLength: 30,
          }}
        >
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Email"
          dataField="email"
          dataType="left"
          allowSorting={false}
          alignment="left"
          visible={true}
        >
          <EmailRule />
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Password"
          dataField="password"
          dataType="string"
          allowSorting={false}
          alignment="center"
          visible={false}
          editorOptions={{
            mode: "password",
            maxLength: 15,
          }}
        >
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Mobile"
          dataField="mobile"
          dataType="string"
          allowSorting={false}
          alignment="left"
          editorOptions={{
            maxLength: 10,
            minLength: 7,
            mask: "0000000000",
            maskRules: { 0: /[0-9]/ },
          }}
        >
          <RequiredRule message={""} />
          <PatternRule
            message="Mobile number must start with 0 and consist only of numbers."
            pattern="^0[0-9]*$"
          />
        </Column>

        <Column
          caption="Badge No"
          dataField="badge_no"
          dataType="string"
          allowSorting={false}
          alignment="left"
          showInEditPopup={false}
          editorOptions={{
            maxLength: 30,
          }}
        ></Column>

        <Column
          caption="Address"
          dataField="address"
          dataType="string"
          allowSorting={false}
          alignment="left"
          showInEditPopup={false}
          editorOptions={{
            maxLength: 30,
          }}
        >
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Gender"
          dataField="gender_id"
          dataType="int"
          allowSorting={false}
          alignment="left"
        >
          <Lookup
            dataSource={genderTypes}
            valueExpr="id"
            displayExpr="gender_type_name"
          />
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="NIC"
          dataField="nic"
          dataType="string"
          allowSorting={false}
          alignment="left"
          showInEditPopup={false}
          editorOptions={{
            maxLength: 30,
          }}
        >
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Date of Birth"
          dataField="date_of_birth"
          dataType="date"
          allowSorting={false}
          alignment="left"
          format="yyyy/MM/dd"
        >
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Status"
          dataField="status_id"
          dataType="int"
          allowSorting={false}
          alignment="left"
        >
          <Lookup
            dataSource={statusTypes}
            valueExpr="id"
            displayExpr="status_type_name"
          />
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Is Active"
          dataField="is_active"
          dataType="boolean"
          allowSorting={false}
          alignment="center"
        />

        <Column type="buttons" width={320}>
          <GridButton name="edit" cssClass="dx-link-edit" text="Edit" />
          <GridButton
            name="updatePassword"
            text="Update Password"
            cssClass="dx-link-password"
            onClick={handleOpenPassword}
          />
          <GridButton name="delete" cssClass="dx-link-delete" text="Delete" />
        </Column>

        <Pager
          allowedPageSizes={[10, 20, 30, 40, 50]}
          visible={true}
          showInfo={true}
          showPageSizeSelector={true}
          showNavigationButtons={true}
        />
        <Paging defaultPageSize={20} />
      </DataGrid>

      <PopupPassword
        visible={openPassword}
        hideOnOutsideClick={true}
        onHiding={handleOpenPassword}
        dragEnabled={true}
        showCloseButton={true}
        showTitle={true}
        title="Update Password"
        width={450}
        height={330}
      >
        <ScrollView>
          <div>
            <div>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "1rem",
                }}
                autoComplete="off"
              >
                <div className="formlayoutRegistration">
                  <Typography
                    fontSize={"1rem"}
                    width="16rem"
                    sx={{ ml: "1rem", color: "#5A5A5A" }}
                  >
                    Password
                  </Typography>
                  <TextBox
                    id="tbPassword"
                    value={password}
                    className="customPositioningRegistration"
                    width={400}
                    mode="password"
                    onValueChanged={(e) => setPassword(e.value)}
                  />
                </div>
                <br />
                <div className="formlayoutRegistration">
                  <Typography
                    fontSize={"1rem"}
                    width="16rem"
                    sx={{ ml: "1rem", color: "#5A5A5A" }}
                  >
                    Confirm Password
                  </Typography>
                  <TextBox
                    id="tbConfirmPassword"
                    value={confirmPassword}
                    className="customPositioningRegistration"
                    width={400}
                    mode="password"
                    onValueChanged={(e) => setConfirmPassword(e.value)}
                  />
                </div>
              </form>
            </div>
            <br />
            <br />
            <div className="containerCommon">
              <Button
                id="btnUpdateUserPassword"
                text="Update"
                width="120"
                height={35}
                type="normal"
                stylingMode="outlined"
                onClick={updateUserPassword}
              />
              &nbsp;&nbsp;&nbsp;
              <Button
                id="btnCancelUserPassword"
                onClick={() => setOpenPassword(!openPassword)}
                width="120"
                height={35}
                text="Cancel"
                type="normal"
                stylingMode="outlined"
              />
            </div>
          </div>
        </ScrollView>
      </PopupPassword>
    </div>
  );
};

export default Student;
