import { useEffect, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";

export const CropItens = ({
  srcImg,
  showCropImg,
  image,
  setImage,
  w,
  h,
  setResult,
  setShowCropImg,
  setChangeBanner,
}) => {
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    aspect: w / h,
  });

  const getCroppedImg = async () => {
    try {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      var originWidth = crop.width * scaleX;
      var originHeight = crop.height * scaleY;
      // maximum width/height
      var maxWidth = w * 5,
        maxHeight = (w * 5) / (w / h);
      var targetWidth = originWidth,
        targetHeight = originHeight;
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }
      // set canvas size
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        targetWidth,
        targetHeight
      );

      setShowCropImg(false);
      setChangeBanner(true);
      return new Promise((resolve, reject) => {
        resolve(setResult(canvas.toDataURL("image/png", 1.0)));
      });
    } catch (e) {
      alert("Precisa cortar a imagem");
    }
  };

  const handleCloseCrop = () => {
    setShowCropImg(false);
    setResult(null);
  };

  return (
    <>
      {showCropImg && (
        <div className="showCrop">
          <div className="cropContent">
            <span onClick={handleCloseCrop} class="close-modal-crop">
              &times;
            </span>
            {srcImg && (
              <>
                <div>
                  <ReactCrop
                    style={{ maxWidth: "50%" }}
                    src={srcImg}
                    onImageLoaded={setImage}
                    crop={crop}
                    onChange={setCrop}
                    crossorigin="anonymous"
                  />
                </div>
                <button className="cropButton" onClick={getCroppedImg}>
                  Cortar Imagem
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
