import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <ActivityIndicator size='large' color='#ED1C24'/>
    </Container>
  );
}

export default Loading;
