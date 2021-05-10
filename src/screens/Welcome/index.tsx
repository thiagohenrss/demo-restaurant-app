import React, { useCallback } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Alert, 
  StatusBar 
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import SvgLogo from '../../assets/svg/logo';

import Button from '../../components/Button';

import {
  Container,
  Content,
  ContentHeader,
  ContentBody,
  ContentFooter,
  TitleHeader,
  TitleBody,
  Description,
} from './styles';

const Welcome = () => {
  const { navigate } = useNavigation();

  return (    
    <SafeAreaView style={ styles.container }>  
      <ScrollView
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >   
        <Container>  
          <Content>
            <ContentHeader>
              <SvgLogo color="#ED1C24"/>
              <TitleHeader> Find Restaurant </TitleHeader>
            </ContentHeader>

            <ContentBody>
              <TitleBody> {`Olá!\nSeja bem-vindo.`} </TitleBody>

              <Description>
                {`Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.`}
              </Description>
            </ContentBody>

            <ContentFooter>
              <Button icon="long-arrow-alt-right" onPress={ () => { navigate('Home'); } } >
                COMEÇAR
              </Button>
            </ContentFooter>
          </Content>
        </Container>
      </ScrollView>
    </SafeAreaView>          
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  }
});

export default Welcome;