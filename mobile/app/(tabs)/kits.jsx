import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { ShoppingBag, ShoppingCart, Plus, Minus, X, CreditCard, Truck, Package, CircleCheck as CheckCircle, Star, Search } from 'lucide-react-native';
import { styles } from '../../assets/styles/kits.styles';

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
    originalPrice: 99.99,
    image: require('../../assets/images/latest-jersey.png'),
    category: 'jersey',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 156,
    description: 'Official home jersey for the 2025 season. Made with premium moisture-wicking fabric.',
    inStock: true
  },
  {
    id: 2,
    name: 'Home Jersey 2024',
    price: 89.99,
    originalPrice: 99.99,
    image: require('../../assets/images/away-jersey.png'),
    category: 'jersey',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 142,
    description: 'Official Home jersey for the 2024 season. Lightweight and comfortable.',
    inStock: false
  },
  {
    id: 3,
    name: 'Home Jersey 2023',
    price: 94.99,
    originalPrice: 109.99,
    image: require('../../assets/images/abid3jersey.png'),
    category: 'jersey',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 98,
    description: 'Limited edition third kit jersey. Premium quality with unique design.',
    inStock: false
  },
  {
    id: 4,
    name: 'Shorts',
    price: 34.99,
    originalPrice: 39.99,
    image: require('../../assets/images/latest-shorts.jpg'),
    category: 'shorts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.6,
    reviews: 89,
    description: 'Comfortable latest shorts with moisture-wicking technology.',
    inStock: true
  },
];

// Sample orders data
const SAMPLE_ORDERS = [
  {
    id: 'ORD001',
    date: '2024-01-15',
    status: 'delivered',
    total: 124.98,
    items: [
      { name: 'Home Jersey 2024', size: 'L', quantity: 1, price: 89.99 },
      { name: 'Training Shorts', size: 'L', quantity: 1, price: 34.99 }
    ],
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD002',
    date: '2024-01-20',
    status: 'shipped',
    total: 89.99,
    items: [
      { name: 'Away Jersey 2024', size: 'M', quantity: 1, price: 89.99 }
    ],
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD003',
    date: '2024-01-22',
    status: 'processing',
    total: 94.99,
    items: [
      { name: 'Third Kit Jersey 2024', size: 'XL', quantity: 1, price: 94.99 }
    ],
    trackingNumber: null
  }
];

