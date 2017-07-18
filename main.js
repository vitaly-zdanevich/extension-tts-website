var sellerId = 'A1AGEQIAP2YAIF',  // the same as MerchantID
    billingAgreementId = null,
    orderReferenceId = null;

window.onAmazonLoginReady = () => {
  amazon.Login.setClientId('amzn1.application-oa2-client.02ed9990eb9744b19e58bbdd05117659');
  amazon.Login.setUseCookie(true);
}

/** documentation: https://pay.amazon.com/us/developer/documentation/automatic/201757500
* and https://pay.amazon.com/us/developer/documentation/automatic/201757500
*/
window.onAmazonPaymentsReady = () => {
  buildButton();

  // after auth redirect; https://pay.amazon.com/us/developer/documentation/automatic/201757280
  if (window.location.hash.includes('access_token')) {
    // Edge do not support URLSearchParams, June 2017: http://caniuse.com/#search=URLsearchParams
    let url = new URLSearchParams(window.location.hash.slice(1))  // slice remove `#`
    document.cookie = 'amazon_Login_accessToken=' + url.get('access_token') + ';secure';
  }

  new OffAmazonPayments.Widgets.Wallet({
  // sellerId from https://sellercentral.amazon.com/hz/me/integration/details
    sellerId: sellerId,
    onReady: billingAgreement => billingAgreementId = billingAgreement.getAmazonBillingAgreementId(),

    // about order reference without AddressBook widget: https://pay.amazon.com/us/developer/documentation/lpwa/201953690
    onOrderReferenceCreate: orderReference => {
      console.log('inside onOrderReferenceCreate');
      console.log('orderReference.getAmazonOrderReferenceId():', orderReference.getAmazonOrderReferenceId());
      orderReferenceId = orderReference.getAmazonOrderReferenceId();
    },

    agreementType: 'BillingAgreement',
    design: {designMode: 'responsive'},
    onPaymentSelect: billingAgreement => console.log('inside onPaymentSelect'),  // TODO
    onError: er => console.error(er.getErrorCode(), er.getErrorMessage())
  }).bind('walletWidgetDiv');
}

// TODO replace building of button to the image with link like https://www.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.e09d5b674f464312bc705d36b0bc445f&redirect_uri=http://localhost:8000&response_type=code&scope=profile
function buildButton() {
  let authRequest = null;
  OffAmazonPayments.Button('AmazonButton', sellerId, {
    type:  'LwA',
    size:  'x-large',
    authorization: () =>
      authRequest = amazon.Login.authorize({'scope': 'profile payments:widget', 'popup': false}, 'https://vitaly-zdanevich.github.io/extension-tts-website'),
    onError: error => console.error(error.getErrorCode(), error.getErrorMessage())
  });
}


// vim: set shiftwidth=2 tabstop=2 softtabstop=2 expandtab smarttab:
