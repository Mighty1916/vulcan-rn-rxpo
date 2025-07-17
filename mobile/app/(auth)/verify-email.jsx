import React, { useState, useEffect } from 'react';
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
import { Link, useLocalSearchParams } from 'expo-router';
import { authStyles } from '../../assets/styles/auth.styles';

export default function VerifyEmailScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [resendTimer, setResendTimer] = useState(0);
  const [focusedInput, setFocusedInput] = useState('');

  const { email } = useLocalSearchParams();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const onPressVerify = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setErrors({});

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        // Navigation will be handled by your auth context
      } else {
        // Handle other verification states if needed
        console.log('Verification not complete:', completeSignUp.status);
      }
    } catch (err) {
      console.error('Verification error:', err);
      if (err.errors) {
        const newErrors = {};
        err.errors.forEach((error) => {
          if (error.meta?.paramName) {
            newErrors[error.meta.paramName] = error.message;
          } else {
            newErrors.general = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        Alert.alert('Error', 'Failed to verify email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onResendPress = async () => {
    if (!isLoaded || resendTimer > 0) return;

    setResendLoading(true);
    setErrors({});

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setResendTimer(60); // 60 seconds cooldown
      Alert.alert('Success', 'Verification code sent to your email.');
    } catch (err) {
      console.error('Resend error:', err);
      Alert.alert('Error', 'Failed to resend verification code. Please try again.');
    } finally {
      setResendLoading(false);
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
          <Text style={authStyles.title}>Verify Your Email</Text>
          <Text style={authStyles.subtitle}>
            We&apos;ve sent a magical code to your inbox
          </Text>
        </View>

        <View style={authStyles.verificationContainer}>
          <Text style={authStyles.verificationText}>
            Enter the 6-digit verification code sent to{'\n'}
            <Text style={{ fontWeight: 'bold', color: '#2C3E50' }}>
              {email || 'your email'}
            </Text>
          </Text>

          <View style={authStyles.inputContainer}>
            <TextInput
              style={[
                authStyles.codeInput,
                focusedInput === 'code' && authStyles.inputFocused,
                errors.code && authStyles.inputError,
              ]}
              value={code}
              onChangeText={setCode}
              placeholder="000000"
              placeholderTextColor="#BDC3C7"
              keyboardType="number-pad"
              maxLength={6}
              autoComplete="sms-otp"
              onFocus={() => setFocusedInput('code')}
              onBlur={() => setFocusedInput('')}
            />
            {errors.code && (
              <Text style={authStyles.errorText}>{errors.code}</Text>
            )}
            {errors.general && (
              <Text style={authStyles.errorText}>{errors.general}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              authStyles.buttonVerify,
              loading && authStyles.buttonDisabled,
            ]}
            onPress={onPressVerify}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={authStyles.buttonText}>Verify & Continue</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={authStyles.resendContainer}>
          <Text style={authStyles.resendText}>
            Didn&apos;t receive the code?
          </Text>
          <TouchableOpacity
            style={authStyles.resendButton}
            onPress={onResendPress}
            disabled={resendLoading || resendTimer > 0}
          >
            {resendLoading ? (
              <ActivityIndicator size="small" color="#2C3E50" />
            ) : (
              <Text style={[
                authStyles.resendButtonText,
                (resendTimer > 0) && { color: '#95A5A6' }
              ]}>
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={authStyles.footer}>
          <Text style={authStyles.footerText}>
            Wrong email?{' '}
            <Link href="/sign-in" style={authStyles.footerLink}>
              Back to Sign In
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}