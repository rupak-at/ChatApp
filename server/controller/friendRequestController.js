import mongoose from "mongoose"
import { FriendRequest } from "../model/friendRequestModel.js"
import { IndividualChat } from "../model/singleChatModel.js"

const sendRequest = async(req, res) => {
  try {

    const receiverId = req.params.id

    if (!receiverId) {
      return res.status(400).json({message: 'All Field Are Required'})
    }

    //check for valid mongodb _id 
    if (!mongoose.isValidObjectId(req.userID) || !mongoose.isValidObjectId(receiverId)) {
      return res.status(404).json({message: 'User Not Found'})
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        {sender: req.userID, receiver: receiverId},
        {sender: receiverId, receiver: req.userID}
      ]
    })

    if (existingRequest) {
      return res.status(409).json({message: 'Request Already Sent'})
    }
    
    const newRequest = await FriendRequest.create({
      sender: req.userID,
      receiver: receiverId
    })

    //to socket

    const request = await FriendRequest.find({
      $and: [
        { sender: req.userID },
        { status: 'pending' },
        { receiver: receiverId },
      ],
    }).populate({
      path: "sender",
      select: "-password -refreshToken"
    });

    const formattedData = request.map((f) => {
      return {
        requestId: f._id,
        sender: {
          _id: f.sender._id,
          username: f.sender.username,
          email: f.sender.email,
          isOnline: f.sender.isOnline,
          avatar: f.sender.avatar
        },
        receiver: f.receiver.toString()
      }
    })

    const io = req.app.get('io')
    io.emit('new-friend-request', formattedData)


    return res.status(201).json({message: 'Request Sent Successfully'})
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: 'Internal Failure'})
  }
}

const acceptRequest = async (req, res) => {
  try {

    const requestId = req.params.id

    if (!requestId) {
      return res.status(400).json({message: 'All Field Are Required'})
    }

    const friendRequest = await FriendRequest.findById(requestId)

    if (!friendRequest){
      return res.status(404).json({message: 'Request Not Found'})
    }

    if (friendRequest.receiver.toString() !== req.userID) {
      return res.status(401).json({message: 'Unauthorized Request'})
    }

    friendRequest.status = 'accepted'

    await friendRequest.save()

    const individualChat = await IndividualChat.create({
      participants: [friendRequest.sender, friendRequest.receiver]
    })

    await individualChat.save()

    return res.status(200).json({message: 'Request Accepted Successfully And You Can Now Chat'})
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: 'Internal Failure'})  
  }
}

const rejectRequest = async (req, res) => {
  try {

    const requestId = req.params.id

    if (!mongoose.isValidObjectId(requestId)) {
      return res.status(404).json({message: 'Request Not Found'})
    }

    const friendRequest = await FriendRequest.findById(requestId)

    if (!friendRequest){
      return res.status(404).json({message: 'Request Not Found'})
    }

    await friendRequest.deleteOne()

    return res.status(200).json({message: 'Request Rejected Successfully'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Internal Failure'})
  }
}  

const getAllRequest = async (req, res) => {
  try {
    const request = await FriendRequest.find({
      $and: [
        { receiver: req.userID },
        { status: 'pending' },
      ],
    }).populate({
      path: "sender",
      select: "-password -refreshToken"
    });
    
    const formattedData = request.map((f)=>{
      return {
        requestId: f._id,
        sender: {
          _id: f.sender._id,
          username: f.sender.username,
          email: f.sender.email,
          isOnline: f.sender.isOnline,
          avatar: f.sender.avatar
        }
      }
    })
    
    return res.status(200).json({message: "All Friend Request", request: formattedData})
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: "Internal Server Failure"})
  }
}

export {sendRequest, acceptRequest, rejectRequest, getAllRequest}