import React, { useRef, useEffect } from 'react';
import { Modal } from 'react-native';
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
            name: "Vulcan Club",
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
    <Modal visible={visible} onRequestClose={() => onClose(null)}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        onMessage={event => {
          const data = JSON.parse(event.nativeEvent.data);
          onClose(data);
        }}
      />
    </Modal>
  );
}
