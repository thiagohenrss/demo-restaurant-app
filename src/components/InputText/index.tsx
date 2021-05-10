import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';

import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';

import {
  Container,
  Content,
  InputTitle,
  TextInput,
  Icon,
} from './styles';
interface InputProps extends TextInputProps {
  title?: string;
  name: string;
  icon?: string;
  size?: number;
  done?: boolean;
  color?: string;
}
interface InputValueReference {
  value: string;
}
interface InputRef {
  focus(): void;
}

const InputText: React.RefForwardingComponent<InputRef, InputProps> = (
  { title, name, icon, size, done, color, ...props },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Container size={size}>
        {!!title && <InputTitle>{title}</InputTitle>}

        <Content isFocused={isFocused} isErrored={!!error} bgColor={ color }>
          <Icon
            isIcon={!!icon}
            name={icon}
            size={20}
            color={isFocused || isFilled || done ? '#c53030' : '#4f4f4f'}
          />

          <TextInput
            ref={inputElementRef}
            keyboardAppearance="dark"
            placeholderTextColor="#C4C4C4"
            defaultValue={ defaultValue }
            onChangeText={value => {
              inputValueRef.current.value = value;
            }}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...props}
          />
        </Content>
      </Container>
    </>
  );
};

export default forwardRef(InputText);
