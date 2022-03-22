import React from 'react';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

import LogoSvg from '../../assets/logo.svg';

export function Header(){
  return (
    <View style={styles.container}>
        <LogoSvg />

        <View style={styles.logOutButton}>
          <TouchableOpacity>
            <Text style={styles.logOutText}>Sair</Text>
          </TouchableOpacity>

          <UserPhoto imageUri="https://github.com/caiohenrique-developer.png" />
        </View>
    </View>
  );
}