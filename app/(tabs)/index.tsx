import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { RefreshCw, Star, Shield } from 'lucide-react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

/**
 * MembershipCard Component
 *
 * A premium membership card with:
 * - User profile information
 * - Dynamic QR code for access
 * - Refresh functionality
 * - Animated interactions
 * - Premium styling with gradients
 */
export default function MembershipCard() {
  // State management
  const [qrValue, setQrValue] = useState('user-id-12345-abcde'); // Current QR code value
  const [isRefreshing, setIsRefreshing] = useState(false); // Loading state for refresh
  const [fadeAnim] = useState(new Animated.Value(1)); // Animation for QR fade
  const [rotateAnim] = useState(new Animated.Value(0)); // Animation for refresh icon rotation

  /**
   * Refresh QR Code
   *
   * Handles the QR code refresh process with animations:
   * 1. Fades out current QR code
   * 2. Generates new value with timestamp
   * 3. Fades in new QR code
   * 4. Rotates refresh icon
   */
  const refreshQRCode = () => {
    setIsRefreshing(true);

    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Generate new QR value with timestamp
      const timestamp = Date.now();
      const newQrValue = `user-id-12345-abcde-${timestamp}`;
      setQrValue(newQrValue);

      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setIsRefreshing(false);
    });

    // Rotation animation
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
    });
  };

  // Interpolate rotation value for smooth spinning
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ScrollView style={styles.container}>
      {/* Status bar styling */}
      <StatusBar barStyle="light-content" backgroundColor="#0f0f23" />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Membership</Text>
        <Text style={styles.headerSubtitle}>Digital Access Card</Text>
      </View>

      {/* Main Membership Card */}
      <View style={styles.cardContainer}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          {/* Card Header with membership level */}
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.cardTitle}>PREMIUM MEMBERSHIP</Text>
              <View style={styles.membershipBadge}>
                <Shield size={16} color="#ffd700" />
                <Text style={styles.membershipLevel}>Platinum Member</Text>
              </View>
            </View>
            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} color="#ffd700" fill="#ffd700" />
              ))}
            </View>
          </View>

          {/* User Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profilePicture}>
              <Text style={styles.profileInitials}>AR</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Alex Ray</Text>
              <Text style={styles.memberSince}>Member since 2020</Text>
            </View>
          </View>

          {/* QR Code Section */}
          <View style={styles.qrSection}>
            <Text style={styles.qrLabel}>Scan for Access</Text>
            <Animated.View style={[styles.qrContainer, { opacity: fadeAnim }]}>
              <QRCode
                value={qrValue}
                size={120}
                backgroundColor="white"
                color="#1a1a2e"
                logoSize={20}
                logoMargin={2}
                logoBorderRadius={10}
              />
            </Animated.View>
            <Text style={styles.qrId}>
              ID: {qrValue.split('-').slice(-1)[0] || 'abcde'}
            </Text>
          </View>

          {/* Card Footer */}
          <View style={styles.cardFooter}>
            <Text style={styles.validText}>Valid Until: Dec 2024</Text>
            <View style={styles.cardNumber}>
              <Text style={styles.cardNumberText}>**** **** **** 5678</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Refresh Button */}
      <TouchableOpacity
        style={[
          styles.refreshButton,
          isRefreshing && styles.refreshButtonDisabled,
        ]}
        onPress={refreshQRCode}
        disabled={isRefreshing}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            isRefreshing ? ['#9ca3af', '#6b7280'] : ['#4f46e5', '#7c3aed']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.refreshButtonGradient}
        >
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <RefreshCw size={20} color="white" />
          </Animated.View>
          <Text style={styles.refreshButtonText}>
            {isRefreshing ? 'Refreshing...' : 'Refresh QR Code'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Information Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>How to use your card</Text>
        <Text style={styles.infoText}>
          Present this QR code at any partner location for instant verification
          and access to exclusive member benefits.
        </Text>
      </View>
    </ScrollView>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 20,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '400',
  },
  cardContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 1,
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  membershipLevel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffd700',
    marginLeft: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileInitials: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  qrLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  qrId: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  validText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  cardNumber: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  cardNumberText: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontWeight: '600',
  },
  refreshButton: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#4f46e5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  refreshButtonDisabled: {
    shadowOpacity: 0.1,
  },
  refreshButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  refreshButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  infoSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 80,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
  },
});
