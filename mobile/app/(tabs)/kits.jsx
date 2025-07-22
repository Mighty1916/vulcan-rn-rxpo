import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  Star,
  ArrowRight
} from 'lucide-react-native';
import { styles } from '../../assets/styles/kits.styles';
import RazorpayCheckout from '../screens/RazorpayCheckout';
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
  warning: "#F39C12"
};

const PRODUCTS = [
  {
    id: 1,
    name: 'Home Jersey 2025',
    price: 250,
    originalPrice: 299,
    image: require('../../assets/images/latest-jersey.png'),
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 156,
    description: 'Official home jersey for the 2025 season. Made with premium moisture-wicking fabric.',
    inStock: true,
    type: 'Jersey',
  },
  {
    id: 2,
    name: 'Away Jersey 2024',
    price: 200,
    originalPrice: 250,
    image: require('../../assets/images/away-jersey.png'),
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 142,
    description: 'Official away jersey for the 2024 season. Lightweight and comfortable.',
    inStock: true,
    type: 'Jersey',
  },
  {
    id: 3,
    name: 'Training Shorts',
    price: 100,
    originalPrice: 120,
    image: require('../../assets/images/latest-shorts.jpg'),
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.6,
    reviews: 89,
    description: 'Comfortable training shorts with moisture-wicking technology.',
    inStock: true,
    type: 'Shorts',
  },
  {
    id: 4,
    name: 'Third Kit Jersey',
    price: 180,
    originalPrice: 220,
    image: require('../../assets/images/abid3jersey.png'),
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 98,
    description: 'Limited edition third kit jersey. Premium quality with unique design.',
    inStock: true,
    type: 'Jersey',
  },
];

// --- Utility Functions ---
const getCartTotal = (cart) => Array.isArray(cart) ? cart.reduce((total, item) => total + (item.price * item.quantity), 0) : 0;
const getCartItemCount = (cart) => Array.isArray(cart) ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
const cartHasJersey = (cart) => Array.isArray(cart) && cart.some(item => item.type === 'Jersey');

