function (context, args) {
    var l = #s.scripts.lib()
    var dealercard = []
    var usercard = []
    var drawncards = []
    var dealervalue = 0
    var dealervaluealt = 0
    var uservalue = 0
    var uservaluealt = 0
    var cardvalue = 0
    var balance = 0
    var amount = 0
    var i = 0
    var user = context.caller
    var random = l.rand_int(0,51)
    var addcard = ""
    var hit = args.hit
    var ledger_name = "black_jack";
   
    if (!hasAccount(user)) {
                #db.i({ledger_type: ledger_name, user:user, balance:0, playcount:0, wincount:0, dealer:"", player:"", cardsplayed:""})  
    }
    //else if (#db.f({ledger_type: ledger_name, user:user}).first().dealer != null ){}
       // else  { var dealercard = #db.f({ledger_type: ledger_name, user:user}).first().dealer
       //         var usercard = #db.f({ledger_type: ledger_name, user:user}).first().player
       //         var drawncards = #db.f({ledger_type: ledger_name, user:user}).first().cardsplayed}
 
    function hasAccount(user) {
        return #db.f({user:user}).count() > 0;
    }
    function getBalance(user) {
        return l.to_gc_str(#db.f({ledger_type: ledger_name, user:user}).first().balance);
    }
    function addBalance(user, amount) {
        #db.u({ledger_type: ledger_name, user:user}, {"$inc": { balance: amount }});
    }
    function addPlays(user, plays) {
        #db.u({ledger_type: ledger_name, user:user}, {"$inc": { playcount: plays }});
    }
    function addWins(user, wins) {
        #db.u({ledger_type: ledger_name, user:user}, {"$inc": { wincount: wins }});
    }
    function amountAsNumber(amount) {
        return (typeof amount == 'number') ? amount : l.to_gc_num(amount);
    }
    function getPlays(user) {
        return #db.f({ledger_type: ledger_name, user:user}).first().playcount
    }
    function getWins(user) {
        return #db.f({ledger_type: ledger_name, user:user}).first().wincount
    }

var sa = `1 s`
var s2 = `2 s`
var s3 = `3 s`
var s4 = `4 s`
var s5 = `5 s`
var s6 = `6 s`
var s7 = `7 s`
var s8 = `8 s`
var s9 = `9 s`
var sj = `J s`
var sq = `Q s`
var sk = `K s`

var da = `a d`
var d2 = `2 d`
var d3 = `3 d`
var d4 = `4 d`
var d5 = `5 d`
var d6 = `6 d`
var d7 = `7 d`
var d8 = `8 d`
var d9 = `9 d`
var dj = `J d`
var dq = `Q d`
var dk = `K d`

var ha = `a h`
var h2 = `2 h`
var h3 = `3 h`
var h4 = `4 h`
var h5 = `5 h`
var h6 = `6 h`
var h7 = `7 h`
var h8 = `8 h`
var h9 = `9 h`
var hj = `J h`
var hq = `Q h`
var hk = `K h`

var ca = `a c`
var c2 = `2 c`
var c3 = `3 c`
var c4 = `4 c`
var c5 = `5 c`
var c6 = `6 c`
var c7 = `7 c`
var c8 = `8 c`
var c9 = `9 c`
var cj = `J c`
var cq = `Q c`
var ck = `K c`

var deck = [sa,s2,s3,s4,s5,s6,s7,s8,s9,sj,sq,sk,da,d2,d3,d4,d5,d6,d7,d8,d9,dj,dq,dk,ha,h2,h3,h4,h5,h6,h7,h8,h9,hj,hq,hk,ca,c2,c3,c4,c5,c6,c7,c8,c9,cj,cq,ck]
var pick = deck[l.rand_int(0,51)]
 
function drawDealerCard (){
    while(drawncards.indexOf(pick)>=0){
        pick = deck[l.rand_int(0,51)]}
        if([sa,da,ha,ca].indexOf(pick)>=0){
            cardvalue = 1
        }
        if([s2,d2,h2,c2].indexOf(pick)>=0){
            cardvalue = 2
        }
        if([s3,d3,h3,c3].indexOf(pick)>=0){
            cardvalue = 3
        }
         if([s4,d4,h4,c4].indexOf(pick)>=0){
            cardvalue = 4
        }
         if([s5,d5,h5,c5].indexOf(pick)>=0){
            cardvalue = 5
        }
         if([s6,d6,h6,c6].indexOf(pick)>=0){
            cardvalue = 6
        }
         if([s7,d7,h7,c7].indexOf(pick)>=0){
            cardvalue = 7
        }
         if([s8,d8,h8,c8].indexOf(pick)>=0){
            cardvalue = 8
        }
         if([s9,d9,h9,c9].indexOf(pick)>=0){
            cardvalue = 9
        }
         if([sj,dj,hj,cj,sq,dq,hq,cq,sk,dk,hk,ck].indexOf(pick)>=0){
            cardvalue = 10
        }
        dealervalue = Number(cardvalue) + Number(dealervalue)
        drawncards += pick
        dealercard = dealercard + pick
        if([sa,da,ha,ca].indexOf(pick)>=0 && dealervalue < 11){
            dealervaluealt = Number(dealervalue) + 10
        }
}
function drawUserCard (){
    while(drawncards.indexOf(pick)>=0){
        pick = deck[l.rand_int(0,51)]}
         if([sa,da,ha,ca].indexOf(pick)>=0){
            cardvalue = 1
        }
          if([s2,d2,h2,c2].indexOf(pick)>=0){
            cardvalue = 2
        }
        if([s3,d3,h3,c3].indexOf(pick)>=0){
            cardvalue = 3
        }
         if([s4,d4,h4,c4].indexOf(pick)>=0){
            cardvalue = 4
        }
         if([s5,d5,h5,c5].indexOf(pick)>=0){
            cardvalue = 5
        }
         if([s6,d6,h6,c6].indexOf(pick)>=0){
            cardvalue = 6
        }
         if([s7,d7,h7,c7].indexOf(pick)>=0){
            cardvalue = 7
        }
         if([s8,d8,h8,c8].indexOf(pick)>=0){
            cardvalue = 8
        }
         if([s9,d9,h9,c9].indexOf(pick)>=0){
            cardvalue = 9
        }
         if([sj,dj,hj,cj,sq,dq,hq,cq,sk,dk,hk,ck].indexOf(pick)>=0){
            cardvalue = 10
        }
        uservalue = Number(cardvalue) + Number(uservalue)
        drawncards += pick
        usercard = usercard + pick
          if([sa,da,ha,ca].indexOf(pick)>=0 && uservalue < 11){
            uservaluealt = Number(uservalue) + 10
        }
}
function dealerWins(){
 //addPlays(user, 1)
 return {msg:"Dealer Wins"}
}
function userWins(){
 //addBalance(user, amount), addPlays(user, 1), addWins(user, 1)
 //Call WINNER Banner
 return {msg:"Player Wins"}
}
 
if (drawncards == 0){
    drawDealerCard()
    drawDealerCard()
    drawUserCard()
    drawUserCard()
}
 
if (hit == false){
    if (dealervalue == 21 || dealervaluealt == 21){
        dealerWins()
    }
    if (uservalue == 21 || uservaluealt == 21){
        userWins()
    }
    if (dealervalue < 21 && dealervalue > uservalue){
        dealerWins()
    }
    if (dealervaluealt < 21 && dealervaluealt > uservalue){
        dealerWins()
    }
        userWins()
}
 
 
 
 
if (hit == true){
    drawUserCard()
    if(dealervalue < 17){
        drawDealerCard()
    }
}
else if (dealervalue < 17 || dealervaluealt < 17 && dealervaluealt < 0){
        drawDealerCard()
    }
 
var hitorstand = "          You have a total of " + uservalue + " or " + uservaluealt + " if you have an ace(s).\n      Enter hit:true to draw another card or hit:false to stand."
var dealerhandvisual = "                    Dealer's Hand" + dealercard + dealervalue + "," + dealervaluealt
var userhandvisual =   "                    Player's Hand" + usercard + "\n" + "                 Hand Value - " + uservalue + " or " + uservaluealt
var bothhands = hitorstand + "\n" + "\n" + dealerhandvisual + "\n" + "\n" + userhandvisual
#db.u({ledger_type: ledger_name, user:user, dealer:dealercard, player:usercard, cardsplayed:drawncards, previousgame:2 })
 
 
return bothhands
}//END BLACK JACK