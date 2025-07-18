import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from '../../assets/styles/home.styles';
import { COLORS } from '../../constants/colors';

const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
];

export default function BookFriendlyScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    venue: '',
    opponent: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleInput = (field, value) => setForm({ ...form, [field]: value });

  const handleBook = () => {
    if (!selectedDate || !selectedTime || !form.name || !form.phone || !form.venue || !form.opponent) {
      Alert.alert('Please fill all fields');
      return;
    }
    setBookingSuccess(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Book a Friendly Match</Text>
      <Text style={styles.welcomeText}>Select Date</Text>
      <Calendar
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={selectedDate ? { [selectedDate]: { selected: true, selectedColor: COLORS.primary } } : {}}
        style={{ marginBottom: 20, borderRadius: 10, overflow: 'hidden' }}
        theme={{
          backgroundColor: COLORS.background,
          calendarBackground: COLORS.card,
          textSectionTitleColor: COLORS.primary,
          selectedDayBackgroundColor: COLORS.primary,
          selectedDayTextColor: COLORS.white,
          todayTextColor: COLORS.primary,
          dayTextColor: COLORS.text,
          textDisabledColor: COLORS.textLight,
        }}
      />
      <Text style={styles.welcomeText}>Pick a Time</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
        {TIME_SLOTS.map(slot => (
          <TouchableOpacity
            key={slot}
            style={{
              backgroundColor: selectedTime === slot ? COLORS.primary : COLORS.card,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 18,
              marginRight: 10,
            }}
            onPress={() => setSelectedTime(slot)}
          >
            <Text style={{ color: selectedTime === slot ? COLORS.white : COLORS.primary, fontWeight: 'bold' }}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.welcomeText}>Your Details</Text>
      <View style={{ marginBottom: 16 }}>
        <TextInput
          style={[styles.sectionTitle, { fontSize: 16, backgroundColor: COLORS.card, borderRadius: 8, padding: 10, marginBottom: 8 }]}
          placeholder="Your Name"
          value={form.name}
          onChangeText={v => handleInput('name', v)}
          placeholderTextColor={COLORS.textLight}
        />
        <TextInput
          style={[styles.sectionTitle, { fontSize: 16, backgroundColor: COLORS.card, borderRadius: 8, padding: 10, marginBottom: 8 }]}
          placeholder="Phone Number"
          value={form.phone}
          onChangeText={v => handleInput('phone', v)}
          keyboardType="phone-pad"
          placeholderTextColor={COLORS.textLight}
        />
        <TextInput
          style={[styles.sectionTitle, { fontSize: 16, backgroundColor: COLORS.card, borderRadius: 8, padding: 10, marginBottom: 8 }]}
          placeholder="Match Venue"
          value={form.venue}
          onChangeText={v => handleInput('venue', v)}
          placeholderTextColor={COLORS.textLight}
        />
        <TextInput
          style={[styles.sectionTitle, { fontSize: 16, backgroundColor: COLORS.card, borderRadius: 8, padding: 10, marginBottom: 8 }]}
          placeholder="Opponent Team Name"
          value={form.opponent}
          onChangeText={v => handleInput('opponent', v)}
          placeholderTextColor={COLORS.textLight}
        />
      </View>
      <TouchableOpacity
        style={{ backgroundColor: COLORS.primary, borderRadius: 8, padding: 16, alignItems: 'center', marginBottom: 20 }}
        onPress={handleBook}
      >
        <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 16 }}>Book Now</Text>
      </TouchableOpacity>
      {bookingSuccess && (
        <View style={{ backgroundColor: COLORS.card, borderRadius: 8, padding: 16, alignItems: 'center', borderColor: COLORS.primary, borderWidth: 1 }}>
          <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Thank you!</Text>
          <Text style={{ color: COLORS.text, textAlign: 'center' }}>We will check our availability and get back to you.</Text>
        </View>
      )}
    </ScrollView>
  );
} 