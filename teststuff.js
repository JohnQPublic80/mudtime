function(context, args){
    var array = [1, 2, 3]

    function spliceArray(a){
        a.splice(1, 1)
    }
    
    spliceArray(array)

    return array
}