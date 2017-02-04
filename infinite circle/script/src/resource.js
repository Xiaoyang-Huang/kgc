var r = {
    item:{
        one:{ 
            normal:"1 way.png",
            stroke:"1 way stroke.png"
        },
        twoStraight:{
            normal:"2 way straight.png",
            stroke:"2 way straight stroke.png"
        },
        twoBent:{
            normal:"2 way bent.png",
            stroke:"2 way bent stroke.png"
        },
        three:{
            normal:"3 way.png",
            stroke:"3 way stroke.png"
        },
        four:{
            normal:"4 way.png",
            stroke:"4 way stroke.png"
        }
    },
    sounds:{
        start:"game-start.mp3",
        end:"game-end.mp3",
        click:["game-click1.mp3","game-click2.mp3","game-click3.mp3"]
    }
}

var g_resources = [
    r.item.one.normal,
    r.item.one.stroke,
    r.item.twoStraight.normal,
    r.item.twoStraight.stroke,
    r.item.twoBent.normal,
    r.item.twoBent.stroke,
    r.item.three.normal,
    r.item.three.stroke,
    r.item.four.normal,
    r.item.four.stroke,

    r.sounds.start,
    r.sounds.end,
    r.sounds.click[0],
    r.sounds.click[1],
    r.sounds.click[2]
]