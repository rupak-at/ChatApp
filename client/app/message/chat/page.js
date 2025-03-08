'use client'
import FriendChat from '@/components/FriendChat'
import FriendList from '@/components/FriendList'
import FriendListHeader from '@/components/FriendListHeader'
import React, { useState } from 'react'



const Chat = () => {

  const [selectedFriend, setSelectedFriend] = useState(null)
  const [searchFriend, setSearchFriend] = useState('')

  const handleFriendSelected = (friend) => {
    setSelectedFriend(friend)
  }
  console.log(searchFriend);
  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='flex flex-col '>
        <div className='fixed top-0 z-50'>
          <FriendListHeader setSearchFriend={setSearchFriend} headerName='Friends'/>
        </div>
        <div className='mt-[97px] '>
          <FriendList onClickFriend={handleFriendSelected} chattingFriend={selectedFriend} searchFriend={searchFriend}/>
        </div>
      </div>
      <div className='w-[calc(100vw-464px)] fixed top-0 right-0'>
        <FriendChat friend={selectedFriend} />
      </div>
    </div>
  )
}

export default Chat