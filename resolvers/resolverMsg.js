// This file takes care of message resolvers

const MessageCollection = []

function getMessage(){
    return MessageCollection[MessageCollection.length - 1] ?? null
}

function setMessage({message}){
    try{
        MessageCollection.push(message)
        return true
    } catch (exception) {
        console.log(exception.message())
        return false
    }    
}

function delMessage(){
    return MessageCollection.pop()
}

module.exports = {
    getMessage ,
    setMessage ,
    delMessage ,
}