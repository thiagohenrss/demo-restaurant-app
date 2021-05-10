import React, { useEffect, useState } from 'react';

import {
  SafeAreaView, 
  ScrollView,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../services/api';

import { Restaurant } from '../../interfaces/restaurant';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Loading from '../../components/Loading';

import {
  Container,
  HeaderBar,
  HeaderContentImage,
  HeaderFooter,
  HeaderFooterTitleText,
  HeaderMenu,
  HeaderMenuButton,
  Content,
  ContentBody,
  StoreContainer,
  StoreTitleText,
  StoreTitleDescription,
  Divider,
} from './styles';

interface RouteParams {
  id: string;
}

const StoreDetail: React.FC = ({}) => {
  const { goBack } = useNavigation();

  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<Restaurant>();

  useEffect(() => {
    async function syncAPIRestaurant(): Promise<void> {
      try {
        const response = await api.get(
          `restaurants/${routeParams.id}`,
          { timeout: 15000 },
        );

        const { data } = response.data;

        setRestaurant(data);       
      } catch (error) {

      } finally {
        setLoading(false);  
      }
    }

    syncAPIRestaurant();
  }, [routeParams.id]);
  
  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <HeaderBar
          imageStyle={{
            resizeMode: "cover",
          }}
          source={{uri: restaurant?.image}}
        >
          <HeaderMenu>
            <HeaderMenuButton onPress={() => { goBack() }}>
              <Icon name="chevron-left" size={24} color="#ffffff" />
            </HeaderMenuButton>         
          </HeaderMenu>

          <HeaderFooter>
            <HeaderContentImage
              source={
                restaurant?.logo != ""
                ? { uri: restaurant?.logo }
                : { uri: 'https://developers.google.com/web/images/contributors/no-photo.jpg' }
              }
            />

            <HeaderFooterTitleText numberOfLines={1}>{ restaurant?.name }</HeaderFooterTitleText>
          </HeaderFooter>
        </HeaderBar>      

        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >                  
          <Content>            
            <ContentBody>
              <StoreContainer>
                <StoreTitleText numberOfLines={1}>Descrição</StoreTitleText>
                <StoreTitleDescription>{ restaurant?.description }</StoreTitleDescription>
              </StoreContainer>

              <StoreContainer>
                <StoreTitleText numberOfLines={1}>Contato</StoreTitleText>
                <StoreTitleDescription>{ restaurant?.telephone }</StoreTitleDescription>
                <StoreTitleDescription>{ restaurant?.website }</StoreTitleDescription>
              </StoreContainer>

              <StoreContainer>
                <StoreTitleText numberOfLines={1}>Faixa de Preço</StoreTitleText>
                <StoreTitleDescription>{ restaurant?.price_range }</StoreTitleDescription>
              </StoreContainer>

              <Divider/>

              <StoreContainer>
                <StoreTitleText numberOfLines={1}>Horários de Funcionamento</StoreTitleText>
                <StoreTitleDescription>{ restaurant?.opening_hours }</StoreTitleDescription>
              </StoreContainer>

              <StoreContainer>
                <StoreTitleText numberOfLines={1}>Formas de Pagamento</StoreTitleText>
                <StoreTitleDescription>{ restaurant?.payment_methods }</StoreTitleDescription>
              </StoreContainer>
            </ContentBody>
          </Content>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default StoreDetail;
