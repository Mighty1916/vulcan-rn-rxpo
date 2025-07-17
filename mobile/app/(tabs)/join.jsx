import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { UserPlus, User, Mail, Phone, MapPin, Calendar, Trophy, Send } from 'lucide-react-native';
import { styles } from "../../assets/styles/join.styles"

const COLORS = {
  primary: "#2C3E50",
  background: "#F4F6F7",
  text: "#1A2530",
  border: "#D5D8DC",
  white: "#FFFFFF",
  textLight: "#7F8C8D",
  card: "#FFFFFF",
  shadow: "#000000"
};

export default function JoinClubScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    position: '',
    experience: '',
    previousClubs: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'dateOfBirth', 'position'];
    
    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        Alert.alert('Missing Information', `Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return false;
    }

    // Basic phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("http://192.168.211.255:3000/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
    
      const result = await response.json();
    
      if (response.ok) {
        Alert.alert(
          'Application Submitted!',
          'Your application has been submitted successfully. Admin will contact you soon.',
          [{ text: 'OK', onPress: () => setFormData({
            fullName: '', email: '', phone: '', address: '', dateOfBirth: '',
            position: '', experience: '', previousClubs: '', emergencyContact: '', emergencyPhone: ''
          }) }]
        );
      } else {
        Alert.alert("Error", result.error || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Network error or server is down");
    } finally {
      setIsSubmitting(false);
    }
    

  };

    const positions = [
    'Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Striker', 'Winger'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <UserPlus size={28} color={COLORS.primary} />
              <Text style={styles.headerTitle}>Join Our Club</Text>
            </View>
            <Text style={styles.headerSubtitle}>
              Fill out the form below to apply for club membership
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Personal Information Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name *</Text>
                <View style={styles.inputContainer}>
                  <User size={20} color={COLORS.textLight} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChangeText={(value) => handleInputChange('fullName', value)}
                    placeholderTextColor={COLORS.textLight}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address *</Text>
                <View style={styles.inputContainer}>
                  <Mail size={20} color={COLORS.textLight} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.textLight}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number *</Text>
                <View style={styles.inputContainer}>
                  <Phone size={20} color={COLORS.textLight} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
                    keyboardType="phone-pad"
                    placeholderTextColor={COLORS.textLight}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Address *</Text>
                <View style={styles.inputContainer}>
                  <MapPin size={20} color={COLORS.textLight} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your address"
                    value={formData.address}
                    onChangeText={(value) => handleInputChange('address', value)}
                    multiline
                    placeholderTextColor={COLORS.textLight}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Date of Birth *</Text>
                <View style={styles.inputContainer}>
                  <Calendar size={20} color={COLORS.textLight} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="DD/MM/YYYY"
                    value={formData.dateOfBirth}
                    onChangeText={(value) => handleInputChange('dateOfBirth', value)}
                    placeholderTextColor={COLORS.textLight}
                  />
                </View>
              </View>
            </View>

            {/* Football Information Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Football Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Preferred Position *</Text>
                <View style={styles.inputContainer}>
                  <Trophy size={20} color={COLORS.textLight} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g., Midfielder, Forward, Defender"
                    value={formData.position}
                    onChangeText={(value) => handleInputChange('position', value)}
                    placeholderTextColor={COLORS.textLight}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Previous Clubs</Text>
                <View style={styles.inputContainer}>
                  <Trophy size={20} color={COLORS.textLight} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="List any previous clubs you've played for"
                    value={formData.previousClubs}
                    onChangeText={(value) => handleInputChange('previousClubs', value)}
                    placeholderTextColor={COLORS.textLight}
                  />
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Send size={20} color={COLORS.white} />
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Text>
            </TouchableOpacity>

            {/* Info Text */}
            <Text style={styles.infoText}>
              * Required fields. Your application will be reviewed by our admin team and we will contact you for trial.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};