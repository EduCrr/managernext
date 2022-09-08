import styled from "styled-components";

export const Content = styled.div`
  padding: 20px;
  width: 100%;
  form.globalForm {
    margin: 1rem 0px;
    input,
    select {
      width: 100%;
    }
    button {
      margin-top: 0px !important;
    }
  }
  .addImg {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .containerImgs {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
  }
  .contentImgs {
    width: 23%;
    border-radius: 15px;
    padding: 15px;
    margin: 2rem 0px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    img {
      object-fit: cover;
      height: 250px;
      width: 100%;
      border-radius: 15px;
      margin-bottom: 10px;
    }
    .btns {
      margin-left: auto;
      button {
        width: auto;
        cursor: pointer;
        background-color: #dc9763;
        padding: 5px;
        border: 0;
        border-radius: 5px;
        color: white;
        margin-bottom: 0px !important;
      }
      div {
        width: auto;
        cursor: pointer;
        background-color: #dc9763;
        padding: 4px;
        border: 0;
        border-radius: 5px;
        color: white;
        margin-bottom: 0px !important;
      }
    }
  }
  .addBanner {
    h3 {
      margin: 30px 0px;
    }
    img {
      height: inherit;
      width: 100%;
      border-radius: 15px;
    }
    .inputImage {
      width: 50%;
      margin-bottom: 30px;
      .container {
        position: relative;
        width: fit-content;
      }
      img.selected {
        border-radius: 15px;
        width: 100%;
      }
      .image {
        opacity: 1;
        display: block;
        width: 100%;
        height: auto;
        transition: 0.5s ease;
        backface-visibility: hidden;
      }

      .middle {
        transition: 0.5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;
      }

      .container:hover img {
        opacity: 0.4;
      }

      .container:hover .middle {
        opacity: 1;
      }
      .text {
        padding: 10px;
        border-radius: 5px;
        outline: 0;
        border: 0;
        background-color: #dc9763;
        cursor: pointer;
        color: white;
      }
    }
  }
`;
