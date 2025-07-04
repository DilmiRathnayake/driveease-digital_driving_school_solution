import logo from "../../Images/DriveEase_logo.jpg";

const Logo = ({ width, height, image }) => {
  return <img style={{ width: width, height: height }} src={image||logo} alt="" />;
};

export default Logo;
