
const fs = require('fs');
const path = require('path');

// // Function to extract JSON objects from the file content
// function extractJsonObjects(data) {
//   const jsonObjects = [];
//   let buffer = '';
//   let depth = 0;

//   for (let i = 0; i < data.length; i++) {
//       const char = data[i];
      
//       if (char === '{') {
//           if (depth === 0) {
//               buffer = '';
//           }
//           depth++;
//       }
      
//       if (depth > 0) {
//           buffer += char;
//       }

//       if (char === '}') {
//           depth--;
//           if (depth === 0) {
//               try {
//                   jsonObjects.push(JSON.parse(buffer));
//               } catch (e) {
//                   console.error('Error parsing JSON:', buffer, '\nError:', e);
//               }
//           }
//       }
//   }

//   return jsonObjects;
// }

// // Helper function to handle each JSON object
// function processJsonObject(jsonObject) {
//     // Print the parsed JSON object
//     console.log(jsonObject);
// }

// // Step 1: Read the entire file content
// const filePath = path.join(__dirname, 'data.json');
// fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }

//     // Step 2: Extract JSON objects from the data
//     const jsonObjects = extractJsonObjects(data);
  

//     // Step 3: Process each JSON object
//     jsonObjects.forEach(processJsonObject);

//     console.log(jsonObjects.length)

//     // Final output
//     console.log('File processing completed.');
// });


// Function to extract JSON objects from the file content and save as JSON array to a file
// Function to extract JSON objects from the file content and save as JSON array to a file
function extractJsonObjectsAndSaveAsArray(data, outputFilePath) {
  let jsonObjects = [];
  let buffer = '';
  let depth = 0;

  // Loop through each character in the data
  for (let i = 0; i < data.length; i++) {
      const char = data[i];

      // Increment depth when encountering '{'
      if (char === '{') {
          depth++;
          // If depth is 1, reset buffer
          if (depth === 1) {
              buffer = '';
          }
      }

      // Append characters to buffer if inside an object
      if (depth > 0) {
          buffer += char;
      }

      // Decrement depth when encountering '}'
      if (char === '}') {
          depth--;
          // If depth reaches 0, parse buffer as JSON and push to jsonObjects
          if (depth === 0) {
              try {
                  const parsedObject = JSON.parse(buffer);
                  jsonObjects.push(JSON.stringify(parsedObject)); // Stringify object before pushing
                  // Add comma after each object except the last one
                  if (i !== data.length - 1) {
                      jsonObjects.push(',');
                  }
              } catch (e) {
                  console.error('Error parsing JSON:', buffer, '\nError:', e);
              }
          }
      }
  }

  // Join all elements in jsonObjects array
  const jsonArray = '[' + jsonObjects.join('') + ']';

  // Write JSON array to file
  fs.writeFileSync(outputFilePath, jsonArray);

  console.log('JSON array saved to file:', outputFilePath);

  return jsonObjects;
}

// Example usage:
const data = fs.readFileSync('data.json', 'utf8');
extractJsonObjectsAndSaveAsArray(data, 'output.json');
