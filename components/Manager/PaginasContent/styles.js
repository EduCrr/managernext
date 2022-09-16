import styled from "styled-components";

export const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .paginas {
    width: 900px;
    margin: auto;
    padding: 3rem 0px;
    border-radius: 15px;
    box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.1);
    z-index: 99;
    .contentPaginas {
      display: flex;
      margin: auto;
      width: 90% !important;
      height: inherit;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      form {
        width: 100%;
        input {
          width: 100% !important;
        }
      }
    }
    h2 {
      margin-bottom: 10px;
    }
    button {
      display: flex !important;
      margin-top: 10px;
      outline: 0;
      border: 0px;
      padding: 15px 35px;
      cursor: pointer;
      border-radius: 10px;
    }

    .inputImage {
      width: 50%;
      .container {
        position: relative;
        width: 100%;
      }
      img.selected {
        margin: 1rem 0px;
        border-radius: 15px;
        width: 100%;
        max-height: 600px;
      }

      .slide {
        width: none;
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
    .imgContent {
      margin: 1rem 0px;
    }
  }
`;
