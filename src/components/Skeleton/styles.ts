import { ViewComponent, ViewProps } from 'react-native';
import styled from 'styled-components/native';

interface ContainerProps extends ViewProps {
  width: string;
  height: string;
}

export const Container = styled.View<ContainerProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: #ddd;
  overflow: hidden;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #fff;
  margin-top: 20px;
`;
