import styled from "styled-components";

export const Content = styled.div`
  .modalSuccess {
    position: fixed;
    margin: auto;
    top: 50%;
    right: 0;
    left: 0;
    width: 100%;
    background: rgb(231 43 43 / 70%);
    padding: 30px 0px;
    text-align: center;
    z-index: 99;
    color: white;
    .contentModal {
      display: flex;
      height: inherit;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    h2 {
      margin-bottom: 10px;
    }
    button {
      display: flex !important;
      margin-top: 20px;
      background-color: white;
      color: #222;
      outline: 0;
      border: 0px;
      padding: 15px 35px;
      cursor: pointer;
      border-radius: 10px;
    }
  }
`;
