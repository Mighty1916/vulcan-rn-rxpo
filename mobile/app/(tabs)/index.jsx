import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  //StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  Modal,
  Alert,
  TextInput,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Users, Trophy, TrendingUp, User, Settings, Bell, X, Calendar } from 'lucide-react-native';
import { styles } from "../../assets/styles/home.styles"
import { COLORS } from '../../constants/colors';
import { useAuth } from '@clerk/clerk-expo';

const { width: screenWidth } = Dimensions.get('window');

// Slideshow data - you can replace these with your actual images
const slideshowData = [
  {
    id: 1,
    title: "Match Day Experience",
    subtitle: "Join us at Old Trafford",
    image: require('../../assets/images/1.png'),
    imageStyle: { resizeMode: 'cover', }
  },
  {
    id: 2,
    title: "New Season Tickets",
    subtitle: "Book your seats now",
    image: require('../../assets/images/2.png'),
    imageStyle: { resizeMode: 'cover' }
  },
  {
    id: 3,
    title: "Training Ground Tour",
    subtitle: "Behind the scenes access",
    image: require('../../assets/images/3.png'),
    imageStyle: { resizeMode: 'cover' }
  }
];

export default function HomeScreen() {
  const { signOut } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const [showBookFriendlyModal, setShowBookFriendlyModal] = useState(false);
  const [showTournamentsModal, setShowTournamentsModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSquadModal, setShowSquadModal] = useState(false);
  
  // Squad Data
  const squadData = useCallback(() => ({
    'Under 19': [
      { id: 1, name: 'Ahmed Khan', position: 'Forward', number: 10, age: 18 },
      { id: 2, name: 'Rahul Singh', position: 'Midfielder', number: 8, age: 17 },
      { id: 3, name: 'Vikram Patel', position: 'Defender', number: 4, age: 18 },
      { id: 4, name: 'Arjun Sharma', position: 'Goalkeeper', number: 1, age: 17 },
      { id: 5, name: 'Karan Malhotra', position: 'Forward', number: 9, age: 18 },
    ],
    'Under 22': [
      { id: 6, name: 'Priyansh Gupta', position: 'Midfielder', number: 6, age: 21 },
      { id: 7, name: 'Aditya Verma', position: 'Defender', number: 3, age: 20 },
      { id: 8, name: 'Rishabh Kumar', position: 'Forward', number: 11, age: 21 },
      { id: 9, name: 'Surya Prakash', position: 'Goalkeeper', number: 12, age: 20 },
      { id: 10, name: 'Dhruv Mehta', position: 'Midfielder', number: 7, age: 21 },
    ],
    'Senior Team': [
      { id: 11, name: 'Rohan Sharma', position: 'Forward', number: 10, age: 25 },
      { id: 12, name: 'Amit Kumar', position: 'Midfielder', number: 8, age: 26 },
      { id: 13, name: 'Vikrant Singh', position: 'Defender', number: 5, age: 24 },
      { id: 14, name: 'Kartik Patel', position: 'Goalkeeper', number: 1, age: 27 },
      { id: 15, name: 'Arnav Gupta', position: 'Forward', number: 9, age: 25 },
    ]
  }), []);

  // Book Friendly Modal States
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Checkout Form States
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutTeamName, setCheckoutTeamName] = useState('');
  const [checkoutMatchGround, setCheckoutMatchGround] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const celebrationOpacity = useRef(new Animated.Value(0)).current;
  const celebrationScale = useRef(new Animated.Value(0.8)).current;

  // Celebration Message Animation
  useEffect(() => {
    if (showCelebration) {
      Animated.parallel([
        Animated.timing(celebrationOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(celebrationScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      celebrationOpacity.setValue(0);
      celebrationScale.setValue(0.8);
    }
  }, [showCelebration, celebrationOpacity, celebrationScale]);

  // Confetti Animation Component
  const ConfettiParticle = ({ index }) => {
    const translateY = useRef(new Animated.Value(-10)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const scale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const delay = Math.random() * 1000;
      const duration = 2000 + Math.random() * 2000;
      
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: screenWidth + 100,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: (Math.random() - 0.5) * 200,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }, delay);
    }, [translateY, translateX, opacity, scale]);

    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', 
      '#96CEB4', '#FFEAA7', '#DDA0DD',
      '#98D8C8', '#F7DC6F', '#BB8FCE'
    ];

    return (
      <Animated.View
        style={[
          styles.confetti,
          {
            left: Math.random() * screenWidth,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            transform: [
              { translateY: translateY },
              { translateX: translateX },
              { scale: scale }
            ],
            opacity: opacity,
          }
        ]}
      />
    );
  };

  // Generate calendar data
  const generateCalendarDays = useCallback(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      days.push({
        date: date,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.getTime() === today.getTime(),
        isPast: date < today,
        isSelected: selectedDate && date.toDateString() === selectedDate.toDateString(),
      });
    }
    
    return days;
  }, [currentMonth, selectedDate]);

  // Time slots
  const timeSlots = useCallback(() => [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ], []);

  const handleDateSelect = (date) => {
    if (date.isPast) return;
    setSelectedDate(date.date);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleProceed = () => {
    if (!selectedDate) {
      Alert.alert('Select Date', 'Please select a date for your friendly match.');
      return;
    }
    if (!selectedTimeSlot) {
      Alert.alert('Select Time', 'Please select a time slot for your friendly match.');
      return;
    }
    
    setShowBookFriendlyModal(false);
    setShowCheckoutModal(true);
  };

  const changeMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const handleBookNow = () => {
    if (!checkoutName.trim()) {
      Alert.alert('Missing Name', 'Please enter your name.');
      return;
    }
    if (!checkoutPhone.trim()) {
      Alert.alert('Missing Phone', 'Please enter your phone number.');
      return;
    }
    if (!/^\d{10}$/.test(checkoutPhone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number.');
      return;
    }
    if (!checkoutTeamName.trim()) {
      Alert.alert('Missing Team Name', 'Please enter your team name.');
      return;
    }
    if (!checkoutMatchGround.trim()) {
      Alert.alert('Missing Match Ground', 'Please enter the match ground.');
      return;
    }
    if (!checkoutEmail.trim()) {
      Alert.alert('Missing Email', 'Please enter your email address.');
      return;
    }

    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      setShowCheckoutModal(false);
      
      // Show celebration animation
      setShowCelebration(true);
      
      // Hide celebration after 3 seconds
      setTimeout(() => {
        setShowCelebration(false);
        
        // Reset all form data
        setSelectedDate(null);
        setSelectedTimeSlot(null);
        setCheckoutName('');
        setCheckoutPhone('');
        setCheckoutTeamName('');
        setCheckoutMatchGround('');
        setCheckoutEmail('');
        
        Alert.alert(
          'Booking Submitted',
          'We will check our availability and get back to you soon!',
          [{ text: 'OK' }]
        );
      }, 3000);
    }, 2000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % slideshowData.length;
        scrollViewRef.current?.scrollTo({
          x: nextSlide * screenWidth,
          animated: true,
        });
        return nextSlide;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleSlideChange = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentSlide(slideIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Slideshow Section */}
        <View style={styles.slideshowContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleSlideChange}
            style={styles.slideshow}
          >
            {slideshowData.map((slide) => (
              <View 
              key={slide.id} 
              style={[styles.slide, { backgroundColor: slide.backgroundColor || '#000' }]}
            >
              {slide.image && (
                <Image
                source={slide.image}
                style={[styles.slideImage, slide.imageStyle]} // ⬅ dynamic merge here
              />
              )}
             {/*} <View style={styles.slideOverlay}>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
                <TouchableOpacity style={styles.slideButton}>
                  <Text style={styles.slideButtonText}>Learn More</Text>
                </TouchableOpacity>
              </View>*/}
            </View>
            
            ))}
          </ScrollView>
          
          {/* Slide Indicators */}
          <View style={styles.slideIndicators}>
            {slideshowData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentSlide === index && styles.activeIndicator
                ]}
              />
            ))}
          </View>
        </View>

        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.clubName}>Vulcan Heat FC</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileIcon}>
              <Users size={24} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Trophy size={20} color={COLORS.primary} />
            <Text style={styles.statNumber}>2x U19</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={20} color={COLORS.primary} />
            <Text style={styles.statNumber}>3rd</Text>
            <Text style={styles.statLabel}>League</Text>
          </View>
          <View style={styles.statCard}>
            <Users size={20} color={COLORS.primary} />
            <Text style={styles.statNumber}>20</Text>
            <Text style={styles.statLabel}>Players</Text>
          </View>
        </View>

        {/* Quick Actions - Horizontal Scroll */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.actionsScrollContainer}
            style={styles.actionsScrollView}
          >
            <TouchableOpacity style={styles.actionButton} onPress={() => setShowSquadModal(true)}>
              <Users size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Squad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <User size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Players</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Trophy size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Trophies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Bell size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Alerts</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={
                async () => {
                  try {
                    await signOut();
                  } catch (error) {
                    console.error("Logout failed:", error);
                  }
                }
              }
            style={styles.actionButton}>
              <Settings size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Main Action Buttons Section */}
        <View style={styles.mainActionButtonsContainer}>
          <TouchableOpacity
            style={styles.mainActionButton}
            onPress={() => setShowBookFriendlyModal(true)}
          >
            <Calendar size={24} color={COLORS.white} />
            <Text style={styles.mainActionButtonText}>Book Friendly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainActionButton}
            onPress={() => setShowTournamentsModal(true)}
          >
            <Trophy size={24} color={COLORS.white} />
            <Text style={styles.mainActionButtonText}>Tournaments</Text>
          </TouchableOpacity>
        </View>

        {/* Next Match */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Previous Match</Text>
          <View style={styles.matchCard}>
            <View style={styles.matchHeader}>
              <Text style={styles.matchDate}>Tomorrow (Final) , 5:30 PM</Text>
              <Text style={styles.matchCompetition}>UPL</Text>
            </View>
            <View style={styles.matchTeams}>
              <View style={styles.team}>
                <View style={styles.teamLogo}>
                  <Text style={styles.teamLogoText}>VH</Text>
                </View>
                <Text style={styles.teamName}>VHFC</Text>
              </View>
              <Text style={styles.vsText}>VS</Text>
              <View style={styles.team}>
                <View style={[styles.teamLogo, styles.opponentLogo]}>
                  <Text style={styles.teamLogoText}>MU</Text>
                </View>
                <Text style={styles.teamName}>MUFC</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.matchButton}>
              <Text style={styles.matchButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Results */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Results</Text>
          <View style={styles.resultsContainer}>
            <View style={styles.resultCard}>
              <View style={styles.resultTeams}>
                <Text style={styles.resultTeam}>VHFC</Text>
                <Text style={styles.resultScore}>PK 3 - 2</Text>
                <Text style={styles.resultTeam}>     PRFC</Text>
              </View>
              <Text style={styles.resultDate}>United Premier League</Text>
            </View>
            
            <View style={styles.resultCard}>
              <View style={styles.resultTeams}>
                <Text style={styles.resultTeam}>AL-Rafah</Text>
                <Text style={styles.resultScore}>0 - 1</Text>
                <Text style={styles.resultTeam}>        VHFC</Text>
              </View>
              <Text style={styles.resultDate}>United Premier League</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Book Friendly Modal */}
      <Modal
        visible={showBookFriendlyModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowBookFriendlyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}> 
            {/* Header with Icon */}
            <View style={styles.modalHeaderContainer}>
              <View style={styles.modalHeaderLeft}>
                <View style={styles.modalHeaderIcon}>
                  <Calendar size={20} color={COLORS.white} />
                </View>
                <View>
                  <Text style={styles.modalTitle}>Book a Friendly Match</Text>
                  <Text style={styles.modalSubtitle}>Select your preferred date and time</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.modalCloseButtonEnhanced}
                onPress={() => setShowBookFriendlyModal(false)}
              >
                <X size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {/* Calendar Section */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIcon}>
                    <Calendar size={16} color={COLORS.primary} />
                  </View>
                  <Text style={styles.sectionTitleEnhanced}>Select Date</Text>
                </View>
                
                {/* Calendar Header */}
                <View style={styles.calendarHeader}>
                  <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.calendarNavButton}>
                    <Text style={styles.calendarNavText}>‹</Text>
                  </TouchableOpacity>
                  <Text style={styles.calendarMonthText}>
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </Text>
                  <TouchableOpacity onPress={() => changeMonth(1)} style={styles.calendarNavButton}>
                    <Text style={styles.calendarNavText}>›</Text>
                  </TouchableOpacity>
                </View>
                
                {/* Calendar Days */}
                <View style={styles.calendarDaysHeader}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <Text key={day} style={styles.calendarDayHeader}>{day}</Text>
                  ))}
                </View>
                
                <View style={styles.calendarGrid}>
                  {generateCalendarDays().map((day, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.calendarDay,
                        !day.isCurrentMonth && styles.calendarDayOtherMonth,
                        day.isPast && styles.calendarDayPast,
                        day.isToday && styles.calendarDayToday,
                        day.isSelected && styles.calendarDaySelected,
                      ]}
                      onPress={() => handleDateSelect(day)}
                      disabled={day.isPast}
                    >
                      <Text style={[
                        styles.calendarDayText,
                        !day.isCurrentMonth && styles.calendarDayTextOtherMonth,
                        day.isPast && styles.calendarDayTextPast,
                        day.isToday && styles.calendarDayTextToday,
                        day.isSelected && styles.calendarDayTextSelected,
                      ]}>
                        {day.date.getDate()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              {/* Time Slots Section */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIcon}>
                    <Calendar size={16} color={COLORS.primary} />
                  </View>
                  <Text style={styles.sectionTitleEnhanced}>Select Time</Text>
                </View>
                <View style={styles.timeSlotsContainer}>
                  {timeSlots().map((timeSlot) => (
                    <TouchableOpacity
                      key={timeSlot}
                      style={[
                        styles.timeSlotButton,
                        selectedTimeSlot === timeSlot && styles.selectedTimeSlotButton
                      ]}
                      onPress={() => handleTimeSlotSelect(timeSlot)}
                    >
                      <Text style={[
                        styles.timeSlotText,
                        selectedTimeSlot === timeSlot && styles.selectedTimeSlotText
                      ]}>
                        {timeSlot}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              {/* Selected Details */}
              {(selectedDate || selectedTimeSlot) && (
                <View style={styles.selectedDetailsContainer}>
                  <View style={styles.selectedDetailsHeader}>
                    <View style={styles.selectedDetailsIcon}>
                      <Calendar size={16} color={COLORS.white} />
                    </View>
                    <Text style={styles.selectedDetailsTitle}>Selected Details</Text>
                  </View>
                  {selectedDate && (
                    <View style={styles.selectedDetailRow}>
                      <Text style={styles.selectedDetailLabel}>Date:</Text>
                      <Text style={styles.selectedDetailValue}>{selectedDate.toLocaleDateString()}</Text>
                    </View>
                  )}
                  {selectedTimeSlot && (
                    <View style={styles.selectedDetailRow}>
                      <Text style={styles.selectedDetailLabel}>Time:</Text>
                      <Text style={styles.selectedDetailValue}>{selectedTimeSlot}</Text>
                    </View>
                  )}
                </View>
              )}
            </ScrollView>
            
            {/* Proceed Button */}
            <TouchableOpacity 
              style={[
                styles.proceedButton, 
                { backgroundColor: selectedDate && selectedTimeSlot ? COLORS.primary : COLORS.textLight }
              ]} 
              onPress={handleProceed}
              disabled={!selectedDate || !selectedTimeSlot}
            >
              <Calendar size={20} color={COLORS.white} />
              <Text style={styles.proceedButtonText}>Proceed to Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Checkout Modal */}
      <Modal
        visible={showCheckoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCheckoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}> 
            {/* Header with Icon */}
            <View style={styles.modalHeaderContainer}>
              <View style={styles.modalHeaderLeft}>
                <View style={styles.modalHeaderIcon}>
                  <Calendar size={20} color={COLORS.white} />
                </View>
                <View>
                  <Text style={styles.modalTitle}>Booking Details</Text>
                  <Text style={styles.modalSubtitle}>Please provide your information</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.modalCloseButtonEnhanced}
                onPress={() => setShowCheckoutModal(false)}
              >
                <X size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {/* Booking Summary */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIcon}>
                    <Calendar size={16} color={COLORS.primary} />
                  </View>
                  <Text style={styles.sectionTitleEnhanced}>Booking Summary</Text>
                </View>
                <View style={styles.bookingSummaryContainer}>
                  <View style={styles.bookingSummaryRow}>
                    <Text style={styles.bookingSummaryLabel}>Date:</Text>
                    <Text style={styles.bookingSummaryValue}>{selectedDate?.toLocaleDateString()}</Text>
                  </View>
                  <View style={styles.bookingSummaryRow}>
                    <Text style={styles.bookingSummaryLabel}>Time:</Text>
                    <Text style={styles.bookingSummaryValue}>{selectedTimeSlot}</Text>
                  </View>
                </View>
              </View>

              {/* Contact Details */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIcon}>
                    <Users size={16} color={COLORS.primary} />
                  </View>
                  <Text style={styles.sectionTitleEnhanced}>Contact Details</Text>
                </View>
                
                <TextInput
                  style={styles.checkoutInput}
                  placeholder="Full Name"
                  value={checkoutName}
                  onChangeText={setCheckoutName}
                  placeholderTextColor={COLORS.textLight}
                />
                
                <TextInput
                  style={styles.checkoutInput}
                  placeholder="Phone Number"
                  value={checkoutPhone}
                  onChangeText={setCheckoutPhone}
                  keyboardType="phone-pad"
                  maxLength={10}
                  placeholderTextColor={COLORS.textLight}
                />
                
                <TextInput
                  style={styles.checkoutInput}
                  placeholder="Email Address"
                  value={checkoutEmail}
                  onChangeText={setCheckoutEmail}
                  keyboardType="email-address"
                  placeholderTextColor={COLORS.textLight}
                />
              </View>

              {/* Match Details */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIcon}>
                    <Trophy size={16} color={COLORS.primary} />
                  </View>
                  <Text style={styles.sectionTitleEnhanced}>Match Details</Text>
                </View>
                
                <TextInput
                  style={styles.checkoutInput}
                  placeholder="Your Team Name"
                  value={checkoutTeamName}
                  onChangeText={setCheckoutTeamName}
                  placeholderTextColor={COLORS.textLight}
                />
                
                <TextInput
                  style={styles.checkoutInput}
                  placeholder="Preferred Match Ground"
                  value={checkoutMatchGround}
                  onChangeText={setCheckoutMatchGround}
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
            </ScrollView>
            
            {/* Book Now Button */}
            <TouchableOpacity 
              style={[
                styles.proceedButton, 
                { backgroundColor: isBooking ? COLORS.textLight : COLORS.primary }
              ]} 
              onPress={handleBookNow}
              disabled={isBooking}
            >
              {isBooking ? (
                <ActivityIndicator color={COLORS.white} style={{ marginRight: 8 }} />
              ) : (
                <Calendar size={20} color={COLORS.white} />
              )}
              <Text style={styles.proceedButtonText}>
                {isBooking ? 'Processing...' : 'Book Now'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Tournaments Modal */}
      <Modal
        visible={showTournamentsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTournamentsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: '100%' }]}> 
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={styles.modalTitle}>Tournaments</Text>
              <TouchableOpacity onPress={() => setShowTournamentsModal(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            {/* Modal Content */}
            <Text style={styles.modalLabel}>Coming soon: View and join upcoming tournaments!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowTournamentsModal(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Squad Modal */}
      <Modal
        visible={showSquadModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSquadModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: '100%' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={styles.modalTitle}>Squad</Text>
              <TouchableOpacity onPress={() => setShowSquadModal(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {Object.entries(squadData()).map(([category, players]) => (
                <View key={category} style={styles.squadCategory}>
                  <Text style={styles.squadCategoryTitle}>{category}</Text>
                  {players.map((player) => (
                    <View key={player.id} style={styles.squadPlayer}>
                      <Text style={styles.squadPlayerName}>{player.name}</Text>
                      <Text style={styles.squadPlayerInfo}>
                        {player.position} - #{player.number}
                      </Text>
                      <Text style={styles.squadPlayerInfo}>Age: {player.age}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Celebration Animation */}
      {showCelebration && (
        <View style={styles.celebrationOverlay}>
          {/* Confetti Particles */}
          {[...Array(50)].map((_, index) => (
            <ConfettiParticle key={index} index={index} />
          ))}
          
          {/* Success Message */}
          <Animated.View
            style={[
              styles.celebrationMessage,
              {
                opacity: celebrationOpacity,
                transform: [{ scale: celebrationScale }],
              },
            ]}
          >
            <View style={styles.celebrationIcon}>
              <Trophy size={40} color={COLORS.white} />
            </View>
            <Text style={styles.celebrationTitle}>Booking Successful!</Text>
            <Text style={styles.celebrationSubtitle}>We will get back to you soon</Text>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
};