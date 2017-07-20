window.fbAsyncInit = function() {
  FB.init({
    appId            : '191546788049485',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.10'
  });
  FB.AppEvents.logPageView();
  FB.getLoginStatus(r => {
    if (r['status'] === 'connected') {
      // TODO hide login button
      let aboutUser = {
        'userId': r['authResponse']['userID'],
        'accessToken': r['authResponse']['accessToken']
      };
      FB.api('/me?fields=name,email,picture', r => {  // TODO omit Facebook js sdk to fetch()
        let url = new URLSearchParams(window.location.search.slice(1))
        aboutUser['clientId'] = url.get('clientId');

        aboutUser['name'] = r['name'];
        aboutUser['email'] = r['email'];

        // extension will download it - because have the same cookies as a browser
        aboutUser['avatarPrivateUrl'] = r['picture']['data']['url'];
        console.log(aboutUser);
        fetch('https://jmf2a0t2e4.execute-api.eu-west-1.amazonaws.com/extension/auth', {
          'method': 'POST',  // TODO GET will be faster because without OPTIONS
          'body': JSON.stringify(aboutUser)
        }).then(r => r.json()).then(r => console.log(r));
      })
    } else {
      window.location = encodeURI(
        'https://www.facebook.com/dialog/oauth?client_id=191546788049485&redirect_uri=http://localhost:8000/auth.html&response_type=token');
    }
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


// vim: set shiftwidth=2 tabstop=2 softtabstop=2 expandtab smarttab:
