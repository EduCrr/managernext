import styled from "styled-components";

export const Content = styled.div`
  .modal {
    text-align: center;
    height: auto;
    max-height: 400px;
    top: 30%;
    overflow-y: scroll;
    .contentModal {
      display: flex;
      height: inherit;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 50px;
    }
    h4 {
      margin-bottom: 20px;
    }
    button.bt {
      display: flex !important;
    }
    .close-modal {
      position: absolute;
      top: 0px;
      right: 1rem;
      font-size: 3.5rem;
      color: white;
      cursor: pointer;
      border: none;
      background: none;
    }
  }
`;
