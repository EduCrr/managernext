import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0px;
  width: 100%;
  .user {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .loggedUser {
      margin-right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 50%;
      }
      span.menuButton {
        cursor: pointer;
      }
    }
    .btnsTop {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      button {
        outline: 0;
        border: 0px;
        cursor: pointer;
        background-color: transparent;
        color: #dc9763;
      }
    }
    .menuButtonHeader {
      padding: 0px 10px;
      position: absolute;
      margin-top: 30px;
      cursor: pointer;
    }
  }
  .summary {
    display: none;
  }

  .post {
    cursor: pointer;
  }

  .posts {
    list-style-type: none;
  }
`;

export const HeaderArea = styled.header`
  .menu-area {
    width: 12%;
    position: fixed;
    height: 100%;
    top: 0;
    z-index: 999;
    transition: ${(props) =>
      props.open ? "all ease-out 0s" : "all ease-out 5s"};
    left: ${(props) => (props.open ? "0px" : "-1000px")};

    nav {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      height: 100%;
      ul {
        width: 100%;
        transition: all ease 0.3s;
        .menu {
          cursor: pointer;
          display: flex;
          padding: 15px 10px;
          width: 100% !important;
          transition: all ease 0.3s;
          svg {
            margin-right: 10px;
          }

          &:hover {
            background-color: #dc9763;
            color: white;
            a {
              color: white !important;
            }
          }
        }
        .active {
          background-color: #dc9763;
          transition: all ease 0.3s;
          a {
            color: white !important;
          }
        }
        .activeClick {
          padding: 15px 10px;
          background-color: #dc9763;
          transition: all ease 0.3s;
          a {
            color: white !important;
          }
        }
        li {
          display: flex;
          flex-direction: column;
          list-style-type: none;
          a {
          }
        }
      }
    }
  }
  .dropMenu {
    .menu {
      display: flex;
      font-size: 14px;
    }
    .menu svg {
      margin-left: 10px;
      margin-top: 2px;
    }
  }
  .logOut {
    position: absolute;
    bottom: 35px;
    left: 10px;
    right: 0;
  }
`;

export const ShowContentMenu = styled.div`
  .content {
    li:last-child {
      margin-bottom: 0px;
    }
  }
`;
