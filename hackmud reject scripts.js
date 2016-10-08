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

    /*These arrays are manipulated in the functions below.
      Terrible practice, I know -- but can't do object-oriented stuff
      in hackmud.*/
    /*var gameDeck = buildDeck()
    gameDeck = shuffleDeck(gameDeck)
    var dealerHand = []
    var playerHand = []

    var playedThisRound = false

    for(var i=0;i<12;i++){
        playedThisRound = false

        if(getHandValue(playerHand) < 17){
            playerHand = dealCard(gameDeck, playerHand)
            playedThisRound = true
        }
        if(getHandValue(dealerHand) < 17){
            dealerHand = dealCard(gameDeck, dealerHand)
            playedThisRound = true
        }

        if(!playedThisRound) break
    }

    var winState = determineWinner(playerHand, dealerHand)
    
    return "Your hand:\n"+
            renderCards(playerHand)+
           "Value: "+getHandValue(playerHand)+"\n\n"+
           "Dealers hand:\n"+
            renderCards(dealerHand)+
           "Value: "+getHandValue(dealerHand)+"\n"+
           winState*/