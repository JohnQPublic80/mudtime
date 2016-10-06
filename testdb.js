function(context, args){
    /*#db.i({user:"johnqpublic", credit:100})
    #db.i({user:"johnqpublic", credit:200})
    #db.i({user:"johnqpublic", credit:300})*/
    
    /*  
        Database Projections:
        #db.f({user:"johnqpublic", credit:{$gt:100}})
    */

    var dbRecord = #db.f({}).array()

    #db.r({})

    return dbRecord
}