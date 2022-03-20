import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #292929;
`;

export const ImageLogin = styled.Image`
  width: 98px;
  height: 96px;
`;

export const Input = styled.TextInput`
  border: 1px solid #e5e5e5;
  height: 56px;
  border-radius: 12px;
  width: 90%;
  background-color: #fff;
  margin-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 18px;
`;

export const ButtonSubmit = styled.Pressable`
  width: 90%;
  height: 56px;
  background-color: #ffce00;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-top: 20px;
  flex-direction: row;
`;
