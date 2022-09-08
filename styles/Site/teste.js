import styled from "styled-components";

export const Content = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  .left {
    width: 400px;
    h3 {
      margin-bottom: 10px;
    }
    p {
      line-height: 22px;
    }
    button {
      margin: 1rem 0px;
      cursor: pointer;
      padding: 15px 25px;
      color: white;
      background-color: #dc9763;
      outline: 0;
      border: 0;
      border-radius: 15px;
    }
    img {
      border-radius: 15px;
    }
  }
  .right {
    flex: 1;
    img {
      height: 100vh;
      width: 100%;
      object-fit: cover;
    }
  }
`;
