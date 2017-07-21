window.onload = () => {

  let urlCurrent = new URLSearchParams(window.location.search.slice(1));

  let urlToSetAmazon = 'https://www.amazon.com/ap/oa?' +
    'client_id=amzn1.application-oa2-client.e09d5b674f464312bc705d36b0bc445f' + // TODO replace to id of the app on prod account
    '&scope=profile' +
    '&response_type=code' +
    '&redirect_uri=https://jmf2a0t2e4.execute-api.eu-west-1.amazonaws.com/extension/auth' + // TODO replace url to our domain

    // random value like 326263189424723457354115822995 - client will use it for first POST with exchanging to user_id
    '&state=' + urlCurrent.get('state');
  document.querySelector('#a-amazon').href = urlToSetAmazon;


  let urlToSetFacebook = 'https://www.facebook.com/dialog/oauth?' +
    'client_id=191546788049485' +  // TODO replace to id of the app on prod account
    '&scope=email' +
    '&response_type=code' +
    '&redirect_uri=https://jmf2a0t2e4.execute-api.eu-west-1.amazonaws.com/extension/auth' +
    '&state=' + urlCurrent.get('state');
    document.querySelector('#a-facebook').href = urlToSetFacebook;
}

// vim: set shiftwidth=2 tabstop=2 softtabstop=2 expandtab smarttab:
