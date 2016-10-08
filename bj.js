function(context, args){
    var player = context.caller
    var lib = #s.scripts.lib()

    //TO-DO: The dealers first card needs to be drawn and hidden.

    if( !(player == "johnqpublic" || player == "junebug" || player == "jdmw") ){
        return "This isn't a place for children."
    }

    var gameObject = #db.f({game:"Black Jack", player:player, gameActive:true}).first()
    if(gameObject != null ){
        var gameDeck = gameObject.gameDeck
        var dealerHand = gameObject.dealerHand
        var playerHand = gameObject.playerHand
    }
    var winState = "playing"

    if(args == null){
        return printHelp()
    }else if(args.action == "hit"){
        if(gameObject == null){
            gameObject = makeGameObject(player, lib, 1000)

            gameDeck = gameObject.gameDeck
            dealerHand = gameObject.dealerHand
            playerHand = gameObject.playerHand

            playerHit(playerHand)
            playerHit(playerHand)
            dealerHand = dealCard(gameDeck, dealerHand)
            //dealerHand = dealCard(gameDeck, dealerHand)

            saveGameState(player, 1000, 0, true, "playing", gameDeck, playerHand, dealerHand, getHandValue(playerHand), getHandValue(dealerHand))
        }else{
            playerHit(playerHand)
            if(getHandValue(playerHand) > 21){
                winState = determineWinner(playerHand, dealerHand)
                saveGameState(player, 1000, 0, false, winState.winner, gameDeck, playerHand, dealerHand, getHandValue(playerHand), getHandValue(dealerHand))
                return "Your hand:\n"+
				       renderCards(playerHand)+
				       "Value: "+getHandValue(playerHand)+"\n\n"+
				       "Dealers hand:\n"+
				       renderCards(dealerHand)+
				       "Value: "+getHandValue(dealerHand)+"\n"+
                       winState.msg
            }else{
                saveGameState(player, 1000, 0, true, "playing", gameDeck, playerHand, dealerHand, getHandValue(playerHand), getHandValue(dealerHand))
            }
        }
    }else if(args.action == "stay"){
        if(gameObject == null) return printHelp()
        if(playerHand.length == 0) return printHelp()

        dealerHand = finishDealerHand(dealerHand)
        winState = determineWinner(playerHand, dealerHand)

        saveGameState(player, 1000, 0, false, winState.winner, gameDeck, playerHand, dealerHand, getHandValue(playerHand), getHandValue(dealerHand))

		return "Your hand:\n"+
				renderCards(playerHand)+
				"Value: "+getHandValue(playerHand)+"\n\n"+
				"Dealers hand:\n"+
				renderCards(dealerHand)+
				"Value: "+getHandValue(dealerHand)+"\n"+
                winState.msg

    }else{
        return printHelp()
    }

    return "Your hand:\n"+
            renderCards(playerHand)+
           "Value: "+getHandValue(playerHand)+"\n\n"+
           "Dealers hand:\n"+
            renderCards(dealerHand)+
           "Value: "+getHandValue(dealerHand)+"\n"

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
            if(value <= 10) value += 11
            else value += 1
        }

        return value
    }

    function determineWinner(playerHand, dealerHand){
        var pushWin = "push"
        var dealerWin = "dealer"
        var playerWin = "player"
        var unknownWin = "unknown"

        var playerScore = 21 - getHandValue(playerHand)
        var dealerScore = 21 - getHandValue(dealerHand)

        if(playerScore < 0 && dealerScore < 0){
            return {msg:"It's a push!", winner:pushWin}
        }else if(playerScore < 0){
            return {msg:"You bust, the dealer wins!", winner:dealerWin}
        }else if(dealerScore < 0){
            return {msg:"The dealer busts, you win!", winner:playerWin}
        }else if(playerScore == 0 && dealerScore == 0){
            return {msg:"It's a push!", winner:pushWin}
        }else if(playerScore == 0){
            return {msg:"Blackjack! You win!", winner:playerWin}
        }else if(dealerScore == 0){
            return {msg:"Dealer has blackjack! Dealer wins!", winner:dealerWin}
        }else{
            if(Math.abs(playerScore) == Math.abs(dealerScore)){
                return {msg:"It's a push!", winner:pushWin}
            }else if(Math.abs(playerScore) < Math.abs(dealerScore)){
                return {msg:"You win!", winner:playerWin}
            }else if(Math.abs(playerScore) > Math.abs(dealerScore)){
                return {msg:"Dealer wins!", winner:dealerWin}
            }else{
                return {msg:"I don't know this ending condition... YOU WIN!", winner:unknownWin}
            }
        }
    }

    function printHelp(){
        return "Welcome to the casino!\n"+
               "Dealers hit until 17. All winning bets pay 2:1.\n"+
               "In order to play BlackJack, you need to action:\"hit\" action:\"stay\"\n"+
               "For example, to start a game: johnqpublic.blackjack{action:\"hit\"}"
    }

    function makeGameObject(player, lib, playerBet){
        var gameDeck = buildDeck()
        gameDeck = shuffleDeck(gameDeck)

        #db.i({game:"Black Jack", player:player, gameStart:lib.get_date(), amountBet:playerBet, 
               amountPaid:0, gameActive:true, winner:"playing", gameDeck:gameDeck, playerHand:[], 
               dealerHand:[], playerValue:0, dealerValue:0})

        return #db.f({game:"Black Jack", player:player, gameActive:true}).first()
    }

    function finishDealerHand(dealerHand){
        var playedThisRound = false
        for(var i=0;i<12;i++){
            playedThisRound = false
            if(getHandValue(dealerHand) < 17){
                dealerHand = dealCard(gameDeck, dealerHand)
                playedThisRound = true
            }
            if(!playedThisRound) break
        }

        return dealerHand
    }

    function playerHit(playerHand){
        playerHand = dealCard(gameDeck, playerHand)
        return playerHand
    }

    function saveGameState(player, amountBet, amountPaid, gameActive, winner, gameDeck, playerHand, dealerHand, playerValue, dealerValue){
        #db.u({game:"Black Jack", player:player, gameActive:true},
              {$set:{amountBet:amountBet, amountPaid:amountPaid, gameActive:gameActive, winner:winner, gameDeck:gameDeck, playerHand:playerHand,
                     dealerHand:dealerHand, playerValue:playerValue, dealerValue:dealerValue}})
    }

    /*function printEndText(playerHand, dealerHand, winState){
        debugOutput("printEndText")
		return "Your hand:\n"+
				renderCards(playerHand)+
				"Value: "+getHandValue(playerHand)+"\n\n"+
				"Dealers hand:\n"+
				renderCards(dealerHand)+
				"Value: "+getHandValue(dealerHand)+"\n"+
                winState
    }*/

    function debugOutput(message){
        #s.chats.tell({to:"johnqpublic", msg:message})
    }
}