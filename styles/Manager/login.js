import styled from "styled-components";

export const Content = styled.div`
  .left {
    background-image: url("https://images.unsplash.com/photo-1501555790667-ba7ea28b4cea?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685");
    background-position: center;
    background-size: cover;
    height: 100vh;
    width: 50%;
    opacity: 0.8;
    &::before {
      content: "";
      position: absolute;
      height: 100vh;
      width: 50%;
      background-color: rgba(220, 151, 99, 0.788);
      opacity: 1;
    }
  }

  .right {
    display: flex;
    justify-content: end;
    align-items: end;
    width: 50%;
    .title {
      padding: 20px 40px;
      height: inherit;
      z-index: 999;
    }
  }
  .modal {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    position: absolute;
    background-color: transparent !important;
    .login {
      text-align: center;
      width: 500px;
    }
    .loginContent {
      display: flex;
      flex-direction: column;
      padding: 50px;
      border-radius: 15px;
      margin-bottom: 20px;
      h2 {
        margin-bottom: 20px;
      }

      input {
        width: 100%;
        margin-top: 0.8rem;
      }
      button {
        margin: 0.8rem 0px !important;
        background-color: #dc9763 !important;
        color: white;
        width: 100%;
        cursor: pointer;
      }
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img {
        margin-left: 15px;
        height: 25px;
        width: auto;
      }
    }
  }
`;
