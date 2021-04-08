const ballInit = document.getElementById('ball_init')
const containerMain = document.getElementById('content_game');
const bubbleAudio = document.getElementById('bubble_audio')

gsap.to(".load", 3, {
    opacity: 1,
    strokeDashoffset: 0,
    repeat: -1, 
    yoyo: true
})


document.addEventListener('DOMContentLoaded', ()=> {
    const tl = gsap.timeline({delay: 3})
    tl
    .to('#loading', 1, {
        opacity: 0,
        onComplete: () => {
            play()
        }
    })
    .fromTo(ballInit, 4, {
        x: -2000,
        y: -1000
    },
    {
        opacity: 1,
        x: 0,
        y: 0
    }, '-=1')
    .to(ballInit, .5, {
        width: 800,
        height: 674,
        opacity: 0,
        borderRadius: "2rem",
        onStart: () => {
            bubbleAudio.play()
            document.getElementById('content_game').classList.remove('hidden')

        },
        onComplete: () => {
            ballInit.classList.add('hidden')
        }
    })
    .to('#particles-js', 2, {
        opacity: 1
    }, "-=.4")

})

function play() {
    soundGame.play()
}