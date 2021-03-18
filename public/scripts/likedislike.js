window.onload = function () {
    const likeBtn = document.getElementById('likeBtn')
    const dislikeBtn = document.getElementById('dislikeBtn')

    likeBtn.addEventListener('click', function (e) {

        let postId = likeBtn.dataset.post
        reqLikeDsilike('likes', postId)
            .then(res => res.json())
            .then(data => {
                let likeText = data.liked ? 'Liked' : 'Like'
                likeText = likeText + ` ${data.totalLikes}`

                // let dislikeText = data.disliked ? 'Disliked' : 'Dislike'
                let dislikeText = `Dislike  ${data.totalDislikes} `

                likeBtn.innerHTML = likeText
                dislikeBtn.innerHTML = dislikeText
            })
            .catch(e => {
                console.log(e);
                alert(e.response.data.error)
            })
    })

    dislikeBtn.addEventListener('click', function (e) {

        let postId = likeBtn.dataset.post

        reqLikeDsilike('dislikes', postId)
            .then(res => res.json())
            .then(data => {
                let dislikeText = data.disliked ? 'Disliked' : 'Dislike'
                dislikeText = dislikeText + ` ${data.totalDislikes}`

                // let dislikeText = data.disliked ? 'Disliked' : 'Dislike'
                let likeText = `Like  ${data.totalLikes} `

                dislikeBtn.innerHTML = dislikeText

                likeBtn.innerHTML = likeText
                
            })
            .catch(e => {
                console.log(e);
                alert(e.response.data.error)
            })
    })
    

    function reqLikeDsilike(type, postId) {
        let headers = new Headers()
        headers.append('Accept', 'Application/JSON')
        headers.append('Content-Type', 'Application/JSON')

        let req = new Request(`/api/${type}/${postId}`, {
            method: 'GET',
            headers,
            mode: 'cors'
        })

        return fetch(req)


    }
}