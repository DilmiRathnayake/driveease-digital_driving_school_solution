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
  getVehicleModel,
  createVehicleModel,
  deleteVehicleModel,
  updateVehicleModel,
} from "../../Features/VehicleModel/vehiclemodelSlice";

const VehicleModel = () => {
  const dispatch = useDispatch();

  const { vehicleModels } = useSelector((state) => state.vehiclemodel);

  const dataSource = new CustomStore({
    key: "id",
    loadMode: "raw",
    keyExpr: "id",
    load: () => vehicleModels,
    insert: async (values) => {
      await dispatch(
        createVehicleModel({
          vehicle_model_name: values.vehicle_model_name,
          vehicle_model_description:
            values.vehicle_model_description !== undefined
              ? values.vehicle_model_description
              : null,
          is_active: values.is_active !== undefined ? values.is_active : true,
          is_deleted: false,
        })
      );
      await dispatch(getVehicleModel());
    },
    remove: async (key) => {
      await dispatch(deleteVehicleModel(key));
      await dispatch(getVehicleModel());
    },
    update: async (key, values) => {
      await dispatch(
        updateVehicleModel({
          vehiclemodelId: key,
          vehiclemodel: {
            id: key,
            vehicle_model_name: values.vehicle_model_name,
            vehicle_model_description:
              values.vehicle_model_description !== undefined
                ? values.vehicle_model_description
                : null,
            is_active: values.is_active,
            is_deleted: false,
          },
        })
      );
      await dispatch(getVehicleModel());
    },
  });

  useEffect(() => {
    dispatch(getVehicleModel());
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
            title="Vehicle Model"
            showTitle={true}
            width={500}
            height={450}
          />
          <Form width={900}>
            <Item itemType="group" colCount={1} colSpan={1}>
              <Item dataField="vehicle_model_name" />
              <Item dataField="vehicle_model_description" />
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
          caption="Vehicle Model Name"
          dataField="vehicle_model_name"
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
          dataField="vehicle_model_description"
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

export default VehicleModel;
