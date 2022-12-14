const savedTweetsDisplay = document.getElementById('saved-feed')

document.addEventListener('click', (e) => {
    e.target.dataset.remove ? removeSavedTweet(e.target.dataset.remove) : ''
})

function removeSavedTweet(tweetId) {
    const savedTweetsArray = JSON.parse(localStorage.getItem('saved'))
    const newTweetsArray = savedTweetsArray.filter(tweet => tweet.uuid !== tweetId)
    localStorage.setItem('saved', JSON.stringify(newTweetsArray))
    render()
}

function returnUniqueSavedTweets(tweets) {
    return tweets.filter((tweet, index, self) => {
        return self.findIndex(t => t.uuid === tweet.uuid) === index;
            }).map(ele => {
            return (ele);
    });
}
 
function render() {
    let html = ''
    
    const savedTweetArray = JSON.parse(localStorage.getItem('saved'))
    
    const uniqueArr = returnUniqueSavedTweets(savedTweetArray)
    
    if (uniqueArr.length > 0) {
        uniqueArr.forEach(tweet => {
             html += `<div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-solid fa-comment-dots" data-reply=${tweet.uuid}></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${tweet.likedIconClass}" data-like=${tweet.uuid}></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${tweet.retweetIconClass}" data-retweet=${tweet.uuid}></i>
                                ${tweet.retweets}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-minus" data-remove=${tweet.uuid}></i>
                            </span>
                        </div> 
                        <div class='tweet-response hidden' id='tweet-response-${tweet.uuid}'>
                            <img src="images/scrimbalogo.png" class="profile-pic-response">
			                <input type='text' placeholder="Add your response" id='response-${tweet.uuid}'>
                            <button class='response-btn' data-response='${tweet.uuid}'>Send</button>
                        </div>  
                    </div>            
                </div>
            </div>
            <div class='hidden' id='replies-${tweet.uuid}'>
                ${tweet.repliesHtml}
            </div>
            `
        })
        savedTweetsDisplay.innerHTML = `
            <h1>Saved Tweets</h1>
            ${html}
        `
    } 
    else {
        savedTweetsDisplay.innerHTML = `
            <div class="no-tweets">
                <h1>No Saved Tweets</h1>
                <h3><a href='/index.html'>Find tweets to save</a></h3>
            </div>
        `
    }
}

render()
