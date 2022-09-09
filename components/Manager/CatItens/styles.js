import styled from "styled-components";

export const Content = styled.div`
  padding: 10px 15px;
  .init {
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      background-color: #dc9763;
      padding: 10px 20px;
      border: 0;
      border-radius: 5px;
      color: white;
    }
  }
  h2 {
    margin: 1rem 0px;
  }
  .containerCategorys {
    border-radius: 15px;
    padding: 15px;
    margin: 2rem 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .id {
      width: 50px;
    }
    .name {
      flex: 1;
    }
    .btns {
      display: flex;
      align-items: center;
      button {
        margin-right: 10px;
        cursor: pointer;
        background-color: #dc9763;
        padding: 5px;
        border: 0;
        border-radius: 5px;
        color: white;
      }
    }
    button.radio {
      cursor: pointer;
      margin-left: 10px;
      background-color: transparent;
      padding: 5px;
      border: 0;
      border-radius: 5px;
      color: white;
    }
  }
`;
