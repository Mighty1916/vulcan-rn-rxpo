import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { 
  Shield, 
  ShoppingBag, 
  Calendar, 
  Users, 
  FileText,
  X,
  CheckCircle,
  XCircle,
  Edit,
  Plus
} from 'lucide-react-native';
import { styles } from '../../assets/styles/admin.styles';
import { useUser } from '@clerk/clerk-expo';

const COLORS = {
  primary: "#2C3E50",
  background: "#F4F6F7",
  text: "#1A2530",
  border: "#D5D8DC",
  white: "#FFFFFF",
  textLight: "#7F8C8D",
  card: "#FFFFFF",
  shadow: "#000000",
  success: "#27AE60",
  warning: "#F39C12",
  error: "#E74C3C"
};

export default function AdminScreen() {
  const { user } = useUser();
  const [adminEmail, setAdminEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Data states
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [content, setContent] = useState({});
  
  // Modal states
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);

  // Admin authentication
  useEffect(() => {
    if (user?.emailAddresses?.[0]?.emailAddress) {
      const email = user.emailAddresses[0].emailAddress;
      setAdminEmail(email);
      
      // Check if user is admin
      fetch('https://vulcan-rn-rxpo-3.onrender.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsAuthenticated(true);
          fetchAdminData(email);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
    }
  }, [user]);

  const fetchAdminData = async (email) => {
    try {
      const headers = { 'admin-email': email };
      
      // Fetch all data
      const [ordersRes, bookingsRes, applicationsRes, contentRes] = await Promise.all([
        fetch('https://vulcan-rn-rxpo-3.onrender.com/api/admin/orders', { headers }),
        fetch('https://vulcan-rn-rxpo-3.onrender.com/api/admin/bookings', { headers }),
        fetch('https://vulcan-rn-rxpo-3.onrender.com/api/admin/applications', { headers }),
        fetch('https://vulcan-rn-rxpo-3.onrender.com/api/admin/content', { headers })
      ]);

      const [ordersData, bookingsData, applicationsData, contentData] = await Promise.all([
        ordersRes.json(),
        bookingsRes.json(),
        applicationsRes.json(),
        contentRes.json()
      ]);

      setOrders(ordersData);
      setBookings(bookingsData);
      setApplications(applicationsData);
      setContent(contentData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`https://vulcan-rn-rxpo-3.onrender.com/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'admin-email': adminEmail
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        Alert.alert('Success', 'Order status updated successfully');
        fetchAdminData(adminEmail);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const response = await fetch(`https://vulcan-rn-rxpo-3.onrender.com/api/admin/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'admin-email': adminEmail
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        Alert.alert('Success', 'Booking status updated successfully');
        fetchAdminData(adminEmail);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update booking status');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading Admin Panel...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.unauthorizedContainer}>
          <Shield size={64} color={COLORS.error} />
          <Text style={styles.unauthorizedTitle}>Access Denied</Text>
          <Text style={styles.unauthorizedText}>
            You are not authorized to access the admin panel.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Shield size={28} color={COLORS.primary} />
          <Text style={styles.headerTitle}>Admin Panel</Text>
        </View>
        <Text style={styles.adminEmail}>{adminEmail}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <ShoppingBag size={20} color={COLORS.primary} />
            <Text style={styles.statNumber}>{orders.length}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar size={20} color={COLORS.primary} />
            <Text style={styles.statNumber}>{bookings.length}</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={styles.statCard}>
            <Users size={20} color={COLORS.primary} />
            <Text style={styles.statNumber}>{applications.length}</Text>
            <Text style={styles.statLabel}>Applications</Text>
          </View>
        </View>

        {/* Admin Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => setShowOrdersModal(true)}
            >
              <ShoppingBag size={24} color={COLORS.primary} />
              <Text style={styles.actionTitle}>Manage Orders</Text>
              <Text style={styles.actionSubtitle}>View and update order status</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => setShowBookingsModal(true)}
            >
              <Calendar size={24} color={COLORS.primary} />
              <Text style={styles.actionTitle}>Manage Bookings</Text>
              <Text style={styles.actionSubtitle}>Approve/deny friendly bookings</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => setShowApplicationsModal(true)}
            >
              <Users size={24} color={COLORS.primary} />
              <Text style={styles.actionTitle}>Club Applications</Text>
              <Text style={styles.actionSubtitle}>Review membership applications</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => setShowContentModal(true)}
            >
              <FileText size={24} color={COLORS.primary} />
              <Text style={styles.actionTitle}>Content Management</Text>
              <Text style={styles.actionSubtitle}>Edit matches, results, announcements</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Orders Modal */}
      <Modal
        visible={showOrdersModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOrdersModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Manage Orders</Text>
              <TouchableOpacity onPress={() => setShowOrdersModal(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {orders.map(order => (
                <View key={order.id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>Order #{order.id}</Text>
                    <Text style={styles.orderStatus}>{order.status}</Text>
                  </View>
                  <Text style={styles.orderCustomer}>{order.userName}</Text>
                  <Text style={styles.orderTotal}>₹{order.total}</Text>
                  <View style={styles.orderActions}>
                    <TouchableOpacity 
                      style={[styles.statusButton, { backgroundColor: COLORS.success }]}
                      onPress={() => updateOrderStatus(order.id, 'Shipped')}
                    >
                      <CheckCircle size={16} color={COLORS.white} />
                      <Text style={styles.statusButtonText}>Ship</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.statusButton, { backgroundColor: COLORS.warning }]}
                      onPress={() => updateOrderStatus(order.id, 'Delivered')}
                    >
                      <CheckCircle size={16} color={COLORS.white} />
                      <Text style={styles.statusButtonText}>Deliver</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Bookings Modal */}
      <Modal
        visible={showBookingsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBookingsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Manage Bookings</Text>
              <TouchableOpacity onPress={() => setShowBookingsModal(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {bookings.map(booking => (
                <View key={booking.id} style={styles.bookingCard}>
                  <View style={styles.bookingHeader}>
                    <Text style={styles.bookingId}>#{booking.id}</Text>
                    <Text style={styles.bookingStatus}>{booking.status}</Text>
                  </View>
                  <Text style={styles.bookingTeam}>{booking.teamName}</Text>
                  <Text style={styles.bookingDetails}>{booking.date} at {booking.time}</Text>
                  <Text style={styles.bookingGround}>{booking.matchGround}</Text>
                  <View style={styles.bookingActions}>
                    <TouchableOpacity 
                      style={[styles.statusButton, { backgroundColor: COLORS.success }]}
                      onPress={() => updateBookingStatus(booking.id, 'Approved')}
                    >
                      <CheckCircle size={16} color={COLORS.white} />
                      <Text style={styles.statusButtonText}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.statusButton, { backgroundColor: COLORS.error }]}
                      onPress={() => updateBookingStatus(booking.id, 'Denied')}
                    >
                      <XCircle size={16} color={COLORS.white} />
                      <Text style={styles.statusButtonText}>Deny</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Applications Modal */}
      <Modal
        visible={showApplicationsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowApplicationsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Club Applications</Text>
              <TouchableOpacity onPress={() => setShowApplicationsModal(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              {applications.map(app => (
                <View key={app.id} style={styles.applicationCard}>
                  <Text style={styles.applicationName}>{app.fullName}</Text>
                  <Text style={styles.applicationPosition}>{app.position}</Text>
                  <Text style={styles.applicationEmail}>{app.email}</Text>
                  <Text style={styles.applicationPhone}>{app.phone}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Content Modal */}
      <Modal
        visible={showContentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowContentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Content Management</Text>
              <TouchableOpacity onPress={() => setShowContentModal(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.contentSectionTitle}>Next Match</Text>
              {content.nextMatch && (
                <View style={styles.contentCard}>
                  <Text style={styles.contentTitle}>{content.nextMatch.opponent}</Text>
                  <Text style={styles.contentDetails}>
                    {content.nextMatch.date} at {content.nextMatch.time}
                  </Text>
                  <Text style={styles.contentCompetition}>{content.nextMatch.competition}</Text>
                </View>
              )}

              <Text style={styles.contentSectionTitle}>Recent Results</Text>
              {content.recentResults?.map(result => (
                <View key={result.id} style={styles.contentCard}>
                  <Text style={styles.contentTitle}>
                    {result.team1} vs {result.team2}
                  </Text>
                  <Text style={styles.contentScore}>{result.score}</Text>
                  <Text style={styles.contentCompetition}>{result.competition}</Text>
                </View>
              ))}

              <Text style={styles.contentSectionTitle}>Announcements</Text>
              {content.announcements?.map(announcement => (
                <View key={announcement.id} style={styles.contentCard}>
                  <Text style={styles.contentTitle}>{announcement.title}</Text>
                  <Text style={styles.contentDetails}>{announcement.content}</Text>
                  <Text style={styles.contentType}>{announcement.type}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
} 