import { Button } from 'antd'
import MainLayout from 'components/MainLayout'
import ModalCreateSentence from 'components/organisms/ModalCreateSentence'
import ModalCreateVocabulary from 'components/organisms/ModalCreateVocabulary'
import React, { useState } from 'react'

const English = () => {
  const [isOpenCreateVocabulary, setIsOpenVocabulary] = useState(false)
  const [isOpenCreateSentence, setIsOpenSentence] = useState(false)

  return (
    <MainLayout
      title='Học tiếng anh'
      afterTitle={<>
        <Button size='large' onClick={() => setIsOpenVocabulary(true)}>Thêm từ vựng mới</Button>
        <Button size='large' onClick={() => setIsOpenSentence(true)}>Thêm câu mới</Button>
      </>}
    >
      <div>English</div>


      <ModalCreateVocabulary
        visible={isOpenCreateVocabulary}
        onCancel={() => setIsOpenVocabulary(false)}
        onCreate={() => { }}
      />

      <ModalCreateSentence
        visible={isOpenCreateSentence}
        onCancel={() => setIsOpenSentence(false)}
        onCreate={() => { }}
      />
    </MainLayout>
  )
}


export default English