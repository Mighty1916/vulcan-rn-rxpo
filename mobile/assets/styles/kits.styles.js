import { COLORS } from "../../constants/colors";
import { StyleSheet, } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingBottom: 60
    },
    // Header Styles
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.text,
      marginLeft: 12,
    },
    cartButton: {
      position: 'relative',
      padding: 8,
    },
    cartBadge: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartBadgeText: {
      color: COLORS.white,
      fontSize: 12,
      fontWeight: 'bold',
    },
    
    // Tab Styles
    tabContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: COLORS.primary,
    },
    tabText: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.textLight,
    },
    activeTabText: {
      color: COLORS.primary,
    },
    
    // Content Styles
    content: {
      flex: 1,
    },
    
    // Search Styles
    searchContainer: {
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.card,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: COLORS.text,
      marginLeft: 12,
    },
    
    // Category Styles
    categoryContainer: {
      marginBottom: 20,
    },
    categoryContent: {
      paddingHorizontal: 20,
    },
    categoryButton: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: COLORS.card,
      marginRight: 12,
      borderWidth: 1,
      borderColor: COLORS.border,
    },
    activeCategoryButton: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
    },
    categoryButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.text,
    },
    activeCategoryButtonText: {
      color: COLORS.white,
    },
    
    // Product Styles
    productsContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    productRow: {
      justifyContent: 'space-between',
    },
    productCard: {
      backgroundColor: COLORS.card,
      borderRadius: 12,
      padding: 12,
      marginBottom: 16,
      width: '48%',
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      position: 'relative',
    },
    productImage: {
      width: '100%',
      height: 120,
      borderRadius: 8,
      marginBottom: 8,
    },
    outOfStockOverlay: {
      position: 'absolute',
      top: 12,
      left: 12,
      right: 12,
      height: 120,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    outOfStockText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    productInfo: {
      flex: 1,
    },
    productName: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 4,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    rating: {
      fontSize: 12,
      color: COLORS.text,
      marginLeft: 4,
      fontWeight: '600',
    },
    reviews: {
      fontSize: 12,
      color: COLORS.textLight,
      marginLeft: 4,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'nowrap',
      flex: 1,
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.primary,
      flexShrink: 1,
      flexGrow: 0,
      minWidth: 0,
    },
    originalPrice: {
      fontSize: 14,
      color: COLORS.textLight,
      textDecorationLine: 'line-through',
      marginLeft: 8,
      flexShrink: 1,
      flexGrow: 0,
      minWidth: 0,
    },
    
    // Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    productModal: {
      backgroundColor: COLORS.card,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '90%',
      paddingTop: 20,
    },
    closeButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 1,
      backgroundColor: COLORS.background,
      borderRadius: 20,
      padding: 8,
    },
    modalProductImage: {
      width: '100%',
      height: 250,
      marginBottom: 20,
    },
    modalProductInfo: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    modalProductName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 8,
    },
    modalProductDescription: {
      fontSize: 16,
      color: COLORS.textLight,
      lineHeight: 24,
      marginBottom: 16,
    },
    modalPriceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
      flexWrap: 'nowrap',
      flex: 1,
    },
    modalPrice: {
      fontSize: 28,
      fontWeight: 'bold',
      color: COLORS.primary,
      flexShrink: 1,
      flexGrow: 0,
      minWidth: 0,
    },
    modalOriginalPrice: {
      fontSize: 20,
      color: COLORS.textLight,
      textDecorationLine: 'line-through',
      marginLeft: 12,
      flexShrink: 1,
      flexGrow: 0,
      minWidth: 0,
    },
    selectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 12,
      marginTop: 8,
    },
    selectionContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
    },
    selectionButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.border,
      marginRight: 8,
      marginBottom: 8,
    },
    selectedButton: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
    },
    selectionButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.text,
    },
    selectedButtonText: {
      color: COLORS.white,
    },
    selectionInput: {
      width: '100%',
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 10,
      fontSize: 16,
      color: COLORS.text,
      backgroundColor: COLORS.card,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    quantityButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: COLORS.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLORS.border,
    },
    quantityDisplay: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.text,
      marginHorizontal: 20,
    },
    addToCartButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.primary,
      paddingVertical: 16,
      borderRadius: 12,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    disabledButton: {
      backgroundColor: COLORS.textLight,
    },
    addToCartButtonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    
    // Cart Modal Styles
    cartModal: {
      backgroundColor: COLORS.card,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '80%',
      paddingTop: 20,
    },
    cartHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    cartTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.text,
    },
    cartContent: {
      flex: 1,
      paddingHorizontal: 20,
    },
    emptyCart: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyCartText: {
      fontSize: 16,
      color: COLORS.textLight,
      marginTop: 16,
    },
    cartItem: {
      flexDirection: 'row',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    cartItemImage: {
      width: 80,
      height: 60,
      borderRadius: 8,
      marginRight: 12,
    },
    cartItemInfo: {
      flex: 1,
    },
    cartItemName: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 4,
    },
    cartItemDetails: {
      fontSize: 12,
      color: COLORS.textLight,
      marginBottom: 4,
    },
    cartItemPrice: {
      fontSize: 14,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    quantityControls: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.text,
      marginHorizontal: 12,
    },
    removeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: COLORS.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLORS.border,
      marginLeft: 8,
    },
    cartFooter: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: COLORS.border,
    },
    cartTotal: {
      marginBottom: 16,
    },
    cartTotalText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.text,
      textAlign: 'center',
    },
    checkoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.primary,
      paddingVertical: 16,
      borderRadius: 12,
    },
    checkoutButtonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    
    // Checkout Modal Styles
    checkoutModal: {
      backgroundColor: COLORS.card,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '80%',
      paddingTop: 20,
      paddingBottom: 20
    },
    checkoutHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    checkoutTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.text,
    },
    checkoutContent: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    checkoutSectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 16,
    },
    checkoutItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.border,
    },
    checkoutItemName: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.text,
      marginBottom: 4,
    },
    checkoutItemDetails: {
      fontSize: 14,
      color: COLORS.textLight,
      marginBottom: 4,
    },
    checkoutItemPrice: {
      fontSize: 14,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    checkoutTotal: {
      paddingVertical: 16,
      borderTopWidth: 2,
      borderTopColor: COLORS.primary,
      marginTop: 16,
    },
    checkoutTotalText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.text,
      textAlign: 'center',
    },
    checkoutNote: {
      fontSize: 12,
      color: COLORS.textLight,
      textAlign: 'center',
      fontStyle: 'italic',
      marginTop: 16,
    },
    placeOrderButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.success,
      paddingVertical: 16,
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 12,
    },
    placeOrderButtonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    
    // Orders Styles
    ordersContainer: {
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 16,
    },
    orderCard: {
      backgroundColor: COLORS.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    orderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    orderId: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.text,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      color: COLORS.white,
      fontSize: 10,
      fontWeight: 'bold',
      marginLeft: 4,
    },
    orderDate: {
      fontSize: 14,
      color: COLORS.textLight,
      marginBottom: 12,
    },
    orderItems: {
      marginBottom: 12,
    },
    orderItemText: {
      fontSize: 14,
      color: COLORS.text,
      marginBottom: 2,
    },
    orderFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    orderTotal: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    trackingNumber: {
      fontSize: 12,
      color: COLORS.textLight,
    },
  });