import axios from 'axios';

const JDoodleExample = async (code, language, input) => {
   
    try {
    
      if (language=="javascript") {
        language="nodejs";
      } else if(language=="python"){
        language="python3"
      }

        const response = await axios.post("https://hytechlabs.online:9090/code/execute", {
            script: code,
            language: language,
            stdin: input,
           
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error executing code:', error);
        return 'Error executing code. Please try again.';
    }
};

export default JDoodleExample;
