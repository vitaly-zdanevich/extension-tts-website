var orderReferenceId = null;

// documentation: https://pay.amazon.com/us/developer/documentation/automatic/201757500
window.onAmazonPaymentsReady = () => new OffAmazonPayments.Widgets.Wallet({
// sellerId from https://sellercentral.amazon.com/hz/me/integration/details
  sellerId: 'A1AGEQIAP2YAIF',

  // about order reference without AddressBook widget: https://pay.amazon.com/us/developer/documentation/lpwa/201953690
  onOrderReferenceCreate: orderReference => orderReferenceId = orderReference.getAmazonOrderReferenceId(),

  design: {designMode: 'responsive'},
  onReady: () => console.log(1),
  onError: er => console.error(er.getErrorCode(), er.getErrorMessage())
}).bind('walletWidgetDiv');

// vim: set shiftwidth=2 tabstop=2 softtabstop=2 expandtab smarttab:
