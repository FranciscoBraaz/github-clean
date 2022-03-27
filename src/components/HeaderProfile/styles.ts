import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 140px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  background-color: aliceblue;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  background-color: #1f1f1f;
`;

export const Username = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const ContainerLogout = styled.Pressable`
  flex-direction: row;
  justify-content: flex-end;
`;

export const ContainerChangeProfile = styled.Pressable`
  flex-direction: row;
`;
