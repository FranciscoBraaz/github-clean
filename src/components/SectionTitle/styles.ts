import styled from 'styled-components/native';

interface TitleProps {
  hasPhoto: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text<TitleProps>`
  align-self: center;
  padding-left: ${(props) => (props.hasPhoto ? '20px' : '10px')};
  padding-right: 20px;
  color: #fff;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  margin-left: 15px;
  border-radius: 32px;
  overflow: hidden;
  border-width: 3px;
  border-color: #fff;
`;
