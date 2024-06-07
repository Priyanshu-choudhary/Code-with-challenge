import axios from 'axios';

const JDoodleExample = async (code, language, userInput) => {
    try {
        const response = await axios.post('https://testcfc-1.onrender.com/api/jdoodle/execute', {
            script: code,
            language: language,
            stdin: userInput
        });
        // console.log(response.data.output);
        return response.data.output; // Return the output explicitly
    } catch (error) {
        console.error('Error executing code:', error);
        return 'Error executing code. Please try again.';
    }
};

export default JDoodleExample;
