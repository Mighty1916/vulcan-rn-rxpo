import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { authStyles } from '../../assets/styles/auth.styles';
import { Link } from 'expo-router';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [setSecondFactor] = useState(false);
  const [errors,] = useState({});
  const [focusedInput, setFocusedInput] = useState('');

  const { signIn, setActive } = useSignIn();

  // Request a password reset code
  const onRequestReset = async () => {
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      setSuccessfulCreation(true);
    } catch (err) {
      Alert.alert('Error', err.errors[0].message);
    }
  };

  // Reset the password with the code
  const onReset = async () => {
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });

      if (result.status === 'needs_second_factor') {
        setSecondFactor(true);
      } else if (result.status === 'complete') {
        setActive({ session: result.createdSessionId });
        setComplete(true);
      }
    } catch (err) {
      Alert.alert('Error', err.errors[0].message);
    }
  };

  if (complete) {
    return (
      <View style={authStyles.container}>
        <Text style={authStyles.title}>Password Reset Complete!</Text>
        <Text>You have successfully reset your password.</Text>
      </View>
    );
  }

  if (successfulCreation) {
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={authStyles.container}
      >
        <View style={styles.container}>
        <View style={authStyles.logoContainer}>
          <Image
            source={require("../../assets/images/code2.png")}
            style={authStyles.logo}
          />
        </View>
        <Text style={styles.title}>Enter Reset Code</Text>
        <Text style={styles.subtitle}>
          We&apos;ve sent a password reset code to {email}
        </Text>

        <View style={authStyles.form}>
          <View style={authStyles.inputContainer}>
            <TextInput
            style={[
              authStyles.codeInput,
              focusedInput === 'code' && authStyles.inputFocused,
            ]}
            value={code}
            onChangeText={setCode}
            placeholder='000000'
            placeholderTextColor='#BDC3C7'
            keyboardType='number-pad'
            autoComplete="sms-otp"
            >
            </TextInput>
          </View>

          <View style={authStyles.inputContainer}>
            <TextInput
            style={[
              authStyles.input,
            ]}
            value={password}
            onChangeText={setPassword}
            placeholder='Enter New Password'
            placeholderTextColor='#BDC3C7'
            >
            </TextInput>

            <TouchableOpacity style={authStyles.button} onPress={onReset}>
              <Text style={authStyles.buttonText}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={authStyles.footer} onPress={() => setSuccessfulCreation(false)}>
              <View style={authStyles.footerText}>
                  <Text style={authStyles.footerLink}>
                  Back to email entry
                  </Text>
              </View>
            </TouchableOpacity>

          </View>

        </View>
      </View>
      </KeyboardAvoidingView>
    );
  }

  return (

    <KeyboardAvoidingView
    behavior={Platform.OS === 'android' ? 'padding' : 'height'}
    style={authStyles.container}
    >
        <View style={styles.container}>
                <View style={authStyles.logoContainer}>
          <Image
            source={require("../../assets/images/code2.png")}
            style={authStyles.logo}
          />
        </View>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email to receive a password reset code
      </Text>
      
      <TextInput
        style={authStyles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email address"
        placeholderTextColor="#666"
        keyboardType="email-address"
        autoCapitalize="none"
        onFocus={() => setFocusedInput('email')}
        onBlur={() => setFocusedInput('')}
      />
      {errors.identifier && (
              <Text style={authStyles.errorText}>{errors.identifier}</Text>
            )}
      
      <TouchableOpacity style={authStyles.button} onPress={onRequestReset}>
        <Text style={authStyles.buttonText}>Send Reset Code</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={authStyles.footer}>
        <Text style={authStyles.footerText}>
          <Link href={'/sign-in'} style={authStyles.footerLink}>
          Back to Sign-in
          </Link>
        </Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F4F6F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
});