import React, { useEffect } from "react";
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
  createVehicle,
  deleteVehicle,
  getVehicle,
  updateVehicle,
} from "../../Features/Vehicle/vehicleSlice";
import { getActiveVehicleType } from "../../Features/VehicleType/vehicletypeSlice";
import { getActiveVehicleModel } from "../../Features/VehicleModel/vehiclemodelSlice";

const Vehicle = () => {
  const dispatch = useDispatch();

  const fuelTypes = [
    {
      id: 1,
      fuel_type_name: "Petrol",
    },
    {
      id: 2,
      fuel_type_name: "Diesel",
    },
  ];

  const { vehicles } = useSelector((state) => state.vehicle);
  const { vehicleTypesActive } = useSelector((state) => state.vehicletype);
  const { vehicleModelsActive } = useSelector((state) => state.vehiclemodel);

  const dataSource = new CustomStore({
    key: "id",
    loadMode: "raw",
    keyExpr: "id",
    load: () => vehicles,
    insert: async (values) => {
      await dispatch(
        createVehicle({
          vehicle_plate: values.vehicle_plate,
          vehicle_description:
            values.vehicle_description !== undefined
              ? values.vehicle_description
              : null,
          vehicle_type_id: values.vehicle_type_id,
          vehicle_model_id: values.vehicle_model_id,
          fuel_type_id: values.fuel_type_id,
          is_active: values.is_active !== undefined ? values.is_active : true,
          is_deleted: false,
        })
      );
      await dispatch(getVehicle());
    },
    remove: async (key) => {
      await dispatch(deleteVehicle(key));
      await dispatch(getVehicle());
    },
    update: async (key, values) => {
      await dispatch(
        updateVehicle({
          vehicleId: key,
          vehicle: {
            id: key,
            vehicle_plate: values.vehicle_plate,
            vehicle_description:
              values.vehicle_description !== undefined
                ? values.vehicle_description
                : null,
            vehicle_type_id: values.vehicle_type_id,
            vehicle_model_id: values.vehicle_model_id,
            fuel_type_id: values.fuel_type_id,
            is_active: values.is_active,
            is_deleted: false,
          },
        })
      );
      await dispatch(getVehicle());
    },
  });

  useEffect(() => {
    dispatch(changeRouteName("Vehicles"));
    dispatch(getVehicle());
    dispatch(getActiveVehicleType());
    dispatch(getActiveVehicleModel());
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
            title="Vehicle"
            showTitle={true}
            width={500}
            height={450}
          />
          <Form width={900}>
            <Item itemType="group" colCount={1} colSpan={1}>
              <Item dataField="vehicle_plate" />
              <Item dataField="vehicle_description" />
              <Item dataField="vehicle_type_id" />
              <Item dataField="vehicle_model_id" />
              <Item dataField="fuel_type_id" />
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
          caption="Vehicle Plate"
          dataField="vehicle_plate"
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
          dataField="vehicle_description"
          dataType="string"
          allowSorting={false}
          alignment="left"
          editorOptions={{
            maxLength: 50,
          }}
        ></Column>

        <Column
          caption="Vehicle Type"
          dataField="vehicle_type_id"
          dataType="int"
          allowSorting={false}
          alignment="left"
        >
          <Lookup
            dataSource={vehicleTypesActive}
            valueExpr="id"
            displayExpr="vehicle_type_name"
          />
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Vehicle Model"
          dataField="vehicle_model_id"
          dataType="int"
          allowSorting={false}
          alignment="left"
        >
          <Lookup
            dataSource={vehicleModelsActive}
            valueExpr="id"
            displayExpr="vehicle_model_name"
          />
          <RequiredRule message={""} />
        </Column>

        <Column
          caption="Fuel Type"
          dataField="fuel_type_id"
          dataType="int"
          allowSorting={false}
          alignment="left"
        >
          <Lookup
            dataSource={fuelTypes}
            valueExpr="id"
            displayExpr="fuel_type_name"
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

export default Vehicle;
