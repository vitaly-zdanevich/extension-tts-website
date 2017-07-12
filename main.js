var sellerId = 'A1AGEQIAP2YAIF',  // the same as MerchantID
    billingAgreementId = null,
    orderReferenceId = null;

window.onAmazonLoginReady = () => {
  amazon.Login.setClientId('amzn1.application-oa2-client.e09d5b674f464312bc705d36b0bc445f');
}

/** documentation: https://pay.amazon.com/us/developer/documentation/automatic/201757500
* and https://pay.amazon.com/us/developer/documentation/automatic/201757500
*/
window.onAmazonPaymentsReady = () => {
  buildButton();
  new OffAmazonPayments.Widgets.Wallet({
  // sellerId from https://sellercentral.amazon.com/hz/me/integration/details
    sellerId: sellerId,
    onReady: billingAgreement => billingAgreementId =  billingAgreement.getAmazonBillingAgreementId(),

    // about order reference without AddressBook widget: https://pay.amazon.com/us/developer/documentation/lpwa/201953690
    onOrderReferenceCreate: orderReference => {
      console.log('inside onOrderReferenceCreate');
      console.log('orderReference.getAmazonOrderReferenceId():', orderReference.getAmazonOrderReferenceId());
      orderReferenceId = orderReference.getAmazonOrderReferenceId();
    },

    design: {designMode: 'responsive'},
    onPaymentSelect: billingAgreement => console.log('inside onPaymentSelect'),  // TODO
    onError: er => console.error(er.getErrorCode(), er.getErrorMessage())
  }).bind('walletWidgetDiv');
}

// TODO replace building of button to the image with link like https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.e09d5b674f464312bc705d36b0bc445f&redirect_uri=http://localhost:8000&response_type=code&scope=profile:user_id
function buildButton() {
  let authRequest = null;
  OffAmazonPayments.Button('AmazonButton', sellerId, {
    type:  'PwA',
    size:  'x-large',
    authorization: () =>
      authRequest = amazon.Login.authorize({scope: 'profile:user_id', popup: false}, 'http://localhost:8000'),
    onError: error => console.error(error.getErrorCode(), error.getErrorMessage())
  });
}


// vim: set shiftwidth=2 tabstop=2 softtabstop=2 expandtab smarttab:
