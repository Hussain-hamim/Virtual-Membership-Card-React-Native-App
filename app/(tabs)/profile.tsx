import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award,
  Settings,
  Bell,
  CreditCard,
  Gift
} from 'lucide-react-native';

export default function Profile() {
  const ProfileItem = ({ icon: Icon, label, value, onPress = null }) => (
    <TouchableOpacity 
      style={styles.profileItem} 
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.profileItemLeft}>
        <View style={styles.iconContainer}>
          <Icon size={20} color="#4f46e5" />
        </View>
        <View style={styles.profileItemText}>
          <Text style={styles.profileItemLabel}>{label}</Text>
          <Text style={styles.profileItemValue}>{value}</Text>
        </View>
      </View>
      {onPress && (
        <View style={styles.chevron}>
          <Text style={styles.chevronText}>›</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f23" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileCardGradient}
          >
            <View style={styles.profilePicture}>
              <Text style={styles.profileInitials}>AR</Text>
            </View>
            <Text style={styles.profileName}>Alex Ray</Text>
            <Text style={styles.profileTitle}>Platinum Member</Text>
            <View style={styles.membershipStats}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Years</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statNumber}>127</Text>
                <Text style={styles.statLabel}>Visits</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statNumber}>$2.4K</Text>
                <Text style={styles.statLabel}>Saved</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Profile Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.profileItems}>
            <ProfileItem
              icon={Mail}
              label="Email"
              value="alex.ray@email.com"
            />
            <ProfileItem
              icon={Phone}
              label="Phone"
              value="+1 (555) 123-4567"
            />
            <ProfileItem
              icon={MapPin}
              label="Location"
              value="New York, NY"
            />
            <ProfileItem
              icon={Calendar}
              label="Member Since"
              value="January 2020"
            />
          </View>
        </View>

        {/* Membership Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Membership</Text>
          <View style={styles.profileItems}>
            <ProfileItem
              icon={Award}
              label="Current Tier"
              value="Platinum Member"
            />
            <ProfileItem
              icon={CreditCard}
              label="Card Number"
              value="**** **** **** 5678"
            />
            <ProfileItem
              icon={Gift}
              label="Rewards Points"
              value="2,847 points"
            />
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.profileItems}>
            <ProfileItem
              icon={Bell}
              label="Notifications"
              value="Enabled"
              onPress={() => {}}
            />
            <ProfileItem
              icon={Settings}
              label="Account Settings"
              value="Manage your account"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  settingsButton: {
    padding: 8,
  },
  profileCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  profileCardGradient: {
    padding: 32,
    alignItems: 'center',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileInitials: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 24,
  },
  membershipStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  profileItems: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(79, 70, 229, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileItemText: {
    flex: 1,
  },
  profileItemLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 2,
  },
  profileItemValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  chevron: {
    marginLeft: 12,
  },
  chevronText: {
    fontSize: 20,
    color: '#6b7280',
    fontWeight: '300',
  },
  bottomSpacing: {
    height: 32,
  },
});