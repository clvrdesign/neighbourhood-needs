import jsonData from './neighbourhoods.json';

export default function extractNeighbourhoods(jsonData) {
   const neighbourhoods = [];
  jsonData.forEach((element) => {
    neighbourhoods.push(element.neighbourhood);
  });
  neighbourhoods.sort((a, b) => a.localeCompare(b));
  return neighbourhoods;
}

export const sortedNeighbourhoods = extractNeighbourhoods(jsonData);
