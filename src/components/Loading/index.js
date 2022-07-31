import { LOADING } from "../../constants";

import './Loading.css';

const Loading = () => {
  return (
    <div className="loading">
      {LOADING}
      <div className="spinner-sec spin-sec-one"></div>
      <div className="spinner-sec spin-sec-two"></div>
      <div className="spinner-sec spin-sec-three"></div>
    </div>
  );
};

export default Loading;
