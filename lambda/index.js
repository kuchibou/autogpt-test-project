// lambda/index.js
// Alexa-hosted (Node.js) 用 Lambda エントリポイント
// 実装詳細は Auto-GPT によって生成・更新されることを想定する。

const https = require('https');

const Alexa = require('ask-sdk-core');

// 読み上げ用辞書（例示。Auto-GPT が拡張してよい）
const READING_DICTIONARY = {
  '附則': 'ふそく',
  '但書': 'ただしがき'
  // TODO: Auto-GPT がここを拡張
};

// e-Gov API 呼び出し用のヘルパー（Auto-GPT が実装）
function fetchLawList() {
  // TODO: /laws を呼び出す実装を追加
}

function fetchLawBody(lawId) {
  // TODO: /law/{lawId} を呼び出す実装を追加
}

function extractArticleText(xml, articleNumber) {
  // TODO: XML から指定条番号の条文を抽出する実装を追加
}

function applyReadingDictionary(text) {
  let result = text;
  for (const [term, reading] of Object.entries(READING_DICTIONARY)) {
    result = result.replace(new RegExp(term, 'g'), reading);
  }
  return result;
}

// メインのインテントハンドラ（Auto-GPT が詳細実装）
const ReadLawIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'ReadLawIntent';
  },
  async handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const lawName = request.intent.slots.LawName.value;
    const articleNumber = request.intent.slots.ArticleNumber.value;

    // TODO: e-Gov API を呼び出し、条文を取得して整形する処理を実装

    const speechText = 'まだ実装されていません。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('法令読み上げ', speechText)
      .getResponse();
  }
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = '読み上げる法令と条文を指定してください。例えば、民法9条を読んで、のように話しかけてください。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = '法令名と条文番号を指定すると、その条文を読み上げます。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = '終了します。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    const speechText = '内部エラーが発生しました。しばらくしてからもう一度お試しください。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ReadLawIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
