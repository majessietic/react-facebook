import React, { useState } from 'react'
import FacebookLogin from 'react-facebook-login'
import { api_id } from '@Component/Facebook/api_id'
import { state } from '@Component/Facebook/state'

export function Facebook () {
  const [fbME, setFbMe] = useState(state)

  const componentClicked = () => {
    console.log('Facebook Button Click')
  }

  const responseFacebook = response => {
    console.log(response)
    setFbMe({
      auth: true,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
      photos: response.photos.data
    })
  }

  let facebookData

  fbME.auth ? facebookData = (
    <div>
      Hello There
    </div>
  ) : facebookData = (
    <FacebookLogin
      appId={api_id}
      autoLoad={true}
      fields="name,email,picture,photos{webp_images}"
      onClick={componentClicked}
      callback={responseFacebook}
    />
  )

  console.log(fbME)

  return (
    <div>
      {facebookData}
    </div>
  )
}