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
import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { authStyles } from '../../assets/styles/auth.styles';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ✅ visibility toggle
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedInput, setFocusedInput] = useState('');

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setErrors({});

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      if (completeSignIn.status === 'complete') {
        await setActive({ session: completeSignIn.createdSessionId });
        // Navigation will be handled by your auth context
      } else {
        console.log('Sign in not complete:', completeSignIn.status);
      }
    } catch (err) {
      console.error('Sign in error:', err);
      if (err.errors) {
        const newErrors = {};
        err.errors.forEach((error) => {
          if (error.meta?.paramName) {
            newErrors[error.meta.paramName] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        Alert.alert('Error', 'Failed to sign in. Please try again.');
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
          <Text style={authStyles.title}>Welcome Back</Text>
          <Text style={authStyles.subtitle}>
            Sign in to continue your journey
          </Text>
        </View>

        <View style={authStyles.form}>
          {/* Email Input */}
          <View style={authStyles.inputContainer}>
            <Text style={authStyles.label}>Email Address</Text>
            <TextInput
              style={[
                authStyles.input,
                focusedInput === 'email' && authStyles.inputFocused,
                errors.identifier && authStyles.inputError,
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
            {errors.identifier && (
              <Text style={authStyles.errorText}>{errors.identifier}</Text>
            )}
          </View>

          {/* Password Input with Eye Icon */}

          <View style={authStyles.inputContainer}>
            <Text style={authStyles.label}>Password</Text>
            <View style={{ position: 'relative' }}>
              <TextInput
              style={[
              authStyles.input,
              focusedInput === 'password' && authStyles.inputFocused,
              errors.password && authStyles.inputError,
              { paddingRight: 40 }, // add space for icon
              ]}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#BDC3C7"
              autoComplete="password"
              secureTextEntry={!showPassword}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput('')}
              />
              <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{
              position: 'absolute',
              right: 10,
              top: 14,
              zIndex: 1,
            }}>
              <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="gray"/>
              </TouchableOpacity>
  </View>

  {errors.password && (
    <Text style={authStyles.errorText}>{errors.password}</Text>
  )}
</View>


          {/* Forgot Password Link */}
          <View style={authStyles.footer}>
            <Text style={authStyles.footerText}>
              <Link href="/forgot-pass" style={authStyles.footerLink}>
                Forgot Password?
              </Link>
            </Text>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[
              authStyles.button,
              loading && authStyles.buttonDisabled,
            ]}
            onPress={onSignInPress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={authStyles.buttonText}>
                {loading ? "Signing In..." : "Sign In"}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Bottom Link */}
        <View style={authStyles.footer}>
          <Text style={authStyles.footerText}>
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" style={authStyles.footerLink}>
              Create Account
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
