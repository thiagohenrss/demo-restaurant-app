import React, { useCallback, useEffect, useState, useRef } from 'react';

import {
  SafeAreaView, 
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';

import { getValidationErros } from '../../utils/functions';

import { Restaurant } from '../../interfaces/restaurant';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Loading from '../../components/Loading';
import InputText from '../../components/InputText';

import {
  Container,
  HeaderBar,
  HeaderBarTitle,
  HeaderBarSubTitle,
  HeaderMenu,
  HeaderMenuButton,
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

interface RouteParams {
  data: string;
}

interface SearchFormData {
  search: string;
}


const Stores: React.FC = ({}) => {
  const formRef = useRef<FormHandles>(null);
  const { navigate, goBack } = useNavigation();

  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [page, setPage] = useState(1);
  const [routerData, setRouterData] = useState(routeParams.data);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    async function syncAPIRestaurants(): Promise<void> {
      try {
        const response = await api.get(
          `/restaurants?page=${page}&limit=10&search=${routerData}`,
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
  }, [routerData]);

  const handleNavigateToRestaurant = useCallback((itemObject: Restaurant) => {
    navigate('StoreDetail', itemObject);
  }, [navigate]);

  const onRefreshEnd = useCallback(async () => {
    try {
      setRefreshing(true);

      const response = await api.get(
        `/restaurants?page=${page}&limit=10&search=${routerData}`,
        { timeout: 15000 },
      );

      const { data } = response.data;  
   
      setRestaurants(restaurants.concat(data));

      setPage(page + 1);      
    } catch (error) {

    } finally {
      setRefreshing(false);
    }    
  }, [page, restaurants, routerData]);  

  const handleSearch = useCallback(
    async (formData: SearchFormData) => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          search: Yup.string().required('Digite uma palavra'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        setRouterData(formData.search);

        const response = await api.get(
          `/restaurants?page=${page}&limit=10&search=${formData.search}`,
          { timeout: 15000 },
        );

        const { data } = response.data;  

        setRestaurants(data); 
        setPage(2);  
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);
        }
      } finally {
        if(loading){
          setLoading(false);
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
          <HeaderBar>
            <HeaderMenu>
              <HeaderMenuButton onPress={() => { goBack() }}>
                <Icon name="chevron-left" size={24} color="#504C4C" />
              </HeaderMenuButton>         

              <HeaderBarSubTitle>{`Resultado para`}</HeaderBarSubTitle>

              <HeaderMenuButton/>
            </HeaderMenu>

            <HeaderContent>
              <HeaderBarTitle numberOfLines={1}>{ routerData }</HeaderBarTitle>
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
                        onPress={() => { handleNavigateToRestaurant(restaurant) }}
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
                            <StoreTitleText numberOfLines={2} color="#ffffff">{ restaurant.name }</StoreTitleText>
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

export default Stores;
