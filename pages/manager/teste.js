import { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";
import blogApi from "../api/blogApi";

function App() {
  const [srcImg, setSrcImg] = useState(null);
  const [showCropImg, setShowCropImg] = useState(false);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 80,
    aspect: 1920 / 800,
  });
  const [result, setResult] = useState(null);

  const handleImage = async (event) => {
    if (event.target.files.length > 0) {
      setSrcImg(URL.createObjectURL(event.target.files[0]));
      console.log(event.target.files[0]);
      setShowCropImg(true);
    } else {
      setShowCropImg(false);
      setSrcImg(null);
    }
  };

  const getCroppedImg = async () => {
    try {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      var originWidth = crop.width * scaleX;
      var originHeight = crop.height * scaleY;
      // maximum width/height
      var maxWidth = 1920 * 5,
        maxHeight = (1920 * 5) / (1920 / 800);
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
      return new Promise((resolve, reject) => {
        resolve(setResult(canvas.toDataURL("image/png", 1.0)));
      });
    } catch (e) {
      setShowCropImg(false);
      alert("crop the image");
    }
  };

  function b64toBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let att = b64toBlob(result);
    let json = await blogApi.addSlide2(att);
    if (json.error !== "") {
      alert(json.error);
    } else {
      alert("foi");
    }
    console.log(result);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" accept="image/*" onChange={handleImage} />
        </div>

        <button variant="primary" type="submit">
          Submit
        </button>
      </form>
      {showCropImg && (
        <div className="showCrop">
          <div className="cropContent">
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
                  crop
                </button>
              </>
            )}
            {/* {result && (
              <div>
                <img src={result} alt="cropped image" />
              </div>
            )} */}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
