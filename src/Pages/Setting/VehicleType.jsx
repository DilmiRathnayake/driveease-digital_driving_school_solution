import React, { useEffect } from "react";
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
import { changeRouteName } from "../../Features/Route/routeSlice";
import {
  getVehicleType,
  createVehicleType,
  deleteVehicleType,
  updateVehicleType,
} from "../../Features/VehicleType/vehicletypeSlice";

const VehicleType = () => {
  const dispatch = useDispatch();

  const { vehicleTypes } = useSelector((state) => state.vehicletype);

  const dataSource = new CustomStore({
    key: "id",
    loadMode: "raw",
    keyExpr: "id",
    load: () => vehicleTypes,
    insert: async (values) => {
      await dispatch(
        createVehicleType({
          vehicle_type_name: values.vehicle_type_name,
          vehicle_type_description:
            values.vehicle_type_description !== undefined
              ? values.vehicle_type_description
              : null,
          is_active: values.is_active !== undefined ? values.is_active : true,
          is_deleted: false,
        })
      );
      await dispatch(getVehicleType());
    },
    remove: async (key) => {
      await dispatch(deleteVehicleType(key));
      await dispatch(getVehicleType());
    },
    update: async (key, values) => {
      await dispatch(
        updateVehicleType({
          vehicletypeId: key,
          vehicletype: {
            id: key,
            vehicle_type_name: values.vehicle_type_name,
            vehicle_type_description:
              values.vehicle_type_description !== undefined
                ? values.vehicle_type_description
                : null,
            is_active: values.is_active,
            is_deleted: false,
          },
        })
      );
      await dispatch(getVehicleType());
    },
  });

  useEffect(() => {
    dispatch(getVehicleType());
  }, [dispatch]);
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
            title="Vehicle Type"
            showTitle={true}
            width={500}
            height={450}
          />
          <Form width={900}>
            <Item itemType="group" colCount={1} colSpan={1}>
              <Item dataField="vehicle_type_name" />
              <Item dataField="vehicle_type_description" />
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
          caption="Vehicle Type Name"
          dataField="vehicle_type_name"
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
          dataField="vehicle_type_description"
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

        <Column type="buttons" width={180}>
          <GridButton name="edit" cssClass="dx-link-edit" text="Edit" />
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
    </>
  );
};

export default VehicleType;
