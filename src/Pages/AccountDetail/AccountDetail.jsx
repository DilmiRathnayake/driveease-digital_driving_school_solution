import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRouteName } from "../../Features/Route/routeSlice";
import { Button, TextBox } from "devextreme-react";
import { Typography } from "@mui/material";
import { RequiredRule } from "devextreme-react/form";
import "./AccountDetail.css";
import { Success, Warning } from "../../Components/Notification/Notification";
import {
  getSchoolDetail,
  updateSchoolDetail,
} from "../../Features/SchoolDetail/schooldetailSlice";

const AccountDetail = () => {
  const dispatch = useDispatch();

  const [schoolName, setSchoolName] = useState(null);
  const [address, setAddress] = useState(null);
  const [telephone, setTelephone] = useState(null);
  const [email, setEmail] = useState(null);
  const [contactNo, setContactNo] = useState(null);

  const [selectedSchoolId, setSelectedSchoolId] = useState(0);

  const { schoolDetail } = useSelector((state) => state.schooldetail);

  const clickRegisterHandler = async () => {
    if (schoolName === "" || schoolName === null) {
      Warning("School Name is required");
    } else if (contactNo === "" || contactNo === null) {
      Warning("Mobile is required");
    } else if (telephone === "" || telephone === null) {
      Warning("Telephone No is required");
    } else if (email === "" || email === null) {
      Warning("Email is required");
    } else {
      await dispatch(
        updateSchoolDetail({
          schooldetailId: selectedSchoolId,
          schooldetail: {
            id: selectedSchoolId,
            school_name: schoolName,
            address: address,
            telephone: telephone,
            email: email,
            contact_no: contactNo,
            is_active: true,
            is_deleted: false,
          },
        })
      );

      Success("Successfully Updated");
    }
  };

  useEffect(() => {
    dispatch(changeRouteName("Account Detail"));
    dispatch(getSchoolDetail());
  }, [dispatch]);

  useEffect(() => {
    if (schoolDetail) {
      setSelectedSchoolId(schoolDetail.id);
      setSchoolName(schoolDetail.school_name);
      setAddress(schoolDetail.address);
      setTelephone(schoolDetail.telephone);
      setEmail(schoolDetail.email);
      setContactNo(schoolDetail.contact_no);
    }
    else{
      setSelectedSchoolId(0);
    }
  }, [schoolDetail]);

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
        }}
        autoComplete="off"
      >
        <div className="formlayoutRegistration">
          <Typography
            fontSize={"1rem"}
            width="15rem"
            sx={{ ml: "2rem", color: "#5A5A5A" }}
          >
            School Name
          </Typography>
          <TextBox
            id="tbSchoolName"
            value={schoolName}
            className="customPositioningRegistration"
            width={400}
            onValueChanged={(e) => setSchoolName(e.value)}
          />
        </div>
        <div className="formlayoutRegistration">
          <Typography
            fontSize={"1rem"}
            width="15rem"
            sx={{ ml: "2rem", color: "#5A5A5A" }}
          >
            Full Address
          </Typography>
          <TextBox
            id="tbAddress"
            value={address}
            className="customPositioningRegistration"
            width={400}
            onValueChanged={(e) => setAddress(e.value)}
          >
            <RequiredRule message="First Name is required" />
          </TextBox>
        </div>
        <div className="formlayoutRegistration">
          <Typography
            fontSize={"1rem"}
            width="15rem"
            sx={{ ml: "2rem", color: "#5A5A5A" }}
          >
            Mobile No
          </Typography>
          <TextBox
            id="tbMobileNo"
            value={contactNo}
            onValueChanged={(e) => setContactNo(e.value)}
            className="customPositioningRegistration"
            width={400}
            mask="0000000000"
          />
        </div>
        <div className="formlayoutRegistration">
          <Typography
            fontSize={"1rem"}
            width="15rem"
            sx={{ ml: "2rem", color: "#5A5A5A" }}
          >
            Telephone
          </Typography>
          <TextBox
            id="tbTelephone"
            value={telephone}
            onValueChanged={(e) => setTelephone(e.value)}
            className="customPositioningRegistration"
            width={400}
            mask="0000000000"
          />
        </div>
        <div className="formlayoutRegistration">
          <Typography
            fontSize={"1rem"}
            width="15rem"
            sx={{ ml: "2rem", color: "#5A5A5A" }}
          >
            Email Address
          </Typography>
          <TextBox
            id="tbEmail"
            value={email}
            className="customPositioningRegistration"
            width={400}
            onValueChanged={(e) => setEmail(e.value)}
          />
        </div>
        <div className="formlayoutSaveRegistration" style={{ width: "700px" }}>
          <Button
            id="btnRegister"
            onClick={clickRegisterHandler}
            className="customButtonCommonRegistrationList"
            width="120"
            text="Save"
            type="default"
            stylingMode="contained"
          />
        </div>
      </form>
    </>
  );
};

export default AccountDetail;
