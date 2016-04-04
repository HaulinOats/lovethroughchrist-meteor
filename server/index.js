//Collections
Messages = new Mongo.Collection("messages");
	
//deny user updates from console
Meteor.users.deny({
  update: function() {
    return true;
  }
});

//Facebook SDK
ServiceConfiguration.configurations.update(
  { service: "facebook" },
  {
    $set:{
      // Development
      // appId: "485852571574726",
      // secret: "d52ce297e2f71b55b175d9471eb6e9d4"
      //Production
      appId:"289256867900965",
      secret:"813b5631116afc377fe572435f7776ad"
    }
  }
);

Meteor.publish('allUserMessages', function publishFunction() {
	return Messages.find({$or:[{"from":this.userId},{"to":this.userId}]},{sort:{"updatedAt":-1}});
});
Meteor.publish('singleUserMessage', function publishFunction(messageId) {
	return Messages.find(messageId);
});

Messages.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  doc.updatedAt = Date.now();
});
Messages.before.update(function (userId, doc) {
  doc.updatedAt = Date.now();
});

Meteor.methods({
	//Header
	messagesChecked:function(userId){
		Meteor.users.update(userId, {
			$set:{"profile.newActivity.messsages":0}
		})
	},
	winksChecked:function(userId){
		Meteor.users.update(userId, {
			$set:{"profile.newActivity.winks":0}
		})
	},
	notificationSent:function(userId){
		Meteor.users.update(userId, {
			$set:{"profile.newActivity.type":null}
		})
	},
	unsetFirstLogin:function(userId){
		Meteor.users.update(userId, {
			$unset:{'profile.firstLogin':""}
		})
	},
	//Admin
	seedUsers:function(){
		var first_names = ['Allison','Arthur','Ana','Alex','Arlene','Alberto','Barry','Bertha','Bill','Bonnie','Bret','Beryl','Chantal','Cristobal','Claudette','Charley','Cindy','Chris','Dean','Dolly','Danny','Danielle','Dennis','Debby','Erin','Edouard','Erika','Earl','Emily','Ernesto','Felix','Fay','Fabian','Frances','Franklin','Florence','Gabielle','Gustav','Grace','Gaston','Gert','Gordon','Humberto','Hanna','Henri','Hermine','Harvey','Helene','Iris','Isidore','Isabel','Ivan','Irene','Isaac','Jerry','Josephine','Juan','Jeanne','Jose','Joyce','Karen','Kyle','Kate','Karl','Katrina','Kirk','Lorenzo','Lili','Larry','Lisa','Lee','Leslie','Michelle','Marco','Mindy','Maria','Michael','Noel','Nana','Nicholas','Nicole','Nate','Nadine','Olga','Omar','Odette','Otto','Ophelia','Oscar','Pablo','Paloma','Peter','Paula','Philippe','Patty','Rebekah','Rene','Rose','Richard','Rita','Rafael','Sebastien','Sally','Sam','Shary','Stan','Sandy','Tanya','Teddy','Teresa','Tomas','Tammy','Tony','Van','Vicky','Victor','Virginie','Vince','Valerie','Wendy','Wilfred','Wanda','Walter','Wilma','William','Kumiko','Aki','Miharu','Chiaki','Michiyo','Itoe','Nanaho','Reina','Emi','Yumi','Ayumi','Kaori','Sayuri','Rie','Miyuki','Hitomi','Naoko','Miwa','Etsuko','Akane','Kazuko','Miyako','Youko','Sachiko','Mieko','Toshie','Junko'];
		var last_names  = ['Abbott','Acevedo','Acosta','Adams','Adkins','Aguilar','Aguirre','Albert','Alexander','Alford','Allen','Allison','Alston','Alvarado','Alvarez','Anderson','Andrews','Anthony','Armstrong','Arnold','Ashley','Atkins','Atkinson','Austin','Avery','Avila','Ayala','Ayers','Bailey','Baird','Baker','Baldwin','Ball','Ballard','Banks','Barber','Barker','Barlow','Barnes','Barnett','Barr','Barrera','Barrett','Barron','Barry','Bartlett','Barton','Bass','Bates','Battle','Bauer','Baxter','Beach','Bean','Beard','Beasley','Beck','Becker','Bell','Bender','Benjamin','Bennett','Benson','Bentley','Benton','Berg','Berger','Bernard','Berry','Best','Bird','Bishop','Black','Blackburn','Blackwell','Blair','Blake','Blanchard','Blankenship','Blevins','Bolton','Bond','Bonner','Booker','Boone','Booth','Bowen','Bowers','Bowman','Boyd','Boyer','Boyle','Bradford','Bradley','Bradshaw','Brady','Branch','Bray','Brennan','Brewer','Bridges','Briggs','Bright','Britt','Brock','Brooks','Brown','Browning','Bruce','Bryan','Bryant','Buchanan','Buck','Buckley','Buckner','Bullock','Burch','Burgess','Burke','Burks','Burnett','Burns','Burris','Burt','Burton','Bush','Butler','Byers','Byrd','Cabrera','Cain','Calderon','Caldwell','Calhoun','Callahan','Camacho','Cameron','Campbell','Campos','Cannon','Cantrell','Cantu','Cardenas','Carey','Carlson','Carney','Carpenter','Carr','Carrillo','Carroll','Carson','Carter','Carver','Case','Casey','Cash','Castaneda','Castillo','Castro','Cervantes','Chambers','Chan','Chandler','Chaney','Chang','Chapman','Charles','Chase','Chavez','Chen','Cherry','Christensen','Christian','Church','Clark','Clarke','Clay','Clayton','Clements','Clemons','Cleveland','Cline','Cobb','Cochran','Coffey','Cohen','Cole','Coleman','Collier','Collins','Colon','Combs','Compton','Conley','Conner','Conrad','Contreras','Conway','Cook','Cooke','Cooley','Cooper','Copeland','Cortez','Cote','Cotton','Cox','Craft','Craig','Crane','Crawford','Crosby','Cross','Cruz','Cummings','Cunningham','Curry','Curtis','Dale','Dalton','Daniel','Daniels','Daugherty','Davenport','David','Davidson','Davis','Dawson','Day','Dean','Decker','Dejesus','Delacruz','Delaney','Deleon','Delgado','Dennis','Diaz','Dickerson','Dickson','Dillard','Dillon','Dixon','Dodson','Dominguez','Donaldson','Donovan','Dorsey','Dotson','Douglas','Downs','Doyle','Drake','Dudley','Duffy','Duke','Duncan','Dunlap','Dunn','Duran','Durham','Dyer','Eaton','Edwards','Elliott','Ellis','Ellison','Emerson','England','English','Erickson','Espinoza','Estes','Estrada','Evans','Everett','Ewing','Farley','Farmer','Farrell','Faulkner','Ferguson','Fernandez','Ferrell','Fields','Figueroa','Finch','Finley','Fischer','Fisher','Fitzgerald','Fitzpatrick','Fleming','Fletcher','Flores','Flowers','Floyd','Flynn','Foley','Forbes','Ford','Foreman','Foster','Fowler','Fox','Francis','Franco','Frank','Franklin','Franks','Frazier','Frederick','Freeman','French','Frost','Fry','Frye','Fuentes','Fuller','Fulton','Gaines','Gallagher','Gallegos','Galloway','Gamble','Garcia','Gardner','Garner','Garrett','Garrison','Garza','Gates','Gay','Gentry','George','Gibbs','Gibson','Gilbert','Giles','Gill','Gillespie','Gilliam','Gilmore','Glass','Glenn','Glover','Goff','Golden','Gomez','Gonzales','Gonzalez','Good','Goodman','Goodwin','Gordon','Gould','Graham','Grant','Graves','Gray','Green','Greene','Greer','Gregory','Griffin','Griffith','Grimes','Gross','Guerra','Guerrero','Guthrie','Gutierrez','Guy','Guzman','Hahn','Hale','Haley','Hall','Hamilton','Hammond','Hampton','Hancock','Haney','Hansen','Hanson','Hardin','Harding','Hardy','Harmon','Harper','Harrell','Harrington','Harris','Harrison','Hart','Hartman','Harvey','Hatfield','Hawkins','Hayden','Hayes','Haynes','Hays','Head','Heath','Hebert','Henderson','Hendricks','Hendrix','Henry','Hensley','Henson','Herman','Hernandez','Herrera','Herring','Hess','Hester','Hewitt','Hickman','Hicks','Higgins','Hill','Hines','Hinton','Hobbs','Hodge','Hodges','Hoffman','Hogan','Holcomb','Holden','Holder','Holland','Holloway','Holman','Holmes','Holt','Hood','Hooper','Hoover','Hopkins','Hopper','Horn','Horne','Horton','House','Houston','Howard','Howe','Howell','Hubbard','Huber','Hudson','Huff','Huffman','Hughes','Hull','Humphrey','Hunt','Hunter','Hurley','Hurst','Hutchinson','Hyde','Ingram','Irwin','Jackson','Jacobs','Jacobson','James','Jarvis','Jefferson','Jenkins','Jennings','Jensen','Jimenez','Johns','Johnson','Johnston','Jones','Jordan','Joseph','Joyce','Joyner','Juarez','Justice','Kane','Kaufman','Keith','Keller','Kelley','Kelly','Kemp','Kennedy','Kent','Kerr','Key','Kidd','Kim','King','Kinney','Kirby','Kirk','Kirkland','Klein','Kline','Knapp','Knight','Knowles','Knox','Koch','Kramer','Lamb','Lambert','Lancaster','Landry','Lane','Lang','Langley','Lara','Larsen','Larson','Lawrence','Lawson','Le','Leach','Leblanc','Lee','Leon','Leonard','Lester','Levine','Levy','Lewis','Lindsay','Lindsey','Little','Livingston','Lloyd','Logan','Long','Lopez','Lott','Love','Lowe','Lowery','Lucas','Luna','Lynch','Lynn','Lyons','Macdonald','Macias','Mack','Madden','Maddox','Maldonado','Malone','Mann','Manning','Marks','Marquez','Marsh','Marshall','Martin','Martinez','Mason','Massey','Mathews','Mathis','Matthews','Maxwell','May','Mayer','Maynard','Mayo','Mays','Mcbride','Mccall','Mccarthy','Mccarty','Mcclain','Mcclure','Mcconnell','Mccormick','Mccoy','Mccray','Mccullough','Mcdaniel','Mcdonald','Mcdowell','Mcfadden','Mcfarland','Mcgee','Mcgowan','Mcguire','Mcintosh','Mcintyre','Mckay','Mckee','Mckenzie','Mckinney','Mcknight','Mclaughlin','Mclean','Mcleod','Mcmahon','Mcmillan','Mcneil','Mcpherson','Meadows','Medina','Mejia','Melendez','Melton','Mendez','Mendoza','Mercado','Mercer','Merrill','Merritt','Meyer','Meyers','Michael','Middleton','Miles','Miller','Mills','Miranda','Mitchell','Molina','Monroe','Montgomery','Montoya','Moody','Moon','Mooney','Moore','Morales','Moran','Moreno','Morgan','Morin','Morris','Morrison','Morrow','Morse','Morton','Moses','Mosley','Moss','Mueller','Mullen','Mullins','Munoz','Murphy','Murray','Myers','Nash','Navarro','Neal','Nelson','Newman','Newton','Nguyen','Nichols','Nicholson','Nielsen','Nieves','Nixon','Noble','Noel','Nolan','Norman','Norris','Norton','Nunez','Obrien','Ochoa','Oconnor','Odom','Odonnell','Oliver','Olsen','Olson','Oneal','Oneil','Oneill','Orr','Ortega','Ortiz','Osborn','Osborne','Owen','Owens','Pace','Pacheco','Padilla','Page','Palmer','Park','Parker','Parks','Parrish','Parsons','Pate','Patel','Patrick','Patterson','Patton','Paul','Payne','Pearson','Peck','Pena','Pennington','Perez','Perkins','Perry','Peters','Petersen','Peterson','Petty','Phelps','Phillips','Pickett','Pierce','Pittman','Pitts','Pollard','Poole','Pope','Porter','Potter','Potts','Powell','Powers','Pratt','Preston','Price','Prince','Pruitt','Puckett','Pugh','Quinn','Ramirez','Ramos','Ramsey','Randall','Randolph','Rasmussen','Ratliff','Ray','Raymond','Reed','Reese','Reeves','Reid','Reilly','Reyes','Reynolds','Rhodes','Rice','Rich','Richard','Richards','Richardson','Richmond','Riddle','Riggs','Riley','Rios','Rivas','Rivera','Rivers','Roach','Robbins','Roberson','Roberts','Robertson','Robinson','Robles','Rocha','Rodgers','Rodriguez','Rodriquez','Rogers','Rojas','Rollins','Roman','Romero','Rosa','Rosales','Rosario','Rose','Ross','Roth','Rowe','Rowland','Roy','Ruiz','Rush','Russell','Russo','Rutledge','Ryan','Salas','Salazar','Salinas','Sampson','Sanchez','Sanders','Sandoval','Sanford','Santana','Santiago','Santos','Sargent','Saunders','Savage','Sawyer','Schmidt','Schneider','Schroeder','Schultz','Schwartz','Scott','Sears','Sellers','Serrano','Sexton','Shaffer','Shannon','Sharp','Sharpe','Shaw','Shelton','Shepard','Shepherd','Sheppard','Sherman','Shields','Short','Silva','Simmons','Simon','Simpson','Sims','Singleton','Skinner','Slater','Sloan','Small','Smith','Snider','Snow','Snyder','Solis','Solomon','Sosa','Soto','Sparks','Spears','Spence','Spencer','Stafford','Stanley','Stanton','Stark','Steele','Stein','Stephens','Stephenson','Stevens','Stevenson','Stewart','Stokes','Stone','Stout','Strickland','Strong','Stuart','Suarez','Sullivan','Summers','Sutton','Swanson','Sweeney','Sweet','Sykes','Talley','Tanner','Tate','Taylor','Terrell','Terry','Thomas','Thompson','Thornton','Tillman','Todd','Torres','Townsend','Tran','Travis','Trevino','Trujillo','Tucker','Turner','Tyler','Tyson','Underwood','Valdez','Valencia','Valentine','Valenzuela','Vance','Vang','Vargas','Vasquez','Vaughan','Vaughn','Vazquez','Vega','Velasquez','Velazquez','Velez','Villarreal','Vincent','Vinson','Wade','Wagner','Walker','Wall','Wallace','Waller','Walls','Walsh','Walter','Walters','Walton','Ward','Ware','Warner','Warren','Washington','Waters','Watkins','Watson','Watts','Weaver','Webb','Weber','Webster','Weeks','Weiss','Welch','Wells','West','Wheeler','Whitaker','White','Whitehead','Whitfield','Whitley','Whitney','Wiggins','Wilcox','Wilder','Wiley','Wilkerson','Wilkins','Wilkinson','William','Williams','Williamson','Willis','Wilson','Winters','Wise','Witt','Wolf','Wolfe','Wong','Wood','Woodard','Woods','Woodward','Wooten','Workman','Wright','Wyatt','Wynn','Yang','Yates','York','Young','Zamora','Zimmerman'];
		function randomIntFromInterval(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
		for (var i = 0; i < 50; i++) {
			var firstNameIdx 	 = randomIntFromInterval(0, first_names.length),
				lastNameIdx 	 = randomIntFromInterval(0, last_names.length),
				heightFeet   	 = randomIntFromInterval(3, 7),
				gender 		     = randomIntFromInterval(0, 1),
				heightInches 	 = randomIntFromInterval(0, 11),
				bodyType	 	 = randomIntFromInterval(0, 8),
				churchAttendance = randomIntFromInterval(0, 4),
				drinks 	 	     = randomIntFromInterval(0, 4),
				smokes 	 	     = randomIntFromInterval(0, 4),
				education 	 	 = randomIntFromInterval(0, 4),
				ethnicity 	 	 = randomIntFromInterval(0, 8),
				eyeColor 	 	 = randomIntFromInterval(0, 7),
				hairColor 	 	 = randomIntFromInterval(0, 9),
				hasKids 	 	 = randomIntFromInterval(0, 1),
				wantsKids 	 	 = randomIntFromInterval(0, 2),
				hasPets 	 	 = randomIntFromInterval(0, 1),
				wantsPets 	 	 = randomIntFromInterval(0, 2),
				petPreference 	 = randomIntFromInterval(0, 2),
				politicalParty 	 = randomIntFromInterval(0, 6),
				language 	     = randomIntFromInterval(0, 12),
				ageMin 	 		 = randomIntFromInterval(18,30),
				ageMax 	 		 = randomIntFromInterval(31,45),
				month 			 = randomIntFromInterval(0, 11),
				day 			 = randomIntFromInterval(1, 30),
				year 			 = randomIntFromInterval(1916, 1996),
				married 		 = randomIntFromInterval(0,1),
				pref_churchAttendance = randomIntFromInterval(0, 4),
				pref_denomination 	  = randomIntFromInterval(0, 10),
				pref_drinks 	 	  = randomIntFromInterval(0, 4),
				pref_smokes 	 	  = randomIntFromInterval(0, 4),
				pref_education 	 	  = randomIntFromInterval(0, 4),
				pref_ethnicity 	 	  = randomIntFromInterval(0, 8),
				pref_eyeColor 	 	  = randomIntFromInterval(0, 7),
				pref_hairColor 	 	  = randomIntFromInterval(0, 9),
				pref_hasKids 	 	  = randomIntFromInterval(0, 1),
				pref_wantsKids 	 	  = randomIntFromInterval(0, 1),
				pref_hasPets 	 	  = randomIntFromInterval(0, 1),
				pref_wantsPets 	 	  = randomIntFromInterval(0, 1),
				pref_petPreference 	  = randomIntFromInterval(0, 2),
				pref_politicalParty   = randomIntFromInterval(0, 6),
				pref_language   = randomIntFromInterval(0, 12);

			Meteor.users.insert({
				"profile": {
					"dateCreated":Date.now(),
					"lastOnline":Date.now(),
					"gender":gender,
					"bio":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					"favoriteQuote":'"Here is a quote I like alot" - Some Person',
					"mateTraits":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					"biblePassage":"If I speak with the tongues of men and of angels, but do not have love, I have become a ringing brass gong or a clashing cymbal. And if I have the gift of prophecy and I know all mysteries and all knowledge, and if I have all faith so that I can remove mountains, but do not have love, I am nothing. And if I parcel out all my possessions, and if I hand over my body in order that I will be burned, but do not have love, it benefits me nothing.",
					"city":"Orlando",
					"state":"Florida",
					"latitude":28.6013431,
					"longitude":-81.20092869999999,
					"newActivity":{
						"messages":0,
						"winks":0,
						"type":null
					},
					"images": {
						"all":[],
						"default":null
					},
					"videos":[],
					"name":{
						"first":first_names[firstNameIdx],
						"last":last_names[lastNameIdx]
					},
					"height":{
						"feet":heightFeet,
						"inches":heightInches
					},
					"birthdate":{
						"month":month,
						"day":day,
						"year":year
					},
					"language":language,
					"bodyType":bodyType,
					"churchAttendance":churchAttendance,
					"denomination":0,
					"drinks":0,
					"smokes":0,
					"education":education,
					"ethnicity":ethnicity,
					"eyeColor":eyeColor,
					"hairColor":hairColor,
					"hasKids":hasKids,
					"hasPets":hasPets,
					"petPreference":petPreference,
					"politicalParty":politicalParty,
					"beenMarried":married,
					"searchable":true,
					"testimonials":[],
					"report":{
						"to":[],
						"from":[]
					},
					"winks":{
						"to":[],
						"from":[]
					},
					"preferences": {
						"gender":[0, 1],
						"searchDistance":100,
						"age": {
							"min":ageMin,
							"max":ageMax
						},
						"education":pref_education,
						"churchAttendance":pref_churchAttendance,
						"denomination":[0,1,2,3,4,5,6,7,8,9,10],
						"smokes":pref_smokes,
						"drinks":pref_drinks,
						"ethnicity":pref_ethnicity,
						"hasKids":pref_hasKids,
						"hasPets":pref_hasPets,
						"language":[0,1,2,3,4,5,6,7,8,9,10,11,12],
						"petPreference":pref_petPreference,
						"politicalParty":[0,1,2,3,4,5,6],
						"wantsKids":pref_wantsKids,
						"wantsPets":pref_wantsPets,
						"beenMarried":1
					}
				}
			})
		}
		return Meteor.users.find().fetch();
	},
	seedMessages:function(userId, userName){
		var users = Meteor.users.find().fetch();
		for (var i = 0; i < 10; i++){
			Messages.insert({
				"to": userId,
				"from":users[i]._id,
				"messages":[
				{
					"fromUserId":users[i]._id,
					"body":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
				},
				{
					"fromUserId":userId,
					"body":"Here's the first reply message."
				},
				{
					"fromUserId":users[i]._id,
					"body":"Here's the second reply message."
				},
				{
					"fromUserId":userId,
					"body":"Here's the third reply message."
				},
				{
					"fromUserId":userId,
					"body":"Here's the fourth reply message from same user."
				},
				{
					"fromUserId":users[i]._id,
					"body":"Here's the fifth reply message from other user."
				}]
			});
		}
		Meteor.users.update(userId, {
			$set:{'profile.newActivity.type':"message"}
		})
	},

	//Login
	setLastOnline:function(userId){
		var user = Meteor.users.find(userId).fetch()[0];
			// age = Math.floor((Date.now() - Date.parse((user.profile.birthdate.month + 1) + " " + user.profile.birthdate.day + " " + user.profile.birthdate.year))/31557600000);
		
		Meteor.users.update(userId, {
			$set: {"profile.lastOnline":Date.now()}
		});
	},
	addUserFields:function(userId, fbData){
		var user = Meteor.users.find(userId).fetch()[0],
			gender = 0,
			prefGender = 1;

		//set preference gender
		if (user.profile.gender === 1)
			prefGender = 0;

		//set user gender
		if (fbData.gender === "female")
			gender = 1;

		Meteor.users.update(userId, {
			$set: { 
				"profile": {
					"firstLogin":true,
					"bio":"",
					"favoriteQuote":"",
					"biblePassage":"",
					"mateTraits":"",
					"dateCreated":Date.now(),
					"lastOnline":Date.now(),
					"email":fbData.email,
					"gender":gender,
					"fbId":fbData.id,
					"newActivity":{
						"messages":0,
						"winks":0,
						"type":null
					},
					"images": {
						"all":[],
						"default":null
					},
					"videos":[],
					"name":{
						"first":fbData.first_name,
						"last":fbData.last_name
					},
					"height":{
						"feet":5,
						"inches":0
					},
					"birthdate":{
						"month":0,
						"day":1,
						"year":1920
					},
					"language":0,
					"bodyType":0,
					"churchAttendance":0,
					"denomination":0,
					"drinks":0,
					"smokes":0,
					"education":0,
					"ethnicity":0,
					"eyeColor":0,
					"hairColor":0,
					"hasKids":0,
					"hasPets":0,
					"petPreference":0,
					"politicalParty":0,
					"beenMarried":0,
					"searchable":false,
					"testimonials":[],
					"report":{
						"to":[],
						"from":[]
					},
					"winks":{
						"to":[],
						"from":[]
					},
					"preferences": {
						"gender":[prefGender],
						"searchDistance":100,
						"age": {
							"min":18,
							"max":99
						},
						"education":0,
						"churchAttendance":0,
						"denomination":[0,1,2,3,4,5,6,7,8,9,10],
						"smokes":2,
						"drinks":2,
						"ethnicity":[0,1,2,3,4,5,6,7,8],
						"hasKids":1,
						"language":[0,1,2,3,4,5,6,7,8,9,10,11,12],
						"petPreference":0,
						"hasPets":1,
						"politicalParty":[0,1,2,3,4,5,6],
						"wantsKids":1,
						"wantsPets":1,
						"beenMarried":1
					}
				}
			}
		})
	},

	//Account Page
	setZipcode:function(userId, zipcode){
		var geo = new GeoCoder();
		var result = geo.geocode(zipcode);
		Meteor.users.update(userId, {
			$set:{
				'profile.zipcode':zipcode,
				'profile.city':result[0].city,
				'profile.state':result[0].state,
				'profile.latitude':result[0].latitude,
				'profile.longitude':result[0].longitude,
				'profile.searchable':true
			}
		});
	},
	setInfoTextField:function(userId, fieldValue, fieldName){
		var user = Meteor.users.find(userId).fetch()[0].profile;
		profile[fieldName] = fieldValue;
		Meteor.users.update(userId, {
			$set:{"profile":profile}
		});
	},
	setAgeMinMax:function(userId, fieldValue, fieldName){
		var profile = Meteor.users.find(userId).fetch()[0].profile;
		profile.preferences.age[fieldName] = parseInt(fieldValue);
		if (fieldName === "min") {
			if (profile.preferences.age.max <= profile.preferences.age.min){
				if (profile.preferences.age.max < 99)
					profile.preferences.age.max = profile.preferences.age.min + 1;
			}

		} else if (fieldName === "max") {
			if (profile.preferences.age.min >= profile.preferences.age.max) {
				if (profile.preferences.age.min > 18)
					profile.preferences.age.min = profile.preferences.age.max - 1;
			}
		}

		Meteor.users.update(userId, {
			$set:{"profile":profile}
		});
	},
	accountInfoChange:function(userId, fieldname, option){
		var user = Meteor.users.find(userId).fetch()[0];
		switch(fieldname){
			case "gender":
				Meteor.users.update(userId, {$set:{"profile.gender":parseInt(option)}})
				break;
			default:
				var profile = user.profile;
				profile[fieldname] = parseInt(option);
				Meteor.users.update(userId, {$set:{"profile":profile}});
				break;
		}
	},
	accountPrefChange:function(userId, fieldname, option){
		switch(fieldname){
			case "gender":
				Meteor.users.update(userId, {$set:{"profile.preferences.gender":option}})
				break;
			default:
				var profile = Meteor.users.find(userId).fetch()[0].profile;
				if (option === "default") {
					delete profile.preferences[fieldname];
					Meteor.users.update(userId, {$set:{"profile":profile}});
				} else {
					profile.preferences[fieldname] = parseInt(option);
					Meteor.users.update(userId, {$set:{"profile":profile}});
				}
				break;
		}
	},
	heightDropdownChange:function(userId, fieldname, option){
		var user = Meteor.users.find(userId).fetch()[0];
		switch(fieldname){
			case "inches":
				Meteor.users.update(userId, {$set:{"profile.height.inches":parseInt(option)}})
				break;
			case "feet":
				Meteor.users.update(userId, {$set:{"profile.height.feet":parseInt(option)}})
				break;
		}
	},
	birthdateDropdownChange:function(userId, fieldname, option){
		var user = Meteor.users.find(userId).fetch()[0];
		switch(fieldname){
			case "year":
				Meteor.users.update(userId, {$set:{"profile.birthdate.year":parseInt(option)}})
				break;
			case "month":
				Meteor.users.update(userId, {$set:{"profile.birthdate.month":parseInt(option)}})
				break;
			case "day":
				Meteor.users.update(userId, {$set:{"profile.birthdate.day":parseInt(option)}})
				break;
		}
	},
	searchableSwitch:function(userId){
		var user = Meteor.users.find(userId).fetch()[0],
			searchable = !user.profile.searchable;

		Meteor.users.update(userId,{
			$set:{"profile.searchable":searchable}
		});
	}, 
	infoTextAreaSave:function(userId, fieldName, fieldValue){
		// console.log(userId, fieldName, fieldValue);
		var profile = Meteor.users.find(userId).fetch()[0].profile;
		profile[fieldName] = fieldValue;
		Meteor.users.update(userId, {
			$set: {"profile":profile}
		});
	},
	addProfileImage:function(userId, imageUrl){
		Meteor.users.update(userId,{
			$addToSet:{ "profile.images.all":imageUrl}
		})
	},
	addVideo:function(userId, videoUrl){
		Meteor.users.update(userId, {
			$addToSet:{"profile.videos":videoUrl}
		})
	},
	removeProfileImage:function(userId, imageUrl){
		Meteor.users.update(userId,{
			$pull:{ "profile.images.all":imageUrl, "profile.images.default":imageUrl}
		})
	},
	removeProfileVideo:function(userId, videoUrl){
		Meteor.users.update(userId,{
			$pull:{ "profile.videos":videoUrl}
		})
	},
	makeDefaultImage:function(userId, imageUrl){
		Meteor.users.update(userId,{
			$set:{ "profile.images.default":imageUrl}
		})
	},
	getUserByFbId:function(fbId){
		return Meteor.users.find({'profile.fbId':fbId}).fetch()[0];
	},
	submitTestimonial:function(fromId, fromName, toId, testimonial){
		var user = Meteor.users.find(toId).fetch()[0].profile,
			testExists = false;

		//check if user already left testimonial, update it if so
		for (var i = 0; i < user.testimonials.length; i++) {
			if (user.testimonials[i].from === fromId){
				testExists = true;
				user.testimonials[i].body = testimonial;
				user.testimonials[i].approved = false;
			}
		}

		switch (testExists){
			case true:
				Meteor.users.update(toId, {
					$set:{'profile.testimonials':user.testimonials}
				})
				break;
			case false:
				Meteor.users.update(toId, {
					$push:{'profile.testimonials':{
						'from':fromId,
						'name':fromName,
						'body':testimonial,
						'approved':false
					}}
				})
				break;
		}
	},
	testimonialApproval:function(userId, choice, testIdx){
		var profile = Meteor.users.find(userId).fetch()[0].profile;
		switch(choice){
			case "yes":
				profile.testimonials[testIdx].approved = true;
				break;
			case "no":
				profile.testimonials.splice(testIdx, 1);
				break;
		}
		Meteor.users.update(userId, {
			$set:{'profile.testimonials':profile.testimonials}
		});
	},

	//Preference Search Page
	prefGenderCheckbox:function(userId, optionindex, isChecked){
		if (isChecked)
			Meteor.users.update(userId, {$addToSet: {"profile.preferences.gender":parseInt(optionindex)}});
		else
			Meteor.users.update(userId, {$pull: {"profile.preferences.gender":parseInt(optionindex)}});
	},
	prefEthnicityCheckbox:function(userId, optionindex, isChecked){
		if (isChecked)
			Meteor.users.update(userId, {$addToSet: {"profile.preferences.ethnicity":parseInt(optionindex)}});
		else
			Meteor.users.update(userId, {$pull: {"profile.preferences.ethnicity":parseInt(optionindex)}});
	},
	prefDenominationCheckbox:function(userId, optionindex, isChecked){
		if (isChecked)
			Meteor.users.update(userId, {$addToSet: {"profile.preferences.denomination":parseInt(optionindex)}});
		else
			Meteor.users.update(userId, {$pull: {"profile.preferences.denomination":parseInt(optionindex)}});
	},
	prefPoliticalPartyCheckbox:function(userId, optionindex, isChecked){
		if (isChecked)
			Meteor.users.update(userId, {$addToSet: {"profile.preferences.politicalParty":parseInt(optionindex)}});
		else
			Meteor.users.update(userId, {$pull: {"profile.preferences.politicalParty":parseInt(optionindex)}});
	},
	prefLanguageCheckbox:function(userId, optionindex, isChecked){
		if (isChecked)
			Meteor.users.update(userId, {$addToSet: {"profile.preferences.language":parseInt(optionindex)}});
		else
			Meteor.users.update(userId, {$pull: {"profile.preferences.language":parseInt(optionindex)}});
	},
	searchInit:function(userId, skip){
		var user = Meteor.users.find(userId).fetch()[0];
			prefObj = {},
			users   = [],
			today   = new Date(),
			year    = today.getFullYear();

		prefObj.ageMin  		 = year - user.profile.preferences.age.min;
		prefObj.ageMax  		 = year - user.profile.preferences.age.max;
		prefObj.gender 		     = user.profile.preferences.gender;
		prefObj.searchDistance   = user.profile.preferences.searchDistance;
		prefObj.education 	     = user.profile.preferences.education;
		prefObj.churchAttendance = user.profile.preferences.churchAttendance;
		prefObj.denomination  	 = user.profile.preferences.denomination;
		prefObj.smokes 			 = user.profile.preferences.smokes;
		prefObj.drinks 			 = user.profile.preferences.drinks;
		prefObj.hasKids 		 = user.profile.preferences.hasKids;
		prefObj.wantsKids 		 = user.profile.preferences.wantsKids;
		prefObj.language 		 = user.profile.preferences.language;
		prefObj.ethnicity 		 = user.profile.preferences.ethnicity;
		prefObj.hasPets 		 = user.profile.preferences.hasPets;
		prefObj.wantsPets 		 = user.profile.preferences.wantsPets;
		prefObj.politicalParty 	 = user.profile.preferences.politicalParty;
		prefObj.beenMarried      = user.profile.preferences.beenMarried;

		//get my latitude and longitude
		if (user.profile.latitude){
			var myLat  = user.profile.latitude,
				myLong = user.profile.longitude,
				foundUsers = Meteor.users.find({
				"_id":{$ne:userId},
				"profile.searchable":true,
				"profile.gender":{$in:prefObj.gender},
				"profile.denomination":{$in:prefObj.denomination},
				"profile.politicalParty":{$in:prefObj.politicalParty},
				"profile.ethnicity":{$in:prefObj.ethnicity},
				"profile.language":{$in:prefObj.language},
				"profile.education":{$gte:prefObj.education},
				"profile.birthdate.year":{$gte:prefObj.ageMax, $lte:prefObj.ageMin},
				"profile.smokes":{$lte:prefObj.smokes},
				"profile.drinks":{$lte:prefObj.drinks},
				"profile.beenMarried":{$lte:prefObj.beenMarried},
				"profile.hasKids":{$lte:prefObj.hasKids},
				"profile.hasPets":{$lte:prefObj.hasPets},
				"profile.preferences.wantsPets":{$lte:prefObj.wantsPets},
				"profile.preferences.wantsKids":{$lte:prefObj.wantsKids},
				"profile.report.from":{$nin:[user._id]}
			},{sort:{"profile.lastOnline":-1}, skip:skip, limit:20}).fetch();

			//loop through found users and return those within specific distance
			for (var i = 0, len = foundUsers.length; i < len; i++) {
				if (foundUsers[i].profile.latitude){
					if (user.profile.preferences.searchDistance >= distance(myLat, myLong, foundUsers[i].profile.latitude, foundUsers[i].profile.longitude)){
						users.push(foundUsers[i]);
					}
				}
			}

			return users;
		}

		function distance(lat1, lon1, lat2, lon2) {
		  var p = 0.017453292519943295;    // Math.PI / 180
		  var c = Math.cos;
		  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
		          c(lat1 * p) * c(lat2 * p) * 
		          (1 - c((lon2 - lon1) * p))/2;

		  return (12742 * Math.asin(Math.sqrt(a))) * 0.621371; // 2 * R; R = 6371 km
		}
	},
	getSearchUser:function(userId){
		return Meteor.users.find(userId).fetch()[0];
	},

	//Profile
	newMessage:function(fromUserId, toUserId, message){
		Messages.insert({
			"to":toUserId,
			"from":fromUserId,
			"messages":[{
				"fromUserId":fromUserId,
				"body":message
			}]
		})
		//alert user of new message
		Meteor.users.update(toUserId, {
			$inc:{'profile.newActivity.messages':1},
			$set:{'profile.newActivity.type':"message"}
		});
	},
	sendWink:function(fromUserId, toUserId){
		Meteor.users.update(fromUserId, {
			$addToSet:{"profile.winks.to":toUserId}
		});
		Meteor.users.update(toUserId, {
			$addToSet:{"profile.winks.from":fromUserId}
		});
		//alert user of new wink
		Meteor.users.update(toUserId, {
			$inc:{'profile.newActivity.winks':1},
			$set:{'profile.newActivity.type':"wink"}
		});
	},
	reportUser:function(fromUserId, toUserId){
		Meteor.users.update(toUserId, {
			$addToSet:{'profile.report.from':fromUserId}
		})
		Meteor.users.update(fromUserId, {
			$addToSet:{'profile.report.to':toUserId}
		})
	},
	favoriteUser:function(userId, favoriteId){
		Meteor.users.update(userId, {
			$addToSet:{"profile.favorites":favoriteId}
		})
	},

	//Messages
	getNameAndImage:function(idArr){
		var userData = [];
		for (var i = 0; i < idArr.length; i++){
			userImage = null;
			var user = Meteor.users.find(idArr[i]).fetch()[0];
			if (!user.profile.images.default){
				if (user.profile.images.all.length)
					userImage = user.profile.images.all[0];
			} else {
				if (user.profile.images.all.length)
					userImage = user.profile.images.all[0];
			}
			userData.push({
				"_id":user._id,
				"first":user.profile.name.first,
				"last":user.profile.name.last,
				"image":userImage
			});
		}
		return userData;
	},
	getSingleMessage:function(id){
		return Messages.find(id).fetch()[0];
	},
	singleMessageReply:function(messageId, fromUser, messageBody, toUserId){
		Messages.update(messageId, {
			$push: {"messages":{"fromUserId":fromUser, "body":messageBody}}
		})
		Meteor.users.update(toUserId, {
			$inc:{"profile.newActivity.messages":1},
			$set:{'profile.newActivity.type':"message"}
		})
	}
	// getAllMessages:function(userId){
	// 	var messages = Messages.find({$or:[{"from":{$eq: userId }},{"to":{ $eq: userId}}]},{sort:{"updatedAt":-1}}).fetch();
	// 	for (var i = 0; i < messages.length; i++){
	// 		if (messages[i].to !== userId){
	// 			messages[i].toName = Meteor.users.find(messages[i].to).fetch()[0].profile.name.first;
	// 		} else if (messages[i].from !== userId) {
	// 			messages[i].fromName = Meteor.users.find(messages[i].from).fetch()[0].profile.name.first;
	// 		}
	// 	}
	// 	return messages;
	// },
	// getSentMessages:function(userId){
	// 	// return Messages.find({"to":userId, "from":userId}).fetch();
	// 	return Messages.find({"from":userId}, {sort:{"createdAt":-1}}).fetch();
	// }
})