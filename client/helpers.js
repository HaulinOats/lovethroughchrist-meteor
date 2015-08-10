var accountFields = {
	gender: {
		propertyName: 'gender',
		displayName: 'Gender',
		options: ['Male', 'Female']
	},
	denomination: {
		propertyName: 'denomination',
		displayName: 'Denomination',
		options: ['Non-Denominational', 'Adventist', 'Baptist', 'Catholic', 'Lutheran', 'Methodist', 'Protestant', 'Pentacostal', 'Jehovah Witness', 'Jewish', 'Other']
	},
	churchAttendance: {
		propertyName: 'churchAttendance',
		displayName: 'Church Attendance',
		options: ['Never', 'Occasionally', 'Monthly', 'Weekly', 'Daily']
	},
	bodyType: {
		propertyName: 'bodyType',
		displayName: 'Body Type',
		options: ['N/A', 'Skinny', 'Athletic', 'Fit', 'Bodybuilder', 'Average', 'Healthy', 'Curvy', 'Large']
	},
	ethnicity: {
		propertyName: 'ethnicity',
		displayName: 'Ethnicity',
		options: ['White', 'Black', 'Hispanic', 'Asian', 'Middle Eastern', 'Indian', 'Islander', 'Native American', 'Other']
	},
	eyeColor: {
		propertyName: 'eyeColor',
		displayName: 'Eye Color',
		options: ['Amber', 'Blue', 'Brown', 'Gray', 'Green', 'Hazel', 'Red-Violet', 'Other']
	},
	hairColor: {
		propertyName: 'hairColor',
		displayName: 'Hair Color',
		options: ['Blonde', 'Dirty Blonde', 'Brown', 'Red', 'Black', 'Gray', 'White', 'Pink', 'Blue', 'Other']
	},
	height: {
		propertyName: 'height',
		displayName: 'Height',
		feet: {
		  propertyName: 'feet',
		  displayName: 'Feet',
		  options: [3, 4, 5, 6, 7, 8]
		},
		inches: {
		  propertyName: 'inches',
		  displayName: 'Inches',
		  options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
		}
	},
	feet: {
	  options: [3, 4, 5, 6, 7, 8]
	},
	inches: {
	  options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
	},
	year: {
		options:[1915,1916,1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997]
	},
	day: {
		options:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
	},
	month: {
		options:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
	},
	language: {
		propertyName: 'language',
		displayName: 'Language',
		options: ['English', 'Mandarin', 'Spanish', 'Hindu','Russian', 'Arabic', 'Bengali', 'Portuguese', 'French', 'German', 'Japanese', 'Chinese', 'Other']
	},
	education: {
		propertyName: 'education',
		displayName: 'Education Level',
		options: ['Diploma/GED', 'Associates', 'Bachelors', 'Masters', 'Higher Education']
	},
	politicalParty: {
		propertyName: 'politicalAffiliation',
		displayName: 'Political Affiliation',
		options: ['Republican', 'Democrat', 'Independent', 'Libertarian', 'Green Party', 'Constitution Party', 'Other']
	},
	hasKids: {
		propertyName: 'kids',
		displayName: 'Kids',
		options:['None', 'Has Kid(s)']
	},
	wantsKids: {
		propertyName: 'wantKids',
		displayName: 'Wants Kids Eventually',
		options: ['No', 'Yes', 'Maybe']
	},
	wantsPets: {
		propertyName: 'wantPets',
		displayName: 'Wants Pets Eventually',
		options: ['No', 'Yes', 'Maybe']
	},
	hasPets: {
		propertyName: 'pets',
		displayName: 'Pets',
		options:['None', 'Has Pet(s)']
	},
	petPreference: {
		propertyName: 'petPreference',
		displayName: 'Pet Preference',
		options: ['Dog', 'Cat', 'Other']
	},
	drinks: {
		propertyName: 'drinks',
		displayName: 'Drinks',
		options: ['Never', 'Rarely', 'Socially', 'Frequently']
	},
	smokes: {
		propertyName: 'smokes',
		displayName: 'Smokes',
		options: ['Never', 'Rarely', 'Socially', 'Frequently']
	},
	searchDistance: {
		propertyName: 'searchDistance',
		displayName: 'Search Distance',
		options: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100, 200]
	}
}

Template.registerHelper("stringOptionMatch", function (userValue, optionValue) {
	if (userValue && optionValue) {
		if (userValue.toLowerCase() === optionValue.toLowerCase())
			return true;
	}
});
Template.registerHelper("numberOptionMatch", function (userValue, optionValue) {
	if (userValue && optionValue) {
		if (parseInt(userValue) === parseInt(optionValue))
			return true;
	}
});
Template.registerHelper("capitalize", function(str){
	if (str)
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
});
Template.registerHelper("lowercase", function(str){
	if (str)
		return str.toLowerCase();
});
Template.registerHelper("getProperties", function (objIdx) {
	var returnArr = []
	for (var i = 0; i < accountFields[objIdx].options.length; i++) {
		returnArr.push({"index":i, "option":accountFields[objIdx].options[i]});
	}
	return returnArr;
});
Template.registerHelper("calculateAge", function (birthdateObj) {
	return Math.floor((Date.now() - Date.parse(birthdateObj.month + " " + birthdateObj.day + " " + birthdateObj.year))/31557600000);
});