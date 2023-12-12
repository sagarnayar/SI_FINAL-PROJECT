process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { AzureKeyCredential, TextAnalysisClient } = require("@azure/ai-language-text");
require("dotenv").config();

const app = express();
const port = 3001;

// Replace these values with your Azure API endpoint and key
const azureApiEndpoint = process.env.AZURE_API_ENDPOINT;
const apiKey = process.env.AZURE_API_KEY;

app.use(bodyParser.json());

// Endpoint for extractive summarization
/**
 * @swagger
 * /summarize:
 *   post:
 *     summary: Summarize the input documents
 *     parameters:
 *       - in: body
 *         name: documents
 *         required: true
 *         description: The array of documents to be summarized
 *         schema:
 *           type: object
 *           properties:
 *             documents:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   language:
 *                     type: string
 *                     description: Type your language
 *                   id:
 *                     type: string
 *                     description: Type your id
 *                   text:
 *                     type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               documentId: "1"
 *               summary: "This is a summary."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "An error occurred."
 */
app.post('/summarize', async (req, res) => {
    try {
        console.log("== Summarization API Endpoint ==");

        const client = new TextAnalysisClient(azureApiEndpoint, new AzureKeyCredential(apiKey));
        const documents = req.body.documents;
        const actions = [
          {
            kind: "ExtractiveSummarization", 
            maxSentenceCount: 2,
          },
        ];

        const poller = await client.beginAnalyzeBatch(actions, documents, "en");

        poller.onProgress(() => {
            console.log(`Processing: Last update time of the operation - ${poller.getOperationState().modifiedOn}`);
        });

        console.log(`Summarization operation started on: ${poller.getOperationState().createdOn}`);
        console.log(`Results will expire on: ${poller.getOperationState().expiresOn}`);

        const results = await poller.pollUntilDone();
        const responseArray = [];

        for await (const actionResult of results) {
            if (actionResult.kind !== "ExtractiveSummarization") {
                throw new Error(`Unexpected result kind: ${actionResult.kind}`);
            }

            if (actionResult.error) {
                const { code, message } = actionResult.error;
                throw new Error(`Error during extractive summarization (${code}): ${message}`);
            }

            for (const result of actionResult.results) {
                console.log(`- Document ${result.id}`);

                if (result.error) {
                    const { code, message } = result.error;
                    throw new Error(`Error for document ${result.id} (${code}): ${message}`);
                }

                responseArray.push({
                    documentId: result.id,
                    summary: result.sentences.map((sentence) => sentence.text).join("\n"),
                });
            }
        }

        res.json(responseArray);
    } catch (err) {
        console.error("An error occurred:", err);
        res.status(500).json({ error: err.message });
    }
});

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'SUMMARIZATION',
            version: '1.0.0',
            description: 'API',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: [__filename], // Assumes this file (app.js) contains your API routes
    paths: {
        '/summarize': {
            post: {
                summary: 'Summarize the input documents',
                parameters: [
                    {
                        in: 'body',
                        name: 'documents',
                        description: 'The array of documents to be summarized',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                documents: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            language: {
                                                type: 'string',
                                                description: 'Type your language',
                                            },
                                            id: {
                                                type: 'string',
                                                description: 'Type your id',
                                            },
                                            text: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                example: {
                                    documentId: '1',
                                    summary: 'This is a summary.',
                                },
                            },
                        },
                    },
                    500: {
                        description: 'Internal Server Error',
                        content: {
                            'application/json': {
                                example: {
                                    error: 'An error occurred.',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