export default function KitsScreen() {
  const [activeTab, setActiveTab] = useState('shop');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orders, setOrders] = useState(SAMPLE_ORDERS);

  // Filter products based on search and category
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = () => {
    if (!selectedSize) {
      Alert.alert('Missing Selection', 'Please select size ');
      return;
    }

    const cartItem = {
      id: Date.now(),
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      size: selectedSize,
      quantity: quantity,
      image: selectedProduct.image
    };

    setCart(prev => [...prev, cartItem]);
    setShowProductModal(false);
    setSelectedSize('');
    setQuantity(1);
    Alert.alert('Added to Cart', `${selectedProduct.name} has been added to your cart`);
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to cart before checkout');
      return;
    }
    setShowCartModal(false);
    setShowCheckoutModal(true);
  };

  const processOrder = () => {
    const newOrder = {
      id: `ORD${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: 'processing',
      total: getCartTotal(),
      items: cart.map(item => ({
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      })),
      trackingNumber: null
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setShowCheckoutModal(false);
    
    Alert.alert(
      'Order Placed Successfully!',
      `Your order ${newOrder.id} has been placed. You will receive a confirmation email shortly.`,
      [{ text: 'OK', onPress: () => setActiveTab('orders') }]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return COLORS.success;
      case 'shipped': return COLORS.primary;
      case 'processing': return COLORS.warning;
      default: return COLORS.textLight;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'shipped': return Truck;
      case 'processing': return Package;
      default: return Package;
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => {
        setSelectedProduct(item);
        setShowProductModal(true);
      }}
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

  const renderCartItem = (item) => (
    <View key={item.id} style={styles.cartItem}>
      <Image source={item.image } style={styles.cartItemImage} />
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemDetails}>Size: {item.size}</Text>
        <Text style={styles.cartItemPrice}>₹{item.price}</Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateCartQuantity(item.id, item.quantity - 1)}
        >
          <Minus size={16} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateCartQuantity(item.id, item.quantity + 1)}
        >
          <Plus size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOrderItem = (order) => {
    const StatusIcon = getStatusIcon(order.status);
    
    return (
      <View key={order.id} style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
            <StatusIcon size={12} color={COLORS.white} />
            <Text style={styles.statusText}>{order.status.toUpperCase()}</Text>
          </View>
        </View>
        
        <Text style={styles.orderDate}>{order.date}</Text>
        
        <View style={styles.orderItems}>
          {order.items.map((item, index) => (
            <Text key={index} style={styles.orderItemText}>
              {item.quantity}x {item.name} ({item.size})
            </Text>
          ))}
        </View>
        
        <View style={styles.orderFooter}>
          <Text style={styles.orderTotal}>Total: ₹{order.total.toFixed(2)}</Text>
          {order.trackingNumber && (
            <Text style={styles.trackingNumber}>Tracking: {order.trackingNumber}</Text>
          )}
        </View>
      </View>
    );
  };

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

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'shop' && styles.activeTab]}
          onPress={() => setActiveTab('shop')}
        >
          <Text style={[styles.tabText, activeTab === 'shop' && styles.activeTabText]}>Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'orders' && styles.activeTab]}
          onPress={() => setActiveTab('orders')}
        >
          <Text style={[styles.tabText, activeTab === 'orders' && styles.activeTabText]}>My Orders</Text>
        </TouchableOpacity>
      </View>

      {/* Shop Tab Content */}
      {activeTab === 'shop' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Search and Filter */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color={COLORS.textLight} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={COLORS.textLight}
              />
            </View>
          </View>

          {/* Category Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
            contentContainerStyle={styles.categoryContent}
          >
            {['all', 'jersey', 'shorts'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.activeCategoryButton
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.activeCategoryButtonText
                ]}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Products Grid */}
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            contentContainerStyle={styles.productsContainer}
            scrollEnabled={false}
          />
        </ScrollView>
      )}

      {/* Orders Tab Content */}
      {activeTab === 'orders' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.ordersContainer}>
            <Text style={styles.sectionTitle}>Order History</Text>
            {orders.map(renderOrderItem)}
          </View>
        </ScrollView>
      )}

      {/* Product Detail Modal */}
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
                <Image source={ selectedProduct.image } style={styles.modalProductImage} />
                
                <View style={styles.modalProductInfo}>
                  <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
                  <Text style={styles.modalProductDescription}>{selectedProduct.description}</Text>
                  
                  <View style={styles.modalPriceContainer}>
                    <Text style={styles.modalPrice}>${selectedProduct.price}</Text>
                    {selectedProduct.originalPrice > selectedProduct.price && (
                      <Text style={styles.modalOriginalPrice}>${selectedProduct.originalPrice}</Text>
                    )}
                  </View>

                  {/* Size Selection */}
                  <Text style={styles.selectionTitle}>Size</Text>
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

                  {/* Color Selection */}
                  {/*<Text style={styles.selectionTitle}>Color</Text>
                  <View style={styles.selectionContainer}>
                    {selectedProduct.colors.map((color) => (
                      <TouchableOpacity
                        key={color}
                        style={[
                          styles.selectionButton,
                          selectedColor === color && styles.selectedButton
                        ]}
                        onPress={() => setSelectedColor(color)}
                      >
                        <Text style={[
                          styles.selectionButtonText,
                          selectedColor === color && styles.selectedButtonText
                        ]}>
                          {color}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>*/}

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

                  <TouchableOpacity 
                    style={[styles.addToCartButton, !selectedProduct.inStock && styles.disabledButton]}
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
          <View style={styles.cartModal}>
            <View style={styles.cartHeader}>
              <Text style={styles.cartTitle}>Shopping Cart</Text>
              <TouchableOpacity onPress={() => setShowCartModal(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.cartContent}>
              {cart.length === 0 ? (
                <View style={styles.emptyCart}>
                  <ShoppingCart size={48} color={COLORS.textLight} />
                  <Text style={styles.emptyCartText}>Your cart is empty</Text>
                </View>
              ) : (
                cart.map(renderCartItem)
              )}
            </ScrollView>
            
            {cart.length > 0 && (
              <View style={styles.cartFooter}>
                <View style={styles.cartTotal}>
                  <Text style={styles.cartTotalText}>Total: ${getCartTotal().toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                  <CreditCard size={20} color={COLORS.white} />
                  <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Checkout Modal */}
      <Modal
        visible={showCheckoutModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCheckoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.checkoutModal}>
            <View style={styles.checkoutHeader}>
              <Text style={styles.checkoutTitle}>Checkout</Text>
              <TouchableOpacity onPress={() => setShowCheckoutModal(false)}>
                <X size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.checkoutContent}>
              <Text style={styles.checkoutSectionTitle}>Order Summary</Text>
              {cart.map((item) => (
                <View key={item.id} style={styles.checkoutItem}>
                  <Text style={styles.checkoutItemName}>{item.name}</Text>
                  <Text style={styles.checkoutItemDetails}>
                    {item.size} | Qty: {item.quantity}
                  </Text>
                  <Text style={styles.checkoutItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              ))}
              
              <View style={styles.checkoutTotal}>
                <Text style={styles.checkoutTotalText}>Total: ${getCartTotal().toFixed(2)}</Text>
              </View>
              
              <Text style={styles.checkoutNote}>
                This is a demo checkout. In a real app, you would integrate with a payment processor.
              </Text>
            </ScrollView>
            
            <TouchableOpacity style={styles.placeOrderButton} onPress={processOrder}>
              <CheckCircle size={20} color={COLORS.white} />
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};