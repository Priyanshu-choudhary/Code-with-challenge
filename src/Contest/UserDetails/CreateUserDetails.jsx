import { useContext } from 'react';
import { UserContext } from '/src/Context/UserContext';

const useCreateUserContestDetail = () => {
    const { user, password } = useContext(UserContext);

    const CreateUserContestDetailApi = async (nameOfContest, nameOfOrganization) => {
        // Check if the contest title already exists in local storage
        const existingContestDetail = JSON.parse(localStorage.getItem("contest") || "[]");
        if (existingContestDetail.some(contest => contest.nameOfContest === nameOfContest)) {
            throw new Error('contest with the same title already exists');
        }

        const newContest = {
            nameOfContest: nameOfContest,
            nameOfOrganization: nameOfOrganization,
            date: new Date(),
           
        };

        try {
            // Make API call to create the contest
            // console.log(user + " " + password);
            const basicAuth = 'Basic ' + btoa(`${user}:${password}`);
            console.log("contest detail " + JSON.stringify(newContest));

            const response = await fetch(`https://hytechlabs.onlne:9090/UserDetailsContest/${nameOfContest}/username/${user}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': basicAuth,
                },
                body: JSON.stringify(newContest)
            });

            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error('Unexpected response format:', text);
                throw new Error('Failed to create contest: Unexpected response format');
            }

            if (!response.ok) {
                throw new Error('Failed to create contest');
            }

            // Update local storage with the new contest title and ID
            const updatedContest = [...existingContestDetail, { title: nameOfContest, id: data.courseId }];
            localStorage.setItem("contest", JSON.stringify(updatedContest));

            console.log('contest created:', data);
            return data; // Return the created contest data
        } catch (error) {
            console.error('Error creating contest:', error);
            throw error; // Rethrow the error to handle it in the calling component
        }
    };

    return CreateUserContestDetailApi;
};

export default useCreateUserContestDetail;
