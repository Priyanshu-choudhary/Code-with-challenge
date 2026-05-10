const sampleData = [
    {
        name: 'Step 1: Learn the basics',
       
        children: [
            {
                name: 'Lecture 1',
                children: [
                    
                    {
                        name: 'Question 1', link: '#', status: 'Complete', 
                        problem: [
                            {
                                id:"jkasdnvksadbvabdkjsadjk",   
                                title: "Example Title 1",
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
                    },
                    {
                        name: 'Question 2', link: '#', status: 'Complete', 
                        problem: [
                            {
                                id:"jkasdnvksadbvabdkjsadjk",   
                                title: "Example Title",
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
                    },
            {
                name: 'Lecture 2',
                children: [
                    
                    {
                        name: 'Question 1', link: '#', status: 'Complete', 
                        problem: [
                            {
                                id:"jkasdnvksadbvabdkjsadjk",   
                                title: "Example Title 1",
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
                    },
                    {
                        name: 'Question 2', link: '#', status: 'Complete', 
                        problem: [
                            {
                                id:"jkasde2nvksad373649bvabdkjsadjk",   
                                title: "Example Title",
                                description: "Example Description",
                                Example: "Example Content",
                                difficulty: "Medium",
                                solution: {
                                    java: {
                                        solution: `//solution java`
                                    },
                                    python: {
                                        solution: "def solution():\n    print('Python Solution')"
                                    }
                                },

                                constrain: "Example Constraint",
                                timecomplixity: "O(n)",
                                avgtime: "5ms",
                                lastModified: "2024-07-06T12:34:56.789+00:00",
                               
                                videoUrl: "http://example.com/video",
                                codeTemplates: {
                                    java: {
                                        templateCode: `class Solution {
    public String isEligibleToVote(int age, boolean citizenship) {
        // Your code here
        return "";
    }
}
`,
                                        boilerCode: `   public class Checker {
    
    public static void main(String[] args) {
        Solution solution = new Solution();

        // Test cases
        Object[][] testCases = {
            {17, true, "You are not eligible to vote. You must be at least 18 years old."},    // Example 1
            {20, false, "You are not eligible to vote. You must be a citizen."},  // Example 2
            {18, true, "You are eligible to vote."},    // Test case 3
            {18, false, "You are not eligible to vote. You must be a citizen."},    // Test case 4
            {19, true, "You are eligible to vote."}, // Test case 5
            {17, false, "You are not eligible to vote. You must be at least 18 years old."}, // Test case 6
            {25, true, "You are eligible to vote."}, // Test case 7
            {16, false, "You are not eligible to vote. You must be at least 18 years old."}, // Test case 8
            {21, false, "You are not eligible to vote. You must be a citizen."}, // Test case 9
            {30, true, "You are eligible to vote."} // Test case 10
        };

        for (int i = 0; i < testCases.length; i++) {
            int age = (int) testCases[i][0];
            boolean citizenship = (boolean) testCases[i][1];
            String expected = (String) testCases[i][2];
            String output = solution.isEligibleToVote(age, citizenship);

            System.out.println("Test Case " + (i + 1));
            System.out.println("Input: age = " + age + ", citizenship = " + citizenship);
            System.out.println("Expected Output: " + expected);
            System.out.println("Output: " + output);
            System.out.println("Status: " + (expected.equals(output) ? "Pass" : "Fail"));
            System.out.println();
        }
    }
}
`
                                    },
                                    python: {
                                        templateCode: "def template():\n    # Python Template Code",
                                        boilerCode: "def boiler():\n    # Python Boiler Code"
                                    }
                                }
                            }   
                        ]
                    },{
                        name: 'Question 3', link: '#', status: 'Complete', 
                        problem: [
                            {
                                id:"jkasdnvksadbvabdkjsadjk",   
                                title: "Example Title",
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
            }
        ]
    },
    
    {
        name: 'Step 2: Array',
        childrenCount: 2,
        children: [
                    
            {
                name: 'Question 1', link: '#', status: 'Complete', 
                problem: [
                    {
                        id:"jkasdnvksadbvabdkjsadjk",   
                        title: "Example Title 1",
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
            },
            {
                name: 'Question 2', link: '#', status: 'Complete', 
                problem: [
                    {
                        id:"jkasdnvksadbvabdkjsadjk",   
                        title: "Example Title",
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
            },{
                name: 'Question 3', link: '#', status: 'Complete', 
                problem: [
                    {
                        id:"jkasdnvksadbvabdkjsadjk",   
                        title: "Example Title",
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
        name: 'Step 3: shorting',
        children: [
                    
            {
                name: 'Question 1', link: '#', status: 'Complete', 
                problem: [
                    {
                        id:"jkasdnvksadbvabdkjsadjk",   
                        title: "Example Title 1",
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
            },
            {
                name: 'Question 2', link: '#', status: 'Complete', 
                problem: [
                    {
                        id:"jkasdnvksadbvabdkjsadjk",   
                        title: "Example Title",
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
            },{
                name: 'Question 3', link: '#', status: 'Complete', 
                problem: [
                    {
                        id:"jkasdnvksadbvabdkjsadjk",   
                        title: "Example Title",
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
        name: 'Step 4: String',
        children: [
                    
            {
                name: 'Question 1', link: '#', status: 'Complete', 
                problem: [
                    {
                        id:"jkasdnvksadbvabdkjsadjk",   
                        title: "Example Title 1",
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
            },
            {
                name: 'Question 2', link: '#', status: 'Complete', 
                problem: [
                    {
                        id:"jkasdnvksadbvabdkjsadjk",   
                        title: "Example Title",
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
            },{
                name: 'Question 3', link: '#', status: 'Complete', 
                problem: [
                    {
                        id:"jkasdnvksadbvabdkjsadjk",   
                        title: "Example Title",
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
        name: 'Step 5: linlList',
        children: [
                    
            {
                name: 'Question 1', link: '#', status: 'Complete', 
                problem: [
                    {
                        id:"jkasdnvksadbvabdkjsadjk",   
                        title: "Example Title 1",
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
            },
            {
                name: 'Question 2', link: '#', status: 'Complete', 
                problem: [
                    {
                        id:"jkasdnvksadbvabdkjsadjk",   
                        title: "Example Title",
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
            },{
                name: 'Question 3', link: '#', status: 'Complete', 
                problem: [
                    {
                        id:"jkasdnvksadbvabdkjsadjk",   
                        title: "Example Title",
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
    // Add more steps...
];

export default sampleData;

