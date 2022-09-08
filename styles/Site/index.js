import styled from "styled-components";

export const Content = styled.div`
  max-width: 1100px;
  margin: auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .item {
    text-align: center;
    img {
      object-fit: cover;
      height: 300px;
      width: 300px;
      border-radius: 15px;
    }

    h3 {
      margin-top: 10px;
    }
  }
`;
