import React from 'react'
import {
  Modal, Spinner
} from '@ui-kitten/components';

const LoadingScreen = ({ waiting }) => {
  return (
    <Modal
      visible={waiting}
      backdropStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      }}
    >
      <Spinner size="giant" />
    </Modal>
  )
}

export default LoadingScreen