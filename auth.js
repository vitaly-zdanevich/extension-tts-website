window.fbAsyncInit = function() {
  FB.init({
    appId            : '191546788049485',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.10'
  });
  FB.AppEvents.logPageView();
  FB.getLoginStatus(r => {
      let aboutUser = {
        'userID': r['authResponse']['userID'],
        'accessToken': r['authResponse']['accessToken']
      };
      FB.api('/me?fields=name,email,picture', r => {
        let url = new URLSearchParams(window.location.search.slice(1))
        aboutUser['clientId'] = url.get('clientId');

        aboutUser['name'] = r['name'];
        aboutUser['email'] = r['email'];

        // extension will download it - because have the same cookies as a browser
        aboutUser['avatarPrivateUrl'] = r['picture']['data']['url'];
        console.log(aboutUser);
        fetch('https://httpbin.org/post', {
          'method': 'post',
          'body': JSON.stringify(aboutUser)
        }).then(r => r.json()).then(r => console.log(r));
      })
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
