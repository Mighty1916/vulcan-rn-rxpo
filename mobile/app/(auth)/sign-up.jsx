import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { authStyles } from '../../assets/styles/auth.styles';

export default function SignUpScreen() {
  const { isLoaded, signUp, } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedInput, setFocusedInput] = useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setErrors({});

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Navigate to verification screen
      router.push({
        pathname: '/verify-email',
        params: { email }
      });
    } catch (err) {
      console.error('Sign up error:', err);
      if (err.errors) {
        const newErrors = {};
        err.errors.forEach((error) => {
          if (error.meta?.paramName) {
            newErrors[error.meta.paramName] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        Alert.alert('Error', 'Failed to sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <View style={authStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#2C3E50" />
        <Text style={authStyles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={authStyles.container}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={authStyles.scrollContainer}
      >
        <View style={authStyles.logoContainer}>
          <Image
          source={require("../../assets/images/logo-removebg-preview.png")}
            style={authStyles.logo}
          />
        </View>

        <View style={authStyles.header}>
          <Text style={authStyles.title}>Create Account</Text>
          <Text style={authStyles.subtitle}>
            Join us and start your amazing journey
          </Text>
        </View>

        <View style={authStyles.form}>
          <View style={authStyles.nameRow}>
            <View style={[authStyles.inputContainer, authStyles.nameInput]}>
              <Text style={authStyles.label}>First Name</Text>
              <TextInput
                style={[
                  authStyles.input,
                  focusedInput === 'firstName' && authStyles.inputFocused,
                  errors.firstName && authStyles.inputError,
                ]}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First name"
                placeholderTextColor="#BDC3C7"
                autoComplete="given-name"
                onFocus={() => setFocusedInput('firstName')}
                onBlur={() => setFocusedInput('')}
              />
              {errors.firstName && (
                <Text style={authStyles.errorText}>{errors.firstName}</Text>
              )}
            </View>

            <View style={[authStyles.inputContainer, authStyles.nameInput]}>
              <Text style={authStyles.label}>Last Name</Text>
              <TextInput
                style={[
                  authStyles.input,
                  focusedInput === 'lastName' && authStyles.inputFocused,
                  errors.lastName && authStyles.inputError,
                ]}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last name"
                placeholderTextColor="#BDC3C7"
                autoComplete="family-name"
                onFocus={() => setFocusedInput('lastName')}
                onBlur={() => setFocusedInput('')}
              />
              {errors.lastName && (
                <Text style={authStyles.errorText}>{errors.lastName}</Text>
              )}
            </View>
          </View>

          <View style={authStyles.inputContainer}>
            <Text style={authStyles.label}>Email Address</Text>
            <TextInput
              style={[
                authStyles.input,
                focusedInput === 'email' && authStyles.inputFocused,
                errors.emailAddress && authStyles.inputError,
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#BDC3C7"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput('')}
            />
            {errors.emailAddress && (
              <Text style={authStyles.errorText}>{errors.emailAddress}</Text>
            )}
          </View>

          <View style={authStyles.inputContainer}>
            <Text style={authStyles.label}>Password</Text>
            <TextInput
              style={[
                authStyles.input,
                focusedInput === 'password' && authStyles.inputFocused,
                errors.password && authStyles.inputError,
              ]}
              value={password}
              onChangeText={setPassword}
              placeholder="Create a strong password"
              placeholderTextColor="#BDC3C7"
              secureTextEntry
              autoComplete="new-password"
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput('')}
            />
            {errors.password && (
              <Text style={authStyles.errorText}>{errors.password}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              authStyles.button,
              loading && authStyles.buttonDisabled,
            ]}
            onPress={onSignUpPress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={authStyles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={authStyles.footer}>
          <Text style={authStyles.footerText}>
            Already have an account?{' '}
            <Link href="/sign-in" style={authStyles.footerLink}>
              Sign In
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}