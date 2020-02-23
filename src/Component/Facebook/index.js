import React, { useState } from 'react'
import FacebookLogin from 'react-facebook-login'
import { state } from '@Component/Facebook/state'

export function Facebook () {
  const [face, setFace] = useState(state)

  const responseFacebook = response => {
    console.log(response)
    setFace({
      auth: true,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    })
  }

  const onClicked = () => {
    console.log('Clicked')
  }

  let facebookData

  const fbData = face.auth ? facebookData = (
    <div>
      <img src={face.picture} alt={face.name} />
      <h2>Welcome {face.name}</h2>
    </div>
  ) : facebookData = (
    <FacebookLogin
    appId='327682968187754'
    autoLoad={true}
    fields='name,email,picture'
    onClick={onClicked}
    callback={responseFacebook} />
  )

  return (
    <div className='container'>
      {fbData}
    </div>
  )
}
