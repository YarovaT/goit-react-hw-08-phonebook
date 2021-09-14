import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import style from "./Loader.module.css";

function LoaderSpinner() {
  return (
    <div className={style.overlay}>
      <Loader type="ThreeDots" color="#f50057" height="35" />
    </div>
  );
}

export default LoaderSpinner;
