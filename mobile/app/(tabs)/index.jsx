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
  Share,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Users, Trophy, TrendingUp, User, UserCircle, LogOut, Lock, Share2, HelpCircle, Star, FileText, Trash2, Bell, X, Calendar, Instagram } from 'lucide-react-native';
import { styles } from "../../assets/styles/home.styles"
import { COLORS } from '../../constants/colors';
import { useAuth, useUser, useClerk } from '@clerk/clerk-expo';

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
  const { user } = useUser();
  const { deleteUser } = useClerk();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const [showBookFriendlyModal, setShowBookFriendlyModal] = useState(false);
  const [showTournamentsModal, setShowTournamentsModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showPlayersModal, setShowPlayersModal] = useState(false);
  const [showTrophiesModal, setShowTrophiesModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
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

  const handleBookNow = async () => {
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
    try {
      // Send booking info to backend
      const response = await fetch('https://vulcan-rn-rxpo-3.onrender.com/api/friendly-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: checkoutName,
          phone: checkoutPhone,
          email: checkoutEmail,
          teamName: checkoutTeamName,
          matchGround: checkoutMatchGround,
          date: selectedDate?.toLocaleDateString(),
          time: selectedTimeSlot,
          userID: user.id,
        })
      });
      const data = await response.json();
      setIsBooking(false);
      setShowCheckoutModal(false);
      if (!data.success) {
        Alert.alert('Booking Failed', data.error || 'Could not save booking.');
        return;
      }
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
    } catch (error) {
      setIsBooking(false);
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
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

  // Helper to get only the word part of the email (before @, no numbers)
  function getEmailWord(user) {
    const email = user?.emailAddresses?.[0]?.emailAddress;
    if (!email) return 'Welcome!';
    let namePart = email.split('@')[0];
    namePart = namePart.replace(/[0-9]/g, '');
    return namePart;
  }

  // Add mock tournaments data and state for selected tournament
  const [selectedTournament, setSelectedTournament] = useState(null);
  const tournaments = [
    {
      id: 1,
      name: 'UFA 22',
      year: 2022,
      type: 'League + Knockout',
      matches: [
        {
          date: '2022-04-10',
          type: 'League',
          opponent: 'Team Alpha',
          score: '3-1',
          result: 'Win',
          bestPerformance: 'A. Khan (2 goals)'
        },
        {
          date: '2022-04-15',
          type: 'League',
          opponent: 'Team Beta',
          score: '1-1',
          result: 'Draw',
          bestPerformance: 'R. Singh (1 assist)'
        },
        {
          date: '2022-04-20',
          type: 'Knockout',
          opponent: 'Team Gamma',
          score: '2-0',
          result: 'Win',
          bestPerformance: 'V. Patel (Clean Sheet)'
        }
      ]
    },
    {
      id: 2,
      name: 'Vulcan Heat Cup',
      year: 2023,
      type: 'Knockout',
      matches: [
        {
          date: '2023-05-05',
          type: 'Quarterfinal',
          opponent: 'Team Delta',
          score: '2-1',
          result: 'Win',
          bestPerformance: 'K. Malhotra (Winning Goal)'
        },
        {
          date: '2023-05-10',
          type: 'Semifinal',
          opponent: 'Team Epsilon',
          score: '0-1',
          result: 'Loss',
          bestPerformance: 'A. Sharma (7 saves)'
        }
      ]
    },
    {
      id: 3,
      name: 'Summer League',
      year: 2023,
      type: 'League',
      matches: [
        {
          date: '2023-06-01',
          type: 'League',
          opponent: 'Team Zeta',
          score: '4-2',
          result: 'Win',
          bestPerformance: 'P. Gupta (Hat-trick)'
        },
        {
          date: '2023-06-07',
          type: 'League',
          opponent: 'Team Eta',
          score: '2-2',
          result: 'Draw',
          bestPerformance: 'A. Verma (Late Equalizer)'
        }
      ]
    }
  ];

  // Add filter state
  const [tournamentFilter, setTournamentFilter] = useState('All');
  const types = ['All', ...Array.from(new Set(tournaments.map(t => t.type)))];

  // Helper: filter tournaments
  const filteredTournaments = tournaments.filter(t =>
    (tournamentFilter === 'All' || t.type === tournamentFilter)
  );

  // Helper: get tournament stats
  function getTournamentStats(t) {
    const total = t.matches.length;
    const wins = t.matches.filter(m => m.result === 'Win').length;
    const draws = t.matches.filter(m => m.result === 'Draw').length;
    const losses = t.matches.filter(m => m.result === 'Loss').length;
    let goals = 0;
    t.matches.forEach(m => {
      const matchGoals = parseInt(m.score.split('-')[0], 10);
      if (!isNaN(matchGoals)) goals += matchGoals;
    });
    // Best player (mock: most mentioned in bestPerformance)
    const perfCount = {};
    t.matches.forEach(m => {
      const match = m.bestPerformance;
      if (match) {
        const name = match.split('(')[0].trim();
        perfCount[name] = (perfCount[name] || 0) + 1;
      }
    });
    const bestPlayer = Object.entries(perfCount).sort((a,b) => b[1]-a[1])[0]?.[0] || '-';
    return { total, wins, draws, losses, goals, bestPlayer };
  }

  // Mock player data grouped by division
  const playersByDivision = [
    {
      group: 'I st Division (Under 22)',
      players: [
        { id: 1, name: 'Ahmed Khan', position: 'Forward', number: 10, age: 20, ability: 'Dribbling, Finishing' },
        { id: 2, name: 'Rahul Singh', position: 'Midfielder', number: 8, age: 21, ability: 'Passing, Vision' },
        { id: 3, name: 'Vikram Patel', position: 'Defender', number: 4, age: 19, ability: 'Tackling, Marking' },
        { id: 4, name: 'Arjun Sharma', position: 'Goalkeeper', number: 1, age: 22, ability: 'Reflexes, Shot Stopping' },
        { id: 5, name: 'Karan Malhotra', position: 'Forward', number: 9, age: 20, ability: 'Pace, Finishing' },
      ]
    },
    {
      group: 'II nd Division (U15)',
      players: [
        { id: 6, name: 'Priyansh Gupta', position: 'Midfielder', number: 6, age: 15 },
        { id: 7, name: 'Aditya Verma', position: 'Defender', number: 3, age: 14 },
        { id: 8, name: 'Rishabh Kumar', position: 'Forward', number: 11, age: 15 },
        { id: 9, name: 'Surya Prakash', position: 'Goalkeeper', number: 12, age: 15 },
        { id: 10, name: 'Dhruv Mehta', position: 'Midfielder', number: 7, age: 14 },
      ]
    }
  ];

  const trophies = [
    {
      id: 1,
      title: 'U19 Allama',
      description: 'Winners of the Allama Iqbal U19 Cup',
      year: 2022,
    },
    {
      id: 2,
      title: 'UFA Runner Up',
      description: 'Runner Up in the UFA Championship',
      year: 2023,
    },
    {
      id: 3,
      title: 'UFA U22',
      description: 'Champions of the UFA Under 22 League',
      year: 2023,
    },
  ];

  // Add state for alerts/notifications
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'order',
      icon: 'ShoppingCart',
      message: 'Your order has been placed!',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'shipping',
      icon: 'Truck',
      message: 'Your order has been shipped.',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'match',
      icon: 'Calendar',
      message: 'Your friendly match booking is confirmed!',
      time: 'just now',
      read: false,
    },
  ]);
  const unreadAlerts = alerts.filter(a => !a.read).length;

  // Add state for past bookings
  const [friendlies, setFriendlies] = useState([]);
  const [loadingFriendlies, setLoadingFriendlies] = useState(false);

  // Fetch friendlies for the user
  const fetchFriendlies = useCallback(() => {
    if (!user?.id) return;
    setLoadingFriendlies(true);
    fetch(`https://vulcan-rn-rxpo-3.onrender.com/api/friendly-booking/${user.id}`)
      .then(res => res.json())
      .then(data => setFriendlies(Array.isArray(data) ? data : []))
      .catch(() => setFriendlies([]))
      .finally(() => setLoadingFriendlies(false));
  }, [user?.id]);

  // Fetch bookings when Book Friendly modal opens
  useEffect(() => {
    if (showBookFriendlyModal) fetchFriendlies();
  }, [showBookFriendlyModal, fetchFriendlies]);

  // Add state for filter tab in Book Friendly modal
  const [friendlyTab, setFriendlyTab] = useState('Book Friendly'); // 'Book Friendly' or 'Past Bookings'

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
            <Text style={styles.clubName}>
              {user?.fullName || getEmailWord(user) || 'Welcome!'}
            </Text>
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
            <Text style={styles.statNumber}>14</Text>
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
            <TouchableOpacity style={styles.actionButton} onPress={() => setShowPlayersModal(true)}>
              <User size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Players</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => setShowTrophiesModal(true)}>
              <Trophy size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Trophies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => {
              setShowAlertsModal(true);
              setAlerts(alerts => alerts.map(a => ({ ...a, read: true })));
            }}>
              <Bell size={24} color={COLORS.primary} />
              {unreadAlerts > 0 && (
                <View style={styles.alertBadge}>
                  <Text style={styles.alertBadgeText}>{unreadAlerts}</Text>
                </View>
              )}
              <Text style={styles.actionText}>Alerts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => setShowProfileModal(true)}>
              <UserCircle size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Profile</Text>
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
            {/* Add the filter tabs: */}
            <View style={styles.friendlyTabBar}>
              {['Book Friendly', 'Past Bookings'].map(tab => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.friendlyTab,
                    friendlyTab === tab && styles.friendlyTabActive
                  ]}
                  onPress={() => setFriendlyTab(tab)}
                >
                  <Text style={[
                    styles.friendlyTabText,
                    friendlyTab === tab && styles.friendlyTabTextActive
                  ]}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Replace the ScrollView content in the modal with: */}
            {friendlyTab === 'Book Friendly' ? (
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
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon}>
                      <Calendar size={16} color={COLORS.primary} />
                    </View>
                    <Text style={styles.sectionTitleEnhanced}>Your Past Bookings</Text>
                  </View>
                  {loadingFriendlies ? (
                    <ActivityIndicator color={COLORS.primary} style={{ marginTop: 20 }} />
                  ) : friendlies.length === 0 ? (
                    <Text style={{ color: COLORS.textLight, textAlign: 'center', marginTop: 10 }}>No friendlies booked yet.</Text>
                  ) : (
                    friendlies.map(f => (
                      <View key={f.id} style={styles.pastBookingCard}>
                        <View style={styles.pastBookingHeader}>
                          <Text style={styles.pastBookingId}>#{f.id}</Text>
                          <View style={styles.pastBookingStatus}>
                            <Text style={styles.pastBookingStatusText}>Booked</Text>
                          </View>
                        </View>
                        <Text style={styles.pastBookingDate}>{f.date} {f.time}</Text>
                        <View style={styles.pastBookingDetails}>
                          <Text><Text style={styles.pastBookingLabel}>Team:</Text><Text style={styles.pastBookingValue}> {f.teamName}</Text></Text>
                          <Text><Text style={styles.pastBookingLabel}>Ground:</Text><Text style={styles.pastBookingValue}> {f.matchGround}</Text></Text>
                        </View>
                        <View style={styles.pastBookingFooter}>
                          <Text style={styles.pastBookingLabel}>Name: <Text style={styles.pastBookingValue}>{f.name}</Text></Text>
                          <Text style={styles.pastBookingLabel}>ID: <Text style={styles.pastBookingValue}>{f.id}</Text></Text>
                        </View>
                      </View>
                    ))
                  )}
                </View>
              </ScrollView>
            )}
            
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
        onRequestClose={() => {
          setShowTournamentsModal(false);
          setSelectedTournament(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: '100%' }]}> 
            {/* Modal Header */}
            <View style={styles.modalHeaderContainer}>
              <View style={styles.modalHeaderLeft}>
                <View style={styles.modalHeaderIcon}>
                  <Trophy size={20} color={COLORS.white} />
                </View>
                <View>
                  <Text style={styles.modalTitle}>{selectedTournament ? selectedTournament.name + ' ' + selectedTournament.year : 'Tournaments'}</Text>
                  <Text style={styles.modalSubtitle}>{selectedTournament ? selectedTournament.type : 'All tournaments played so far'}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.modalCloseButtonEnhanced}
                onPress={() => {
                  if (selectedTournament) setSelectedTournament(null);
                  else setShowTournamentsModal(false);
                }}
              >
                <X size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            {/* Filter Bar (only on list view) */}
            {!selectedTournament && (
              <ScrollView
                style={{ marginBottom: 18 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tournamentFilterBar}
              >
                {types.map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.tournamentFilterButton, tournamentFilter === type && styles.tournamentFilterButtonActive]}
                    onPress={() => setTournamentFilter(type)}
                  >
                    <Text style={[styles.tournamentFilterText, tournamentFilter === type && styles.tournamentFilterTextActive]}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            {/* Tournament List or Details */}
            {!selectedTournament ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                {filteredTournaments.map(t => (
                  <TouchableOpacity
                    key={t.id}
                    style={styles.tournamentCard}
                    onPress={() => setSelectedTournament(t)}
                    activeOpacity={0.85}
                  >
                    <View style={styles.tournamentCardHeader}>
                      <View style={styles.tournamentCardIcon}><Trophy size={20} color={COLORS.primary} /></View>
                      <Text style={styles.tournamentCardName}>{t.name}</Text>
                      <View style={[styles.tournamentTypeBadge, t.type.includes('Knockout') && { backgroundColor: '#E67E22' }, t.type.includes('League') && { backgroundColor: '#2980B9' }]}>
                        <Text style={styles.tournamentTypeBadgeText}>{t.type}</Text>
                      </View>
                    </View>
                    <View style={styles.tournamentCardFooter}>
                      <Text style={styles.tournamentCardYear}>{t.year}</Text>
                      <View style={styles.tournamentMatchCountBadge}>
                        <Text style={styles.tournamentMatchCountText}>{t.matches.length} Matches</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Tournament Stats */}
                <View style={styles.tournamentStatsContainer}>
                  {(() => { const s = getTournamentStats(selectedTournament); return (
                    <>
                      <View style={styles.tournamentStatBox}><Text style={styles.tournamentStatLabel}>Matches</Text><Text style={styles.tournamentStatValue}>{s.total}</Text></View>
                      <View style={styles.tournamentStatBox}><Text style={styles.tournamentStatLabel}>Wins</Text><Text style={[styles.tournamentStatValue, { color: '#27AE60' }]}>{s.wins}</Text></View>
                      <View style={styles.tournamentStatBox}><Text style={styles.tournamentStatLabel}>Draws</Text><Text style={[styles.tournamentStatValue, { color: COLORS.textLight }]}>{s.draws}</Text></View>
                      <View style={styles.tournamentStatBox}><Text style={styles.tournamentStatLabel}>Losses</Text><Text style={[styles.tournamentStatValue, { color: '#E74C3C' }]}>{s.losses}</Text></View>
                      <View style={styles.tournamentStatBox}><Text style={styles.tournamentStatLabel}>Goals</Text><Text style={styles.tournamentStatValue}>{s.goals}</Text></View>
                      <View style={styles.tournamentStatBox}><Text style={styles.tournamentStatLabel}>Best Player</Text><Text style={styles.tournamentStatValue}>{s.bestPlayer}</Text></View>
                    </>); })()}
                </View>
                {/* Matches List */}
                {selectedTournament.matches.map((m, idx) => (
                  <View key={idx} style={styles.tournamentMatchCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.tournamentMatchDate}>{m.date} • {m.type}</Text>
                      <Text style={[styles.tournamentMatchResult, m.result === 'Win' ? { color: '#27AE60' } : m.result === 'Loss' ? { color: '#E74C3C' } : { color: COLORS.textLight }]}>{m.result}</Text>
                    </View>
                    <Text style={styles.tournamentMatchOpponent}>vs {m.opponent}</Text>
                    <Text style={styles.tournamentMatchScore}>Score: {m.score}</Text>
                    <Text style={styles.tournamentMatchPerformance}>Best: {m.bestPerformance}</Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Players Modal */}
      <Modal
        visible={showPlayersModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPlayersModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: '100%' }]}> 
            <View style={styles.modalHeaderContainer}>
              <View style={styles.modalHeaderLeft}>
                <View style={styles.modalHeaderIcon}>
                  <User size={20} color={COLORS.white} />
                </View>
                <View>
                  <Text style={styles.modalTitle}>Players</Text>
                  <Text style={styles.modalSubtitle}>Meet our teams by division</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.modalCloseButtonEnhanced}
                onPress={() => setShowPlayersModal(false)}
              >
                <X size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {playersByDivision.map(group => (
                <View key={group.group} style={styles.squadCategory}>
                  <Text style={styles.squadCategoryTitle}>{group.group}</Text>
                  {group.players.map(player => (
                    <View key={player.id} style={styles.playerCard}>
                      <View style={styles.playerAvatar}>
                        <Text style={styles.playerAvatarText}>{player.name.split(' ').map(n => n[0]).join('').toUpperCase()}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.playerName}>{player.name}</Text>
                        {player.ability && (
                          <Text style={styles.playerAbility}>{player.ability}</Text>
                        )}
                        <Text style={styles.playerInfo}>{player.position} • #{player.number} • Age: {player.age}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Trophies Modal */}
      <Modal
        visible={showTrophiesModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTrophiesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: '100%' }]}> 
            <View style={styles.modalHeaderContainer}>
              <View style={styles.modalHeaderLeft}>
                <View style={styles.modalHeaderIcon}>
                  <Trophy size={20} color={COLORS.white} />
                </View>
                <View>
                  <Text style={styles.modalTitle}>Trophies</Text>
                  <Text style={styles.modalSubtitle}>Our proudest achievements</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.modalCloseButtonEnhanced}
                onPress={() => setShowTrophiesModal(false)}
              >
                <X size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {trophies.map(trophy => (
                <View key={trophy.id} style={styles.trophyCard}>
                  <View style={styles.trophyCardIcon}><Trophy size={28} color={COLORS.primary} /></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.trophyCardTitle}>{trophy.title}</Text>
                    <Text style={styles.trophyCardDesc}>{trophy.description}</Text>
                    <Text style={styles.trophyCardYear}>{trophy.year}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Alerts Modal */}
      <Modal
        visible={showAlertsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAlertsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: '100%' }]}> 
            <View style={styles.modalHeaderContainer}>
              <View style={styles.modalHeaderLeft}>
                <View style={styles.modalHeaderIcon}>
                  <Bell size={20} color={COLORS.white} />
                </View>
                <View>
                  <Text style={styles.modalTitle}>Alerts</Text>
                  <Text style={styles.modalSubtitle}>Your latest notifications</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.modalCloseButtonEnhanced}
                onPress={() => setShowAlertsModal(false)}
              >
                <X size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {alerts.length === 0 && (
                <Text style={{ color: COLORS.textLight, textAlign: 'center', marginTop: 40 }}>No alerts yet.</Text>
              )}
              {alerts.map(alert => (
                <View key={alert.id} style={[styles.alertCard, !alert.read && styles.alertCardUnread]}>
                  <View style={styles.alertCardIcon}>
                    {alert.icon === 'ShoppingCart' && <Bell size={20} color={COLORS.primary} />}
                    {alert.icon === 'Truck' && <Bell size={20} color={COLORS.primary} />}
                    {alert.icon === 'Calendar' && <Calendar size={20} color={COLORS.primary} />}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.alertCardMessage}>{alert.message}</Text>
                    <Text style={styles.alertCardTime}>{alert.time}</Text>
                  </View>
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

      {/* Profile Modal */}
      <Modal
        visible={showProfileModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowProfileModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: '100%' }]}> 
            <View style={styles.modalHeaderContainer}>
              <View style={styles.modalHeaderLeft}>
                <View style={styles.modalHeaderIcon}>
                  <UserCircle size={20} color={COLORS.white} />
                </View>
                <View>
                  <Text style={styles.modalTitle}>Profile</Text>
                  <Text style={styles.modalSubtitle}>Manage your account</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.modalCloseButtonEnhanced}
                onPress={() => setShowProfileModal(false)}
              >
                <X size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.profileUserBox}>
              <UserCircle size={48} color={COLORS.primary} style={{ marginBottom: 8 }} />
              <Text style={styles.profileUserName}>{user?.fullName || getEmailWord(user) || 'User'}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.profileList} contentContainerStyle={{ paddingBottom: 24 }}>
              <TouchableOpacity style={styles.profileListItem} onPress={() => {
                // Clerk password reset: open Clerk's reset page
                Linking.openURL('https://clerk.dev/reset-password');
              }}>
                <Lock size={20} color={COLORS.primary} style={styles.profileListIcon} />
                <Text style={styles.profileListText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileListItem} onPress={async () => {
                try {
                  await Share.share({
                    message: 'Check out Vulcan Heat FC! https://www.instagram.com/vulcanheatfc/',
                  });
                } catch (_) {}
              }}>
                <Share2 size={20} color={COLORS.primary} style={styles.profileListIcon} />
                <Text style={styles.profileListText}>Share this App</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileListItem} onPress={() => {
                Linking.openURL('https://www.instagram.com/vulcanheatfc/');
              }}>
                <HelpCircle size={20} color={COLORS.primary} style={styles.profileListIcon} />
                <Text style={styles.profileListText}>Help & Support</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileListItem} onPress={() => {}}>
                <Star size={20} color={COLORS.primary} style={styles.profileListIcon} />
                <Text style={styles.profileListText}>Rate Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileListItem} onPress={() => {}}>
                <FileText size={20} color={COLORS.primary} style={styles.profileListIcon} />
                <Text style={styles.profileListText}>Terms & Conditions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileListItem} onPress={() => {
                Alert.alert(
                  'Delete Account',
                  'Are you sure you want to delete your account? This action cannot be undone.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', style: 'destructive', onPress: async () => {
                      try {
                        await deleteUser();
                        await signOut();
                      } catch (_) {
                        Alert.alert('Error', 'Failed to delete account.');
                      }
                    }},
                  ]
                );
              }}>
                <Trash2 size={20} color={COLORS.primary} style={styles.profileListIcon} />
                <Text style={[styles.profileListText, { color: '#E74C3C' }]}>Delete Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileListItem} onPress={async () => { try { await signOut(); } catch (_) {}}}>
                <LogOut size={20} color={COLORS.primary} style={styles.profileListIcon} />
                <Text style={styles.profileListText}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
            {/* Social icons */}
            <View style={styles.profileSocialRow}>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/vulcanheatfc/')} style={styles.profileSocialIcon}>
                <Instagram size={28} color={'#E1306C'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};