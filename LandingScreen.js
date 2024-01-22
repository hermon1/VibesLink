import React from 'react';
import LandingScreen2 from './LandingScreen2';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import User from './User';
import { loginAsync, signupAsync } from './UserService';



const LandingScreen = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const userData = await loginAsync('username', 'password');
      setUser(userData);
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  const handleSignup = async () => {
    try {
      const userData = await signupAsync('newuser', 'password');
      setUser(userData);
      Alert.alert('Success', 'Signup successful!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Username already exists');
    }
  };

  return (
    <View style={styles.container}>
      {!user ? (
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>Login</Text>
          <TextInput
            style={styles.loginInput}
            placeholder="Username"
            onChangeText={(username) => setUser(new User(username, null))}
          />
          <TextInput
            style={styles.loginInput}
            placeholder="Password"
            onChangeText={(password) => setUser(new User(user.username, password))}
          />
          <Button title="Login" onPress={handleLogin} />
          <Button title="Sign Up" onPress={handleSignup} />
        </View>
      ) : (
        <Text>Welcome, {user.username}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    flexDirection: {
      flexDirection: 'column',
      padding: 20,
    },
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loginInput: {
    padding: 10,
  },
});