export default function KitsScreen() {
  // --- State ---
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [filter, setFilter] = useState('All');
  const [razorpayOrder, setRazorpayOrder] = useState(null);
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutJerseyName, setCheckoutJerseyName] = useState('');
  const [checkoutJerseyNumber, setCheckoutJerseyNumber] = useState('');
  const [checkoutPincode, setCheckoutPincode] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [orders, setOrders] = useState([]);
  const { user } = useUser();

  // --- Fetch Orders ---
  const fetchOrders = useCallback(() => {
    if (!user?.id) return;
    fetch(`https://vulcan-rn-rxpo-3.onrender.com/api/orders/${user.id}`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => setOrders([]));
  }, [user?.id]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // --- Memoized Values ---
  const filteredProducts = useMemo(() =>
    filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.type === filter),
    [filter]
  );
  const cartTotal = useMemo(() => getCartTotal(cart), [cart]);
  const cartItemCount = useMemo(() => getCartItemCount(cart), [cart]);
  const hasJersey = useMemo(() => cartHasJersey(cart), [cart]);

  // --- Cart Operations ---
  const addToCart = useCallback(() => {
    if (!selectedSize) {
      Alert.alert('Size Required', 'Please select a size before adding to cart.');
      return;
    }
    const cartItem = {
      id: Date.now(),
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      size: selectedSize,
      quantity: quantity,
      image: selectedProduct.image,
      type: selectedProduct.type,
    };
    setCart(prev => [...prev, cartItem]);
    setShowProductModal(false);
    setSelectedSize('');
    setQuantity(1);
    Alert.alert('Added to Cart', `${selectedProduct.name} (${selectedSize}) added to cart!`);
  }, [selectedProduct, selectedSize, quantity]);

  const removeFromCart = useCallback((itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  }, [removeFromCart]);

  // --- Modal Controls ---
  const openProductModal = useCallback((product) => {
    setShowProductModal(true);
    setShowCartModal(false);
    setShowCheckoutModal(false);
    setShowRazorpay(false);
    setSelectedProduct(product);
  }, []);

  const openCartModal = useCallback(() => {
    setShowCartModal(true);
    setShowProductModal(false);
    setShowCheckoutModal(false);
    setShowRazorpay(false);
  }, []);

  const openCheckoutModal = useCallback(() => {
    setShowCheckoutModal(true);
    setShowProductModal(false);
    setShowCartModal(false);
    setShowRazorpay(false);
  }, []);

  const openRazorpayModal = useCallback(() => {
    setShowRazorpay(true);
    setShowProductModal(false);
    setShowCartModal(false);
    setShowCheckoutModal(false);
  }, []);

  // --- Checkout & Payment ---
  const handleCheckout = useCallback(() => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to cart before checkout.');
      return;
    }
    setShowCartModal(false);
    openCheckoutModal();
  }, [cart.length, openCheckoutModal]);

  const handlePayNow = useCallback(async () => {
    if (isPaying) return;
    if (!checkoutName.trim() || !checkoutEmail.trim() || !checkoutPhone.trim() || !checkoutAddress.trim() || !checkoutPincode.trim()) {
      Alert.alert('Missing Details', 'Please fill all the details.');
      return;
    }
    if (!/^\d{10}$/.test(checkoutPhone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number.');
      return;
    }
    if (!/^\d{6}$/.test(checkoutPincode)) {
      Alert.alert('Invalid Pincode', 'Please enter a valid 6-digit pincode.');
      return;
    }
    if (hasJersey) {
      if (!checkoutJerseyName.trim()) {
        Alert.alert('Missing Jersey Name', 'Please enter a name for the jersey.');
        return;
      }
      if (!checkoutJerseyNumber.trim()) {
        Alert.alert('Missing Jersey Number', 'Please enter a number for the jersey.');
        return;
      }
    }
    setIsPaying(true);
    try {
      const response = await fetch('https://vulcan-rn-rxpo-3.onrender.com/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: cartTotal,
          currency: 'INR',
          receipt: `order_rcptid_${Date.now()}`
        })
      });
      const order = await response.json();
      setRazorpayOrder({ ...order, key: 'rzp_test_YpqvHLtGQwud4J' });
      setShowCheckoutModal(false);
      openRazorpayModal();
    } catch (e) {
      console.error('Payment initiation error:', e);
      Alert.alert('Error', 'Failed to initiate payment. Please try again.');
    } finally {
      setIsPaying(false);
    }
  }, [isPaying, checkoutName, checkoutEmail, checkoutPhone, checkoutAddress, checkoutPincode, hasJersey, checkoutJerseyName, checkoutJerseyNumber, cartTotal, openRazorpayModal]);

  const handleRazorpayClose = useCallback(async (paymentData) => {
    setShowRazorpay(false);
    if (!paymentData) return;
    const safeCart = Array.isArray(cart) ? cart : [];
    const verifyRes = await fetch('https://vulcan-rn-rxpo-3.onrender.com/api/verify-razorpay-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...paymentData,
        userEmail: checkoutEmail,
        userID: user?.id,
        userName: checkoutName,
        userPhone: checkoutPhone,
        userAddress: checkoutAddress,
        productName: safeCart.map(item => item.name).join(', '),
        quantity: safeCart.reduce((sum, item) => sum + item.quantity, 0),
        total: cartTotal,
        userPincode: checkoutPincode,
        jerseyName: checkoutJerseyName,
        jerseyNumber: checkoutJerseyNumber,
        items: safeCart,
        status: 'Pending',
      })
    });
    const verifyData = await verifyRes.json();
    if (verifyData.success) {
      Alert.alert('Payment Success', 'Your order has been placed!');
      setCart([]);
      setCheckoutName('');
      setCheckoutEmail('');
      setCheckoutPhone('');
      setCheckoutAddress('');
      fetchOrders(); // Refresh orders from backend after placing order
    } else {
      Alert.alert('Payment Failed', verifyData.error || 'Could not verify payment');
    }
  }, [cart, checkoutEmail, user?.id, checkoutName, checkoutPhone, checkoutAddress, checkoutPincode, checkoutJerseyName, checkoutJerseyNumber, cartTotal, fetchOrders]);

  // --- Render Functions (unchanged, but can be extracted for clarity if desired) ---
  // Render product card
  const renderProduct = useCallback(({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => openProductModal(item)}
    >
      <Image source={item.image} style={styles.productImage} />
      
      {!item.inStock && (
        <View style={styles.outOfStockOverlay}>
          <Text style={styles.outOfStockText}>Out of Stock</Text>
        </View>
      )}
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color={COLORS.warning} fill={COLORS.warning} />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews})</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.price}</Text>
          {item.originalPrice > item.price && (
            <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  ), [openProductModal]);

  // Render cart item
  const renderCartItem = useCallback(({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemDetails}>{item.type ? `${item.type} | ` : ''}Size: {item.size}</Text>
        {item.type === 'Jersey' && (item.jerseyName || item.jerseyNumber) && (
          <Text style={styles.cartItemDetails}>
            {item.jerseyName ? `Name: ${item.jerseyName}` : ''}
            {item.jerseyName && item.jerseyNumber ? ' | ' : ''}
            {item.jerseyNumber ? `Number: ${item.jerseyNumber}` : ''}
          </Text>
        )}
        <Text style={styles.cartItemPrice}>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</Text>
      </View>
  
      <View style={styles.quantityControls}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus size={16} color={COLORS.primary} />
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{item.quantity}</Text>
        
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <X size={16} color={COLORS.textLight} />
      </TouchableOpacity>
    </View>
  ), [updateQuantity, removeFromCart]);

  // --- Main Render ---
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ShoppingBag size={28} color={COLORS.primary} />
          <Text style={styles.headerTitle}>Club Store</Text>
        </View>
        <TouchableOpacity style={styles.cartButton} onPress={openCartModal}>
          <ShoppingCart size={24} color={COLORS.primary} />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        {['All', 'Jersey', 'Shorts', 'My Orders'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, filter === tab && styles.activeTab]}
            onPress={() => setFilter(tab)}
          >
            <Text style={[styles.tabText, filter === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Products Grid or Orders */}
      {filter === 'My Orders' ? (
        <ScrollView style={styles.ordersContainer}>
          <Text style={styles.sectionTitle}>My Orders</Text>
          {orders.length === 0 ? (
            <Text style={{ color: COLORS.textLight, textAlign: 'center', marginTop: 40 }}>No orders yet.</Text>
          ) : (
            orders.map(order => (
              <View key={order.id} style={styles.orderCard}>
                {/* Order Header: ID and Status */}
                <View style={styles.orderHeader}>
                  <Text style={styles.orderId}>Order #{order.id}</Text>
                  <View style={[styles.statusBadge, {
                    backgroundColor: order.status === 'Pending' ? COLORS.warning : order.status === 'Delivered' ? COLORS.success : '#e74c3c'
                  }]}
                  >
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                </View>
                {/* Order Date/Time */}
                <Text style={styles.orderDate}>{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</Text>
                {/* Order Items */}
                <View style={styles.orderItems}>
                  {Array.isArray(order.items) && order.items.map((item, idx) => (
                    <View key={idx} style={styles.orderItemRow}>
                      <Text style={styles.orderItemText}>{item.name} (Size: {item.size}) x{item.quantity}</Text>
                    </View>
                  ))}
                </View>
                {/* Order Footer: Total and Tracking Number */}
                <View style={styles.orderFooter}>
                  <Text style={styles.orderTotal}>Total: ₹{order.total}</Text>
                  <Text style={styles.trackingNumber}>ID: {order.id}</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productsContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
      {/* Product Modal */}
      <Modal
        visible={showProductModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowProductModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.productModal}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowProductModal(false)}
            >
              <X size={24} color={COLORS.text} />
            </TouchableOpacity>
            
            {selectedProduct && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={selectedProduct.image} style={styles.modalProductImage} />
                
                <View style={styles.modalProductInfo}>
                  <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
                  <Text style={styles.modalProductDescription}>{selectedProduct.description}</Text>
                  
                  <View style={styles.modalPriceContainer}>
                    <Text style={styles.modalPrice}>₹{selectedProduct.price}</Text>
                    {selectedProduct.originalPrice > selectedProduct.price && (
                      <Text style={styles.modalOriginalPrice}>₹{selectedProduct.originalPrice}</Text>
                    )}
                  </View>

                  {/* Custom Name/Number for Jersey */}
                  {selectedProduct.type === 'Jersey' && (
                    <>
                    </>
                  )}

                  {/* Size Selection */}
                  <Text style={styles.selectionTitle}>Select Size</Text>
                  <View style={styles.selectionContainer}>
                    {selectedProduct.sizes.map((size) => (
                      <TouchableOpacity
                        key={size}
                        style={[
                          styles.selectionButton,
                          selectedSize === size && styles.selectedButton
                        ]}
                        onPress={() => setSelectedSize(size)}
                      >
                        <Text style={[
                          styles.selectionButtonText,
                          selectedSize === size && styles.selectedButtonText
                        ]}>
                          {size}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Quantity */}
                  <Text style={styles.selectionTitle}>Quantity</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                    <Text style={styles.quantityDisplay}>{quantity}</Text>
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => setQuantity(quantity + 1)}
                    >
                      <Plus size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                  </View>

                  {/* Add to Cart Button */}
                  <TouchableOpacity 
                    style={[
                      styles.addToCartButton, 
                      !selectedProduct.inStock && styles.disabledButton
                    ]}
                    onPress={addToCart}
                    disabled={!selectedProduct.inStock}
                  >
                    <ShoppingCart size={20} color={COLORS.white} />
                    <Text style={styles.addToCartButtonText}>
                      {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Cart Modal */}
      <Modal
        visible={showCartModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCartModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.cartModal, { flex: 1 }]}>
            <View style={styles.cartHeader}>
              <Text style={styles.cartTitle}>Shopping Cart</Text>
              <TouchableOpacity onPress={() => setShowCartModal(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            
            {cart.length === 0 ? (
              <View style={styles.emptyCart}>
                <ShoppingCart size={48} color={COLORS.textLight} />
                <Text style={styles.emptyCartText}>Your cart is empty</Text>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <FlatList
                  data={cart}
                  renderItem={renderCartItem}
                  keyExtractor={(item) => item.id.toString()}
                  style={[styles.cartContent, { flex: 1 }]}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: COLORS.border, marginVertical: 4 }} />}
                />
                <View style={styles.cartFooter}>
                  <View style={styles.cartTotal}>
                    <Text style={styles.cartTotalText}>Total: ₹{cartTotal}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.checkoutButton} 
                    onPress={handleCheckout}
                  >
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                    <ArrowRight size={20} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Checkout Modal after Cart Modal */}
      <Modal
        visible={showCheckoutModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCheckoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.checkoutModal, { flex: 1}]}> 
            <View style={styles.checkoutHeader}>
              <Text style={styles.checkoutTitle}>Checkout</Text>
              <TouchableOpacity onPress={() => setShowCheckoutModal(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={[styles.checkoutContent, {flex:1}]} showsVerticalScrollIndicator={false}>
              {/* Cart Summary */}
              <Text style={styles.checkoutSectionTitle}>Order Summary</Text>
              {cart.map(item => (
                <View key={item.id} style={{ marginBottom: 8, borderBottomWidth: 1, borderBottomColor: COLORS.border, paddingBottom: 8 }}>
                  <Text style={{ fontWeight: 'bold', color: COLORS.text }}>{item.name} <Text style={{ color: COLORS.textLight }}>x{item.quantity}</Text></Text>
                  <Text style={{ color: COLORS.textLight, fontSize: 13 }}>Size: {item.size} | ₹{item.price} each</Text>
                </View>
              ))}
              <Text style={styles.checkoutSectionTitle}>Shipping Details</Text>
              <TextInput
                style={[styles.selectionInput, { marginBottom: 12 }]}
                placeholder="Full Name"
                value={checkoutName}
                onChangeText={setCheckoutName}
                placeholderTextColor={COLORS.textLight}
              />
              <TextInput
                style={[styles.selectionInput, { marginBottom: 12 }]}
                placeholder="Email"
                value={checkoutEmail}
                onChangeText={setCheckoutEmail}
                keyboardType="email-address"
                placeholderTextColor={COLORS.textLight}
              />
              <TextInput
                style={[styles.selectionInput, { marginBottom: 12 }]}
                placeholder="Phone Number"
                value={checkoutPhone}
                onChangeText={setCheckoutPhone}
                keyboardType="phone-pad"
                placeholderTextColor={COLORS.textLight}
              />
              <TextInput
                style={[styles.selectionInput, { marginBottom: 12 }]}
                placeholder="Pincode"
                value={checkoutPincode}
                onChangeText={setCheckoutPincode}
                keyboardType="number-pad"
                maxLength={6}
                placeholderTextColor={COLORS.textLight}
              />
              <TextInput
                style={[styles.selectionInput, { marginBottom: 20 }]}
                placeholder="Address"
                value={checkoutAddress}
                onChangeText={setCheckoutAddress}
                multiline
                numberOfLines={3}
                placeholderTextColor={COLORS.textLight}
              />
              {/* Jersey fields if needed */}
              {hasJersey && (
                <>
                  <Text style={styles.checkoutSectionTitle}>Jersey Customization</Text>
                  <Text style={{ color: COLORS.warning, fontSize: 13, marginBottom: 8 }}>
                    Please write the name and number exactly as you want it to appear on your jersey.
                  </Text>
                  <TextInput
                    style={[styles.selectionInput, { marginBottom: 12 }]}
                    placeholder="Jersey Name"
                    value={checkoutJerseyName}
                    onChangeText={setCheckoutJerseyName}
                    maxLength={16}
                    placeholderTextColor={COLORS.textLight}
                  />
                  <TextInput
                    style={[styles.selectionInput, { marginBottom: 20 }]}
                    placeholder="Jersey Number"
                    value={checkoutJerseyNumber}
                    onChangeText={setCheckoutJerseyNumber}
                    keyboardType="number-pad"
                    maxLength={3}
                    placeholderTextColor={COLORS.textLight}
                  />
                </>
              )}
              <Text style={styles.checkoutSectionTitle}>Payment Mode</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 24 }}>
                  <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginRight: 8, backgroundColor: COLORS.primary }}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.white }} />
                  </View>
                  <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>Online</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.4 }}>
                  <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center', marginRight: 8, backgroundColor: COLORS.border }}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.card }} />
                  </View>
                  <Text style={{ color: COLORS.textLight, fontWeight: 'bold' }}>Cash on Delivery</Text>
                </View>
              </View>
              <View style={styles.checkoutTotal}>
                <Text style={styles.checkoutTotalText}>Total: ₹{cartTotal}</Text>
              </View>
              <View style={{ padding: 20, backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border }}>
              <TouchableOpacity style={styles.checkoutButton} onPress={handlePayNow} disabled={isPaying}>
                {isPaying ? (
                  <ActivityIndicator color={COLORS.white} style={{ marginRight: 8 }} />
                ) : null}
                <Text style={styles.checkoutButtonText}>{isPaying ? 'Processing...' : 'Pay Now'}</Text>
                {!isPaying && <ArrowRight size={20} color={COLORS.white} />}
              </TouchableOpacity>
            </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <RazorpayCheckout
        visible={showRazorpay}
        onClose={handleRazorpayClose}
        order={razorpayOrder}
        userEmail={'albabkhan1916135@gmail.com'}
      />
    </SafeAreaView>
  );
}