FACEBOOK INFO
https://developers.facebook.com/docs/facebook-login/overview

https://developers.facebook.com/quickstarts/241748709502615/?platform=web

http://passportjs.org/features!!!!!!!


bacis facebook sdk

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '241748709502615',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>