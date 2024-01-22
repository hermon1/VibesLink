import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';

const SignupScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (phoneNumber) {
        await auth().createUserWithEmailAndPassword(phoneNumber, password);
        setVerificationSent(true);
      } else if (email) {
        await auth().createUserWithEmailAndPassword(email, password);
        setVerificationSent(true);
      }

      // Show loading indicator
      setIsLoading(true);

      // If verification has been sent, start verification process
      if (verificationSent) {
        // Initiate verification process (send SMS or email)
        await auth().currentUser?.sendEmailVerification();
      }

      // Wait for verification to complete
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate verification delay

      // Once verification is complete, hide loading indicator and redirect to profile screen
      setIsLoading(false);
      navigate('/profile');
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || 'Unknown error occurred during sign-up.';
      alert(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator color='#007bff' size={20} animating={isLoading} />
      <Text style={styles.headerText}>Sign Up</Text>
      <TextInput
        placeholder="Phone Number or Email"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Sign Up" onPress={handleSignup} />
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
