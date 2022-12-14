import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'uuid'
const tweetInput = document.getElementById('tweet-input')
const feed = document.getElementById('feed')


document.addEventListener('click', (e) => {
    e.target.dataset.like ? handleLikeClick(e.target.dataset.like) : 
    e.target.dataset.retweet ? handleClickRetweet(e.target.dataset.retweet) :
    e.target.dataset.reply ? handleReplyClick(e.target.dataset.reply) : 
    e.target.dataset.response ? handleResponseClick(e.target.dataset.response) :
    e.target.dataset.save ? handleSaveClick(e.target.dataset.save) :
    e.target.id === 'tweet-btn' && tweetInput.value !== '' ? handleNewTweetClick() : ''
})

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.find(tweet => tweetId === tweet.uuid)
    
    targetTweetObj.isLiked ? targetTweetObj.likes-- : targetTweetObj.likes++
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    
    renderTweetHtml()
}

function handleClickRetweet(tweetId) {
    const targetTweetObj = tweetsData.find(tweet => tweetId === tweet.uuid)
    
    targetTweetObj.isRetweeted ? targetTweetObj.retweets-- : targetTweetObj.retweets++
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    renderTweetHtml()
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
    document.getElementById(`tweet-response-${replyId}`).classList.toggle('hidden')
}

function handleResponseClick(responseId) {
    const resInput = document.getElementById(`response-${responseId}`)
    const targetTweetObj = tweetsData.find(tweet => responseId === tweet.uuid)
    
    const newResObj = {
                handle: `@YouTheUser`,
                profilePic: `images/scrimbalogo.png`,
                tweetText: resInput.value,
            }
    
    targetTweetObj.replies.unshift(newResObj)
    resInput.value = ''
    renderTweetHtml()
    handleReplyClick(responseId)
}

function handleNewTweetClick() {
    let newTweetObj = new Object
    
    newTweetObj = {
        handle: `@YouTheUser`,
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    }

    tweetsData.unshift(newTweetObj)
    tweetInput.value = ''
    renderTweetHtml()
}

function handleSaveClick(tweetId) {
    const targetTweetObj = tweetsData.find(tweet => tweetId === tweet.uuid)
    const localStorageTweets = localStorage.getItem('saved')

    if (localStorageTweets) {
        let localStorageArr = JSON.parse(localStorage.getItem('saved'))
        localStorageArr.unshift(targetTweetObj)
        localStorage.setItem('saved', JSON.stringify(localStorageArr))
    }
    else {
        localStorage.setItem('saved', JSON.stringify([targetTweetObj]))
    }
}

function getFeedHtml(){
    const dataObj = tweetsData.map(tweet => {
        let tweetObj = {
            handle: tweet.handle,
            profilePic: tweet.profilePic,
            likes: tweet.likes,
            retweets: tweet.retweets,
            tweetText: tweet.tweetText,
            replies: tweet.replies,
            isLiked: tweet.isLiked,
            isRetweeted: tweet.isRetweeted,
            uuid: tweet.uuid
        } 
        return tweetObj
    })
    return dataObj
}

function renderTweetHtml() {
    feed.innerHTML = ''
    
    const feedObj = getFeedHtml()
    
    feedObj.forEach(obj => {
        let { profilePic, handle, likes, retweets, tweetText, replies, isLiked, isRetweeted, uuid 
            } = obj
        
        let likedIconClass = ''
        let retweetIconClass = ''
    
        if (isLiked) {
            likedIconClass = 'liked'
        }
        if (isRetweeted) {
            retweetIconClass = 'retweeted'
        }
        
        let repliesHtml = ''
        
        if (replies.length > 0) {
            replies.forEach(reply => {
                return repliesHtml +=`
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                                <div>
                                    <p class="handle">${reply.handle}</p>
                                    <p class="tweet-text">${reply.tweetText}</p>
                                </div>
                            </div>
                    </div>`
            })
        }

        
        feed.innerHTML += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${handle}</p>
                        <p class="tweet-text">${tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-solid fa-comment-dots" data-reply=${uuid}></i>
                                ${replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likedIconClass}" data-like=${uuid}></i>
                                ${likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet=${uuid}></i>
                                ${retweets}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-plus" data-save=${uuid}></i>
                            </span>
                        </div> 
                        <div class='tweet-response hidden' id='tweet-response-${uuid}'>
                            <img src="images/scrimbalogo.png" class="profile-pic-response">
			                <input type='text' placeholder="Add your response" id='response-${uuid}'>
                            <button class='response-btn' data-response='${uuid}'>Send</button>
                        </div>  
                    </div>            
                </div>
            </div>
            <div class='hidden' id='replies-${uuid}'>
                ${repliesHtml}
            </div>
            `
    })
}


renderTweetHtml()


