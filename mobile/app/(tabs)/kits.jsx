import React, { useState } from 'react';
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
  TextInput, // <-- add this
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
import RazorpayCheckout from '../screens/RazorpayCheckout'; // import the component

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

// Sample product data
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
    type: 'Jersey', // <-- add type
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
    inStock: false,
    type: 'Jersey', // <-- add type
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
    type: 'Shorts', // <-- add type
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
    inStock: false,
    type: 'Jersey', // <-- add type
  },
];

export default function KitsScreen() {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [filter, setFilter] = useState('All');
  const [jerseyName, setJerseyName] = useState('');
  const [jerseyNumber, setJerseyNumber] = useState('');
  const [razorpayOrder, setRazorpayOrder] = useState(null);
  const [showRazorpay, setShowRazorpay] = useState(false);

  // Filtered products based on filter state
  const filteredProducts = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.type === filter);

  // Add product to cart
  const addToCart = () => {
    if (!selectedSize) {
      Alert.alert('Size Required', 'Please select a size before adding to cart.');
      return;
    }
    if (selectedProduct.type === 'Jersey') {
      if (!jerseyName.trim()) {
        Alert.alert('Name Required', 'Please enter a name for the jersey.');
        return;
      }
      if (!jerseyNumber.trim()) {
        Alert.alert('Number Required', 'Please enter a number for the jersey.');
        return;
      }
    }

    const cartItem = {
      id: Date.now(), // Unique ID for cart item
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      size: selectedSize,
      quantity: quantity,
      image: selectedProduct.image,
      type: selectedProduct.type,
      jerseyName: selectedProduct.type === 'Jersey' ? jerseyName : undefined,
      jerseyNumber: selectedProduct.type === 'Jersey' ? jerseyNumber : undefined,
    };

    setCart(prev => [...prev, cartItem]);
    
    // Reset modal state
    setShowProductModal(false);
    setSelectedSize('');
    setQuantity(1);
    setJerseyName('');
    setJerseyNumber('');
    
    Alert.alert('Added to Cart', `${selectedProduct.name} (${selectedSize}) added to cart!`);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  // Update quantity in cart
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get total items in cart
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to cart before checkout.');
      return;
    }
    
    // 1. Create Razorpay order on backend
    const response = await fetch('https://vulcan-rn-rxpo-3.onrender.com/api/create-razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: getCartTotal(), // in INR
        currency: 'INR',
        receipt: `order_rcptid_${Date.now()}`
      })
    });
    const order = await response.json();

    // 2. Show Razorpay WebView
    setRazorpayOrder({ ...order, key: 'rzp_test_YpqvHLtGQwud4J' }); // pass your public key here
    setShowRazorpay(true);
  };

  // 3. Handle Razorpay payment result
  const handleRazorpayClose = async (paymentData) => {
    setShowRazorpay(false);
    if (!paymentData) return;

    // 4. Verify payment and save order on backend
    const verifyRes = await fetch('https://vulcan-rn-rxpo-3.onrender.com/api/verify-razorpay-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...paymentData,
        userEmail: 'albabkhan1916135@gmail.com',
        userID: '2',
        productName: cart.map(item => item.name).join(', '),
        quantity: cart.reduce((sum, item) => sum + item.quantity, 0),
        total: getCartTotal()
      })
    });
    const verifyData = await verifyRes.json();
    if (verifyData.success) {
      Alert.alert('Payment Success', 'Your order has been placed!');
      setCart([]); // clear cart
    } else {
      Alert.alert('Payment Failed', verifyData.error || 'Could not verify payment');
    }
  };

  // Open product modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  // Render product card
  const renderProduct = ({ item }) => (
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
  );

  // Render cart item
  const renderCartItem = ({ item }) => (
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
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ShoppingBag size={28} color={COLORS.primary} />
          <Text style={styles.headerTitle}>Club Store</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => setShowCartModal(true)}
        >
          <ShoppingCart size={24} color={COLORS.primary} />
          {getCartItemCount() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getCartItemCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        {['All', 'Jersey', 'Shorts'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, filter === tab && styles.activeTab]}
            onPress={() => setFilter(tab)}
          >
            <Text style={[styles.tabText, filter === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Product Selection Modal */}
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
                      <Text style={styles.selectionTitle}>Customize Your Jersey</Text>
                      <TextInput
                        style={[styles.selectionInput, { marginBottom: 12 }]}
                        placeholder="Name on Jersey"
                        value={jerseyName}
                        onChangeText={setJerseyName}
                        maxLength={16}
                        placeholderTextColor={COLORS.textLight}
                      />
                      <TextInput
                        style={styles.selectionInput}
                        placeholder="Number on Jersey"
                        value={jerseyNumber}
                        onChangeText={setJerseyNumber}
                        keyboardType="numeric"
                        maxLength={3}
                        placeholderTextColor={COLORS.textLight}
                      />
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
                    <Text style={styles.cartTotalText}>Total: ₹{getCartTotal()}</Text>
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

      <RazorpayCheckout
        visible={showRazorpay}
        onClose={handleRazorpayClose}
        order={razorpayOrder}
        userEmail={'albabkhan1916135@gmail.com'}
      />
    </SafeAreaView>
  );
}