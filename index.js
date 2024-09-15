import fetch from 'node-fetch';
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */

const fetchColors = async ({ name, hex, compName, compHex }) => {
  // use fetch api to retrieve json entries
  try {
    // set variable "response" equal to the response object returned from fetch
    const response = await fetch(COLORS);
    // if something foes wrong, put up this error message
    if (!response.ok) {
      throw new Error("aiya");
    }
    // set variable "data" equal to the response body in json format
    const data = await response.json();
    
    // create empty variable to set answer equal to
    let result;

    // now use switch statements to fork the function if certain inputs are detected
    switch (true) {
      // follow this path if "name" parameter exists
      case (name != null):
        // make the name parameter case insensitive
        const name_input = name.toLowerCase();
        // filter results by variable "name_input"  
        result = data.filter((color) => color.name.toLowerCase() == name_input)
        console.log(result)
        break;
      // follow this path if "hex" parameter exists
      case (hex != null):
        // filter results by hex parameter  
        result = data.filter((color) => color.hex == hex)
        console.log(result)
        break;
      // follow this path if "compName" parameter exists
      case (compName != null):
        // make the compName parameter case insensitive
        const compName_input = compName.toLowerCase();
        // filter to see if each color's comp array includes the compName parameter in its name element
        result = data.filter((color) => {
          // find the first instance in the comp list that contains compName_input string 
          const find_compName = color.comp.find((color) => color.name.toLowerCase().includes(compName_input))
          // if anything's been found, add this color to the array "specified_compName"
          if (find_compName !== undefined) {
            return true;
          }
        })
        console.log(result)
        break;
      case (compHex != null):
        // filter to see if each color's comp array includes the compHex parameter in its hex element
        result = data.filter((color) => {
          // find the first instance in the comp list that equals compHex parameter
          const find_compHex = color.comp.find((color) => color.hex == compHex)
          // if anything's been found, add this color to the array "specified_compHex"
          if (find_compHex !== undefined) {
            return true;
          }
        })
        console.log(result)
        break;
    }

    // return result
    return result;
  }
  catch (error) {
    console.log(error)
  }
};

//  fetchColors({name: "periwinkle"});
//  fetchColors({hex: "EFDECD"});
//  fetchColors({compName: "Black"})
 fetchColors({compHex: "FFFFFF"})

// Leave this here
//export default fetchColors;
