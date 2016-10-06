    //This works putting cards side by side.
    var spade = makeCard('s', "10") 
    var spadeTwo = makeCard('s', "2")
    var spadeThree = makeCard('s', "3")

    for(var i=0;i<spade.length;i++){
        for(var j=0;j<spade[i].length;j++){
            ret += spade[i][j]+" "+spadeTwo[i][j]+" "+spadeThree[i][j]
        }
        ret += "\n"
    }

    //This works putting arbitrary number of cards vertically
    var cards = []
    cards.push(makeCard('s', "2"))
    cards.push(makeCard('s', "3"))

    for(var i=0;i<cards.length;i++){
        for(var j=0;j<cards[i].length;j++){
            for(var k=0;k<cards[i][j].length;k++){
                ret += cards[i][j][k]
            }
            ret += "\n"
        }
    }