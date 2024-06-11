import axios from 'axios';

const JDoodleExample = async (code, language, input, testCases) => {
    try {
        console.log("Test Cases:", testCases);
        let apiUrl = testCases && Object.keys(testCases).length > 0
            ? "https://testcfc.onrender.com/code/executeWithTestcase"
            : "https://testcfc.onrender.com/code/execute";

        const response = await axios.post(apiUrl, {
            script: code,
            language: language,
            stdin: input,
            testCases: testCases,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
         console.log("output>>>>>>"+response.data);
        return response.data;
    } catch (error) {
        console.error('Error executing code:', error);
        return 'Error executing code. Please try again.';
    }
};

export default JDoodleExample;
