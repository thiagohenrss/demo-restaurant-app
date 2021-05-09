import React, { useCallback, useEffect, useState } from 'react';

import {
  SafeAreaView, 
  ScrollView,
  RefreshControl,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { SvgUri } from 'react-native-svg';

import api from '../../services/api';

import { Restaurant } from '../../interfaces/restaurant';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Loading from '../../components/Loading';

import { 
  SvgAmbulance, SvgDiagnostic, SvgNurse,
  SvgConsultation, SvgLabWork, SvgMedicine,
} from '../../assets/svg/icons';

import {
  Container,
  HeaderBar,
  HeaderMenu,
  HeaderMenuButton,
  CategoryListContainer,
  CategoryList,
  CategoryContainer,
  CategoryImage,
  CategoryTitle,
  Content,
  ContentHeader,
  ContentBody,
  ContentHeaderTitle,
  UserTitleHello,
  UserTitleName,
  ContentHeaderTitleText,
  NeedHorizontalContainer,
  NeedContainer,
  NeedImage,
  NeedTitle,
  NeedTitleText,
  LabelCaption,
} from './styles';

const Home: React.FC = ({}) => {
  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    async function syncAPIRestaurants(): Promise<void> {
      try {
        await api.get(
          `/restaurants?page=${1}&limit=10`,
          { timeout: 15000 },
        ).then(response => {
          const { data } = response.data;

          console.log(data);

          setRestaurants(data);
        }).catch(err => {

        });
      } catch (error) {

      } finally {
        setLoading(false);  
      }
    }

    syncAPIRestaurants();
  }, []);

  const handleNavigateToRestaurant = useCallback((itemObject: Restaurant) => {
    // console.log(itemObject);
    //navigate('Specialists', itemObject);
  }, [navigate]);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setRefreshing(false);
    } catch (error) {

    }
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <SafeAreaView style={ styles.container }>     
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor="#FFFFFF"
            colors={["#CA49E5", "#7349E5", "#F6AF3D", "#E5495E"]}
          />
        }
      >
        <Container>
          <HeaderBar>
            <HeaderMenu>
              <UserTitleHello>Hello, </UserTitleHello>
              <UserTitleName>- - - -</UserTitleName>
            </HeaderMenu>

            {/* <HeaderMenuButton onPress={() => {}}>
              <Icon name="sign-out-alt" size={24} color="#504C4C" />
            </HeaderMenuButton> */}
          </HeaderBar>      
                  
          <Content>
            <ContentHeader>
              <CategoryListContainer>
                <ContentHeaderTitle>
                  <ContentHeaderTitleText>Restaurants</ContentHeaderTitleText>
                </ContentHeaderTitle>

                <CategoryList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={ restaurants }
                  keyExtractor={ (restaurantItem: Restaurant)  => restaurantItem.id }
                  renderItem={({ item: itemList }) => (

                    <CategoryContainer 
                      color={ itemList.color }
                      onPress={() => { handleNavigateToRestaurant(itemList) }}> 

                      <CategoryImage>
                        <SvgUri
                          width="100%"
                          height="100%"
                          fill="#CA49E5"
                          uri="https://raw.githubusercontent.com/PortalTelemedicina/mobile-test/main/icons/heart-shape-outline-with-lifeline.svg"
                        />                       
                      </CategoryImage>
                
                      <CategoryTitle>{ itemList.name }</CategoryTitle>

                      <LabelCaption>{ `${ itemList.price_range }` }</LabelCaption>
                    </CategoryContainer>  
                      
                  )}
                />
              </CategoryListContainer>
            </ContentHeader>
            
            <ContentBody>
              <NeedHorizontalContainer>
                <NeedContainer color="#CA49E5" onPress={() => {}}>
                  <NeedImage>
                    <SvgDiagnostic color="#ffffff"/>  
                  </NeedImage>
                  
                  <NeedTitle>
                    <NeedTitleText numberOfLines={1} color="#ffffff">Diagnostic</NeedTitleText>
                  </NeedTitle>
                </NeedContainer>

                <NeedContainer onPress={() => {}}>
                  <NeedImage>
                    <SvgConsultation color="#7C8494"/>  
                  </NeedImage>
                  
                  <NeedTitle>
                    <NeedTitleText numberOfLines={1}>Consultation</NeedTitleText>
                  </NeedTitle>
                </NeedContainer>

                <NeedContainer onPress={() => {}}>
                  <NeedImage>
                    <SvgNurse color="#7C8494"/>  
                  </NeedImage>
                  
                  <NeedTitle>
                    <NeedTitleText numberOfLines={1}>Nurse</NeedTitleText>
                  </NeedTitle>
                </NeedContainer>

                <NeedContainer onPress={() => {}}>
                  <NeedImage>
                    <SvgAmbulance color="#7C8494"/>  
                  </NeedImage>
                  
                  <NeedTitle>
                    <NeedTitleText numberOfLines={1}>Ambulance</NeedTitleText>
                  </NeedTitle>
                </NeedContainer>

                <NeedContainer onPress={() => {}}>
                  <NeedImage>
                    <SvgLabWork color="#7C8494"/>  
                  </NeedImage>
                  
                  <NeedTitle>
                    <NeedTitleText numberOfLines={1}>Lab Work</NeedTitleText>
                  </NeedTitle>
                </NeedContainer>

                <NeedContainer onPress={() => {}}>
                  <NeedImage>
                    <SvgMedicine color="#7C8494"/>  
                  </NeedImage>
                  
                  <NeedTitle>
                    <NeedTitleText numberOfLines={1}>Medicine</NeedTitleText>
                  </NeedTitle>
                </NeedContainer>
              </NeedHorizontalContainer>
            </ContentBody>
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

export default Home;
