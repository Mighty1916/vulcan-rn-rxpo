import { StyleSheet, Dimensions } from 'react-native';
import {COLORS} from "../../constants/colors"
//const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  
  // Slideshow Styles
  slideshowContainer: {
    height: 200,
    position: 'relative',
    width: screenWidth *0.9,             // Or any height you want
    alignSelf: 'center',        // Center horizontally
    borderRadius: 20,
    overflow: 'hidden',         // Important: hide image overflow beyond rounded corners
    marginVertical: 10,
  },
  slideshow: {
    height: 200,
  },
  slide: {
    width: screenWidth,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius:50,
    
  },
  slideImage: {
    width: screenWidth,
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
  },  
  slideOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  slideSubtitle: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  slideButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  slideButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  slideIndicators: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: COLORS.white,
    width: 12,
    height: 8,
    borderRadius: 4,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  clubName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  profileButton: {
    padding: 8,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Stats Styles
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 3,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  
  // Section Styles
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  
  // Match Card Styles
  matchCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  matchDate: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  matchCompetition: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  matchTeams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  team: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  opponentLogo: {
    backgroundColor: COLORS.textLight,
  },
  teamLogoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  vsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginHorizontal: 20,
  },
  matchButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  matchButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Results Styles
  resultsContainer: {
    gap: 12,
  },
  resultCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultTeams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultTeam: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  resultScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginHorizontal: 20,
  },
  resultDate: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  
  // Actions Styles
  actionsScrollView: {
    marginLeft: -20, // Offset the container padding to show partial cards
  },
  actionsScrollContainer: {
    paddingLeft: 20,
    paddingRight: 40, // Extra padding to show the last card is cut off
  },
  actionButton: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
    minWidth: 85, // Slightly wider to make partial visibility more obvious
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom:5,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  modalCloseButton: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 8,
  },
  modalCloseButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  mainActionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
    gap: 16,
  },
  mainActionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  mainActionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginTop: 8,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 28,
    maxHeight: '85%',
    width: '100%',
    alignSelf: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalLabel: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.card,
    marginBottom: 14,
  },
  tournamentButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 14,
    alignItems: 'center',
  },
  tournamentButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: COLORS.textLight,
  },

  // Calendar Styles
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  calendarNavButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  calendarNavText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  calendarMonthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  calendarDaysHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  calendarDayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
    paddingVertical: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  calendarDay: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 2,
  },
  calendarDayOtherMonth: {
    opacity: 0.3,
  },
  calendarDayPast: {
    opacity: 0.5,
  },
  calendarDayToday: {
    backgroundColor: COLORS.primary,
  },
  calendarDaySelected: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  calendarDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  calendarDayTextOtherMonth: {
    color: COLORS.textLight,
  },
  calendarDayTextPast: {
    color: COLORS.textLight,
  },
  calendarDayTextToday: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  calendarDayTextSelected: {
    color: COLORS.white,
    fontWeight: 'bold',
  },

  // Time Slots Styles
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  timeSlotButton: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 1,
    minWidth: 70,
    alignItems: 'center',
  },
  selectedTimeSlotButton: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  timeSlotText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 12,
  },
  selectedTimeSlotText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },

  // Selected Details Styles
  selectedDetailsContainer: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedDetailText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },

  // Enhanced Modal Styles
  modalHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalHeaderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 2,
  },
  modalCloseButtonEnhanced: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // Section Styles
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitleEnhanced: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  // Enhanced Selected Details
  selectedDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedDetailsIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedDetailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  selectedDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  selectedDetailLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  selectedDetailValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },

  // Enhanced Proceed Button
  proceedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  proceedButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 0.5,
  },

  // Checkout Modal Styles
  checkoutInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.card,
    marginBottom: 12,
  },
  bookingSummaryContainer: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bookingSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  bookingSummaryLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  bookingSummaryValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },

  // Celebration Animation Styles
  celebrationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  confetti: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    top: -10,
    opacity: 0.8,
    transform: [{ rotate: '45deg' }],
  },
  celebrationMessage: {
    backgroundColor: COLORS.card,
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  celebrationIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  celebrationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  celebrationSubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Squad Modal Styles
  squadCategory: {
    marginBottom: 24,
  },
  squadCategoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  squadPlayer: {
    backgroundColor: COLORS.card,
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  squadPlayerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  squadPlayerInfo: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  tournamentMatchCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  tournamentMatchDate: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '600',
    marginBottom: 4,
  },
  tournamentMatchResult: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tournamentMatchOpponent: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  tournamentMatchScore: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  tournamentMatchPerformance: {
    fontSize: 13,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  tournamentCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tournamentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tournamentCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tournamentCardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  tournamentTypeBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  tournamentTypeBadgeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  tournamentCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tournamentCardYear: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  tournamentMatchCountBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tournamentMatchCountText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  tournamentFilterBar: {
    flexDirection: 'row',
    marginBottom: 18,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  tournamentFilterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 2,
  },
  tournamentFilterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tournamentFilterText: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 14,
  },
  tournamentFilterTextActive: {
    color: COLORS.white,
  },
  tournamentStatsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  tournamentStatBox: {
    alignItems: 'center',
    flex: 1,
    minWidth: 80,
    margin: 4,
    padding: 8,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tournamentStatLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
    marginBottom: 2,
  },
  tournamentStatValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  playerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  playerAvatarText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  playerInfo: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  playerAbility: {
    fontSize: 13,
    color: COLORS.textLight,
    fontStyle: 'italic',
    marginBottom: 2,
  },
  playersModalHeaderBg: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 0,
    marginTop: -28,
    marginHorizontal: -28,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 8,
  },
  playerSearchBar: {
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  playerSearchInput: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.text,
  },
  playerGroupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 8,
  },
  playerGroupIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  playerJerseyCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  playerJerseyText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  playerPositionBadge: {
    backgroundColor: COLORS.textLight,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
    marginBottom: 0,
    marginTop: 0,
    marginLeft: 0,
  },
  playerPositionText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: 1,
  },
  playerPositionFWD: {
    backgroundColor: '#E67E22',
  },
  playerPositionMID: {
    backgroundColor: '#2980B9',
  },
  playerPositionDEF: {
    backgroundColor: '#27AE60',
  },
  playerPositionGK: {
    backgroundColor: '#8E44AD',
  },
  trophyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 3,
  },
  trophyCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  trophyCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  trophyCardDesc: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 2,
  },
  trophyCardYear: {
    fontSize: 13,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  alertBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#E74C3C',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    zIndex: 2,
  },
  alertBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  alertCardUnread: {
    backgroundColor: '#FFF6F6',
    borderColor: '#E74C3C',
  },
  alertCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  alertCardMessage: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  alertCardTime: {
    fontSize: 12,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  profileUserBox: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  profileUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 2,
    marginBottom: 0,
  },
  profileList: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 8,
  },
  profileListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 4,
  },
  profileListIcon: {
    marginRight: 16,
  },
  profileListText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  profileSocialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 4,
    gap: 16,
  },
  profileSocialIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Add styles for Book Friendly modal filter tabs
  friendlyTabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
    gap: 8,
  },
  friendlyTab: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  friendlyTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  friendlyTabText: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 15,
  },
  friendlyTabTextActive: {
    color: COLORS.white,
  },
  pastBookingCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 3,
  },
  pastBookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  pastBookingId: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 15,
    marginRight: 10,
  },
  pastBookingStatus: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 4,
  },
  pastBookingStatusText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  pastBookingDate: {
    color: COLORS.textLight,
    fontSize: 13,
    marginBottom: 6,
  },
  pastBookingDetails: {
    marginBottom: 8,
  },
  pastBookingLabel: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: '600',
  },
  pastBookingValue: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  pastBookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    marginTop: 8,
  },

});