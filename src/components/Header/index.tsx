import React from 'react';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { UserPhoto } from '../UserPhoto';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';

import LogoSvg from '../../assets/logo.svg';

export function Header(){
  const { user, sigOut } = useAuth();
  
  return (
    <View style={styles.container}>
        <LogoSvg />

        <View style={styles.logOutButton}>
          {user &&
            <TouchableOpacity onPress={sigOut}>
              <Text style={styles.logOutText}>Sair</Text>
            </TouchableOpacity>
          }

          <UserPhoto imageUri={user?.avatar_url} />
        </View>
    </View>
  );
}