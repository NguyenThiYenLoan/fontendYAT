import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #f5f5fa;
  padding: 20px;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const Content = styled.div`
  padding: 10px;
  background: #fff;
  border-radius: 6px;
`;

export const ProductList = styled.div`
  margin-top: 20px;
`;

export const ProductItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 6px;
`;

export const ProductDetails = styled.div`
  display: flex;
  align-items: center;
`;

export const ProductName = styled.div`
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

export const PriceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ColumnLabel = styled.div`
  font-weight: bold;
  text-align: center;
  &:first-child {
    text-align: left;
  }
`;

