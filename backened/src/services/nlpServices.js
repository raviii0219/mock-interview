const Sentiment = require("sentiment");

const nlp = require("compromise");

const sentiment = new Sentiment();

//  NLP ANALYSIS
const analyzeAnswer = (answer) => {

    // SENTIMENT
    const sentimentResult =
        sentiment.analyze(answer);

    // KEYWORDS
    const keywords =
        nlp(answer)
            .nouns()
            .out("array");

    // WORD COUNT
    const wordCount =
        answer.split(" ").length;

    // CONFIDENCE
    let confidence = "Low";

    if (wordCount > 40) {

        confidence = "High";

    } else if (wordCount > 20) {

        confidence = "Medium";
    }

    return {

        sentimentScore:
            sentimentResult.score,

        keywords,

        confidence,

        wordCount,
    };
};

module.exports = {
    analyzeAnswer,
};