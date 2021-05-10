import React, { useCallback, useEffect, useState, useRef } from 'react';

import {
  SafeAreaView, 
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { getValidationErros } from '../../utils/functions';

import api from '../../services/api';

import { Restaurant } from '../../interfaces/restaurant';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Loading from '../../components/Loading';
import InputText from '../../components/InputText';

import bgHeader from '../../assets/images/header.png';

import {
  Container,
  HeaderBar,
  HeaderBarTitle,
  HeaderBarSubTitle,
  HeaderContent,
  HeaderFooter,
  HeaderFooterFilter,
  IconButtonFilter,
  Content,
  ContentBody,
  ContentBodyTitle,
  ContentBodyTitleText,
  ContentFooter,
  StoreHorizontalContainer,
  StoreContainer,
  StoreImage,
  StoreTitle,
  StoreTitleText,
  ButtonSeeMore,
  ButtonSeeMoreText,  
} from './styles';

interface SearchFormData {
  search: string;
}

const Home: React.FC = ({}) => {
  const formRef = useRef<FormHandles>(null);

  const { navigate } = useNavigation();

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    async function syncAPIRestaurants(): Promise<void> {
      try {
        const response = await api.get(
          `/restaurants?page=${page}&limit=10`,
          { timeout: 15000 },
        );

        const { data } = response.data;  

        setRestaurants(data); 
        setPage(2);       
      } catch (error) {

      } finally {
        setLoading(false);  
      }
    }

    syncAPIRestaurants();
  }, []);

  const handleNavigateToRestaurant = useCallback((id: string) => {
    navigate('StoreDetail', { id: id });
  }, [navigate]);

  const onRefreshEnd = useCallback(async () => {
    try {
      setRefreshing(true);

      const response = await api.get(
        `/restaurants?page=${page}&limit=10`,
        { timeout: 15000 },
      );

      const { data } = response.data;  
   
      setRestaurants(restaurants.concat(data));

      setPage(page + 1);      
    } catch (error) {

    } finally {
      setRefreshing(false);
    }    
  }, [page, restaurants]);  

  const handleSearch = useCallback(
    async (data: SearchFormData) => {

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          search: Yup.string().required('Digite uma palavra'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        navigate('Stores', { data: data.search });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);

          if(loading){
            setLoading(false);
          }
        }
      }
  }, []);  

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>     
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <Container>
          <HeaderBar
            imageStyle={{
              resizeMode: "cover",
            }}
            source={bgHeader}
          >
            <HeaderContent>
              <HeaderBarTitle>{`Descubra novos\nsabores`}</HeaderBarTitle>
              <HeaderBarSubTitle>{`Aqui eu converso com você sobre\nnossa proposta`}</HeaderBarSubTitle>              
            </HeaderContent>

            <HeaderFooter>
              <Form ref={formRef} onSubmit={ handleSearch }>
                <HeaderFooterFilter>
                  <IconButtonFilter onPress={() => { formRef.current?.submitForm(); }}>
                    <Icon name="search" size={24} color="#ED1C24" />
                  </IconButtonFilter>

                  <InputText
                    size={1}
                    placeholder="Encontre um restaurante"
                    name="search"
                    // icon="envelope"
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="default"
                    returnKeyType="send"
                    onSubmitEditing={() => { formRef.current?.submitForm(); }}
                  />
                </HeaderFooterFilter>
              </Form>
            </HeaderFooter>
          </HeaderBar>      
                  
          <Content>            
            <ContentBody>
              <ContentBodyTitle>
                <ContentBodyTitleText>Restaurantes</ContentBodyTitleText>
              </ContentBodyTitle>

              <StoreHorizontalContainer>
                {
                  restaurants.map((restaurant: Restaurant, key) => {
                    return (
                      <StoreContainer
                        key={key}
                        onPress={() => { handleNavigateToRestaurant(restaurant.id) }}
                      >
                        <StoreImage
                          imageStyle={{
                            borderRadius: 15,
                            resizeMode: "cover",
                          }}
                          source={
                            restaurant.image !== null
                            ? { uri: restaurant.image }
                            : { uri: "https://media-cdn.tripadvisor.com/media/photo-s/0f/61/05/b6/area-externa-do-restaurante.jpg" }                            
                          }
                        >
                          <StoreTitle>
                            <StoreTitleText numberOfLines={1} color="#ffffff">{ restaurant.name }</StoreTitleText>
                          </StoreTitle>                          
                        </StoreImage>
                      </StoreContainer>
                    );
                  })
                }
              </StoreHorizontalContainer>

              <ContentFooter>                
                <ButtonSeeMore onPress={ onRefreshEnd }>
                  <ButtonSeeMoreText>
                    { refreshing ? "Carregando" : "Carregar mais" }
                  </ButtonSeeMoreText>

                  {refreshing && 
                    <ActivityIndicator size="small" color="#D1000B" style={{ marginLeft: 5 }}/> 
                  }                  
                </ButtonSeeMore>
              </ContentFooter>
            </ContentBody>
          </Content>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
