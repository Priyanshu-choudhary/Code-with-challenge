import axios from 'axios';

const JDoodleExample = async (code, language, input, testCases) => {
    try {
        console.log("Test Cases:", testCases);
        let apiUrl = testCases && Object.keys(testCases).length > 0
            ? "http://ec2-52-62-60-176.ap-southeast-2.compute.amazonaws.com:9090/code/execute"
            : "http://ec2-52-62-60-176.ap-southeast-2.compute.amazonaws.com:9090/code/execute";

        const response = await axios.post(apiUrl, {
            script: code,
            language: language,
            stdin: input,
            // testCases: testCases,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //  console.log("output>>>>>>"+response.data);
        return response.data;
    } catch (error) {
        console.error('Error executing code:', error);
        return 'Error executing code. Please try again.';
    }
};

export default JDoodleExample;
