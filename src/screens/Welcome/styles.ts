import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  padding: 0px 0px ${16 + getBottomSpace()}px 0px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const ContentHeader = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

export const ContentBody = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center; 
`;

export const ContentFooter = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;  

  padding: 20px;
`;

export const TitleHeader = styled.Text`
  font-family: 'Segoe UI Bold';
  font-size: 24px;

  text-align: center;
  color: #ffffff;

  margin-top: 10px;
`;

export const TitleBody = styled.Text`
  font-family: 'Segoe UI Bold';
  font-size: 32px;

  text-align: center;
  color: #ffffff;
`;

export const Description = styled.Text`
  color: #ffffff;

  font-family: 'Segoe UI';
  font-size: 18px;
  line-height: 23px;
  text-align: center;

  margin-top: 20px;

  opacity: 0.6;
`;