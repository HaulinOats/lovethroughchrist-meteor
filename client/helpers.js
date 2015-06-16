Template.registerHelper("checkForMatch", function (value) {

});
Template.registerHelper("getProperties", function () {
	
    return {
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
		politicalAffiliation: {
			propertyName: 'politicalAffiliation',
			displayName: 'Political Affiliation',
			options: ['Republican', 'Democrat', 'Independent', 'Libertarian', 'Green Party', 'Constitution Party', 'Other']
		},
		kids: {
			propertyName: 'kids',
			displayName: 'Kids',
			options:['None', 'Has Kid(s)']
		},
		wantKids: {
			propertyName: 'wantKids',
			displayName: 'Wants Kids Eventually',
			options: ['No', 'Yes', 'Maybe']
		},
		wantPets: {
			propertyName: 'wantPets',
			displayName: 'Wants Pets Eventually',
			options: ['No', 'Yes', 'Maybe']
		},
		pets: {
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
			options: ['Any Distance', '5 Miles', '10 Miles', '15 Miles', '20 Miles', '25 Miles', '30 Miles', '35 Miles', '40 Miles', '45 Miles', '50 Miles', '75 Miles', '100 Miles']
		}
	}
});