import React, { useEffect, useState } from 'react'
import { api_id } from '@Component/FacebookLogin/api_id'

export function FacebookLogin () {
	const [profile, setProfile] = useState({
    auth: false,
    name: '',
    email: '',
    photos: []

  })

	const loginStyle = {
		cursor: 'pointer',
		background: '#0984e3',
		color: 'white',
		display: 'flex',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		height : '3rem',
		width: '5rem',
		borderRadius: '2%'
	}

	useEffect(() => {
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0]
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id
			js.src = "https://connect.facebook.net/en_US/sdk.js"
			fjs.parentNode.insertBefore(js, fjs)
		}(document, 'script', 'facebook-jssdk'))

		window.fbAsyncInit = function() {
			window.FB.init({
				appId      : api_id,
				cookie     : true,
				xfbml      : true,
				version    : 'v6.0'
			})
		}
	})

	const facebookLogin = () => {
		window.FB.login(
			function(response){
				statusChangeCallback(response)
			}, { scope : 'email, public_profile'}
		)
	}

	const statusChangeCallback = response => {
		if (response.status === 'connected') {
			console.log('connected and authenticated')
			fetchDataFacebook()
		} else if ( response.status === 'not authorized') {
			console.log('not authenticated')
		} else {
			console.log('error')
		}
	}

	const fetchDataFacebook = () => {
		console.log('Fetching information')
		window.FB.api('/me?fields=id,name,email,photos', function(user) {
			console.log(user)
      console.log(`Successful Login from facebook: ${user.name}`)
      setProfile({
        auth: true,
        name: user.name,
        photos: user.photos
      })
    })
  }

  return (
		<div>
      <div style={loginStyle} onClick={facebookLogin}>
        Login to Facebook
      </div>
    </div>
	)
}
