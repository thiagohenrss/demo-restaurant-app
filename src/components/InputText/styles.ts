import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/FontAwesome5';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  size: number;
  bgColor?: string;
}

interface IconProps {
  isIcon: boolean;
}

export const Container = styled.View<ContainerProps>`
  height: 60px;

  align-items: center;
  justify-content: center;

  ${props =>
    props.size === 1 &&
    css`
      width: 99%;
    `
  }

  ${props =>
    props.size === 2 &&
    css`
      width: 49%;
    `
  }

  ${props =>
    props.size === 3 &&
    css`
      width: 33%;
    `
  }

  margin-right: 5px;
`;

export const Content = styled.View<ContainerProps>`
  height: 60px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
`;

export const Icon = styled(FeatherIcon)<IconProps>`
  ${props =>
    props.isIcon &&
    css`
      margin-right: 10px;
      margin-left: 10px;
    `}
`;

export const InputTitle = styled.Text`
  flex-direction: row;
  align-self: flex-start;

  font-family: 'Poppins-Bold';
  font-size: 14px;

  padding: 5px;

  color: #4E4E4E;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'Poppins-Bold';
  font-size: 14px;

  color: #171717;
`;
