import React from 'react'
import MainLayout from './MainLayout'
import TestProfile from './TestProfile'
import EmptyPage from './EmptyPage'
import UserProfileComponent from './UserProfile/UserProfile'

const UserProfile = (props) => {
  return (
    <>
      <MainLayout {...props}>
        <UserProfileComponent  {...props} />
      </MainLayout>
    </>
  )
}

export {
  MainLayout,
  TestProfile,
  EmptyPage,
  UserProfile
}