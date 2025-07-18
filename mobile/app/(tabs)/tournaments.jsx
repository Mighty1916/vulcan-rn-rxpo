import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../../assets/styles/home.styles';
import { COLORS } from '../../constants/colors';

const TOURNAMENTS = [
  {
    id: 'ufa22',
    name: 'UFA 22',
    matches: [
      { id: 1, type: 'League', opponent: 'PRFC', date: '2024-05-01', result: '3-2', best: 'Ali (2 goals)', goals: 3 },
      { id: 2, type: 'Knockout', opponent: 'MUFC', date: '2024-05-05', result: '1-0', best: 'Zaid (1 goal)', goals: 1 },
    ],
  },
  {
    id: 'upl23',
    name: 'UPL 23',
    matches: [
      { id: 1, type: 'League', opponent: 'AL-Rafah', date: '2024-04-10', result: '2-1', best: 'Bilal (2 goals)', goals: 2 },
      { id: 2, type: 'Knockout', opponent: 'PRFC', date: '2024-04-15', result: '0-1', best: 'Goalkeeper (5 saves)', goals: 0 },
    ],
  },
];

export default function TournamentsScreen() {
  const [selectedTournament, setSelectedTournament] = useState(null);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Tournaments</Text>
      {!selectedTournament ? (
        <View>
          {TOURNAMENTS.map(t => (
            <TouchableOpacity
              key={t.id}
              style={{ backgroundColor: COLORS.card, borderRadius: 10, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.primary }}
              onPress={() => setSelectedTournament(t)}
            >
              <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 18 }}>{t.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => setSelectedTournament(null)} style={{ marginBottom: 16 }}>
            <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>{'< Back to Tournaments'}</Text>
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>{selectedTournament.name} Matches</Text>
          {selectedTournament.matches.map(match => (
            <View key={match.id} style={{ backgroundColor: COLORS.card, borderRadius: 10, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.primary }}>
              <Text style={{ color: COLORS.text, fontWeight: 'bold', fontSize: 16 }}>{match.type} vs {match.opponent}</Text>
              <Text style={{ color: COLORS.textLight, marginTop: 4 }}>Date: {match.date}</Text>
              <Text style={{ color: COLORS.textLight }}>Result: {match.result}</Text>
              <Text style={{ color: COLORS.primary, marginTop: 4 }}>Best Performance: {match.best}</Text>
              <Text style={{ color: COLORS.textLight }}>Goals: {match.goals}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
} 