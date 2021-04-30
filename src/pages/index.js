import React from 'react'
import MainLayout from './MainLayout'
import TestProfile from './TestProfile'
import EmptyPage from './EmptyPage'
import UserProfileComponent from './UserProfile/UserProfile'
import { MapScreen } from '../map'

const UserProfile = (props) => {
  return (
    <>
      <MainLayout {...props}>
        <UserProfileComponent  {...props} />
      </MainLayout>
    </>
  )
}

const MapScreenLayout = (props) => {
  return (
    <MainLayout {...props}>
      <MapScreen {...props} />
    </MainLayout>
  )
}

export {
  MainLayout,
  TestProfile,
  EmptyPage,
  UserProfile,
  MapScreenLayout
}