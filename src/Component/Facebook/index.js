import React, { useState } from 'react'
import FacebookLogin from 'react-facebook-login'
import { api_id } from '@Component/Facebook/api_id'

export function Facebook () {
  const [fbME, setFbMe] = useState({
    auth: false,
    name: '',
    email: '',
    picture: '',
    photos: ''
  })

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
  const { auth, name, email, picture, photos } = fbME

  auth ? facebookData = (
    <div>
      <div className='sideBar'>
        <div className='profile'>
          <img className='profilePic' src={picture} alt={name} />
          <h2>{name}</h2>
        </div>
      </div>
      <ul className="gallery">
        {photos.map(photo => {
          return <li key={photo.id}>
            <img src={photo.picture} />
          </li>
        })}
      </ul>
    </div>
  ) : facebookData = (
    <FacebookLogin
      appId={api_id}
      autoLoad={true}
      fields="name,email,picture,photos.limit(100){picture}"
      onClick={componentClicked}
      callback={responseFacebook}
    />
  )

  return (
    <div className='content'>
      {facebookData}
    </div>
  )
}
