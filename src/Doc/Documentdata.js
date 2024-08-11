const documentData = [
    { id: 1, title: "Coding Question Prompt for C++", content: `
I am making a coding question website. In this website, the user solves the question. For this, I want you to generate two codes for me in C++. One is a boiler code with a solution function for a coding question for example:


std::string findSubstring(const std::string& str, const std::string& substring) {
    // User's implementation goes here
    return "";
}


Note: In this solution function, don't write the solution. Only give boiler code for the user. In this code, the function name is used according to the given coding question below.
Now, generate another code to run and test the solution function code on given test cases. Just give me two different codes: the first is boiler code, and the other is checker code. So that in the final, I can join both codes in the backend and make it as a single code for example.

#include <iostream>
#include <vector>
#include <string>
std::string findSubstring(const std::string& str, const std::string& substring); // Declaration of the user's function

struct TestCase {
    std::string input;
    std::string substring;
    std::string expectedOutput;
};

void runTestCases() {
    std::vector<TestCase> testCases = {
        {"Hello world", "world", "Yes"},
        {"The quick brown fox jumps over the lazy dog", "quick", "Yes"},
        {"Java is awesome", "Python", "No"},
        {"I love coding", "love", "Yes"},
        {"This sentence has a lot of words", "none", "No"},
        {"", "word", "No"},
        {"OnlyOneWord", "One", "Yes"},
        {"A B C D E F", "G", "No"}
    };

    for (size_t i = 0; i < testCases.size(); i++) {
        TestCase testCase = testCases[i];
        std::string result = findSubstring(testCase.input, testCase.substring);
        std::cout << "Test Case " << (i + 1) << "\n";
        std::cout << "Input: " << testCase.input << ", Substring: " << testCase.substring << "\n";
        std::cout << "Expected Output: " << testCase.expectedOutput << "\n";
        std::cout << "Output: " << result << "\n";
        std::cout << "Status: " << (result == testCase.expectedOutput ? "Pass" : "Fail") << "\n\n";
    }
}

int main() {
    runTestCases();
    return 0;
}
 One more thing: the checker program should output the status of the test case (fail or pass), the test case input, and output in this structure.

The output format should strictly follow this structure:


Test Case 1
Input: 
Expected Output: 
Output:
Status: 


This is the coding DSA question according to which you have to use function name, parameter, and other things:

**"

"**
Note:
1.  Mention proper question on the top. 
2. Add two example of given question in format like this :

Example X:
Input: 
Expected Output:

3. Add at least 10 or more if required to test the solution and  check user solution on every possible situation  and seniores where user code can fail of this code.
3. Do not use the same import statement in both the solution class and checker code.
4. Do import any libeary in the boiler code only in checker code 
5. Don't write comments like "//this is boiler code" in boiler code.
6.write question description , time complexity,time to solve,  and easy, medium ,hard level and also give its solution` },
    { id: 2, title: "Coding Question Prompt for java", content: `
I am making a coding question website. In this website, the user solves the question. For this, I want you to generate two codes for me in Java. One is a boiler code with a solution function for a coding question for example:


class Solution {
    String findSubstring(String str, String substring) {
        
        return "";
    }
}}


Note: In this solution function, don't write the solution. Only give boiler code for the user. In this code, the function name is used according to the given coding question below.
Now, generate another code to run and test the solution function code on given test cases. Just give me two different codes: the first is boiler code, and the other is checker code. So that in the final, I can join both codes in the backend and make it as a single code for example.

import java.util.Arrays;
import java.util.List;

public class Checker {
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        List<TestCase> testCases = Arrays.asList(
            new TestCase("Hello world", "world", "Yes"),
            new TestCase("The quick brown fox jumps over the lazy dog", "quick", "Yes"),
            new TestCase("Java is awesome", "Python", "No"),
            new TestCase("I love coding", "love", "Yes"),
            new TestCase("This sentence has a lot of words", "none", "No"),
            new TestCase("", "word", "No"),
            new TestCase("OnlyOneWord", "One", "Yes"),
            new TestCase("A B C D E F", "G", "No")
        );

        for (int i = 0; i < testCases.size(); i++) {
            TestCase testCase = testCases.get(i);
            String result = solution.findSubstring(testCase.input, testCase.substring);
            System.out.println("Test Case " + (i + 1));
            System.out.println("Input: " + testCase.input + ", Substring: " + testCase.substring);
            System.out.println("Expected Output: " + testCase.expectedOutput);
            System.out.println("Output: " + result);
            System.out.println("Status: " + (result.equals(testCase.expectedOutput) ? "Pass" : "Fail"));
            System.out.println();
        }
    }
}

class TestCase {
    String input;
    String substring;
    String expectedOutput;

    TestCase(String input, String substring, String expectedOutput) {
        this.input = input;
        this.substring = substring;
        this.expectedOutput = expectedOutput;
    }
}

 One more thing: the checker program should output the status of the test case (fail or pass), the test case input, and output in this structure.

The output format should strictly follow this structure:


Test Case 1
Input: 
Expected Output: 
Output:
Status: 


This is the coding DSA question according to which you have to use function name, parameter, and other things:

**"

"**
Note:
1.  Mention proper question on the top. 
2. Add two example of given question in format like this :

Example X:
Input: 
Expected Output:

3. Add at least 10 or more if required to test the solution and  check user solution on every possible situation  and seniores where user code can fail of this code.
3. Do not use the same import statement in both the solution class and checker code.
4. Do import any libeary in the boiler code only in checker code 
5. Don't write comments like "//this is boiler code" in boiler code.
6.write question description , time complexity,time to solve,  and easy, medium ,hard level and also give its solution` },
    { id: 3, title: "Coding Question Prompt for Python", content: `
I am making a coding question website. In this website, the user solves the question. For this, I want you to generate two codes for me in Python language. One is a boiler code with a solution function for a coding question for example:


def find_substring(main_string: str, substring: str) -> str:
    # User's implementation goes here
    return ""}


Note: In this solution function, don't write the solution. Only give boiler code for the user. In this code, the function name is used according to the given coding question below.
Now, generate another code to run and test the solution function code on given test cases. Just give me two different codes: the first is boiler code, and the other is checker code. So that in the final, I can join both codes in the backend and make it as a single code for example.

import unittest

def find_substring(main_string: str, substring: str) -> str:
    pass  # Declaration of the user's function

class TestCase:
    def __init__(self, input_str, substring, expected_output):
        self.input_str = input_str
        self.substring = substring
        self.expected_output = expected_output

def run_test_cases():
    test_cases = [
        TestCase("Hello world", "world", "Yes"),
        TestCase("The quick brown fox jumps over the lazy dog", "quick", "Yes"),
        TestCase("Java is awesome", "Python", "No"),
        TestCase("I love coding", "love", "Yes"),
        TestCase("This sentence has a lot of words", "none", "No"),
        TestCase("", "word", "No"),
        TestCase("OnlyOneWord", "One", "Yes"),
        TestCase("A B C D E F", "G", "No")
    ]

    for i, test_case in enumerate(test_cases, 1):
        result = find_substring(test_case.input_str, test_case.substring)
        print(f"Test Case {i}")
        print(f"Input: {test_case.input_str}, Substring: {test_case.substring}")
        print(f"Expected Output: {test_case.expected_output}")
        print(f"Output: {result}")
        print(f"Status: {'Pass' if result == test_case.expected_output else 'Fail'}\n")

if __name__ == "__main__":
    run_test_cases()}

 One more thing: the checker program should output the status of the test case (fail or pass), the test case input, and output in this structure.

The output format should strictly follow this structure:


Test Case 1
Input: 
Expected Output: 
Output:
Status: 


This is the coding DSA question according to which you have to use function name, parameter, and other things:

**"

"**
Note:
1.  Mention proper question on the top. 
2. Add two example of given question in format like this :

Example X:
Input: 
Expected Output:

3. Add at least 10 or more if required to test the solution and  check user solution on every possible situation  and seniores where user code can fail of this code.
3. Do not use the same import statement in both the solution class and checker code.
4. Do import any libeary in the boiler code only in checker code 
5. Don't write comments like "//this is boiler code" in boiler code.
6.write question description , time complexity,time to solve,  and easy, medium ,hard level and also give its solution` },
    // Add more documents as needed
    { id: 4, title: "Coding Question Prompt for Javascript", content: `Coding Question Prompt for JS
I am making a coding question website. In this website, the user solves the question. For this, I want you to generate two codes for me in javascript language. One is a boiler code with a solution function for a coding question for example:


function swapNumbers(a, b) {
    // User's implementation goes here
    return [a, b];
}


Note: In this solution function, don't write the solution. Only give boiler code for the user. In this code, the function name is used according to the given coding question below.
Now, generate another code to run and test the solution function code on given test cases. Just give me two different codes: the first is boiler code, and the other is checker code. So that in the final, I can join both codes in the backend and make it as a single code for example.

class TestCase {
    constructor(a, b, expectedA, expectedB) {
        this.a = a;
        this.b = b;
        this.expectedA = expectedA;
        this.expectedB = expectedB;
    }
}

function runTestCases() {
    const testCases = [
        new TestCase(5, 10, 10, 5),
        new TestCase(-3, 7, 7, -3),
        new TestCase(0, 0, 0, 0),
        new TestCase(12345, 54321, 54321, 12345),
        new TestCase(1, -1, -1, 1),
        new TestCase(99999, 1, 1, 99999),
        new TestCase(3.14, 2.71, 2.71, 3.14),
        new TestCase(-99999, 99999, 99999, -99999),
        new TestCase(1, 1, 1, 1),
        new TestCase(0, -0, -0, 0),
    ];

    testCases.forEach((testCase, index) => {
        const [resultA, resultB] = swapNumbers(testCase.a, testCase.b);
        console.log(\`Test Case \${index + 1}\`);
        console.log(\`Input: a = \${testCase.a}, b = \${testCase.b}\`);
        console.log(\`Expected Output: a = \${testCase.expectedA}, b = \${testCase.expectedB}\`);
        console.log(\`Output: a = \${resultA}, b = \${resultB}\`);
        console.log(\`Status: \${resultA === testCase.expectedA && resultB === testCase.expectedB ? 'Pass' : 'Fail'}\`);
        console.log("");
    });
}

// Running test cases
runTestCases();

 One more thing: the checker program should output the status of the test case (fail or pass), the test case input, and output in this structure.

The output format should strictly follow this structure:


Test Case 1
Input: 
Expected Output: 
Output:
Status: 


This is the coding DSA question according to which you have to use function name, parameter, and other things:

**"

"**
Note:
1.  Mention proper question on the top. 
2. Add two example of given question in format like this :

Example X:
Input: 
Expected Output:

3. Add at least 10 or more if required to test the solution and  check user solution on every possible situation  and seniores where user code can fail of this code.
3. Do not use the same import statement in both the solution class and checker code.
4. Do import any libeary in the boiler code only in checker code 
5. Don't write comments like "//this is boiler code" in boiler code.
6. write question description , time complexity,time to solve,  and easy, medium ,hard level
7.Also write the dedicate Solution of the given question`}
];

export default documentData;
