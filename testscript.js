function(context, args)
{
	var ret = ""
	
	/var script = #s.nuutec.external().split(/\n/)	
	var opts = script[script.length-1].split(/ \|/)
	
	//p is the password
	var p = #s.nuutec.external({entry:opts[1].trim()}).split(/strategy/)[1].split(/ /)[1]
	//l is the "latest" option where the prjects are
	var l = #s.nuutec.external({entry:opts[0].trim()})
	//prj are the projects from where we get user locs
	var prj = ""
	
	//Extract project names
	for(var i=0;i<l.length;i++){
		var ind = 0
		if(l[i].includes("project")){
			ind = l[i].lastIndexOf("project ")
			prj += l[i].substring(ind+8, ind+20).split(/ /)[0]+"\n"
		}
		else if(l[i].includes("-- ")){
			ind = l[i].lastIndexOf("developments on")
			prj += l[i].substring(ind+15, ind+30).split(/ /)[1]+"\n"
		}
		//prj += l[i].match(/ ([0-9]*[a-zA-Z][0-9]*)+ /)
	}
	
	//pr is the project array
	var pr = prj.split(/\n/)
	
	//Get npc locs
	var locs = ""
	for(var i=0;i<pr.length-1;i++){
		locs += #s.nuutec.external({entry:"dir", pass:p, project:pr[i]})
	}
	
	//Clean up output
	var locs = locs.split(",")
	for(var i=0;i<locs.length;i++){
		ret += locs[i]+"\n"
	}
	
	return ret
}