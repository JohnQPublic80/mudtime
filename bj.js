function(context, args){
    if(args == null){
        return printHelp()
    }else if(args.action == "hit"){
        var thing = ""
    }else if(args.action == "stay"){
        return determineWinner()
    }else{
        return printHelp()
    }

    /*These arrays are manipulated in the functions below.
      Terrible practice, I know -- but can't do object-oriented stuff
      in hackmud.*/
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

    var winState = determineWinner(playerHand, dealerHand)
    
    return "Your hand:\n"+
            renderCards(playerHand)+
           "Value: "+getHandValue(playerHand)+"\n\n"+
           "Dealers hand:\n"+
            renderCards(dealerHand)+
           "Value: "+getHandValue(dealerHand)+"\n"+
           winState

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
        var numberOfAces = 0

        for(var i=0;i<hand.length;i++){
            if(hand[i].value == "K" || hand[i].value == "Q" || hand[i].value == "J"){
                value += 10
            }else if(hand[i].value == "A"){
                numberOfAces += 1
            }else{
                value += parseInt(hand[i].value)
            }
        }

        for(var i=0;i<numberOfAces;i++){
            if(value <= 11) value += 10
            else value += 1
        }

        return value
    }

    function getGameState(){
        //TO-DO: Retrieve the current state of the game from the database.
    }

    function determineWinner(playerHand, dealerHand){
        var playerScore = 21 - getHandValue(playerHand)
        var dealerScore = 21 - getHandValue(dealerHand)

        if(playerScore < 0 && dealerScore < 0){
            return "It's a push!"
        }else if(playerScore < 0){
            return "You bust, the dealer wins!"
        }else if(dealerScore < 0){
            return "The dealer busts, you win!"
        }else if(playerScore == 0 && dealerScore == 0){
            return "It's a push!"
        }else if(playerScore == 0){
            return "Blackjack! You win!"
        }else if(dealerScore == 0){
            return "Dealer has blackjack! Dealer wins!"
        }else{
            if(Math.abs(playerScore) < Math.abs(dealerScore)){
                return "You win!"
            }else{
                return "Dealer wins!"
            }
        }

    }

    function printHelp(){
        return "Welcome to the casino!\n"+
               "Dealers hit until 17.\n"+
               "In order to play BlackJack, you need to action:\"hit\" action:\"stay\"\n"+
               "For example, to start a game: johnqpublic.blackjack{action:\"hit\"}"
    }

    function playGame(){

    }

    /*
        var caller = context.caller
	    var l = #s.scripts.lib()
    */
}