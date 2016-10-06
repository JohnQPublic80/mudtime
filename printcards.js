function(context, args){

    function makeCard(value, suite){
        switch(suite){
            case "s":
                if(value == "10"){
                    return [ [' ____________ '],
                             ['|         '+value+' |'],
                             ['|     _      |'],
                             ['|    / \\     |'],
                             ['|   /   \\    |'],
                             ['|  (_   _)   |'],
                             ['|    /_\\     |'],
                             ['|            |'],
                             ['| '+value+'         |'],
                             [' ------------ '] ]
                }else {
                    return [ [' ____________ '],
                             ['|          '+value+' |'],
                             ['|     _      |'],
                             ['|    / \\     |'],
                             ['|   /   \\    |'],
                             ['|  (_   _)   |'],
                             ['|    /_\\     |'],
                             ['|            |'],
                             ['| '+value+'          |'],
                             [' ------------ '] ]
                }
            case 'd':
                if(value == "10"){
                    return [ ['  ____________ '],
						     [' |         '+value+' |'],
						     [' |            |'],
						     [' |     /\\     |'],
						     [' |    /  \\    |'],
						     [' |    \\  /    |'],
						     [' |     \\/     |'],
						     [' |            |'],
						     [' | '+value+'         |'],
						     ['  ------------ '] ]
                }else{
                    return [ ['  ____________ '],
						     [' |          '+value+' |'],
						     [' |            |'],
						     [' |     /\\     |'],
						     [' |    /  \\    |'],
						     [' |    \\  /    |'],
						     [' |     \\/     |'],
						     [' |            |'],
						     [' | '+value+'          |'],
						     ['  ------------ '] ]
                }
            case 'c':
                if(value == "10"){
                    return [ [' ____________ '],
							 ['|         '+value+' |'],
							 ['|            |'],
							 ['|    ___     |'],
							 ['|   (   )    |'],
							 ['|  (_   _)   |'],
							 ['|    /_\\     |'],
							 ['|            |'],
							 ['| '+value+'         |'],
							 [' ------------ '] ]
                }else{
                    return [ [' ____________ '],
							 ['|          '+value+' |'],
							 ['|            |'],
							 ['|    ___     |'],
							 ['|   (   )    |'],
							 ['|  (_   _)   |'],
							 ['|    /_\\     |'],
							 ['|            |'],
							 ['| '+value+'          |'],
							 [' ------------ '] ]
                }
            case 'h':
                if(value == "10"){
                    return [ [' ____________ '],
							 ['|         '+value+' |'],
							 ['|            |'],
							 ['|    _  _    |'],
							 ['|   | \\/ |   |'],
							 ['|    \\  /    |'],
							 ['|     \\/     |'],
							 ['|            |'],
							 ['| '+value+'         |'],
							 [' ------------ '] ]
                }else{
                    return [ [' ____________ '],
							 ['|          '+value+' |'],
							 ['|            |'],
							 ['|    _  _    |'],
							 ['|   | \\/ |   |'],
							 ['|    \\  /    |'],
							 ['|     \\/     |'],
							 ['|            |'],
							 ['| '+value+'          |'],
							 [' ------------ '] ]
                }
            default: return "No"
        }
    }

    var cardInput = args.cards.split(",")
    var cardIndividual = []
    var cardOutput = []

    for(var i=0;i<cardInput.length;i++){
        cardIndividual = cardInput[i].split(" ")
        cardOutput.push(makeCard(cardIndividual[0], cardIndividual[1]))
    }

	var cardHeight = 10
    var cardDisplay = new Array(cardHeight).fill("")

	for(var j=0;j<=cardHeight-1;j++){
		for(var i=0;i<cardOutput.length;i++){
			if(i == cardOutput.length-1){
				cardDisplay[j] += cardOutput[i][j]+"\n"
			}else{
				cardDisplay[j] += cardOutput[i][j]+" "
			}
		}
	}


    return cardDisplay.join("")
}