function(context, args){
    var output = ""

    var gameDeck = buildDeck()
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
    
    return "Your hand:\n"+
            renderCards(playerHand)+
           "Value: "+getHandValue(playerHand)+"\n\n"+
           "Dealers hand:\n"+
            renderCards(dealerHand)+
           "Value: "+getHandValue(dealerHand)

    function card(s, v){
        return {suite:s, value:v}
    }

    function buildDeck(){
		var deck = []
        var suites = ["h", "s", "d", "c"]
        var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q", "A"]

        for(var i=0;i<suites.length;i++){
            for(var j=0;j<values.length;j++){
                deck.push(card(suites[i], values[j]))
            }
        }

        return deck
    }

    function shuffleDeck(deck){
		var currentIndex = deck.length, temporaryValue, randomIndex
		
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
		
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex -= 1
		
			// And swap it with the current element.
			temporaryValue = deck[currentIndex]
			deck[currentIndex] = deck[randomIndex]
			deck[randomIndex] = temporaryValue
		}
		return deck
    }

    function dealCard(gameDeck, hand){
        var pullCard = Math.floor(Math.random() * gameDeck.length)

        hand.push(gameDeck[pullCard])
        /* It is fucked up, but it works... since JS is pass by 
           reference for arrays. I'm taking the card out here and
           it affects the original array, which is good; but a fucky
           way to do it. I blame having being able to object oriented
           design in hackmud.*/
        gameDeck.splice(pullCard, 1)

        return hand
    }

    function renderCards(hand){
        var renderString = ""

        for(var i=0;i<hand.length;i++){
            if(i == hand.length-1){
                renderString += hand[i].value+" "+hand[i].suite
            }else{
                renderString += hand[i].value+" "+hand[i].suite+","
            }
        }

        return #s.johnqpublic.printcards({cards:renderString})
    }

    function getHandValue(hand){
        var value = 0

        for(var i=0;i<hand.length;i++){
            if(hand[i].value == "K" || hand[i].value == "Q" || hand[i].value == "J"){
                value += 10
            }else if(hand[i].value == "A"){
                if(value >= 11) value += 10
                else value += 1
            }else{
                value += parseInt(hand[i].value)
            }
        }

        return value
    }

    function getGameState(){
        //TO-DO: Retrieve the current state of the game from the database.
    }

    function determineWinner(){
        //TO-DO: Figure out who won the game, the dealer or the player?
    }

    /*
        var caller = context.caller
	    var l = #s.scripts.lib()
    */
}