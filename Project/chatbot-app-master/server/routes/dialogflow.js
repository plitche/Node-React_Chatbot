const express = require('express');
const router = express.Router();
const structjson = require('./structjson.js');
const dialogflow = require('dialogflow');
const uuid = require('uuid');

const config = require('../config/keys');
const projectId = config.googleProjectID
const sessionId = config.dialogFlowSessionID
const languageCode = config.dialogFlowSessionLanguageCode

// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// we will make two routes

// Text Query Route
router.post('/textQuery', async (req, res) => {
    // we need to send some information that comes from the client to Dialogflow API
    // const dialogflow = require('dialogflow');
    // const uuid = require('uuid');
    
    /**
     * Send a query to the dialogflow agent, and return the query result.
     * @param {string} projectId The project to be used
     */
    // async function runSample(projectId = 'your-project-id') {
    // A unique identifier for the given session
    // const sessionId = uuid.v4();
    
    // // Create a new session
    // const sessionClient = new dialogflow.SessionsClient();
    // const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };
    
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.send(result)
})


// Event Query Route



module.exports = router;
