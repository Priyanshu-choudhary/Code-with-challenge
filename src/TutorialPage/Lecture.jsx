import React from 'react';
import { useParams } from 'react-router-dom';
import IconBreadcrumbs from '../dashBoard/BreadCrumb';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import HtmlRenderer from '../Leetcode/HtmlRenderer';

function Lecture() {
    const { title } = useParams();

    const lectureData = [
        {
            id: 'introduction',
            heading: 'Introduction to Java',
            content: `
                <p>Welcome to the <strong>Java Programming Language</strong> tutorial. Java is a popular, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a versatile language used for developing mobile, web, and desktop applications.</p>
                <p>In this tutorial, we will cover the basics of Java, from setting up the environment to writing your first Java program. By the end of this tutorial, you will have a strong foundation in Java and be able to build simple applications.</p>
            `
        },
        {
            id: 'setup-environment',
            heading: 'Setting Up the Java Development Environment',
            content: `
                <p>Before we start coding in Java, we need to set up our development environment. Here's how you can get started:</p>
                <ol>
                    <li>Download and install the latest version of the <a href="https://www.oracle.com/java/technologies/javase-jdk11-downloads.html" target="_blank">Java Development Kit (JDK)</a>.</li>
                    <li>Set up the <code>JAVA_HOME</code> environment variable.</li>
                    <li>Install an Integrated Development Environment (IDE) like <a href="https://www.jetbrains.com/idea/download/" target="_blank">IntelliJ IDEA</a> or <a href="https://www.eclipse.org/downloads/" target="_blank">Eclipse</a>.</li>
                    <li>Verify the installation by opening a terminal and typing <code>java -version</code>.</li>
                </ol>
                <p>Once the environment is set up, you're ready to start coding!</p>
            `
        },
        {
            id: 'hello-world',
            heading: 'Writing Your First Java Program',
            content: `
                <p>Let's write our first Java program, commonly known as the "Hello, World!" program. This simple program will print "Hello, World!" to the console.</p>
                <pre>
    <code class="language-java">
    public class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }
    </code>
                </pre>
                <p>To run this program:</p>
                <ol>
                    <li>Save the file as <code>HelloWorld.java</code>.</li>
                    <li>Open a terminal and navigate to the directory where the file is saved.</li>
                    <li>Compile the program using <code>javac HelloWorld.java</code>.</li>
                    <li>Run the program using <code>java HelloWorld</code>.</li>
                </ol>
                <p>You should see the output: <code>Hello, World!</code></p>
            `
        },
        {
            id: 'java-syntax',
            heading: 'Understanding Basic Java Syntax',
            content: `
                <p>Java has a specific syntax that you need to follow to write valid programs. Here are some key elements of Java syntax:</p>
                <ul>
                    <li><strong>Class:</strong> A class is a blueprint for creating objects. Every Java program must have at least one class.</li>
                    <li><strong>Main Method:</strong> The entry point for any Java program. It is defined as <code>public static void main(String[] args)</code>.</li>
                    <li><strong>Statements:</strong> Instructions in a Java program that are executed sequentially.</li>
                    <li><strong>Comments:</strong> Used to describe the code. Single-line comments start with <code>//</code> and multi-line comments are enclosed in <code>/* ... */</code>.</li>
                </ul>
                <p>Here's an example that demonstrates these elements:</p>
                <pre>
    <code class="language-java">
    /* This is a simple Java program */
    public class Example {
        // The main method is the entry point of the program
        public static void main(String[] args) {
            // This statement prints a message to the console
            System.out.println("Learning Java is fun!");
        }
    }
    </code>
                </pre>
                <p>In the code above, we have defined a class named <code>Example</code> with a <code>main</code> method that prints a message to the console.</p>
            `
        },
        {
            id: 'variables-datatypes',
            heading: 'Working with Variables and Data Types',
            content: `
                <p>Variables are used to store data in a Java program. Each variable has a <strong>data type</strong> that determines the kind of data it can hold. Common data types in Java include:</p>
                <ul>
                    <li><code>int</code> - for integers (e.g., <code>int x = 5;</code>)</li>
                    <li><code>double</code> - for floating-point numbers (e.g., <code>double pi = 3.14;</code>)</li>
                    <li><code>char</code> - for single characters (e.g., <code>char initial = 'A';</code>)</li>
                    <li><code>String</code> - for sequences of characters (e.g., <code>String name = "Alice";</code>)</li>
                    <li><code>boolean</code> - for true/false values (e.g., <code>boolean isJavaFun = true;</code>)</li>
                </ul>
                <p>Here's an example that illustrates the use of variables and data types:</p>
                <pre>
    <code class="language-java">
    public class VariablesExample {
        public static void main(String[] args) {
            int age = 25; // Integer variable
            double salary = 85000.50; // Double variable
            char grade = 'A'; // Character variable
            String name = "John Doe"; // String variable
            boolean isEmployed = true; // Boolean variable
    
            System.out.println("Name: " + name);
            System.out.println("Age: " + age);
            System.out.println("Salary: $" + salary);
            System.out.println("Grade: " + grade);
            System.out.println("Employed: " + isEmployed);
        }
    }
    </code>
                </pre>
                <p>The code above declares variables of different data types and prints their values to the console.</p>
            `
        },
        {
            id: 'control-statements',
            heading: 'Control Statements in Java',
            content: `
                <p>Control statements allow you to control the flow of execution in a Java program. The most commonly used control statements include:</p>
                <ul>
                    <li><code>if</code> - Executes a block of code if a specified condition is true.</li>
                    <li><code>else</code> - Executes a block of code if the condition in the <code>if</code> statement is false.</li>
                    <li><code>for</code> - Executes a block of code a specified number of times.</li>
                    <li><code>while</code> - Repeats a block of code while a condition is true.</li>
                    <li><code>switch</code> - Selects one of many code blocks to execute.</li>
                </ul>
                <p>Here's an example using <code>if</code> and <code>for</code> statements:</p>
                <pre>
    <code class="language-java">
    public class ControlStatementsExample {
        public static void main(String[] args) {
            int number = 10;
    
            // If statement
            if (number > 0) {
                System.out.println("Number is positive.");
            } else {
                System.out.println("Number is non-positive.");
            }
    
            // For loop
            System.out.println("Counting from 1 to 5:");
            for (int i = 1; i <= 5; i++) {
                System.out.println(i);
            }
        }
    }
    </code>
                </pre>
                <p>In this code, we check if a number is positive using an <code>if</code> statement and then use a <code>for</code> loop to count from 1 to 5.</p>
            `
        }
    ];
    
    return (
        <div>
            {/* <div className='absolute right-2 top-10 font-semibold rounded p-2 border-2'>
                <p className='flex gap-3'>Uploaded by: <p className='font-normal'>Yadi Choudhary</p></p>
                <p className='flex gap-3'>Date: <p className='font-normal'>12/08/2024</p></p>
                <p className='flex gap-3'>15 <p className='font-normal'>min read</p></p>
            </div> */}
            <IconBreadcrumbs currentPage={"Tutorial"} title={"learn"} question={title || 'Default Title'} />
            <hr />
            <div className='md:flex'>
                <div className='mt-10 ml-5 md:mt-20 md:ml-5'>
                    <p className='font-bold my-5 mx-1 text-lg  flex  '>Topics in this Lecture <p className='ml-3 text-gray-400'>[{lectureData.length}]</p></p>
                    <ul>
                        {lectureData.map((section, index) => (
                            <li className='flex mt-2' key={section.id}>
                                <RadioButtonCheckedIcon fontSize='sm' className='mt-1.5 mr-1  text-blue-500' />  <a href={`#${section.id}`} className=' text-blue-500 underline'>
                                    {section.heading}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ borderLeft: "1px solid #000", marginLeft:20 }}></div>
                <div>
                    <div className='uppercase text-gray-500 underline decoration-sky-600 md:decoration-blue-400 rounded ml-5 mt-5 md:mx-5 md:mt-20 font-bold text-3xl'>{title}</div>

                    {lectureData.map((section, index) => (
                        <div key={section.id} id={section.id} className='ml-1 mt-5 md:ml-10 md:mt-20'>
                            <h2 className='text-2xl font-bold flex'><div className='text-base font-normal  border-1 bg-black text-white mr-2 px-2.5 pt-0.5' style={{ borderRadius: "50%" }}>{index + 1}</div> {section.heading}</h2>
                            <hr />
                            <p className='text-lg text-gray-500'><HtmlRenderer htmlContent={section.content || ""} /></p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Lecture;
