# SI_FINAL-PROJECT
# Azure AI Language API - Summarization

The Azure AI Language API provides powerful text summarization capabilities, allowing you to generate concise and contextually relevant summaries of documents or text content. This README provides a guide on how to use the Summarization API, obtain API keys, and integrate it into your applications.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [API Key and Endpoint](#api-key-and-endpoint)
  - [Installation](#installation)
  - [Sample Code](#sample-code)
- [API Reference](#api-reference)
  - [Endpoint](#endpoint)
  - [Request](#request)
  - [Response](#response)
- [Error Handling](#error-handling)
- [Support]

## Getting Started

### Prerequisites

Before using the Summarization API, ensure you have the following:

- Azure subscription: Obtain the subscription key and endpoint from the Azure portal.
- Python environment: Ensure you have Python installed to make API requests.

### API Key and Endpoint

1. Sign in to the [Azure portal](https://portal.azure.com/).
2. Navigate to the "AI + Machine Learning" section.
3. Create or select the appropriate resource for the Language API.
4. Obtain the subscription key and endpoint.

### Installation

Install the required Python library for making API requests:

bash
pip install azure-ai-textanalytics


**API Reference**
**Endpoint**
bash
http://108.61.87.105:3001/summarize

**Request**
HTTP Method: POST
Content Type: application/json
Request Body:


**POST QUERY**
{
  "documents": [
    {
      "language": "en",
      "id": "1",
      "text": "In the bustling cityscape of Metropolis, where skyscrapers touched the heavens and neon lights painted the night, a mysterious energy surged through the air. The citizens, oblivious to the cosmic forces at play, hurried along the bustling streets, their lives entwined with the rhythm of the city. Meanwhile, hidden beneath the veneer of everyday life, a clandestine group known as the Illuminate wove a tapestry of intrigue and power. Their enigmatic leader, known only as Cipher, possessed a keen intellect and an uncanny ability to manipulate the threads of reality.As the city pulsated with life, an ancient artifact, the Aetherian Crystal, resurfaced, unlocking dormant potentials in unsuspecting individuals. Unbeknownst to them, their destinies were intertwined, converging towards an impending clash of cosmic proportions. The veil between worlds wavered, revealing glimpses of otherworldly realms, as the city became a battleground for metaphysical forces vying for control.Amidst the chaos, a reluctant hero emerged, discovering latent abilities and a responsibility to protect the city from impending doom. As the narrative unfolded, alliances formed and betrayals shattered trust, leading to a climactic showdown that would determine the fate of Metropolis and its unsuspecting inhabitants "
    }
  ]
}


![image](https://github.com/sagarnayar/SI_FINAL-PROJECT/assets/143444397/343ef14a-8dba-4f7d-b3f6-33fffbca5259)
THE RESULT IS BELOW FOR THE QUERY GIVEN

![image](https://github.com/sagarnayar/SI_FINAL-PROJECT/assets/143444397/7cc8893c-b118-4c11-b306-515a52d8a3c0)

Handle errors by checking the errors field in the API response. If errors occur, the documents field will be empty.

Responses
Response content type


Code	Description
200	
Successful response

500	
Internal Server Error

**Swagger Documentation**
Document your API using Swagger for easy reference. Include information on how users can access the Swagger documentation.

**URL: Swagger Documentation**

![image](https://github.com/sagarnayar/SI_FINAL-PROJECT/assets/143444397/81d19e86-9a9e-4f52-8a1a-7eb2f126dc2d)

![image](https://github.com/sagarnayar/SI_FINAL-PROJECT/assets/143444397/9cd41f74-f4fe-4cf1-bbe7-9f5e7215b8ce)
![image](https://github.com/sagarnayar/SI_FINAL-PROJECT/assets/143444397/6e52582d-ab27-48f8-b7df-b971ae08529e)

**Summary**
The Azure AI Language API - Summarization empowers users to generate concise and contextually relevant summaries of documents or text content. This API, backed by powerful text summarization capabilities, is a valuable tool for developers looking to integrate advanced language processing features into their applications. By following the straightforward steps outlined in this README, users can quickly get started, obtain API keys, and seamlessly integrate the Summarization API into their Python applications. The provided Swagger documentation adds an extra layer of convenience for users to reference and explore the API functionalities easily.



