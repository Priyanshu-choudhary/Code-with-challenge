import React,{useState,useEffect} from 'react'

function Rules({value}) {
    const [contentHeight, setContentHeight] = useState(value);
useEffect(() => {
setContentHeight(value)
}, [value])

    return (
        <div style={{overflowY:"hidden",height:contentHeight}}>
            <div class="container">
            <p className="separator-gray"></p>

                <h3 style={{marginTop:15}}>1. General Rules</h3>
                <ul style={{marginLeft:50}}>
                    <li>Participants must register on the website to enter the contest.</li>
                    <li>Each participant must have a valid email address and provide accurate information during registration.</li>
                    <li>The contest is open to individuals and teams. Teams can have a maximum of <span class="highlight">X members</span>.</li>
                    <li>Participants must adhere to the timeline provided. Late submissions will not be accepted.</li>
                    <li>All communication during the contest must be in English.</li>
                </ul>

                <h3 style={{marginTop:15}}>2. Eligibility</h3>
                <ul style={{marginLeft:50}}>
                    <li>The contest is open to participants from all over the world.</li>
                    <li>Participants must be at least <span class="highlight">18 years old</span> or have parental consent if under 18.</li>
                    <li>Employees of the organizing company and their immediate family members are not eligible to participate.</li>
                </ul>

                <h3 style={{marginTop:15}}>3. Registration</h3>
                <ul style={{marginLeft:50}}>
                    <li>Participants must complete the registration form on the website before the deadline.</li>
                    <li>Registration is free, but each participant or team must provide their own equipment and internet connection.</li>
                </ul>

                <h3 style={{marginTop:15}}>4. Contest Structure</h3>
                <ul style={{marginLeft:50}}>
                    <li>The contest will have multiple rounds: <span class="highlight">qualification, semi-finals, and finals</span>.</li>
                    <li>Each round will have a set of coding problems that participants must solve within the given time frame.</li>
                    <li>Participants can use any programming language supported by the contest platform.</li>
                </ul>

                <h3 style={{marginTop:15}}>5. Code of Conduct</h3>
                <ul style={{marginLeft:50}}>
                    <li>Participants must write their own code. Collaboration with others outside of your team (if applicable) is strictly prohibited.</li>
                    <li>Plagiarism or copying code from the internet or other sources is not allowed.</li>
                    <li>Any form of cheating will result in immediate disqualification.</li>
                    <li>Participants must conduct themselves professionally and respectfully towards others.</li>
                </ul>

                <h3 style={{marginTop:15}}>6. Submission Guidelines</h3>
                <ul style={{marginLeft:50}}>
                    <li>All solutions must be submitted through the contest platform before the deadline.</li>
                    <li>Each problem will have specific input and output requirements that must be followed.</li>
                    <li>Participants can submit multiple solutions, but only the last submission will be evaluated.</li>
                </ul>

                <h3 style={{marginTop:15}}>7. Judging Criteria</h3>
                <ul style={{marginLeft:50}}>
                    <li>Submissions will be judged based on <span class="highlight">correctness, efficiency, and code quality</span>.</li>
                    <li>Each problem will have a set number of points, and the score will be calculated based on the number of problems solved and the total points earned.</li>
                    <li>In case of a tie, the participant or team with the faster submission time will be ranked higher.</li>
                </ul>

                <h3 style={{marginTop:15}}>8. Prizes</h3>
                <ul style={{marginLeft:50}}>
                    <li>Prizes will be awarded to the top <span class="highlight">X participants or teams</span> as per the leaderboard at the end of the contest.</li>
                    <li>Prizes are non-transferable and non-exchangeable.</li>
                    <li>The organizers reserve the right to substitute any prize with another of equivalent value without prior notice.</li>
                </ul>

                <h3 style={{marginTop:15}}>9. Intellectual Property</h3>
                <ul style={{marginLeft:50}}>
                    <li>Participants retain ownership of their code. However, by participating, they grant the organizers a non-exclusive, royalty-free license to use, reproduce, and display their submissions for promotional purposes.</li>
                    <li>Participants must ensure that their submissions do not infringe on any third-party intellectual property rights.</li>
                </ul>

                <h3 style={{marginTop:15}}>10. Privacy and Data Protection</h3>
                <ul style={{marginLeft:50}}>
                    <li>Participants' personal information will be used solely for the purposes of administering the contest.</li>
                    <li>Personal information will not be shared with third parties without consent, except as required by law.</li>
                </ul>

                <h3 style={{marginTop:15}}>11. Disqualification</h3>
                <ul style={{marginLeft:50}}>
                    <li>The organizers reserve the right to disqualify any participant or team that violates the rules or engages in unethical behavior.</li>
                    <li>Disqualified participants or teams will forfeit any prizes they may have won.</li>
                </ul>

                <h3 style={{marginTop:15}}>12. Amendments</h3>
                <ul style={{marginLeft:50}}>
                    <li>The organizers reserve the right to amend these rules at any time.</li>
                    <li>Any changes to the rules will be communicated to participants via email and on the contest website.</li>
                </ul>

                <h3 style={{marginTop:15}}>13. Contact Information</h3>
                <ul style={{marginLeft:50}}>
                    <li>For any queries or concerns regarding the contest, participants can contact the organizers at <span class="highlight">[email address]</span>.</li>
                </ul>

                <h3 style={{marginTop:15}}>14. Disputes</h3>
                <ul style={{marginLeft:50}}>
                    <li>Any disputes arising out of or in connection with the contest will be resolved at the sole discretion of the organizers.</li>
                    <li>The organizers' decision is final and binding in all matters related to the contest.</li>
                </ul>

                <p>By participating in the contest, you agree to abide by these rules and the decisions of the organizers. We wish you the best of luck and hope you enjoy the contest!</p>
            </div>

        </div>
    )
}

export default Rules
