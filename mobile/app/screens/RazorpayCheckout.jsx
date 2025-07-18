import React, { useRef } from 'react';
import { Modal, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function RazorpayCheckout({ visible, onClose, order, userEmail }) {
  const webviewRef = useRef(null);

  if (!order) return null;

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body>
        <script>
          var options = {
            key: "${order.key}", // Pass from backend or use your public key
            amount: "${order.amount}",
            currency: "${order.currency}",
            name: "Vulcan Heat FC",
            description: "Order Payment",
            order_id: "${order.id}",
            prefill: {
              email: "${userEmail}"
            },
            handler: function (response){
              window.ReactNativeWebView.postMessage(JSON.stringify(response));
            }
          };
          var rzp = new Razorpay(options);
          rzp.open();
        </script>
      </body>
    </html>
  `;

  return (
    <Modal visible={visible} onRequestClose={() => onClose(null)} transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.54)' }}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          onMessage={event => {
            const data = JSON.parse(event.nativeEvent.data);
            onClose(data);
          }}
        />
      </View>
    </Modal>
  );
}
