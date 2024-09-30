# ChatGPT Clone

This is a ChatGPT clone project with a frontend and backend. The project utilizes OpenAI's API for generating responses.

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Running the Project](#running-the-project)
-   [Configuration](#configuration)
-   [Usage](#usage)

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [Yarn](https://yarnpkg.com/) (optional, but recommended)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/chatgpt-clone.git
    cd chatgpt-clone

    ```

2. Navigate to the backend directory and install dependencies:

    ```bash
    cd backend
    yarn install

    ```

3. Navigate to the frontend directory and install dependencies:

    ```bash
    cd ../frontend
    yarn install
    ```

## Configuration

1. OpenAI API Key: You need to provide your OpenAI API key to use the backend. Search for openAI.config.ts in the backend directory and add your key as follows:

    ```bash
    export const OPENAI_API_KEY = 'your-openai-api-key';
    ```

## Running the Project

1. Start the Backend: Open a terminal window, navigate to the backend directory, and run:

    ```bash
    cd backend
    yarn dev
    The backend will run on http://localhost:5173.

    ```

2. Start the Frontend: Open another terminal window, navigate to the frontend directory, and run:

    ```bash
    cd frontend
    yarn dev
    The frontend will run on http://localhost:8080.
    ```
