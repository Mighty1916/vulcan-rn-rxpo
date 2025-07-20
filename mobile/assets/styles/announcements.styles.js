import { LucideChevronLeftCircle } from "lucide-react-native";
import { COLORS } from "../../constants/colors";
import { StyleSheet, } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    scrollView: {
      flex: 1,
    },
    // Header Styles
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.text,
      marginLeft: 12,
    },
    secretButton: {
      padding: 8,
      backgroundColor: COLORS.card,
      borderRadius: 8,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    
    // Secret Section Styles
    secretSection: {
      marginHorizontal: 30,
      marginBottom: 20,
      marginTop: 20,
      backgroundColor: COLORS.card,
      borderRadius: 12,
      padding: 16,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    secretTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 12,
    },
    secretInputContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    secretInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: COLORS.text,
      backgroundColor: COLORS.white,
    },
    secretSubmitButton: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      justifyContent: 'center',
    },
    secretSubmitText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: '600',
    },
    
    // Announcements Styles
    announcementsContainer: {
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 30,
      marginTop:20,
      alignContent: 'center'
    },
    announcementCard: {
      backgroundColor: COLORS.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    announcementHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    announcementTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    announcementTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.text,
      marginLeft: 8,
      flex: 1,
    },
    announcementMeta: {
      alignItems: 'flex-end',
    },
    priorityBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    priorityText: {
      fontSize: 10,
      fontWeight: '600',
      color: COLORS.white,
    },
    announcementMessage: {
      fontSize: 14,
      color: COLORS.text,
      lineHeight: 20,
      marginBottom: 12,
    },
    announcementFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    announcementDate: {
      fontSize: 12,
      color: COLORS.textLight,
      marginLeft: 4,
    },
    
    // Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: COLORS.card,
      borderRadius: 16,
      padding: 24,
      width: '100%',
      maxWidth: 400,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.text,
      marginLeft: 12,
    },
    secretMessageTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.primary,
      marginBottom: 12,
    },
    secretMessageText: {
      fontSize: 16,
      color: COLORS.text,
      lineHeight: 24,
      marginBottom: 16,
    },
    secretMessageDate: {
      fontSize: 14,
      color: COLORS.textLight,
      marginBottom: 20,
    },
    modalCloseButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
    },
    modalCloseText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: '600',
    },
  });