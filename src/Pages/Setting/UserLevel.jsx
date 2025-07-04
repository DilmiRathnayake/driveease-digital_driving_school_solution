import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  ColumnFixing,
  RequiredRule,
  SearchPanel,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import {
  createUserLevel,
  deleteUserLevel,
  getUserLevel,
  updateUserLevel,
} from "../../Features/UserLevel/userlevelSlice";
import {
  createSystemUserPrivilege,
  getSystemUserModule,
  getSystemUserPrevilegesBySystemUserLevelId,
} from "../../Features/User/userSlice";
import { Popup as BigPopup } from "devextreme-react/popup";
import { ScrollView } from "devextreme-react";
import List from "devextreme-react/list";
import { Button } from "devextreme-react/button";

const UserLevel = () => {
  const dispatch = useDispatch();

  const { userLevels } = useSelector((state) => state.userlevel);

  const { systemUserModules, systemUserPrivileges } = useSelector(
    (state) => state.user
  );

  const [open, setOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);

  const [privilegedItems, setPrivilegedItems] = useState([]);
  const [newItems, setNewItems] = useState([]);

  const handleOpen = async (e) => {
    setPrivilegedItems([]);

    if (e?.row?.data?.id !== undefined) {
      setSelectedUserId(e?.row?.data?.id);
      await dispatch(
        getSystemUserPrevilegesBySystemUserLevelId(e?.row?.data?.id)
      );
    }
    setOpen(!open);
  };

  const onSelectedItemKeysChange = (args) => {
    if (args.name === "selectedItemKeys") {
      setPrivilegedItems(args.value);
    }
  };

  const updateUserPrivileges = () => {
    if (selectedUserId !== 0) {
      dispatch(
        createSystemUserPrivilege({
          user_level_id: selectedUserId,
          module_list: newItems,
        })
      );
    }
    setOpen(!open);
  };

  const dataSource = new CustomStore({
    key: "id",
    loadMode: "raw",
    keyExpr: "id",
    load: () => userLevels,
    insert: async (values) => {
      await dispatch(
        createUserLevel({
          user_level_name: values.user_level_name,
          user_level_description:
            values.user_level_description !== undefined
              ? values.user_level_description
              : null,
          is_active: values.is_active !== undefined ? values.is_active : true,
          is_deleted: false,
        })
      );
      await dispatch(getUserLevel());
    },
    remove: async (key) => {
      await dispatch(deleteUserLevel(key));
      await dispatch(getUserLevel());
    },
    update: async (key, values) => {
      await dispatch(
        updateUserLevel({
          userlevelId: key,
          userlevel: {
            id: key,
            user_level_name: values.user_level_name,
            user_level_description:
              values.user_level_description !== undefined
                ? values.user_level_description
                : null,
            is_active: values.is_active !== undefined ? values.is_active : true,
            is_deleted: false,
          },
        })
      );
      await dispatch(getUserLevel());
    },
  });

  useEffect(() => {
    dispatch(getUserLevel());
    dispatch(getSystemUserModule());
  }, [dispatch]);

  useEffect(() => {
    if (systemUserPrivileges.data) {
      setPrivilegedItems(
        systemUserPrivileges.data.map((x) => x.user_module_id)
      );
    } else {
      setPrivilegedItems([]);
    }
  }, [systemUserPrivileges]);

  useEffect(() => {
    setNewItems(privilegedItems);
  }, [privilegedItems]);

  return (
    <div className="div-class">
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
            title="User Level"
            showTitle={true}
            width={500}
            height={450}
          />
          <Form width={900}>
            <Item itemType="group" colCount={1} colSpan={1}>
              <Item dataField="user_level_name" />
              <Item dataField="user_level_description" />
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
        />

        <Column
          caption="User Level Name"
          dataField="user_level_name"
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
          dataField="user_level_description"
          dataType="string"
          allowSorting={false}
          alignment="left"
          editorOptions={{
            maxLength: 50,
          }}
        ></Column>

        <Column
          caption="Is Active"
          dataField="is_active"
          dataType="boolean"
          allowSorting={false}
          alignment="center"
        />

        <Column type="buttons" width={300}>
          <GridButton name="edit" cssClass="dx-link-edit" text="Edit" />
          <GridButton
            text="Update Privileges"
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

      <BigPopup
        visible={open}
        hideOnOutsideClick={true}
        onHiding={handleOpen}
        dragEnabled={true}
        showCloseButton={true}
        showTitle={true}
        title="Update Privileges"
        width={400}
        height={400}
      >
        <ScrollView>
          <div>
            <div>
              <List
                dataSource={systemUserModules.data}
                keyExpr="id"
                displayExpr="module_name"
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
                id="btnUpdateUserPrivileges"
                text="Update"
                width="120"
                height={35}
                type="normal"
                stylingMode="contained"
                onClick={updateUserPrivileges}
              />
              &nbsp;&nbsp;&nbsp;
              <Button
                id="btnCancelUserPrivileges"
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
      </BigPopup>
    </div>
  );
};

export default UserLevel;
