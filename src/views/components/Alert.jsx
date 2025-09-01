import React, { useEffect, useRef, useState } from "react";
import { Portal } from "../../main";
import { useSelector, useDispatch } from "react-redux";
import { setAlertMessage, resetAlertMessage } from '../../controllers/states/slices/alertslice';
import { getDispatch } from "../../App";
const Alert = () => {
  const alertMessage = useSelector((state) => state.alertMessage);
  const dispatch = useDispatch();
  const width = Math.min(window.innerWidth - 30, 400);
  const pos = (window.innerWidth - width) / 2;
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (alertMessage.message !== "Default") {
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => {
            getDispatch()(resetAlertMessage());
        }, 1000);
        dispatch({ type: "RESET_ALERT" });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage, dispatch]);

  const iconSign = [
    null,
    <i className="fa-solid fa-circle-check scale-[1.4] text-green-500"></i>,
    <i className="fa-solid fa-circle-xmark scale-[1.4] text-red-500"></i>,
  ];

  return (
    <Portal>
      <div
        ref={ref}
        className={`h-[60px] bg-gray-800 text-white font-[monospace] px-[20px] flex rounded-[10px] font-bold justify-between absolute items-center translate-y-[-150px] ${
          show ? "alert-show" : ""
        }`}
        style={{
          left: pos + "px",
          width: width + "px",
          transition: "all .5s linear",
        }}
      >
        <div>{iconSign[alertMessage.sign]}</div>
        <div>{alertMessage.message}</div>
        <div>
          <i
            className="fa-solid fa-xmark scale-[1]"
            onClick={() => {
              setShow(false);
              dispatch({ type: "RESET_ALERT" }); // reset on manual close too
            }}
          ></i>
        </div>
      </div>
    </Portal>
  );
};

export default Alert;
