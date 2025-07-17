import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { Megaphone, Lock, Calendar, Bell } from 'lucide-react-native';
import { styles } from "../../assets/styles/announcements.styles"

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

// Secret codes and their messages
const SECRET_CODES = {
  'PLAYER': {
    title: 'Practice session',
    message: 'Monday-tuesday (coordination) && Wednesday - Thursday (Agility and endurance) && Friday (lil training and 3v3 game)' ,
  },
  'COACH': {
    title: 'Coaching Staff Notice',
    message: 'Special tactical meeting scheduled for tomorrow. All coaching staff and senior players must attend. Location: Conference Room A.',
    date: 'Yesterday'
  },
  'MATCH': {
    title: 'Match Day Secret',
    message: 'VIP access granted! You can now view the pre-match strategy and team formation 2 hours before kickoff.',
    date: '2 days ago'
  }
};

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Practice Session Everyday',
    message: 'From tommorrow everyone have to arrive on time for training session',
    date: 'Today',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Practice schedule',
    message: 'we designed our new practice session you can see in the secret messages',
    date: 'Yesterday',
    priority: 'high'
  },
  {
    id: 3,
    title: 'New Club Merchandise',
    message: 'New Home kit 2025 now available in the club store. Members get 20% discount.',
    date: 'A month ago',
    priority: 'low'
  },
];

export default function AnnouncementsScreen() {
  const [secretCode, setSecretCode] = useState('');
  const [showSecretInput, setShowSecretInput] = useState(false);
  const [secretMessage, setSecretMessage] = useState(null);
  const [showSecretModal, setShowSecretModal] = useState(false);

  const handleSecretCodeSubmit = () => {
    const code = secretCode.toUpperCase().trim();
    if (SECRET_CODES[code]) {
      setSecretMessage(SECRET_CODES[code]);
      setShowSecretModal(true);
      setSecretCode('');
      setShowSecretInput(false);
    } else {
      Alert.alert('Invalid Code', 'The secret code you entered is not valid. Please try again.');
      setSecretCode('');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#E74C3C';
      case 'medium': return '#F39C12';
      case 'low': return '#27AE60';
      default: return COLORS.textLight;
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Megaphone size={28} color={COLORS.primary} />
            <Text style={styles.headerTitle}>Announcements</Text>
          </View>
          <TouchableOpacity 
            style={styles.secretButton}
            onPress={() => setShowSecretInput(!showSecretInput)}
          >
            <Lock size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Secret Code Input */}
        {showSecretInput && (
          <View style={styles.secretSection}>
            <Text style={styles.secretTitle}>Enter Secret Code</Text>
            <View style={styles.secretInputContainer}>
              <TextInput
                style={styles.secretInput}
                placeholder="Enter code (e.g., PLAYER222)"
                value={secretCode}
                onChangeText={setSecretCode}
                autoCapitalize="characters"
                placeholderTextColor={COLORS.textLight}
              />
              <TouchableOpacity 
                style={styles.secretSubmitButton}
                onPress={handleSecretCodeSubmit}
              >
                <Text style={styles.secretSubmitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Announcements List */}
        <View style={styles.announcementsContainer}>
          <Text style={styles.sectionTitle}>Latest Announcements</Text>
          
          {ANNOUNCEMENTS.map((announcement) => (
            <View key={announcement.id} style={styles.announcementCard}>
              <View style={styles.announcementHeader}>
                <View style={styles.announcementTitleContainer}>
                  <Bell size={16} color={COLORS.primary} />
                  <Text style={styles.announcementTitle}>{announcement.title}</Text>
                </View>
                <View style={styles.announcementMeta}>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(announcement.priority) }]}>
                    <Text style={styles.priorityText}>{getPriorityText(announcement.priority)}</Text>
                  </View>
                </View>
              </View>
              
              <Text style={styles.announcementMessage}>{announcement.message}</Text>
              
              <View style={styles.announcementFooter}>
                <View style={styles.dateContainer}>
                  <Calendar size={14} color={COLORS.textLight} />
                  <Text style={styles.announcementDate}>{announcement.date}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Secret Message Modal */}
        <Modal
          visible={showSecretModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowSecretModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Lock size={24} color={COLORS.primary} />
                <Text style={styles.modalTitle}>Secret Message</Text>
              </View>
              
              {secretMessage && (
                <>
                  <Text style={styles.secretMessageTitle}>{secretMessage.title}</Text>
                  <Text style={styles.secretMessageText}>{secretMessage.message}</Text>
                  <Text style={styles.secretMessageDate}>{secretMessage.date}</Text>
                </>
              )}
              
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowSecretModal(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};