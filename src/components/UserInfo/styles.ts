import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ProfilePhoto = styled.Image`
  width: 115px;
  height: 115px;
  border-radius: 57px;
  margin-top: -57.5px;
  align-self: center;
`;

export const ProfileInfo = styled.View`
  margin-top: 40px;
`;

export const UserName = styled.Text`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TextName = styled.Text`
  font-size: 36px;
  align-self: center;
  margin-left: 10px;
  color: #fff;
`;

export const UserEmail = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const UserLocation = styled.Text`
  color: #fff;
  font-size: 16px;
`;
