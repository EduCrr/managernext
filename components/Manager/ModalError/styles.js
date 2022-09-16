import styled from "styled-components";

export const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  border-radius: 5px;
  height: 100%;
  .modalError {
    height: inherit;
    margin: auto;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .contentModal {
    position: relative;
    padding: 30px 0px;
    background: rgb(231 43 43 / 70%);
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 99;
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
`;
