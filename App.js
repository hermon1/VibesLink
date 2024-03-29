import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import ProfileScreen from './ProfileScreen'; // Import the ProfileScreen component
import SignupScreen from './SignupScreen'; // Import the SignupScreen component
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
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
      navigate('/profile'); // Navigate to the ProfileScreen after successful verification
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || 'Unknown error occurred during sign-up.';
      alert(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <SignupScreen
        onSignup={handleSignup} // Pass the handleSignup function to the SignupScreen
      />
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

export default App;
