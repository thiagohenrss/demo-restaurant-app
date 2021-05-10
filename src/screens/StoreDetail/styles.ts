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
  justify-content: space-between;

  height: 250px;

  padding-top: ${Platform.OS === 'android' ? 0 : getStatusBarHeight()}px;

  background: #ffffff;
`;

export const HeaderMenu = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 90px;

  padding: 80px 10px;
`;

export const HeaderMenuButton = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;

  padding: 10px;
`;

export const HeaderContentImage = styled.Image`
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100px;

  margin-top: -75px;

  border-width: 4px;
  border-radius: 50px;
  border-color: #E5E5E5;

  background-color: #ffffff;
`;

export const HeaderFooter = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 90px;

  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  background: #ffffff;
`;

export const HeaderFooterTitleText = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 20px;
  color: #333333;
`;

export const Content = styled.View`
  flex: 1;
`;

export const ContentBody = styled.View`
  flex: 1;
  padding: 20px;
`;

export const StoreContainer = styled.View`
  flex-direction: column;
  justify-content: center;

  padding: 10px;

  margin-bottom: 10px;
`;

export const StoreTitleText = styled.Text<LabelCaptionProps>`
  font-family: 'Poppins-Bold';
  font-size: 16px;
  font-weight: 700;
  line-height: 21px;

  color: #333333;
`;

export const StoreTitleDescription = styled.Text<LabelCaptionProps>`
  font-family: 'Poppins-Regular';
  font-size: 13px;
  line-height: 18px;

  color: #333333;

  margin-top: 5px;
`;

export const Divider = styled.View`
  flex-direction: column;
  justify-content: center;

  padding: 10px;
  margin-bottom: 20px;

  border-bottom-width: 1px;
  border-color: #CCCCCC;
`;