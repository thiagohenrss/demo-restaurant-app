import styled from 'styled-components/native';
import { Platform, TextProps } from 'react-native';

import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

interface LabelCaptionProps extends TextProps {
  fontSize?: number;
  isBold?: boolean;
  color?: string;
}

export const Container = styled.View`
  flex: 1;
  padding: 0px 0px ${16 + getBottomSpace()}px 0px;

  background: #ffffff;
`;

export const HeaderBar = styled.ImageBackground`
  flex-direction: column;
  justify-content: center;

  height: 380px;

  padding-top: ${Platform.OS === 'android' ? 0 : getStatusBarHeight()}px;

  background: #ffffff;
`;

export const HeaderBarTitle = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 24px;
  color: #333333;
`;

export const HeaderBarSubTitle = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 18px;
  color: #333333;
`;

export const HeaderContent = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;

  padding: 20px;
`;

export const HeaderFooter = styled.View`
  flex-direction: column;
  justify-content: center;

  height: 90px;
  padding: 20px;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  background: #ffffff;
`;

export const HeaderFooterFilter = styled.View`
  flex-direction: row;
  align-items: center;

  height: 55px;

  padding: 0 10px;

  border-color: #E6E6E6;
  border-width: 1px;
  border-radius: 10px;
`;

export const IconButtonFilter = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const ContentBody = styled.View`
  flex: 1;
  padding: 20px;
`;

export const ContentFooter = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ContentBodyTitle = styled.View`
  padding: 10px 0;
  /* background: #8000ff; */
`;

export const ContentBodyTitleText = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 15px;
  color: #333333;
`;

export const StoreHorizontalContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const StoreContainer = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;  

  width: 47%;
  height: 160px;

  margin-bottom: 10px;

  border-radius: 15px;

  background: #ffffff;
`;

export const StoreImage = styled.ImageBackground`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;

  width: 100%;
  height: 100%;

  padding: 10px;
`;

export const StoreTitle = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const StoreTitleText = styled.Text<LabelCaptionProps>`
  font-family: 'Poppins-Bold';
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;

  color: ${ props => props.color || '#7C8494' };
`;

export const ButtonSeeMore = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 60%;
  height: 35px;

  border-radius: 20px;
  background: #f7f7f7;
`;

export const ButtonSeeMoreText = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 14px;
  color: #808080;
`;