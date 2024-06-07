import axios from 'axios';

const JDoodleExample = async (Code, language, userInput) => {
    const AUTH_API_URL = 'https://api.jdoodle.com/v1/auth-token';
    const EXECUTE_API_URL = 'https://api.jdoodle.com/v1/execute';
    const CLIENT_ID = '37dd0e92aceba3fee89463288adc4e4e';
    const CLIENT_SECRET = 'f3175423c629b771f4f7ef9ad84df6f0be28cc7490c40f429aef462027ef3c4';

    let token = '';

    const authenticate = async () => {
        try {
            const authResponse = await axios.post(AUTH_API_URL, {
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET
            });
            token = authResponse.data.token;
        } catch (error) {
            console.error('Error authenticating:', error);
            throw error;
        }
    };

    try {
        await authenticate();
        const executionResponse = await axios.post(EXECUTE_API_URL, {
            script: Code,
            language: language,
            versionIndex: '3',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            stdin: userInput,
            compileOnly: false,
            token: token,
        });
        return executionResponse.data.output;
    } catch (error) {
        console.error(`Error compiling ${language} code:`, error);
        return `Error compiling ${language} code. Please try again.`;
    }
};

export default JDoodleExample;
