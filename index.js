const fetch = require('node-fetch');

const WIKIPEDIA_HOST = 'en.wikipedia.org';

const getWikipediaURL = (pageName) => {
  return `https://${WIKIPEDIA_HOST}/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${pageName}`;
}

const wikipediaDeadOrAlive = {
  getStatus: async (pageName) => {
    // todo what if pageName empty
    if (! pageName || pageName.length === 0) {
      throw new Error('pageName not provided!');
    }

    const response = await fetch(getWikipediaURL(pageName));

    if (response.status !== 200) {
      throw new Error(`Wikipedia responded with status code ${response.status}!`);
    }

    const pageSummary = await response.json();

    let extractText = pageSummary.query.pages[Object.keys(pageSummary.query.pages)[0]].extract;

    if (! extractText) {
      throw new Error('No extract: Page doesn\'t exist, or wrong type of page!');
    }

    extractText = extractText.replace(/Jr./g, 'Jr');

    const firstSentence = extractText.substring(0, extractText.indexOf('.') + 1);

    const openBracketPos = firstSentence.indexOf('(');
    const closeBracketPos = firstSentence.lastIndexOf(')');

    const description = `${firstSentence.substring(0, openBracketPos).trim()} ${firstSentence.substring(closeBracketPos + 1).trim()}`;
    
    let datePart = firstSentence.substring(openBracketPos, closeBracketPos + 1).trim();
    const firstSemicolonPos = datePart.indexOf(';');

    if (firstSemicolonPos !== -1) {
      datePart = datePart.substring(firstSemicolonPos + 1).trim();
    }

    const dead = datePart.indexOf('–') !== -1;

    let died = null;

    if (dead) {
      died = datePart.substring(datePart.lastIndexOf(' ') + 1, datePart.length - 1);
    }

    return {
      name: pageName.replace(/_/g, ' '),
      dead,
      died,
      description
    };
  }
};

module.exports = wikipediaDeadOrAlive;