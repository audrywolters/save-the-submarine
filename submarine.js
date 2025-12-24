let ocean1 = [
  ['~','~','~','~','~',],
  ['ˑ','ˑ','ˑ','ˑ','ˑ',],
  ['ˑ','(','O',')','ˑ',], // <- submarine at safe depth
  ['ˑ','ˑ','ˑ','ˑ','ˑ',],
  ['ˑ','ˑ','ˑ','ˑ','ˑ',],
]

let ocean2 = [
  ['~','(','O',')','~',], // <- submarine on surface
  ['ˑ','ˑ','ˑ','ˑ','ˑ',],
]

let ocean3 = [
  ['~','~','~','~','~',],
  ['ˑ','(','O',')','ˑ',], // <- submarine at safe depth
  ['ˑ','ˑ','ˑ','ˑ','ˑ',],
]

let ocean4 = [
  ['~','~','~','~','~',],
  ['ˑ','ˑ','ˑ','ˑ','ˑ',],
  ['ˑ','ˑ','ˑ','ˑ','ˑ',],
  ['ˑ','ˑ','ˑ','ˑ','ˑ',],
  ['ˑ','(','O',')','ˑ',], // <- submarine at unsafe depth
]

let ocean5 = [
  ['~','~','~','~','~',],
  ['(','O','ˑ','ˑ',')',], // <- destroyed submarine
  ['ˑ','ˑ','ˑ','ˑ','ˑ',],
  ['ˑ','ˑ','ˑ','ˑ','ˑ',],
]


const setSubmarieStatus = (ocean) => {

	let subDepth = 0; // the depth of the sub in the ocean (inner array position)
	let subDestoryed = false; // submarine is has other things than Os in between the paranethes	
	let subSize = 0; // the length of the parenes and chars in between - used to calculate if it is too deep
	let subStartRow = 0; // holds the inner array number of where sub begins, used to see if sub is intact or destroyed
	let subStartCol = 0; // holds the inner array number of where sub begins, used to get size of sub and see if sub is intact or destroyed
	let subEndCol = 0; // holds the inner array number of where sub begins, used to get size of sub and see if sub is intact or destroyed


	// go through the entire ocean to find the submarine
	for (let i=0; i < ocean.length; i++) {	
		for (let j=0; j < ocean[i].length; j++) {

			if (ocean[i][j] === "(") {
				// we have found the start of the submarine
				// save its depth in the ocean
				subDepth = i;
				// keep track of its size and position
				subStartRow = i;
				subStartCol = j;
			} 

			if (ocean[i][j] === ")") {
				// we have found the end of the submarine
				// keep track of its size and position
				subEndCol = j;
			} 
		}
	}

	// get the size of the submarine	
	subSize = subEndCol - subStartCol + 1;

	// check if the submarine is destroyed
	for (let i=subStartCol + 1; i < subEndCol; i++) {
		if (ocean[subStartRow][i] !== 'O') {
			subDestoryed = true;
		}
	}

	// return the submarine status
	if (subDestoryed) {
		// the submarine is destroyed
		return "Emergency assistance to victims";
	} else if (subDepth === 0) {
		// intact submarine on the surface
		return "Look for a submarine on the surface";
	} else if (subSize < subDepth) {
		// the submarine is too deep for its size
		return `Emergency search for a possibly damaged submarine at ${subDepth} depth`;
	} else {
		// the submarine is intact and at a safe depth
		return `Start searching for a submarine at ${subDepth} depth`;
	}
}

setSubmarieStatus(ocean3);