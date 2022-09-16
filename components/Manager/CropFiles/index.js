import * as C from "../../../components/Manager/FormContentSingle/styles";
import { FaFileAlt } from "react-icons/fa";

import { useState, useEffect, useRef } from "react";

export const CropFiles = ({
  setSrcImg,
  result,
  name,
  setShowCropImg,
  setResult,
  path,
  id,
}) => {
  const onBannerChange = async (event) => {
    if (event.target.files.length > 0) {
      setSrcImg(URL.createObjectURL(event.target.files[0]));
      event.target.value = null;
      setShowCropImg(true);
    } else {
      setShowCropImg(false);
      setResult(null);
      setSrcImg(null);
    }
  };

  return (
    <C.Content>
      <div className="addBanner">
        <h3>{name}</h3>
        <input
          type="file"
          id={`file/${name}${id}`}
          onChange={onBannerChange}
          style={{ display: "none" }}
          accept="image/*"
        />
        <div className="inputImage">
          <label htmlFor={`file/${name}${id}`}>
            <div className="container">
              {path === "" && (
                <img
                  alt=""
                  className="selected"
                  src={result ?? "/default.png"}
                />
              )}
              {path !== "" && (
                <img alt="" className="selected" src={result ?? `${path}`} />
              )}
              <div className="middle">
                <div htmlFor={`file/${name}${id}`} className="text">
                  <FaFileAlt />
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </C.Content>
  );
};
