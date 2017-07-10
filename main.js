// documentation: https://pay.amazon.com/us/developer/documentation/automatic/201757500
window.onAmazonPaymentsReady = () => new OffAmazonPayments.Widgets.Wallet({
// sellerId from https://sellercentral.amazon.com/hz/me/integration/details
  sellerId: 'A1AGEQIAP2YAIF',
  design: {designMode: 'responsive'},
  onReady: () => console.log(1),
  onError: er => console.error(er)
}).bind('walletWidgetDiv');

// vim: set shiftwidth=2 tabstop=2 softtabstop=2 expandtab smarttab:
