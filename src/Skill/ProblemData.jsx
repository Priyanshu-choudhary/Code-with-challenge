const sampleData = [
    {
        name: 'Step 1: Learn the basics',
       
        children: [
            {
                name: 'Lecture 1',
                childrenCount: 2,
                children: [
                    
                    {
                        name: 'Question 4', link: '#', status: 'Complete', problem: [
                            {
                                id:"jkasdnvksadbvabdkjsadjk",   
                                title: "Example Title9",
                                description: "Example Description",
                                Example: "Example Content",
                                difficulty: "Medium",
                                solution: {
                                    java: {
                                        solution: "public class Solution { public static void main(String[] args) { System.out.println('Java Solution'); } }"
                                    },
                                    python: {
                                        solution: "def solution():\n    print('Python Solution')"
                                    }
                                },

                                constrain: "Example Constraint",
                                timecomplixity: "O(n)",
                                avgtime: "5ms",
                                lastModified: "2024-07-06T12:34:56.789+00:00",
                                type: "Multiple Choice",
                                optionA: "Option A",
                                optionB: "Option B",
                                optionC: "Option C",
                                optionD: "Option D",
                                videoUrl: "http://example.com/video",
                                codeTemplates: {
                                    java: {
                                        templateCode: "public class Template { public static void main(String[] args) { // Java Template Code } }",
                                        boilerCode: "public class Boiler { public static void main(String[] args) { // Java Boiler Code } }"
                                    },
                                    python: {
                                        templateCode: "def template():\n    # Python Template Code",
                                        boilerCode: "def boiler():\n    # Python Boiler Code"
                                    }
                                }
                            }   
                        ]
                    }
                ]
            },
            {
                name: 'Lecture 2',
                childrenCount: 2,
                children: [
                    { name: 'Question 3', hardness: 'Hard', link: '#', youtubeLink: '#', status: 'Incomplete' },
                    { name: 'Question 4', hardness: 'Easy', link: '#', youtubeLink: '#', status: 'Complete' }
                ]
            }
        ]
    },
    {
        name: 'Step 2: Array',
        childrenCount: 2,
        children: [
            {
                name: 'Lecture 1',
                childrenCount: 2,
                children: [
                    { name: 'Question 1', hardness: 'Easy', link: '#', youtubeLink: '#', status: 'Complete' },
                    { name: 'Question 2', hardness: 'Medium', link: '#', youtubeLink: '#', status: 'Incomplete' },
                    { name: 'Question 3', hardness: 'Hard', link: '#', youtubeLink: '#', status: 'Incomplete' },
                    { name: 'Question 4', hardness: 'Easy', link: '#', youtubeLink: '#', status: 'Complete' }
                ]
            },
            {
                name: 'Lecture 2',
                childrenCount: 2,
                children: [
                    { name: 'Question 3', hardness: 'Hard', link: '#', youtubeLink: '#', status: 'Incomplete' },
                    { name: 'Question 4', hardness: 'Easy', link: '#', youtubeLink: '#', status: 'Complete' }
                ]
            }
        ]
    },
    {
        name: 'Step 3: shorting',
        childrenCount: 2,
        children: [
            {
                name: 'Lecture 1',
                childrenCount: 2,
                children: [
                    { name: 'Question 1', hardness: 'Easy', link: '#', youtubeLink: '#', status: 'Complete' },
                    { name: 'Question 2', hardness: 'Medium', link: '#', youtubeLink: '#', status: 'Incomplete' },
                    { name: 'Question 3', hardness: 'Hard', link: '#', youtubeLink: '#', status: 'Incomplete' },
                    { name: 'Question 4', hardness: 'Easy', link: '#', youtubeLink: '#', status: 'Complete' }
                ]
            },
            {
                name: 'Lecture 2',
                childrenCount: 2,
                children: [
                    { name: 'Question 3', hardness: 'Hard', link: '#', youtubeLink: '#', status: 'Incomplete' },
                    { name: 'Question 4', hardness: 'Easy', link: '#', youtubeLink: '#', status: 'Complete' }
                ]
            }
        ]
    },
    {
        name: 'Step 4: String',
        childrenCount: 2,
        children: [
            {
                name: 'Lecture 1',
                childrenCount: 2,
                children: [
                    { name: 'Question 1', hardness: 'Easy', link: '#', youtubeLink: '#', status: 'Complete', description: "this is an description" },
                    { name: 'Question 2', hardness: 'Medium', link: '#', youtubeLink: '#', status: 'Incomplete' },
                    { name: 'Question 3', hardness: 'Hard', link: '#', youtubeLink: '#', status: 'Incomplete' },
                    { name: 'Question 4', hardness: 'Easy', link: '#', youtubeLink: '#', status: 'Complete' }
                ]
            },
            {
                name: 'Lecture 2',
                childrenCount: 2,
                children: [
                    { name: 'Question 3', hardness: 'Hard', link: '#', youtubeLink: '#', status: 'Incomplete' },
                    { name: 'Question 4', hardness: 'Easy', link: '#', youtubeLink: '#', status: 'Complete' }
                ]
            }
        ]
    },
    {
        name: 'Step 5: linlList',
        childrenCount: 2,
        children: [
            {
                name: 'Lecture 1',
                childrenCount: 2,
                children: [
                    { name: 'Question 1', hardness: 'Easy', link: '#', youtubeLink: '#', status: 'Complete', description: "this is an description" },
                    { name: 'Question 2', hardness: 'Medium', link: '#', youtubeLink: '#', status: 'Incomplete' },
                    { name: 'Question 3', hardness: 'Hard', link: '#', youtubeLink: '#', status: 'Incomplete' },
                    { name: 'Question 4', hardness: 'Easy', link: '#', youtubeLink: '#', status: 'Complete' }
                ]
            },
            {
                name: 'Lecture 2',
                childrenCount: 2,
                children: [
                    { name: 'Question 3', hardness: 'Hard', link: '#', youtubeLink: '#', status: 'Incomplete' },
                    { name: 'Question 4', hardness: 'Easy', link: '#', youtubeLink: '#', status: 'Complete' }
                ]
            }
        ]
    },
    // Add more steps...
];

export default sampleData;
