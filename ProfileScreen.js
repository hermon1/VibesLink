import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetUser = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        setUser(currentUser);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert('Failed to get user information.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='#007bff' size={20} animating />
      </View>
    );
  }

  if (!user) {
    return <View style={styles.container}>Loading user information...</View>;
  }

  return (
    <View style={styles.container}>
      <Text>Welcome, {user.displayName || user.phoneNumber}</Text>
      <Button title="Edit Profile" />
      <Button title="Logout" onPress={() => auth().signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default ProfileScreen;
