/**
 * queries to populate and mongodb collections
 */
function populateFeed(u) {
	if(db.feeds.count({owner:u._id})===0){
		
	var groupMembers = db.groups.find({	$or : [ {creator : u._id}, {members : u._id	} ]	}, {members : 1	}).toArray();
	var reducer = function(acc, curr) {
		var members = acc.members || [];
		return members.concat(curr.members);
	};
	var allMembers = groupMembers.reduce(reducer, {});
	var remove_dupes = function(arr) {
		var seen = {};
		var ret_arr = [];
		for (var i = 0; i < arr.length; i++) {
			if (!(arr[i] in seen)) {
				ret_arr.push(arr[i]);
				seen[arr[i]] = true;
			}
		}
		return ret_arr;
	};
	var following = db.homebases.find({	login : u._id}, {following : 1}).toArray();
	following = following.length ? following[0].following : [];
	var uniqUsers = remove_dupes([ u._id ].concat(allMembers).concat(following));
	var fe = db.feedentries.find({	user : {$in : uniqUsers	}}).toArray();
	var entries=[];
	for(var n in fe) {
		var f = fe[n];
		var user = db.users.find({_id : f.user}, {name : 1}).toArray();
		user = user[0];
		if(!user)continue;
		
		var entry = {
			user : user,
			date : f.date
		};
		
		if (f.comment) {
			var comm = db.comments.find({_id : f.comment}).toArray();
			
			if(comm.length===0)continue;
			comm = comm[0];
			entry._id = comm._id;
			entry.comment = {
				group : comm.group,
				text : comm.text
			};
			entry.likes = comm.likes;
			entry.remarks = comm.remarks;
			entry.isPrivate = comm.isPrivate;
		} else if (f.media) {
			var media = db.media.find({	_id : f.media}).toArray();
			if(media.length===0)continue;
			
			media = media[0];
			entry._id = media._id;
			entry.media = {
					url : media.url,
					name: media.name,
					description: media.description,
					type: media.type,
					image: media.image
			}
			entry.likes = media.likes;
			entry.remarks = media.remarks;
			entry.isPrivate = media.isPrivate;
		} else if (f.reference) {
			var ref = db.references.find({	_id : f.reference}).toArray();
			if(ref.length===0)continue;
			
			ref = ref[0];
			entry._id = ref._id;
			entry.reference = {
					url : ref.url,
					description: ref.description
			};
			entry.likes = ref.likes;
			entry.remarks = ref.remarks;
			entry.isPrivate = ref.isPrivate;
		}
		entries.push(entry);
	}
	print("inserting feed of size: "+entries.length+" for user "+u.name);
		db.feeds.insert({owner:u._id, entries: entries});
	}	
}

function populateFollowing(u) {
    var following = db.homebases.find({login: u._id},{following: 1}).toArray(); 
    following = following.length ? following[0].following : [];
    following = db.users.find({_id:{$in: following}},{name:1}).toArray();
    var followers = db.homebases.find({following: u._id},{login:1}).toArray();
    followers = followers.length?followers.map(function(f){return f.login;}):[];
    followers = db.users.find({_id:{$in: followers}},{name:1}).toArray();
    print("inserting followers for user "+u._id +" : "+u.name);
    db.follows.insert({user:u._id, following: following, followers:followers});
}

