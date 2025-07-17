import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  //StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Users, Trophy, TrendingUp, User, Settings, Bell } from 'lucide-react-native';
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
            <TouchableOpacity style={styles.actionButton}>
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
    </SafeAreaView>
  );
};