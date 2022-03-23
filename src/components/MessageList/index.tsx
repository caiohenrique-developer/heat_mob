import React from 'react';

import {
  ScrollView
} from 'react-native';
import { Message } from '../Message';

import { styles } from './styles';

export function MessageList(){
  const message = {
    id: '1',
    text: 'https://github.com/caiohenrique-developer.png is a good image',
    user: {
      name: 'Caio Henrique',
      avatar_url: 'https://github.com/caiohenrique-developer.png',
    }
  }
  
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
        <Message data={message} />
        <Message data={message} />
        <Message data={message} />
        <Message data={message} />
        <Message data={message} />
        <Message data={message} />
        <Message data={message} />
        <Message data={message} />
    </ScrollView>
  );
}