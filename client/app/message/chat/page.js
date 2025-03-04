'use client'
import FriendChat from '@/components/FriendChat'
import FriendList from '@/components/FriendList'
import FriendListHeader from '@/components/FriendListHeader'
import React, { useState } from 'react'

const Chat = () => {

  const [selectedFriend, setSelectedFriend] = useState(null)

  const handleFriendSelected = (friend) => {
    setSelectedFriend(friend)
  }
  console.log(selectedFriend);
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='flex flex-col '>
        <div className='fixed top-0 z-50'>
          <FriendListHeader />
        </div>
        <div className='mt-24 '>
          <FriendList onClickFriend={handleFriendSelected} chattingFriend={selectedFriend}/>
        </div>
      </div>
      <div className='w-[calc(100vw-480px)] fixed top-0 right-0'>
        <FriendChat friend={selectedFriend} />
      </div>
    </div>
  )
}

export default Chat