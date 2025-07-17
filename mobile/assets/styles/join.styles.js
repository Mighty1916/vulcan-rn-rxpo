import { COLORS } from "../../constants/colors";
import { StyleSheet, } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    keyboardView: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 60,
    },
    
    // Header Styles
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 24,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.text,
      marginLeft: 12,
    },
    headerSubtitle: {
      fontSize: 16,
      color: COLORS.textLight,
      lineHeight: 22,
    },
    
    // Form Styles
    formContainer: {
      paddingHorizontal: 20,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 16,
    },
    inputGroup: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: COLORS.border,
      paddingHorizontal: 16,
      paddingVertical: 12,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: COLORS.text,
      marginLeft: 12,
      paddingVertical: 0,
    },
    textArea: {
      minHeight: 60,
      textAlignVertical: 'top',
    },
    
    // Submit Button Styles
    submitButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.primary,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      marginTop: 8,
      marginBottom: 16,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    submitButtonDisabled: {
      opacity: 0.6,
    },
    submitButtonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    
    // Info Text
    infoText: {
      fontSize: 12,
      color: COLORS.textLight,
      lineHeight: 18,
      textAlign: 'center',
      paddingHorizontal: 16,
    },
  });