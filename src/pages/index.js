import React from 'react'
import MainLayout from './MainLayout'
import TestProfile from './TestProfile'
import EmptyPage from './EmptyPage'
import UserProfileComponent from './UserProfile/UserProfile'
import { MapScreen } from '../map'
import { GroupList, CreateGroup, AdminViewGroup } from './Group'

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

const GroupCreateLayout = (props) => {
  return (
    <MainLayout {...props}>
      <CreateGroup {...props} />
    </MainLayout>
  )
}

const GroupListLayout = (props) => {
  return (
    <MainLayout {...props}>
      <GroupList {...props} />
    </MainLayout>
  )
}

const AdminViewLayout = (props) => {
  return(
  <MainLayout {...props}>
    <AdminViewGroup {...props}/>
  </MainLayout>
  )
}

export {
  UserProfile,
  MapScreenLayout,
  GroupListLayout,
  GroupCreateLayout,
  AdminViewGroup
}