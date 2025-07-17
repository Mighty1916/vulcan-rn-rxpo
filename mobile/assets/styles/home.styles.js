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
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

});