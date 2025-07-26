import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { authStyles } from '../../assets/styles/auth.styles';
import { Link } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { signIn, setActive } = useSignIn();

  // Request a password reset code
  const onRequestReset = async () => {
    setErrorMsg('');
    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      setSuccessfulCreation(true);
    } catch (err) {
      setErrorMsg(err?.errors?.[0]?.message || 'Failed to send reset code.');
    }
  };

  // Reset the password with the code
  const onReset = async () => {
    setErrorMsg('');
    if (!code || !password) {
      setErrorMsg('Please enter the code and new password.');
      return;
    }
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      if (result.status === 'needs_second_factor') {
        setErrorMsg('Second factor required.');
      } else if (result.status === 'complete') {
        setActive({ session: result.createdSessionId });
        setComplete(true);
      }
    } catch (err) {
      setErrorMsg(err?.errors?.[0]?.message || 'Failed to reset password.');
    }
  };

  // Success screen
  if (complete) {
    return (
      <View style={authStyles.container}>
        <Text style={authStyles.title}>Password Reset Complete!</Text>
        <Text>You have successfully reset your password.</Text>
      </View>
    );
  }

  // Code entry screen
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
                onFocus={() => setFocusedInput('code')}
                onBlur={() => setFocusedInput('')}
                maxLength={6}
              />
            </View>

            <View style={authStyles.inputContainer}>
              <TextInput
                style={[
                  authStyles.input,
                  focusedInput === 'password' && authStyles.inputFocused,
                ]}
                value={password}
                onChangeText={setPassword}
                placeholder='Enter New Password'
                placeholderTextColor='#BDC3C7'
                secureTextEntry
                autoComplete="new-password"
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput('')}
              />
              {errorMsg ? <Text style={authStyles.errorText}>{errorMsg}</Text> : null}
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

  // Email entry screen
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
          style={[
            authStyles.input,
            focusedInput === 'email' && authStyles.inputFocused,
            errorMsg && authStyles.inputError,
          ]}
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput('')}
        />
        {errorMsg ? <Text style={authStyles.errorText}>{errorMsg}</Text> : null}
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

// Local styles for container and text
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
});