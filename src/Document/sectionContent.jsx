import React from 'react';

// Define content for each section
const sectionContent = {
  'introduction': (
    <>
      <h2>1. Introduction</h2>

      <div >
        <h3>Welcome to <span style={{ color: '#007acc' }}>Your Online Coding Platform</span></h3>
        <br />
        <p>
          <strong>Your One-Stop Solution</strong> for all coding enthusiasts, whether you're a student eager to learn, practice, and excel in programming, or a teacher looking to create engaging educational content.
        </p>

        <p>
          Our platform offers a comprehensive suite of features designed to empower <strong>students</strong> and <strong>educators</strong> alike:
        </p>

        <ul className='a'>
          <li><strong>Tutorials & Courses:</strong> Dive deep into programming with our expertly crafted tutorials and courses, covering a wide range of topics from beginner to advanced levels.</li>
          <li><strong>Practice & Assessments:</strong> Hone your skills through <strong>tests</strong>, <strong>hackathons</strong>, and <strong>quizzes</strong> that challenge your knowledge and prepare you for real-world scenarios.</li>
          <li><strong>Multi-language Code Compiler:</strong> Experiment and execute code in over <strong>10+ programming languages</strong> directly within our platform, making learning interactive and hands-on.</li>
          <li><strong>Course Creation for Educators:</strong> Teachers and professors can effortlessly create their own <strong>courses</strong>, <strong>tests</strong>, <strong>hackathons</strong>, <strong>quizzes</strong>, and <strong>lectures</strong>, tailoring content to meet the unique needs of their students.</li>
          <li><strong>Assignment & Progress Tracking:</strong> Assign tasks and track student progress in real-time, identifying areas for improvement and providing targeted support.</li>
        </ul>

        <p>
          With <strong>seamless integration</strong> of all these features on a single platform, we aim to create a vibrant community where students and educators can connect, collaborate, and thrive together.
        </p>

        <p style={{ fontStyle: 'italic' }}>
          Join us and experience a <strong>new era of learning</strong>, where knowledge meets convenience, and progress is just a click away.
        </p>
      </div>





      <img src="./DocNAv.png" alt="Features" />
      <h3>Purpose</h3>
      <p>
        This documentation aims to guide users, contributors, and developers through the features and functionalities of the website.
      </p>
    </>
  ),
  'getting-started': (
    <>
      <div className="getting-started">
        <h2>2.Getting Started with <span style={{ color: '#007acc' }}>Our Online Coding Platform</span></h2>

        <p>
          Welcome to the beginning of your journey with our platform! Whether you're a student eager to learn or an educator looking to share your knowledge, we've made getting started as simple as possible.
        </p>

        <h3>1. Sign Up & Set Up Your Profile</h3>
        <p>
          To start using the platform, you first need to <strong><a href="./login">sign up</a></strong>. Click on the <strong><a href="./login">"Sign Up"</a></strong> button on the top right corner of the homepage and follow the instructions. Once you've created an account, take a moment to set up your profile. This helps personalize your experience on the platform.
        </p>

        <h3>2. Explore the Dashboard</h3>
        <p>
          After logging in, you'll be greeted by your <strong><a href="./login">dashboard</a></strong>. The dashboard is your control center, giving you quick access to all the features you need:
        </p>
        <ul className='a'>
          <li><strong>Students:</strong> Explore available courses, tutorials, and practice challenges.</li>
          <li><strong>Educators:</strong> Create new courses, assignments, and track student progress.</li>
          <li><strong>Code Editor:</strong> Access our integrated code editor to practice coding in multiple languages.</li>
        </ul>

        <h3>3. Enroll in Courses or Create Content</h3>
        <p>
          <strong>Students:</strong> Browse through our extensive list of courses and tutorials. Once you find something that piques your interest, simply <strong>enroll</strong> and start learning.
        </p>
        <p>
          <strong>Educators:</strong> Head to the <strong>"Create Content"</strong> section, where you can design and publish your own courses, quizzes, and assignments. Our user-friendly interface makes content creation a breeze.
        </p>

        <h3>4. Start Practicing & Tracking Progress</h3>
        <p>
          The best way to learn is by doing. Use our <strong>online code compiler</strong> to write, test, and debug your code in real-time. As you progress, your dashboard will display your <strong>learning achievements</strong> and help you identify areas where you can improve.
        </p>

        <h3>5. Join the Community</h3>
        <p>
          Connect with fellow learners and educators through our community features. Participate in discussions, join hackathons, and engage in group projects. Learning is always better when done together!
        </p>

        <p style={{ fontStyle: 'italic' }}>
          Ready to dive in? Let's get started and take your coding skills to the next level!
        </p>
      </div>


    </>
  ),
  'courses-section': (
    <>
      <div className="courses-section">
        <h2>3. Courses Section</h2>

        <p>
          The <strong>Courses Section</strong> is the heart of our learning platform, offering a rich variety of educational content designed to help students and educators excel. Whether you're looking to dive into a new subject, enhance your skills, or create engaging educational material, this section has everything you need.
        </p>

        <h3>For Students</h3>
        <p>
          Students can explore an extensive range of courses tailored to different skill levels and interests. Here’s what you can expect:
        </p>
        <ul className="a">
          <li><strong>Curated Courses:</strong> Browse through a diverse catalog of courses, from introductory lessons to advanced topics, all curated to provide a comprehensive learning experience.</li>
          <li><strong>Interactive Content:</strong> Engage with interactive lessons, videos, and exercises designed to enhance your understanding and retention of key concepts.</li>
          <li><strong>Hands-On Practice:</strong> Apply what you’ve learned with practical coding challenges and projects integrated into the courses.</li>
          <li><strong>Track Your Progress:</strong> Monitor your progress with built-in tracking tools that help you stay on top of your learning journey and achievements.</li>
        </ul>

        <h3>For Educators</h3>
        <p>
          Educators can create, manage, and share their own courses with ease. Here’s how the Courses Section supports teachers:
        </p>
        <ul className="a">
          <li><strong>Create Custom Courses:</strong> Design and publish your own courses, complete with lessons, quizzes, and assignments tailored to your curriculum.</li>
          <li><strong>Manage Course Content:</strong> Edit and update course materials as needed to keep content current and relevant.</li>
          <li><strong>Engage Your Students:</strong> Use interactive tools and multimedia elements to make your courses engaging and effective.</li>
          <li><strong>Monitor Student Performance:</strong> Track student progress and performance within your courses to provide targeted support and feedback.</li>
        </ul>

        <p>
          The <strong>Courses Section</strong> is designed to facilitate an enriching learning experience for both students and educators, offering tools and features that enhance education and streamline course management. Dive in and explore the wealth of knowledge and opportunities available!
        </p>
      </div>

    </>
  ),
  'online-editor': (
    <>
      <div className="online-editor">
        <h2>4. Online Code Editor</h2>

        <p>
          Our <strong><a href="/EditorComponent">Online Code Editor</a></strong> is designed to provide a seamless coding experience without the need for any downloads or external compilers. Whether you're a student or a professional, you can start coding instantly in a wide range of programming languages directly within your browser.
        </p>

        <h3>Key Features of Our Online Editor</h3>
        <ul className='a'>
          <li><strong>No Setup Required:</strong> Jump right into coding without the hassle of setting up a development environment. Our editor is ready to go, anytime, anywhere.</li>
          <li><strong>Multi-Language Support:</strong> Write and execute code in over <strong>10+ programming languages</strong>, including Python, Java, C++, JavaScript, and more.</li>
          <li><strong>Real-Time Code Execution:</strong> See the results of your code instantly. Our editor compiles and runs your code in real-time, making it perfect for learning, practicing, and testing your skills.</li>
          <li><strong>Integrated Development Tools:</strong> Enjoy features like syntax highlighting, auto-completion, and error detection, all within the same interface.</li>
          <li><strong>Save & Share Your Work:</strong> Easily save your code and share it with others. Whether you're collaborating on a project or seeking feedback, our editor makes it simple.</li>
        </ul>

        <p>
          With our <strong><a href="/EditorComponent">Online Code Editor</a></strong>, coding is accessible and convenient, eliminating the need for complex setups or external tools. Just open your browser, and you're ready to code!
        </p>
      </div>

    </>
  ),
  'dashboard': (
    <>
      <div className="personalized-dashboard">
        <h2>5. Personalized Dashboard</h2>

        <p>
          The <strong>Personalized Dashboard</strong> is your central hub for everything on our platform. Tailored to your unique learning and teaching needs, the dashboard provides quick access to all your activities and progress in one convenient location.
        </p>

        <h3>Key Features of the Personalized Dashboard</h3>
        <ul className="a">
          <li><strong>Custom Learning Paths:</strong> Based on your interests and progress, the dashboard suggests courses, tutorials, and practice challenges that match your skill level.</li>
          <li><strong>Progress Tracking:</strong> Keep an eye on your achievements and milestones. The dashboard displays detailed reports on your course completions, quiz scores, and overall progress.</li>
          <li><strong>Quick Access to Tools:</strong> Access your most frequently used features, such as the online editor, enrolled courses, and assignments, directly from your dashboard.</li>
          <li><strong>Notifications & Updates:</strong> Stay informed with real-time notifications about new courses, upcoming tests, deadlines, and important announcements.</li>
          <li><strong>Educator's Dashboard:</strong> For educators, the dashboard offers tools to manage courses, view student progress, grade assignments, and more, all from a single interface.</li>
        </ul>

        <p>
          Our <strong>Personalized Dashboard</strong> is designed to enhance your experience on the platform by providing a streamlined, user-friendly interface that adapts to your specific needs. Whether you're tracking your learning journey or managing a course, everything you need is just a click away.
        </p>
      </div>

    </>
  ),
  'contests-section': (
    <>
      <div className="contests-section">
        <h2>6. Contests Section</h2>

        <p>
          The <strong>Contests Section</strong> is a dynamic feature of our platform designed to foster competitive programming and enhance problem-solving skills. Whether you're a student eager to test your skills or an educator looking to organize engaging coding challenges, this section offers exciting opportunities for all.
        </p>

        <h3>For Students</h3>
        <p>
          Students can participate in a variety of coding contests that challenge their abilities and encourage continuous learning. Here's what you can enjoy:
        </p>
        <ul className="a">
          <li><strong>Regular Contests:</strong> Take part in regularly scheduled contests that cover a wide range of topics and difficulty levels, designed to keep you engaged and improving.</li>
          <li><strong>Real-Time Competitions:</strong> Compete in real-time with other coders, solving problems and optimizing solutions to climb the leaderboard.</li>
          <li><strong>Varied Problem Sets:</strong> Challenge yourself with diverse problem sets that test different aspects of programming and algorithmic thinking.</li>
          <li><strong>Track Your Performance:</strong> View detailed performance metrics, track your progress over time, and see how you stack up against other participants.</li>
        </ul>

        <h3>For Educators</h3>
        <p>
          Educators can create and manage their own coding contests to engage students and promote a competitive learning environment. Features include:
        </p>
        <ul className="a">
          <li><strong>Create Custom Contests:</strong> Design and set up contests with tailored problem sets, rules, and time limits to match your educational goals.</li>
          <li><strong>Manage Contest Details:</strong> Easily manage contest details, including scheduling, participant registration, and problem distribution.</li>
          <li><strong>Monitor Contest Results:</strong> Track participant performance in real-time, view detailed results, and analyze outcomes to assess skills and progress.</li>
          <li><strong>Encourage Participation:</strong> Promote contests to your students to foster a spirit of friendly competition and enhance their problem-solving skills.</li>
        </ul>

        <p>
          The <strong>Contests Section</strong> is designed to make coding competitions accessible and enjoyable, providing a platform where skills can be tested, improved, and showcased. Dive into our contests and discover the thrill of competitive programming!
        </p>
      </div>

    </>
  ),
  'user-interaction': (
    <>
     <div className="user-interaction">
  <h2>7. User Interaction</h2>

  <p>
    This section describes how users interact with the platform, including key features and functionalities designed to enhance user experience. We aim to provide a seamless and engaging environment for both students and educators.
  </p>

  <h3>1. User Interface (UI)</h3>
  <p>
    Our platform's user interface is designed with a focus on usability and accessibility. Key features include:
    <ul className="a">
      <li><strong>Responsive Design:</strong> The interface adjusts to different screen sizes and devices, ensuring a consistent experience across desktops, tablets, and smartphones.</li>
      <li><strong>Intuitive Navigation:</strong> Easy-to-use navigation menus and links help users find what they need quickly.</li>
      <li><strong>Interactive Elements:</strong> Buttons, forms, and other interactive elements are designed to be user-friendly and visually appealing.</li>
    </ul>
  </p>

  <h3>2. User Registration and Authentication</h3>
  <p>
    Users can register and authenticate using secure methods. Key features include:
    <ul className="a">
      <li><strong>Sign Up:</strong> New users can create an account by providing essential information such as email, password, and user role (student or educator).</li>
      <li><strong>Login:</strong> Registered users can log in using their email and password. Options for password recovery are available.</li>
      <li><strong>Role-Based Access:</strong> Users are assigned roles that determine their access and permissions within the platform.</li>
    </ul>
  </p>

  <h3>3. Interactive Features</h3>
  <p>
    The platform offers various interactive features to enhance user engagement:
    <ul className="a">
      <li><strong>Code Editor:</strong> An integrated online code editor allows users to write, compile, and test code in multiple programming languages directly in their browser.</li>
      <li><strong>Quizzes and Tests:</strong> Interactive quizzes and tests assess user knowledge and provide instant feedback.</li>
      <li><strong>Discussion Forums:</strong> Forums enable users to discuss topics, ask questions, and share knowledge with peers and educators.</li>
    </ul>
  </p>

  <h3>4. Personalization</h3>
  <p>
    Users can personalize their experience to better suit their needs:
    <ul className="a">
      <li><strong>Profile Customization:</strong> Users can update their profile information, including profile picture, bio, and contact details.</li>
      <li><strong>Dashboard:</strong> A personalized dashboard provides users with quick access to their courses, assignments, and progress reports.</li>
      <li><strong>Notification Preferences:</strong> Users can set their preferences for receiving notifications about course updates, assignments, and platform announcements.</li>
    </ul>
  </p>

  <h3>5. Feedback and Support</h3>
  <p>
    Users can provide feedback and seek support through the following channels:
    <ul className="a">
      <li><strong>Feedback Forms:</strong> Users can submit feedback or suggestions via built-in feedback forms accessible from their dashboard.</li>
      <li><strong>Help Center:</strong> A dedicated help center provides access to FAQs, troubleshooting guides, and contact information for support.</li>
      <li><strong>Support Tickets:</strong> Users can create support tickets for specific issues or requests, which are tracked and resolved by our support team.</li>
    </ul>
  </p>

  <h3>6. Accessibility</h3>
  <p>
    We prioritize accessibility to ensure that all users, including those with disabilities, can effectively use the platform:
    <ul className="a">
      <li><strong>Keyboard Navigation:</strong> The platform supports full keyboard navigation for users who cannot use a mouse.</li>
      <li><strong>Screen Reader Compatibility:</strong> The platform is compatible with screen readers to assist visually impaired users.</li>
      <li><strong>Color Contrast:</strong> High color contrast and customizable themes improve readability and visual accessibility.</li>
    </ul>
  </p>
</div>

    </>
  ),
  'contribution-guide': (
    <>
      <div className="contribution-guide">
        <h2>8. Contribution Guide</h2>

        <p>
          We welcome contributions from the community to enhance and expand our platform. If you're interested in contributing to our project, please follow the guidelines below to get started.
        </p>

        <h3>Getting Started</h3>
        <p>
          Before contributing, make sure to familiarize yourself with our project. The frontend is built with <strong>React</strong>, <strong>Material UI</strong>, <strong>Bootstrap</strong>, <strong>JavaScript</strong>, and <strong>Tailwind CSS</strong>, while the backend is developed using <strong>Java</strong> and <strong>Spring Boot</strong>. The server is hosted on <strong>AWS</strong>.
        </p>

        <h3>Project Repositories</h3>
        <p>
          - <strong>Frontend:</strong> [Code-with-challenge](https://github.com/Priyanshu-choudhary/Code-with-challenge.git)<br />
          - <strong>Backend:</strong> [testCFC](https://github.com/Priyanshu-choudhary/testCFC.git)
        </p>

        <h3>Contribution Steps</h3>
        <ul className="a">
          <li><strong>Fork the Repository:</strong> Click on the <strong>"Fork"</strong> button on the top right corner of the GitHub repository page to create a copy of the repository under your own GitHub account.</li>
          <li><strong>Clone the Repository:</strong> Clone your forked repository to your local machine using <code>git clone "https://github.com/Priyanshu-choudhary/Code-with-challenge.git"</code>.</li>
          <li><strong>Create a New Branch:</strong> Create a new branch for your changes using <code>git checkout -b "Your-branch-name"</code>.</li>
          <li><strong>Make Changes:</strong> Implement your changes or new features in your local branch. Be sure to follow the project's coding standards and guidelines.</li>
          <li><strong>Commit Your Changes:</strong> Commit your changes with a clear and concise commit message using <code>git commit -m "Your commit message"</code>.</li>
          <li><strong>Push Your Changes:</strong> Push your changes to your forked repository using <code>git push origin "master"</code>.</li>
          <li><strong>Open a Pull Request:</strong> Navigate to the original repository and open a pull request to merge your changes. Provide a detailed description of your changes and why they are beneficial.</li>
        </ul>

        <h3>Code of Conduct</h3>
        <p>
          We ask all contributors to adhere to our <strong>Code of Conduct</strong>. Be respectful, collaborative, and constructive in all interactions within the community.
        </p>

        <h3>Additional Resources</h3>
        <p>
          - [Frontend Documentation](https://github.com/Priyanshu-choudhary/Code-with-challenge.git)<br />
          - [Backend Documentation](https://github.com/Priyanshu-choudhary/testCFC.git)
        </p>

        <p>
          Thank you for your interest in contributing to our project! We appreciate your support and look forward to collaborating with you.
        </p>
      </div>

    </>
  ),
  'api-documentation': (
    <>
      <div className="api-documentation">
        <h2>9. API Documentation</h2>
        <p>
          The base URL for accessing the APIs is: <code>https://api.yourplatform.com/</code>
        </p>

        <h3>Endpoints</h3>

        <h4>1. Endpoint Name</h4>
        <p>
          <strong>URL:</strong> <code>/api/endpoint1</code><br />
          <strong>Method:</strong> GET/POST/PUT/DELETE<br />
          <strong>Description:</strong> Description of what this endpoint does.<br />
          <strong>Parameters:</strong>
          <ul className="a">
            <li><strong>param1:</strong> Description of parameter 1</li>
            <li><strong>param2:</strong> Description of parameter 2</li>
          </ul>
          <strong>Request Example:</strong>
          <code>
            curl -X GET "https://api.yourplatform.com/api/endpoint1" -H "Authorization: Bearer YOUR_API_KEY"
          </code>
          <strong>Response Example:</strong>
          <code>

            "key": "value",
            "key2": "value2"

          </code>
        </p>
      </div>

    </>
  ),
  'deployment-guide': (
    <>
      <div className="deployment-guide">
        <h2>10 .Deployment Guide</h2>

        <p>
          This guide provides the necessary steps to deploy our platform on your server. The deployment process involves setting up both the frontend and backend components of the application. Follow the instructions below to get your platform up and running.
        </p>

        <h3>Prerequisites</h3>
        <ul className="a">
          <li><strong>Node.js:</strong> Ensure you have Node.js and npm (Node Package Manager) installed for managing frontend dependencies.</li>
          <li><strong>Java:</strong> Ensure you have Java Development Kit (JDK) installed for building and running the backend application.</li>
          <li><strong>Maven:</strong> Apache Maven is used for managing the backend project's dependencies and build lifecycle.</li>
          <li><strong>AWS Account:</strong> If deploying on AWS, ensure you have an active AWS account and access to necessary services.</li>
        </ul>

        <h3>Frontend Deployment</h3>
        <ol className="a">
          <li><strong>Clone the Repository:</strong> Clone the frontend repository from GitHub using the command:
            <code>
              git clone https://github.com/Priyanshu-choudhary/Code-with-challenge.git
            </code>
          </li>
          <li><strong>Install Dependencies:</strong> Navigate to the project directory and install the required dependencies:
            <code>
              cd Code-with-challenge
              npm install
            </code>
          </li>
          <li><strong>Build the Project:</strong> Build the frontend application for production:
            <code>
              npm run build
            </code>
          </li>
          <li><strong>Deploy the Build Directory:</strong> Deploy the contents of the <code>build</code> directory to your web server or hosting platform.</li>
        </ol>

        <h3>Backend Deployment</h3>
        <ol className="a">
          <li><strong>Clone the Repository:</strong> Clone the backend repository from GitHub using the command:
            <code>
              git clone https://github.com/Priyanshu-choudhary/testCFC.git
            </code>
          </li>
          <li><strong>Install Dependencies:</strong> Navigate to the project directory and install the required dependencies:
            <code>
              cd testCFC
              mvn install
            </code>
          </li>
          <li><strong>Configure Application:</strong> Update the application properties or configuration files with your database and server settings.</li>
          <li><strong>Build and Run the Application:</strong> Build the backend application and run it:
            <code>
              mvn package
              java -jar target/your-backend-app.jar
            </code>
          </li>
          <li><strong>Deploy to AWS (Optional):</strong> If deploying to AWS, configure your EC2 instance, upload the JAR file, and run it. Configure your security groups and load balancers as needed.</li>
        </ol>

        <h3>Post-Deployment</h3>
        <ul className="a">
          <li><strong>Test the Application:</strong> Verify that both frontend and backend are functioning correctly by accessing the application through your web browser.</li>
          <li><strong>Monitor and Maintain:</strong> Set up monitoring and logging to track application performance and errors. Regularly update dependencies and apply security patches.</li>
          <li><strong>Backup:</strong> Implement a backup strategy for your database and application data to prevent data loss.</li>
        </ul>

        <p>
          For detailed information or troubleshooting, refer to the documentation provided in the repositories or contact our support team.
        </p>
      </div>

    </>
  ),
  'faq': (
    <>
      <div className="faq-troubleshooting">
        <h2>11. FAQ / Troubleshooting</h2>

        <p>
          This section addresses common questions and issues you might encounter while using our platform. If you encounter any problems not covered here, please refer to the documentation or contact our support team.
        </p>

        <h3>Frequently Asked Questions (FAQ)</h3>

        <h4>1. How do I reset my password?</h4>
        <p>
          To reset your password, go to the <a href="./login">Login</a> page and click on the <strong>"Forgot Password"</strong> link. Follow the instructions provided to reset your password via email.
        </p>

        <h4>2. How can I contact support?</h4>
        <p>
          If you need assistance, you can contact our support team by emailing <strong>support@yourplatform.com</strong>. Please provide detailed information about your issue for a quicker resolution.
        </p>

        <h4>3. What browsers are supported?</h4>
        <p>
          Our platform supports the latest versions of major browsers, including Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge. For the best experience, ensure you are using an up-to-date browser.
        </p>

        <h4>4. How can I update my profile information?</h4>
        <p>
          To update your profile information, log in to your account and navigate to the <strong>"Profile"</strong> section. You can update your personal details and save changes from there.
        </p>

        <h4>5. Can I export my code or assignments?</h4>
        <p>
          Yes, you can export your code or assignments from the <strong>"Assignments"</strong> section. Look for the <strong>"Export"</strong> button or option to download your work in the desired format.
        </p>

        <h3>Troubleshooting</h3>

        <h4>1. I can't log in to my account.</h4>
        <p>
          - Ensure you are using the correct username and password.<br />
          - Check if your account is locked or inactive.<br />
          - Try resetting your password using the <a href="./login">"Forgot Password"</a> link.<br />
          - If the issue persists, contact our support team for assistance.
        </p>

        <h4>2. The page is not loading correctly.</h4>
        <p>
          - Try clearing your browser cache and cookies.<br />
          - Ensure your internet connection is stable.<br />
          - Check for browser extensions or ad blockers that might be interfering with the page.<br />
          - Try accessing the page from a different browser or device.<br />
          - If the problem continues, check our <a href="#status">System Status</a> page for any ongoing issues.
        </p>

        <h4>3. I received an error message while submitting an assignment.</h4>
        <p>
          - Verify that all required fields are filled out correctly.<br />
          - Ensure that the file format and size meet the submission requirements.<br />
          - If the error message is unclear, note the error code and contact support for further assistance.
        </p>

        <h4>4. The editor is not compiling my code.</h4>
        <p>
          - Check for syntax errors in your code.<br />
          - Ensure that you have selected the correct language and compiler.<br />
          - Refresh the editor and try compiling again.<br />
          - If the issue persists, check if there are any updates or maintenance notices on our <a href="#status">System Status</a> page.
        </p>

        <h4>5. I can't access certain features.</h4>
        <p>
          - Verify that you have the necessary permissions or subscription level to access the features.<br />
          - Log out and log back in to refresh your session.<br />
          - Contact support if you believe you should have access but are encountering issues.
        </p>

        <h3>Contact Support</h3>
        <p>
          For additional assistance or if your issue is not addressed here, please reach out to our support team at <strong>support@yourplatform.com</strong>. We are here to help you.
        </p>
      </div>

    </>
  ),
  'appendices': (
    <>
      <div className="appendices">
        <h2>12. Appendices</h2>

        <p>
          The Appendices section provides additional information that may be useful for understanding and working with our platform. This includes supplementary details, references, and resources related to the project.
        </p>

        <h3>1. Glossary</h3>
        <p>
          <strong>API:</strong> Application Programming Interface - A set of rules and protocols for building and interacting with software applications.<br />
          <strong>Frontend:</strong> The part of the application that users interact with directly.<br />
          <strong>Backend:</strong> The server-side part of the application that handles data processing and storage.<br />
          <strong>Deployment:</strong> The process of making an application available for use by deploying it to a server or hosting platform.<br />
          <strong>Repository:</strong> A storage location for software code and related files, often hosted on platforms like GitHub.
        </p>

        <h3>2. References</h3>
        <p>
          - [React Documentation](https://reactjs.org/docs/getting-started.html): Official React documentation for understanding the core concepts of React.<br />
          - [Material UI Documentation](https://mui.com/getting-started/installation/): Guide to using Material UI for building user interfaces.<br />
          - [Spring Boot Documentation](https://spring.io/projects/spring-boot): Official documentation for Spring Boot for building Java-based backend applications.<br />
          - [AWS Documentation](https://aws.amazon.com/documentation/): Comprehensive resources for deploying and managing applications on AWS.<br />
          - [GitHub](https://github.com/): Repository hosting service for managing and sharing code.
        </p>

        <h3>3. Additional Resources</h3>
        <p>
          - <strong>API Testing Tools:</strong> Tools such as Postman and Insomnia for testing and interacting with APIs.<br />
          - <strong>Code Editors:</strong> Recommended editors like VS Code or Sublime Text for coding and development.<br />
          - <strong>Learning Resources:</strong> Online courses and tutorials for React, Spring Boot, and AWS on platforms like Coursera, Udemy, and Pluralsight.
        </p>

        <h3>4. System Requirements</h3>
        <p>
          <strong>Frontend:</strong> Requires a modern web browser (Chrome, Firefox, Safari, Edge) and a stable internet connection.<br />
          <strong>Backend:</strong> Requires Java 11 or higher, Maven, and access to a database (e.g., MongoDB, MySQL).<br />
          <strong>Development Environment:</strong> Node.js and npm for frontend development; Java Development Kit (JDK) and Maven for backend development.
        </p>

        <h3>5. Changelog</h3>
        <p>
          <strong>Version 1.0.0:</strong> Initial release of the platform with core features including user management, course creation, and online coding editor.<br />
          <strong>Version 1.1.0:</strong> Added support for contests and quizzes, enhanced user dashboard features.<br />
          <strong>Version 1.2.0:</strong> Introduced new API endpoints, improved deployment instructions, and updated documentation.
        </p>

        <h3>6. Contact Information</h3>
        <p>
          For further inquiries or feedback, please reach out to us via email at <strong>support@yourplatform.com</strong> or visit our <a href="https://github.com/Priyanshu-choudhary/testCFC.git">GitHub repository</a> for additional details and contributions.
        </p>
      </div>

    </>
  ),
  'version-control': (
    <>
      <div className="version-control">
        <h2>13. Version Control</h2>

        <p>
          Version control is crucial for maintaining and tracking changes to the documentation alongside platform updates. This section explains how the documentation is managed and synchronized with the platform's versioning system.
        </p>

        <h3>1. Documentation Versioning</h3>
        <p>
          Our documentation is versioned to correspond with the releases of the platform. Each version of the documentation aligns with a specific version of the platform, ensuring that users have access to the most relevant and up-to-date information.
        </p>

        <h4>Versioning Scheme</h4>
        <p>
          We use a versioning scheme similar to Semantic Versioning (SemVer) for both the platform and the documentation. This scheme includes:
          <ul className="a">
            <li><strong>Major Version:</strong> Incremented for significant changes or updates that might affect backward compatibility.</li>
            <li><strong>Minor Version:</strong> Incremented for minor updates or feature additions that are backward-compatible.</li>
            <li><strong>Patch Version:</strong> Incremented for bug fixes or minor improvements that do not affect functionality.</li>
          </ul>
        </p>

        <h3>2. Documentation Repository</h3>
        <p>
          The documentation is maintained in a separate repository from the platform's codebase to facilitate easier updates and management. The repository is versioned alongside the platform, with each tag in the repository corresponding to a specific release of the platform.
        </p>

        <h4>Repository Links</h4>
        <p>
          - <strong>Frontend Documentation Repository:</strong> [Code-with-challenge](https://github.com/Priyanshu-choudhary/Code-with-challenge.git)<br />
          - <strong>Backend Documentation Repository:</strong> [testCFC](https://github.com/Priyanshu-choudhary/testCFC.git)
        </p>

        <h3>3. Updating Documentation</h3>
        <p>
          Documentation updates are made in conjunction with platform updates. The following process is followed:
          <ul className="a">
            <li><strong>Release Planning:</strong> During the planning phase of a new platform release, updates required for the documentation are identified and documented.</li>
            <li><strong>Implementation:</strong> Documentation updates are implemented alongside the platform code changes, with version-specific adjustments as needed.</li>
            <li><strong>Review:</strong> The updated documentation is reviewed for accuracy and completeness before being merged into the main repository.</li>
            <li><strong>Release:</strong> When a new platform version is released, the corresponding version of the documentation is also published.</li>
          </ul>
        </p>

        <h3>4. Accessing Version History</h3>
        <p>
          To view the version history of the documentation, including changes and updates, refer to the version tags and commit history in the documentation repository. This information provides insights into the changes made in each version.
        </p>

        <h4>Viewing Version History</h4>
        <p>
          - Navigate to the <a href="https://github.com/Priyanshu-choudhary/Code-with-challenge.git">Frontend Documentation Repository</a> or <a href="https://github.com/Priyanshu-choudhary/testCFC.git">Backend Documentation Repository</a>.<br />
          - Check the <strong>"Tags"</strong> section for version tags corresponding to platform releases.<br />
          - Review the <strong>"Commits"</strong> section to see detailed changes made in each version.
        </p>

        <h3>5. Contributing to Documentation</h3>
        <p>
          Contributions to the documentation are welcomed. If you wish to contribute or suggest changes, please follow the contribution guidelines outlined in the documentation repository.
        </p>

        <h4>Contribution Guidelines</h4>
        <p>
          - Fork the repository and make changes in your fork.<br />
          - Submit a pull request with a description of the changes and their relevance.<br />
          - Ensure that your changes are well-documented and adhere to the formatting guidelines.<br />
          - Contributions are reviewed and merged by the documentation maintainers.
        </p>
      </div>

    </>
  ),
};

export default sectionContent;
